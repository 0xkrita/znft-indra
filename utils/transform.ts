import { EventType } from '@zoralabs/zdk/dist/queries/queries-sdk';
import assert from 'assert';
import type { Edge, Node } from 'react-flow-renderer';
import type { EventsGql, SaleWithTokenGql } from './gql-types';

/**
 * A lodash keyBy the block number of which the transaction happens.
 *
 * This is a bit risky as though unlikely, multiple sales transaction
 * can happen in one block, making the index hash non-unique. I was
 * going to use the `transactionHash` element for the unique id, but
 * it turns out it can be undefined for some reason based on zora's
 * query definition.
 *
 * @todo generalize this function with generics
 * @todo try another hashed identifier that is actually unique
 *
 * @param {SaleWithTokenGql[] | undefined} sales - gql result from zora's API
 * @return {Record<string, SaleWithTokenGql | undefined} - a hashmap based on block number
 */
export const keyBySalesTxHash = (
  sales?: SaleWithTokenGql[]
): Record<number, SaleWithTokenGql> | undefined =>
  sales?.reduce((prev: Record<string, SaleWithTokenGql>, curr) => {
    const txHash = curr.sale.transactionInfo.transactionHash;
    assert(typeof txHash === 'string');
    prev[txHash] = curr;
    return prev;
  }, {});

/**
 * convert the connections into edges
 *
 * @example
 * Edge[] = [ { id: 'e1-2', source: '1', label: 'transfers', target: '2', animated: true } ];
 *
 * @param {EventsGql[]} events
 * @param {Edge[]} edges - initial value
 * @returns {Edge[]}
 */
export const eventsToEdges = (
  events: EventsGql[],
  edges: Edge[] = []
): Edge[] =>
  events.reduce((prev, curr) => {
    switch (curr.eventType) {
      case EventType.MintEvent:
        assert(curr.properties.__typename === 'MintEvent');
        prev.push({
          id: `e${curr.properties.originatorAddress}-${curr.properties.toAddress}`,
          source: curr.properties.originatorAddress,
          target: curr.properties.toAddress,
          label: 'mints to', // TODO: come up with better names
          animated: true,
          type: 'floating',
        });
        break;
      case EventType.TransferEvent:
        assert(curr.properties.__typename === 'TransferEvent');
        prev.push({
          id: `e${curr.properties.fromAddress}-${curr.properties.toAddress}`,
          source: curr.properties.fromAddress,
          target: curr.properties.toAddress,
          label: 'transfers to',
          animated: true,
          type: 'floating',
        });
      // TODO: and more...
      default:
        break;
    }
    return prev;
  }, edges);

/**
 * convert the history into a set of nodes
 *
 * @example
 * Node[] = [ { id: '2', data: { label: 'Node 2' }, position: { x: 5, y: 100 } } ]
 *
 * @todo suboptimal performance with array lookups with O(N) instead of a map of O(1)
 *
 * @param {EventsGql[]} events
 * @param {Node[]} nodes - initial value
 * @return {Node[]}
 */
export const eventsToNodes = (
  events: EventsGql[],
  nodes: Node[] = []
): Node[] =>
  events.reduce((prev, curr, idx) => {
    const currentBatch: Node[] = [];

    switch (curr.eventType) {
      case EventType.MintEvent:
        assert(curr.properties.__typename === 'MintEvent');
        currentBatch.push({
          id: curr.properties.originatorAddress,
          data: { label: curr.properties.originatorAddress },
          position: { x: 5, y: idx * 100 + 5 }, // 100 offset
        });
        currentBatch.push({
          id: curr.properties.toAddress,
          data: { label: curr.properties.toAddress },
          position: { x: 300, y: idx * 100 + 5 },
        });
        break;
      case EventType.TransferEvent:
        assert(curr.properties.__typename === 'TransferEvent');
        currentBatch.push({
          id: curr.properties.fromAddress,
          data: { label: curr.properties.fromAddress },
          position: { x: 5, y: idx * 100 + 5 }, // 100 offset
        });
        currentBatch.push({
          id: curr.properties.toAddress,
          data: { label: curr.properties.toAddress },
          position: { x: 300, y: idx * 100 + 5 },
        });
        break;
      default:
        break;
    }

    // dedup
    currentBatch.filter((e) => !nodes.some((n) => n.id === e.id));

    prev.push(...currentBatch);
    return prev;
  }, nodes);

/**
 * same as @see historyToEdges but for sales query results
 *
 * @param {SaleWithTokenGql[]} sales
 * @param {Edge[]} edges initial value
 * @returns {Edge[]}
 */
export const salesToEdges = (
  sales: SaleWithTokenGql[],
  edges: Edge[] = []
): Edge[] =>
  sales.reduce((prev, curr) => {
    prev.push({
      id: `e${curr.sale.sellerAddress}-${curr.sale.buyerAddress}`,
      source: curr.sale.sellerAddress,
      label: `sold to`,
      target: curr.sale.buyerAddress,
      animated: true,
      type: 'floating',
    });
    return prev;
  }, edges);

/**
 * same as @see historyToNodes but for sales query
 *
 * @param {SaleWithTokenGql[]} sales
 * @param {Node[]} nodes - initial value
 * @returns {Node[]}
 */
export const salesToNodes = (
  sales: SaleWithTokenGql[],
  nodes: Node[] = []
): Node[] =>
  sales.reduce((prev, curr, idx) => {
    const currentBatch: Node[] = [];
    currentBatch.push({
      id: curr.sale.buyerAddress,
      data: { label: curr.sale.buyerAddress },
      position: { x: 30, y: idx * 150 + 5 },
    });
    currentBatch.push({
      id: curr.sale.sellerAddress,
      data: { label: curr.sale.sellerAddress },
      position: { x: 300, y: idx * 150 + 5 },
    });
    currentBatch.filter((e) => !nodes.some((n) => n.id === e.id));
    return prev;
  }, nodes);

/**
 * combine and dedup the sales nodes and events nodes
 *
 * @param {Node[]} nodes1
 * @param {Node[]} nodes2
 * @returns {Node[]}
 */
export const combineNodes = (nodes1: Node[], nodes2: Node[]): Node[] => {
  nodes1.filter((n1) => nodes2.some((n2) => n2.id === n1.id));
  return [...nodes1, ...nodes2];
};
