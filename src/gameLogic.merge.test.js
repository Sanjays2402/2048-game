import { describe, it, expect } from 'vitest';
import { move } from './gameLogic';

// Helper: build a full 4x4 grid from a compact spec, zero-filling rows and columns.
function grid(rows) {
  const g = rows.map((row) => {
    const r = [...row];
    while (r.length < 4) r.push(0);
    return r;
  });
  while (g.length < 4) g.push([0, 0, 0, 0]);
  return g;
}

describe('move() — merging and sliding on a single row (left)', () => {
  it('slides non-zero tiles to the left', () => {
    const g = grid([[0, 2, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
    const { grid: out } = move(g, 'left');
    expect(out[0]).toEqual([2, 0, 0, 0]);
  });

  it('merges two equal adjacent tiles into their sum', () => {
    const g = grid([[2, 2, 0, 0]]);
    const { grid: out, score } = move(g, 'left');
    expect(out[0]).toEqual([4, 0, 0, 0]);
    expect(score).toBe(4);
  });

  it('merges only once per pair (2 2 2 2 -> 4 4)', () => {
    const g = grid([[2, 2, 2, 2]]);
    const { grid: out, score } = move(g, 'left');
    expect(out[0]).toEqual([4, 4, 0, 0]);
    expect(score).toBe(8);
  });

  it('does not merge unequal neighbors (4 2 2 -> 4 4)', () => {
    const g = grid([[4, 2, 2, 0]]);
    const { grid: out, score } = move(g, 'left');
    expect(out[0]).toEqual([4, 4, 0, 0]);
    expect(score).toBe(4);
  });

  it('reports moved=false when nothing changes', () => {
    const g = grid([[2, 4, 8, 16]]);
    const { moved } = move(g, 'left');
    expect(moved).toBe(false);
  });

  it('reports moved=true when a slide happens', () => {
    const g = grid([[0, 0, 0, 2]]);
    const { moved } = move(g, 'left');
    expect(moved).toBe(true);
  });
});
