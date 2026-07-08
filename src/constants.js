// Central game constants shared across logic and UI.

/** Board is GRID_SIZE x GRID_SIZE. */
export const GRID_SIZE = 4;

/** Reaching (or passing) this tile value triggers a win. */
export const WIN_TILE = 2048;

/** Probability that a newly spawned tile is a 2 (otherwise it is a 4). */
export const SPAWN_TWO_PROBABILITY = 0.9;

/** localStorage key for the persisted best score. */
export const BEST_SCORE_KEY = '2048-best';
