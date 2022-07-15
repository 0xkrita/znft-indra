/**
 * typescript implementation of the java hashCode method
 *
 * @param {String} str
 * @returns {Number}
 */
export const hashCode = (str: string): number => {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    let chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
};

export const hashN = (...args: string[]): number => {
  return args.reduce((prev, cur) => prev || hashCode(cur), 0);
};
