import 'styled-components';
import { MarketingTheme } from './marketing.types';

declare module 'styled-components' {
  export interface DefaultTheme extends MarketingTheme {}
}