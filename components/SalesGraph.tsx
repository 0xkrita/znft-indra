import { useSalesHistory } from '../hooks/useSalesHistory';
import { hashN } from '../utils/hash';

export const SalesGraph = ({
  address,
  tokenId,
}: {
  address: string;
  tokenId: string;
}) => {
  const { error, fetching, result } = useSalesHistory(address, tokenId);
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
                <li key={hashN(address, tokenId, Date.now().toString())}>
                  <p>
                    {sales.sellerAddress} sold to {sales.buyerAddress}
                  </p>
                </li>
              ))
            ) : (
              <p>Sadly No sales history found</p>
            )}
          </ul>
        </>
      )}
    </>
  );
};
