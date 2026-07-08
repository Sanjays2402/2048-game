import { useState, useCallback } from 'react';

/**
 * useLocalStorage — a useState-like hook backed by window.localStorage.
 *
 * Reads are lazy (only on mount) and tolerant of unavailable storage
 * (private mode, SSR) by falling back to the initial value.
 *
 * @param {string} key           localStorage key
 * @param {*} initialValue       default when nothing is stored / storage fails
 * @param {object} [opts]
 * @param {(raw:string)=>*} [opts.deserialize] parse stored string
 * @param {(val:*)=>string} [opts.serialize]   stringify before storing
 */
export function useLocalStorage(
  key,
  initialValue,
  { deserialize = JSON.parse, serialize = JSON.stringify } = {}
) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialValue : deserialize(raw);
    } catch {
      return initialValue;
    }
  });

  const set = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next;
        try {
          window.localStorage.setItem(key, serialize(resolved));
        } catch {
          // Ignore write failures (quota, private mode) — state still updates.
        }
        return resolved;
      });
    },
    [key, serialize]
  );

  return [value, set];
}
