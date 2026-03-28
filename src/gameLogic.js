const GRID_SIZE = 4;

export function createEmptyGrid() {
  return Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(0));
}

export function addRandomTile(grid) {
  const empty = [];
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === 0) empty.push({ r, c });
    }
  }
  if (empty.length === 0) return grid;
  const { r, c } = empty[Math.floor(Math.random() * empty.length)];
  const newGrid = grid.map(row => [...row]);
  newGrid[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newGrid;
}

function slideRow(row) {
  const filtered = row.filter(v => v !== 0);
  const merged = [];
  let score = 0;
  let i = 0;
  while (i < filtered.length) {
    if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
      const val = filtered[i] * 2;
      merged.push(val);
      score += val;
      i += 2;
    } else {
      merged.push(filtered[i]);
      i++;
    }
  }
  while (merged.length < GRID_SIZE) merged.push(0);
  return { row: merged, score };
}

function rotateGrid(grid) {
  const n = grid.length;
  const rotated = createEmptyGrid();
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      rotated[c][n - 1 - r] = grid[r][c];
    }
  }
  return rotated;
}

export function move(grid, direction) {
  let rotations = { left: 0, up: 3, right: 2, down: 1 }[direction];
  let current = grid;
  for (let i = 0; i < rotations; i++) current = rotateGrid(current);

  let totalScore = 0;
  const newGrid = current.map(row => {
    const { row: newRow, score } = slideRow(row);
    totalScore += score;
    return newRow;
  });

  const reverseRotations = (4 - rotations) % 4;
  let result = newGrid;
  for (let i = 0; i < reverseRotations; i++) result = rotateGrid(result);

  const moved = !gridsEqual(grid, result);
  return { grid: result, score: totalScore, moved };
}

function gridsEqual(a, b) {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

export function isGameOver(grid) {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === 0) return false;
      if (c + 1 < GRID_SIZE && grid[r][c] === grid[r][c + 1]) return false;
      if (r + 1 < GRID_SIZE && grid[r][c] === grid[r + 1][c]) return false;
    }
  }
  return true;
}

export function hasWon(grid) {
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (grid[r][c] === 2048) return true;
    }
  }
  return false;
}

export function initGame() {
  let grid = createEmptyGrid();
  grid = addRandomTile(grid);
  grid = addRandomTile(grid);
  return grid;
}
