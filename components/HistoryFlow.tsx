import { useCallback, useState } from 'react';
import ReactFlow, {
  applyEdgeChanges,
  // addEdge,
  applyNodeChanges,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from 'react-flow-renderer';
import { applyWidth } from '../utils/apply-flow-style';
import { EventsGql, SaleWithTokenGql } from '../utils/gql-types';
import {
  combineNodes,
  eventsToEdges,
  eventsToNodes,
  salesToEdges,
  salesToNodes,
} from '../utils/transform';

export default function HistoryFlow({
  events = [],
  sales = [],
}: {
  events?: EventsGql[];
  sales?: SaleWithTokenGql[];
}) {
  const [nodes, setNodes] = useState<Node[]>(
    applyWidth(combineNodes(salesToNodes(sales), eventsToNodes(events)))
  );
  const [edges, setEdges] = useState<Edge[]>([
    ...salesToEdges(sales),
    ...eventsToEdges(events),
  ]);

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
    <div className="h-screen text-xs">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      />
    </div>
  );
}
