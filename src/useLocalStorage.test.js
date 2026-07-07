import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('k', 42));
    expect(result.current[0]).toBe(42);
  });

  it('reads a previously stored value', () => {
    window.localStorage.setItem('k', JSON.stringify(7));
    const { result } = renderHook(() => useLocalStorage('k', 0));
    expect(result.current[0]).toBe(7);
  });

  it('persists updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('k', 0));
    act(() => result.current[1](99));
    expect(result.current[0]).toBe(99);
    expect(JSON.parse(window.localStorage.getItem('k'))).toBe(99);
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useLocalStorage('k', 1));
    act(() => result.current[1]((prev) => prev + 4));
    expect(result.current[0]).toBe(5);
  });

  it('falls back to the initial value on malformed stored JSON', () => {
    window.localStorage.setItem('k', 'not-json{');
    const { result } = renderHook(() => useLocalStorage('k', 'safe'));
    expect(result.current[0]).toBe('safe');
  });
});
