import 'styled-components';
import { AdminTheme } from '@/types/theme.types';

declare module 'styled-components' {
  export interface DefaultTheme extends AdminTheme {}
}