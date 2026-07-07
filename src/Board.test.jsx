import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Board from './Board';

function grid(rows) {
  const g = rows.map((row) => {
    const r = [...row];
    while (r.length < 4) r.push(0);
    return r;
  });
  while (g.length < 4) g.push([0, 0, 0, 0]);
  return g;
}

describe('Board', () => {
  it('renders 16 gridcells', () => {
    render(<Board grid={grid([[0]])} />);
    expect(screen.getAllByRole('gridcell')).toHaveLength(16);
  });

  it('exposes an accessible grid label', () => {
    render(<Board grid={grid([[0]])} />);
    expect(screen.getByRole('grid', { name: /2048 game board/i })).toBeInTheDocument();
  });

  it('labels a filled tile with its position and value', () => {
    render(<Board grid={grid([[2]])} />);
    expect(screen.getByLabelText('Row 1, column 1: tile 2')).toBeInTheDocument();
  });

  it('renders the numeric value of a filled tile', () => {
    render(<Board grid={grid([[0, 8]])} />);
    expect(screen.getByText('8')).toBeInTheDocument();
  });
});
