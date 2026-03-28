import { memo } from 'react';

const TILE_COLORS = {
  0: { bg: '#cdc1b4', text: '#cdc1b4' },
  2: { bg: '#eee4da', text: '#776e65' },
  4: { bg: '#ede0c8', text: '#776e65' },
  8: { bg: '#f2b179', text: '#f9f6f2' },
  16: { bg: '#f59563', text: '#f9f6f2' },
  32: { bg: '#f67c5f', text: '#f9f6f2' },
  64: { bg: '#f65e3b', text: '#f9f6f2' },
  128: { bg: '#edcf72', text: '#f9f6f2' },
  256: { bg: '#edcc61', text: '#f9f6f2' },
  512: { bg: '#edc850', text: '#f9f6f2' },
  1024: { bg: '#edc53f', text: '#f9f6f2' },
  2048: { bg: '#edc22e', text: '#f9f6f2' },
};

function getFontSize(value) {
  if (value >= 1024) return 'clamp(1.2rem, 4vw, 1.8rem)';
  if (value >= 128) return 'clamp(1.4rem, 4.5vw, 2.2rem)';
  return 'clamp(1.6rem, 5vw, 2.6rem)';
}

const Tile = memo(function Tile({ value }) {
  const colors = TILE_COLORS[value] || { bg: '#3c3a32', text: '#f9f6f2' };

  return (
    <div
      className={`tile ${value ? 'tile-filled' : ''} ${value ? `tile-${Math.min(value, 2048)}` : ''}`}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        fontSize: value ? getFontSize(value) : undefined,
      }}
    >
      {value || ''}
    </div>
  );
});

export default Tile;
