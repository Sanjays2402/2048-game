import Tile from './Tile';

export default function Board({ grid }) {
  return (
    <div className="board" role="grid" aria-label="2048 game board">
      {grid.map((row, r) =>
        row.map((value, c) => (
          <Tile key={`${r}-${c}`} value={value} row={r} col={c} />
        ))
      )}
    </div>
  );
}
