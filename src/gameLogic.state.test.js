import { describe, it, expect } from 'vitest';
import { isGameOver, hasWon } from './gameLogic';

function grid(rows) {
  const g = rows.map((row) => {
    const r = [...row];
    while (r.length < 4) r.push(0);
    return r;
  });
  while (g.length < 4) g.push([0, 0, 0, 0]);
  return g;
}

describe('isGameOver', () => {
  it('is false when an empty cell exists', () => {
    expect(isGameOver(grid([[2, 4, 8, 16], [4, 8, 16, 32], [8, 16, 32, 64], [16, 32, 64, 0]]))).toBe(false);
  });

  it('is false when an adjacent horizontal merge is possible', () => {
    expect(isGameOver(grid([[2, 2, 8, 16], [4, 8, 16, 32], [8, 16, 32, 64], [16, 32, 64, 128]]))).toBe(false);
  });

  it('is false when an adjacent vertical merge is possible', () => {
    expect(isGameOver(grid([[2, 4, 8, 16], [2, 8, 16, 32], [8, 16, 32, 64], [16, 32, 64, 128]]))).toBe(false);
  });

  it('is true on a full board with no possible merges', () => {
    expect(isGameOver(grid([[2, 4, 8, 16], [4, 8, 16, 32], [8, 16, 32, 64], [16, 32, 64, 128]]))).toBe(true);
  });
});

describe('hasWon', () => {
  it('is false with no 2048 tile', () => {
    expect(hasWon(grid([[2, 4, 8, 16]]))).toBe(false);
  });

  it('is true when a 2048 tile is present', () => {
    expect(hasWon(grid([[2048, 0, 0, 0]]))).toBe(true);
  });
});
