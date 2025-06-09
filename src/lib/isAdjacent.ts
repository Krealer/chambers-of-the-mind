export const isAdjacent = (
  [r1, c1]: [number, number],
  [r2, c2]: [number, number]
) =>
  (r1 === r2 && Math.abs(c1 - c2) === 1) ||
  (c1 === c2 && Math.abs(r1 - r2) === 1);

export default isAdjacent;
