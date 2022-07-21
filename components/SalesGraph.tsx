import { useSalesHistory } from '../hooks/useSalesHistory';
import { hashN } from '../utils/hash';
import { Loading } from './Loading';
import { WrappedError } from './WrappedError';

export const SalesGraph = ({
  contract,
  id,
}: {
  contract: string;
  id: string;
}) => {
  const { error, fetching, result } = useSalesHistory(contract, id);
  console.debug(result);

  return (
    <>
      {fetching ? (
        <Loading />
      ) : error ? (
        <WrappedError error={error} />
      ) : (
        <>
          <ul>
            {result && result.length > 0 ? (
              result.map((sales) => (
                <li key={hashN(contract, id, Date.now().toString())}>
                  <p>
                    {sales.sellerAddress} sold to {sales.buyerAddress}
                  </p>
                </li>
              ))
            ) : (
              <h1>Sadly no sales history found</h1>
            )}
          </ul>
        </>
      )}
    </>
  );
};
