import { useId } from 'react';

interface UseFieldIdsOptions {
  inputId?: string;
  hint?: string;
  error?: string;
}

interface UseFieldIdsResult {
  id: string;
  hintId: string | undefined;
  errorId: string | undefined;
  describedBy: string | undefined;
}

export function useFieldIds({ inputId, hint, error }: UseFieldIdsOptions): UseFieldIdsResult {
  const generatedId = useId();
  const id = inputId ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  // Every composite renders the error or the hint, never both — error wins.
  // aria-describedby must therefore name only the element actually in the DOM:
  // naming a hint that the error suppressed leaves a dangling reference, which
  // assistive technology resolves to nothing.
  const describedBy = errorId ?? hintId;
  return { id, hintId, errorId, describedBy };
}
