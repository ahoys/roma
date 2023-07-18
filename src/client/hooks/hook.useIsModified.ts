import { useAppSelector } from './hook.useAppSelector';

/**
 * A simple hook to return true if the given field is modified.
 * @param endpoint Resource key.
 * @param fieldKey Field key.
 * @returns True if is modified.
 */
export const useIsModified = (endpoint: string, fieldKey?: string): boolean => {
  const data = useAppSelector((state) => state.data.modified)[endpoint];
  return (
    (data !== undefined && fieldKey === undefined) ||
    (data !== undefined && fieldKey !== undefined && data[fieldKey] !== undefined)
  );
};
