import { useState, useCallback } from 'react';
import ReactFlow, {
  // addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  // Connection,
} from 'react-flow-renderer';
import { useHistory } from '../hooks/useHistory';
import { useSalesHistory } from '../hooks/useSalesHistory';
import { Loading } from './Loading';
import { WrappedError } from './WrappedError';

export default function HistoryFlow({
  contract,
  id,
}: {
  contract: string;
  id: string;
}) {
  const { error, history, isValidating } = useHistory(contract, id);
  const {
    result: salesHistory,
    fetching,
    error: salesError,
  } = useSalesHistory(contract, id);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  // const onConnect = useCallback(
  //   (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );

  return (
    <div className="h-96 text-xs">
      {isValidating ? (
        <Loading></Loading>
      ) : error ? (
        <WrappedError error={error} />
      ) : fetching ? (
        <Loading />
      ) : salesError ? (
        <WrappedError error={error} />
      ) : (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          // onConnect={onConnect}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        />
      )}
    </div>
  );
}
