import { useEffect } from 'react';
import { useQuery } from 'urql';
import { NFTPreviewParam, SearchQueryResponse, ZNFT } from './Search';

const SearchQuery = `
  query ($text: String!) {
    search(query: { text: $text }, pagination: { limit: 5 }) {
      nodes {
        tokenId
        name
        description
        collectionAddress
        entityType
      }
    }
  }
`;

export const Suggestions = ({
  text,
  updateTopToken,
}: {
  text: string;
  updateTopToken: (value: NFTPreviewParam) => void;
}) => {
  const [{ data, fetching, error }] = useQuery<SearchQueryResponse>({
    query: SearchQuery,
    variables: { text },
    pause: !text,
  });

  useEffect(() => {
    const { tokenId, collectionAddress } =
      data?.search.nodes?.[0] ?? ({} as ZNFT);
    updateTopToken({
      id: tokenId,
      contract: collectionAddress,
    });
  }, [data, updateTopToken]);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div className="bg-teal-50 px-7 py-3">
      <ul className="list-disc">
        {data?.search.nodes.map((znft) => (
          <li className="py-2" key={znft.tokenId}>
            <code>
              {/* <pre> */}
              {JSON.stringify(znft, null, 2)}
              {/* </pre> */}
            </code>
          </li>
        ))}
      </ul>
    </div>
  );
};
