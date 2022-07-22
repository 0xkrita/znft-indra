import assert from 'assert';
import { SaleWithTokenGql } from './gql-types';

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
