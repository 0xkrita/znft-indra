import { EventType } from '@zoralabs/zdk/dist/queries/queries-sdk';
import assert from 'assert';
import { useHistory } from '../hooks/useHistory';
import { useSalesHistory } from '../hooks/useSalesHistory';
import { Loading } from './Loading';
import { WrappedError } from './WrappedError';
import { useMemo } from 'react';
export const HistoryGraph = ({
  contract,
  id,
}: {
  contract: string;
  id: string;
}) => {
  const { error, history, isValidating } = useHistory(contract, id);
  const {
    result: salesHistory,
    fetching,
    error: salesError,
  } = useSalesHistory(contract, id);

  // const salesByTxHash = useMemo(
  //   () => keyBySalesTxHash(salesHistory),
  //   [salesHistory]
  // );

  return (
    <>
      {isValidating ? (
        <Loading />
      ) : error ? (
        <WrappedError error={error} />
      ) : (
        <ul>
          {history && history.length > 0 ? (
            history.map((txn, idx) => {
              switch (txn.eventType) {
                case EventType.SaleEvent:
                  break;
                case EventType.MintEvent:
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
            <h1>Sadly no sales history found</h1>
          )}
          {fetching ? (
            <Loading />
          ) : salesError ? (
            <WrappedError error={salesError} />
          ) : (
            salesHistory?.map((saleRecord, idx) => (
              <li key={idx}>
                {`Sales: ${saleRecord.sale.sellerAddress} sold to ${saleRecord.sale.buyerAddress}`}
              </li>
            ))
          )}
        </ul>
      )}
    </>
  );
};
