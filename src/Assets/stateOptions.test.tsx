import { renderHook } from '@testing-library/react';
import React from 'react';
import { PUBLIC_STATE_CODES, useStateOptions } from './stateOptions';
import { Context } from '../Components/Wrapper/Wrapper';
import { createMockContextValue } from '../test-utils/renderHelpers';

function makeWrapper(stateOptions: string[] | undefined) {
  const contextValue = createMockContextValue({
    getReferrer: ((key: string, defaultValue: unknown) => {
      if (key === 'stateOptions') return stateOptions ?? defaultValue;
      return defaultValue;
    }) as any,
  });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(Context.Provider, { value: contextValue }, children);
}

describe('useStateOptions', () => {
  it('returns the public states when the referrer has no override', () => {
    const { result } = renderHook(() => useStateOptions(), { wrapper: makeWrapper([]) });

    expect(Object.keys(result.current)).toEqual(PUBLIC_STATE_CODES);
    expect(result.current.co).toBe('Colorado');
  });

  it('falls back to the public states before the config has loaded', () => {
    const { result } = renderHook(() => useStateOptions(), { wrapper: makeWrapper(undefined) });

    expect(Object.keys(result.current)).toEqual(PUBLIC_STATE_CODES);
  });

  it('offers only the referrer states, including ones the public list omits', () => {
    const { result } = renderHook(() => useStateOptions(), { wrapper: makeWrapper(['ks', 'mo']) });

    expect(result.current).toEqual({ ks: 'Kansas', mo: 'Missouri' });
  });

  it('keeps the configured order', () => {
    const { result } = renderHook(() => useStateOptions(), { wrapper: makeWrapper(['mo', 'ks']) });

    expect(Object.keys(result.current)).toEqual(['mo', 'ks']);
  });

  it('drops codes that are not states', () => {
    const { result } = renderHook(() => useStateOptions(), { wrapper: makeWrapper(['ks', 'kansas', 'cesn']) });

    expect(result.current).toEqual({ ks: 'Kansas' });
  });

  it('falls back to the public states when no configured code is a state', () => {
    const { result } = renderHook(() => useStateOptions(), { wrapper: makeWrapper(['kansas']) });

    expect(Object.keys(result.current)).toEqual(PUBLIC_STATE_CODES);
  });
});
