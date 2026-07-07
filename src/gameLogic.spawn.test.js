import { describe, it, expect } from 'vitest';
import { addRandomTile, initGame, createEmptyGrid } from './gameLogic';

// Deterministic RNG stub that yields a fixed sequence, then repeats the last.
function seq(values) {
  let i = 0;
  return () => values[Math.min(i++, values.length - 1)];
}

function countNonZero(g) {
  return g.flat().filter((v) => v !== 0).length;
}

describe('addRandomTile', () => {
  it('adds exactly one tile to an empty grid', () => {
    const out = addRandomTile(createEmptyGrid(), seq([0, 0]));
    expect(countNonZero(out)).toBe(1);
  });

  it('spawns a 2 when rng() >= 0.9 threshold is not crossed', () => {
    // second rng() = 0 (<0.9) -> value 2
    const out = addRandomTile(createEmptyGrid(), seq([0, 0]));
    expect(out.flat().find((v) => v !== 0)).toBe(2);
  });

  it('spawns a 4 when second rng() >= 0.9', () => {
    const out = addRandomTile(createEmptyGrid(), seq([0, 0.95]));
    expect(out.flat().find((v) => v !== 0)).toBe(4);
  });

  it('returns the same grid when full (no empty cells)', () => {
    const full = [
      [2, 4, 8, 16],
      [4, 8, 16, 32],
      [8, 16, 32, 64],
      [16, 32, 64, 128],
    ];
    expect(addRandomTile(full)).toBe(full);
  });

  it('does not mutate the input grid', () => {
    const g = createEmptyGrid();
    addRandomTile(g, seq([0, 0]));
    expect(countNonZero(g)).toBe(0);
  });
});

describe('initGame', () => {
  it('starts with exactly two tiles', () => {
    expect(countNonZero(initGame(seq([0, 0, 0.5, 0])))).toBe(2);
  });
});
