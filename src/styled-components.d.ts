import 'styled-components';
import { TTheme } from './client/theme';

/**
 * This will enable typings for themes.
 * I.e. in styled.div you can have ({ theme }) => theme.color.app
 * and it's typed!
 */
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends TTheme {}
}
