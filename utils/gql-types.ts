import {
  EventsQuery,
  SalesQuery,
} from '@zoralabs/zdk/dist/queries/queries-sdk';

export type SaleWithTokenGql = SalesQuery['sales']['nodes'][0];

export type EventsGql = EventsQuery['events']['nodes'][0];
