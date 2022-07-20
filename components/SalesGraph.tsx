import { useSalesHistory } from '../hooks/useSalesHistory';
import { hashN } from '../utils/hash';

export const SalesGraph = ({
  contract,
  id,
}: {
  contract: string;
  id: string;
}) => {
  const { error, fetching, result } = useSalesHistory(contract, id);
  console.log(result);

  return (
    <>
      {fetching ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Oh no... {error.message}</p>
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
