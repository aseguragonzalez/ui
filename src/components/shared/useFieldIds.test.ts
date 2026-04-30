import { renderHook } from '@testing-library/react';
import { useFieldIds } from './useFieldIds';

describe('useFieldIds', () => {
  describe('id', () => {
    it('auto-generates a stable id when inputId is not provided', () => {
      const { result, rerender } = renderHook(() => useFieldIds({}));
      const first = result.current.id;
      rerender();
      expect(result.current.id).toBe(first);
      expect(first).toBeTruthy();
    });

    it('uses inputId when provided', () => {
      const { result } = renderHook(() => useFieldIds({ inputId: 'my-field' }));
      expect(result.current.id).toBe('my-field');
    });
  });

  describe('hintId', () => {
    it('is undefined when hint is not provided', () => {
      const { result } = renderHook(() => useFieldIds({}));
      expect(result.current.hintId).toBeUndefined();
    });

    it('is `${id}-hint` when hint is provided', () => {
      const { result } = renderHook(() => useFieldIds({ inputId: 'f', hint: 'Ayuda' }));
      expect(result.current.hintId).toBe('f-hint');
    });
  });

  describe('errorId', () => {
    it('is undefined when error is not provided', () => {
      const { result } = renderHook(() => useFieldIds({}));
      expect(result.current.errorId).toBeUndefined();
    });

    it('is `${id}-error` when error is provided', () => {
      const { result } = renderHook(() => useFieldIds({ inputId: 'f', error: 'Requerido' }));
      expect(result.current.errorId).toBe('f-error');
    });
  });

  describe('describedBy', () => {
    it('is undefined when neither hint nor error is provided', () => {
      const { result } = renderHook(() => useFieldIds({}));
      expect(result.current.describedBy).toBeUndefined();
    });

    it('contains only hintId when only hint is provided', () => {
      const { result } = renderHook(() => useFieldIds({ inputId: 'f', hint: 'Ayuda' }));
      expect(result.current.describedBy).toBe('f-hint');
    });

    it('contains only errorId when only error is provided', () => {
      const { result } = renderHook(() => useFieldIds({ inputId: 'f', error: 'Error' }));
      expect(result.current.describedBy).toBe('f-error');
    });

    it('contains both hintId and errorId (space-separated) when both are provided', () => {
      const { result } = renderHook(() =>
        useFieldIds({ inputId: 'f', hint: 'Ayuda', error: 'Error' }),
      );
      expect(result.current.describedBy).toBe('f-hint f-error');
    });
  });
});
