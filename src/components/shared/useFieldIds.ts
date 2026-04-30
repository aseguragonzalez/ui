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
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;
  return { id, hintId, errorId, describedBy };
}
