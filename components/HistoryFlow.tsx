import ReactFlow, { useEdgesState, useNodesState } from 'react-flow-renderer';
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
  const [nodes, , onNodesChange] = useNodesState(
    applyWidth(combineNodes(salesToNodes(sales), eventsToNodes(events)))
  );
  const [edges, , onEdgesChange] = useEdgesState([
    ...salesToEdges(sales),
    ...eventsToEdges(events),
  ]);

  // const onConnect = useCallback(
  //   (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );

  return (
    <div className="text-xs h-screen/70">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        // onConnect={onConnect}
        fitView
        // fitViewOptions={{ padding: 0.2 }}
      />
    </div>
  );
}
