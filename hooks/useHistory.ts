import {
  EventSortKey,
  EventType,
  SortDirection,
} from '@zoralabs/zdk/dist/queries/queries-sdk';
import useSWR from 'swr';
import { zdk } from '../utils/constants';

const fetchHistory = async (
  address: string,
  tokenId: string,
  eventTypes: EventType[],
  limit: number = 10
) => {
  const history = await zdk.events({
    where: {
      tokens: [
        {
          address,
          tokenId,
        },
      ],
    },
    filter: {
      eventTypes,
    },
    sort: {
      sortDirection: SortDirection.Asc,
      sortKey: EventSortKey.Created,
    },
    pagination: {
      limit,
    },
  });
  return { history };
};

export const useHistory = (
  address: string,
  tokenId: string,
  eventTypes: EventType[] = [
    EventType.TransferEvent,
    EventType.MintEvent,
    EventType.SaleEvent,
  ],
  limit: number = 10
) => {
  const { data, isValidating, error } = useSWR(
    [address, tokenId, eventTypes, limit],
    fetchHistory
  );

  return {
    history: data?.history.events.nodes,
    error,
    isValidating,
  };
};
