import { useSelector } from 'react-redux';
import { TStoreState } from '../store';
import { strings } from '../strings';

/**
 * Returns the currently active string library.
 */
export const useStrings = (language = 'fi') => {
  const activeLanguage = useSelector(
    (state: TStoreState) => state.session.language
  );
  if (language && strings[language]) {
    return strings[language];
  } else if (activeLanguage && strings[activeLanguage]) {
    return strings[activeLanguage];
  }
  return strings.fi;
};
