import {
  EventType,
  SortDirection,
} from '@zoralabs/zdk/dist/queries/queries-sdk';
import useSWR from 'swr';
import { zdk } from '../utils/constants';

const fetchTransfers = async (
  address: string,
  tokenId: string,
  limit: number = 10
) => {
  const transfers = await zdk.events({
    where: {
      tokens: [
        {
          address,
          tokenId,
        },
      ],
    },
    filter: {
      eventTypes: [EventType.TransferEvent],
    },
    pagination: {
      limit,
    },
  });
  return { transfers };
};

export const useTransferHistory = (
  address: string,
  tokenId: string,
  limit: number = 10
) => {
  const { data, error } = useSWR([address, tokenId, limit], fetchTransfers);

  return {
    transfers: data?.transfers,
    error,
  };
};
