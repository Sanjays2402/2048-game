import { renderHook, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useSwipe } from './useSwipe';

const touch = (x, y = 0, identifier = 1) => ({ clientX: x, clientY: y, identifier });
const start = (...touches) => fireEvent.touchStart(document, { touches });
const end = (...changedTouches) => fireEvent.touchEnd(document, { changedTouches });

describe('useSwipe', () => {
  it.each([[50, 0, 'right'], [-50, 0, 'left'], [0, 50, 'down'], [0, -50, 'up']])(
    'recognizes a swipe to %s, %s', (x, y, direction) => {
      const swipe = vi.fn();
      renderHook(() => useSwipe(swipe));
      start(touch(0));
      end(touch(x, y));
      expect(swipe).toHaveBeenCalledExactlyOnceWith(direction);
    });

  it('clears a cancelled gesture before another touch ends', () => {
    const swipe = vi.fn();
    renderHook(() => useSwipe(swipe));
    start(touch(0));
    fireEvent.touchCancel(document);
    end(touch(100));
    expect(swipe).not.toHaveBeenCalled();
  });

  it('consumes short taps and ignores unrelated touch endings', () => {
    const swipe = vi.fn();
    renderHook(() => useSwipe(swipe));
    start(touch(0));
    end(touch(5));
    end(touch(100));
    start(touch(0));
    end(touch(100, 0, 2));
    expect(swipe).not.toHaveBeenCalled();
  });

  it('does not treat multi-touch gestures as moves', () => {
    const swipe = vi.fn();
    renderHook(() => useSwipe(swipe));
    start(touch(0));
    start(touch(0), touch(20, 0, 2));
    end(touch(100));
    expect(swipe).not.toHaveBeenCalled();
  });

  it('removes listeners when unmounted', () => {
    const swipe = vi.fn();
    const { unmount } = renderHook(() => useSwipe(swipe));
    start(touch(0));
    unmount();
    end(touch(100));
    expect(swipe).not.toHaveBeenCalled();
  });
});
