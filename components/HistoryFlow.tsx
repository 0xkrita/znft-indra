import ReactFlow from 'react-flow-renderer';
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
  return (
    <div className="text-xs h-screen/70">
      <ReactFlow
        defaultNodes={applyWidth(
          combineNodes(salesToNodes(sales), eventsToNodes(events))
        )}
        defaultEdges={[...salesToEdges(sales), ...eventsToEdges(events)]}
        defaultEdgeOptions={{
          animated: true,
        }}
        // onConnect={onConnect}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      />
    </div>
  );
}
