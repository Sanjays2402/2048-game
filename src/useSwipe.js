import { useEffect, useRef } from 'react';

export function useSwipe(onSwipe) {
  const touchStart = useRef(null);

  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) {
        touchStart.current = null;
        return;
      }
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY, id: touch.identifier };
    };

    const handleTouchEnd = (e) => {
      if (!touchStart.current) return;
      const start = touchStart.current;
      touchStart.current = null;
      const touch = Array.from(e.changedTouches).find(t => t.identifier === start.id);
      if (!touch) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const MIN_SWIPE = 30;

      if (Math.max(absDx, absDy) < MIN_SWIPE) return;

      if (absDx > absDy) {
        onSwipe(dx > 0 ? 'right' : 'left');
      } else {
        onSwipe(dy > 0 ? 'down' : 'up');
      }
    };

    const handleTouchCancel = () => { touchStart.current = null; };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('touchcancel', handleTouchCancel);
      touchStart.current = null;
    };
  }, [onSwipe]);
}
