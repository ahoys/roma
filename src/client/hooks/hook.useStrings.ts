import { useSelector } from 'react-redux';
import { TStoreState } from '../store';
import { strings } from '../strings';

/**
 * Returns the currently active string library.
 */
export const useStrings = () => {
  const language = useSelector(
    (state: TStoreState) => state.session.language
  );
  if (language && strings[language]) {
    return strings[language];
  }
  return strings.en;
};
