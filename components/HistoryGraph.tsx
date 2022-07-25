import { useNFTEvents } from '../hooks/useNFTEvents';
import { useSalesHistory } from '../hooks/useSalesHistory';
import HistoryFlow from './HistoryFlow';
import Loading from './Loading';
import WrappedError from './WrappedError';

const HistoryGraph = ({ contract, id }: { contract: string; id: string }) => {
  const { error, history, isValidating } = useNFTEvents(contract, id);
  const {
    result: salesHistory,
    fetching,
    error: salesError,
  } = useSalesHistory(contract, id);

  return (
    <>
      {isValidating ? (
        <Loading />
      ) : error ? (
        <WrappedError error={error} />
      ) : fetching ? (
        <Loading />
      ) : salesError ? (
        <WrappedError error={salesError} />
      ) : (
        // <ListFlow events={history} sales={salesHistory} />
        <HistoryFlow events={history} sales={salesHistory} />
      )}
    </>
  );
};

export default HistoryGraph;
