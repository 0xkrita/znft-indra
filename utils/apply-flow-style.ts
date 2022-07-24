import type { Node } from 'react-flow-renderer';

/**
 * aux function to adjust the width of the nodes
 *
 * @param {Node[]} nodes
 * @param {Number | undefined} width
 * @returns {Node[]}
 */
export const applyWidth = (nodes: Node[], width: number = 400): Node[] =>
  nodes.map((n) => ({ ...n, style: { width } }));
