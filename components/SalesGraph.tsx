import { EventType } from '@zoralabs/zdk/dist/queries/queries-sdk';
import assert from 'assert';
import { useHistory } from '../hooks/useHistory';
import { hashN } from '../utils/hash';
import { Loading } from './Loading';
import { WrappedError } from './WrappedError';

export const HistoryGraph = ({
  contract,
  id,
}: {
  contract: string;
  id: string;
}) => {
  const { error, history, isValidating } = useHistory(contract, id);
  console.debug(history);

  return (
    <>
      {isValidating ? (
        <Loading />
      ) : error ? (
        <WrappedError error={error} />
      ) : (
        <>
          <ul>
            {history && history.length > 0 ? (
              history.map((txn) => {
                const listKey = hashN(contract, id, Date.now().toString());
                switch (txn.eventType) {
                  case EventType.SaleEvent:
                    // place holder for getting the sales history since
                    // the event API does not return the sellers and buyer
                    assert(txn.properties.__typename === 'Sale');
                    return (
                      <li key={listKey}>
                        {`Sales: needs to handle sales event separately - block number: ${txn.transactionInfo.blockNumber}`}
                      </li>
                    );
                  case EventType.MintEvent:
                    assert(txn.properties.__typename === 'MintEvent');
                    return (
                      <li key={listKey}>
                        {`Mint: ${txn.properties.originatorAddress} mint to ${txn.properties.toAddress}`}
                      </li>
                    );
                  case EventType.TransferEvent:
                    assert(txn.properties.__typename === 'TransferEvent');
                    return (
                      <li key={listKey}>
                        {`Transfer: ${txn.properties.fromAddress} sent to ${txn.properties.toAddress}`}
                      </li>
                    );
                }
              })
            ) : (
              <h1>Sadly no sales history found</h1>
            )}
          </ul>
        </>
      )}
    </>
  );
};
