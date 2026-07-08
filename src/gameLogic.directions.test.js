import { describe, it, expect } from 'vitest';
import { move } from './gameLogic';

function grid(rows) {
  const g = rows.map((row) => {
    const r = [...row];
    while (r.length < 4) r.push(0);
    return r;
  });
  while (g.length < 4) g.push([0, 0, 0, 0]);
  return g;
}

describe('move() — direction handling', () => {
  it('slides right', () => {
    const { grid: out } = move(grid([[2, 0, 0, 0]]), 'right');
    expect(out[0]).toEqual([0, 0, 0, 2]);
  });

  it('merges to the right edge', () => {
    const { grid: out, score } = move(grid([[0, 2, 0, 2]]), 'right');
    expect(out[0]).toEqual([0, 0, 0, 4]);
    expect(score).toBe(4);
  });

  it('slides up (first column)', () => {
    const g = grid([[0, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0]]);
    const { grid: out, score } = move(g, 'up');
    expect(out.map((row) => row[0])).toEqual([4, 0, 0, 0]);
    expect(score).toBe(4);
  });

  it('slides down (first column)', () => {
    const g = grid([[2, 0, 0, 0], [0, 0, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0]]);
    const { grid: out } = move(g, 'down');
    expect(out.map((row) => row[0])).toEqual([0, 0, 0, 4]);
  });

  it('preserves other columns when moving vertically', () => {
    const g = grid([[2, 8, 0, 0], [2, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    const { grid: out } = move(g, 'up');
    expect(out[0]).toEqual([4, 8, 0, 0]);
  });

  it('is a no-op move (moved=false) on a full stable column downward', () => {
    const g = grid([[2, 0, 0, 0], [4, 0, 0, 0], [8, 0, 0, 0], [16, 0, 0, 0]]);
    const { moved } = move(g, 'down');
    expect(moved).toBe(false);
  });
});
