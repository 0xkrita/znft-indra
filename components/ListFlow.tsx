import { EventType } from '@zoralabs/zdk/dist/queries/queries-sdk';
import assert from 'assert';
import { EventsGql, SaleWithTokenGql } from '../utils/gql-types';

export default function ListFlow({
  events,
  sales,
}: {
  events?: EventsGql[];
  sales?: SaleWithTokenGql[];
}) {
  return (
    <ul>
      {events && events.length > 0 ? (
        events.map((txn, idx) => {
          switch (txn.eventType) {
            case EventType.MintEvent:
              // TODO: honestly i dont know if we really want mint events.
              // was going at a kinda genesis node but may be kinda extraneous
              assert(txn.properties.__typename === 'MintEvent');
              return (
                // TODO: find a better key (i guess we can reuse the hashCode but
                // the time stamp is just way too close)
                <li key={idx}>
                  {`Mint: ${txn.properties.originatorAddress} mint to ${txn.properties.toAddress}`}
                </li>
              );
            case EventType.TransferEvent:
              assert(txn.properties.__typename === 'TransferEvent');
              return (
                <li key={idx}>
                  {`Transfer: ${txn.properties.fromAddress} sent to ${txn.properties.toAddress}`}
                </li>
              );
            default:
              return <p>something is very wrong</p>;
          }
        })
      ) : (
        <h1>Sadly no transfer/sales/mint history found &#58;&#40;</h1>
      )}
      {sales?.map((saleRecord, idx) => (
        <li key={idx}>
          {`Sales: ${saleRecord.sale.sellerAddress} sold to ${saleRecord.sale.buyerAddress}`}
        </li>
      ))}
    </ul>
  );
}
