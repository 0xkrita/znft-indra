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

  return (
    <div>
      {fetching ? (
        <p>Loading</p>
      ) : error ? (
        <p>Oh no... {error.message}</p>
      ) : (
        <ul>
          {result?.map((sales) => (
            <li key={hashN(address, tokenId)}>
              <p>
                {sales.sellerAddress} sold to {sales.buyerAddress}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
