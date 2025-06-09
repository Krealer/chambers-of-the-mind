import { isAdjacent } from '../src/lib/isAdjacent';

describe('isAdjacent', () => {
  test('returns true for horizontally adjacent tiles', () => {
    expect(isAdjacent([0, 0], [0, 1])).toBe(true);
  });

  test('returns true for vertically adjacent tiles', () => {
    expect(isAdjacent([2, 3], [3, 3])).toBe(true);
  });

  test('returns false for diagonal tiles', () => {
    expect(isAdjacent([1, 1], [2, 2])).toBe(false);
  });

  test('returns false for distant tiles', () => {
    expect(isAdjacent([0, 0], [0, 2])).toBe(false);
  });
});
