import Tile from './Tile';

export default function Board({ grid }) {
  return (
    <div className="board">
      {grid.map((row, r) =>
        row.map((value, c) => <Tile key={`${r}-${c}`} value={value} />)
      )}
    </div>
  );
}
