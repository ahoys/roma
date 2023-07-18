import { AxiosError } from 'axios';

// This interface is agreed on the backend side.
interface ICustomErrorData {
  code: string;
  message: string;
}

/**
 * Returns a list of error messages, generated from AxiosError.
 */
export const getErrorMessages = (err: AxiosError): string[] => {
  const messages: string[] = [];
  if (err) {
    console.error(err);
  }
  const data = err?.response?.data as
    | ICustomErrorData
    | ICustomErrorData[]
    | undefined;
  /**
   * Investigate the entry and add to messages if possible.
   */
  const handleDataEntry = (entry: ICustomErrorData | string) => {
    if (typeof entry === 'object' && typeof entry.message === 'string') {
      // The normal, handled case.
      messages.push(entry.message);
    } else if (typeof entry === 'string') {
      // Unhandled case but possible.
      messages.push(entry);
    }
  };
  if (data !== undefined) {
    if (Array.isArray(data)) {
      for (const entry of data) {
        handleDataEntry(entry);
      }
    } else {
      handleDataEntry(data);
    }
  }
  return messages;
};
