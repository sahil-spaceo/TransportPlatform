import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: {
        gradient: string;
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      secondary: {
        gradient: string;
        light: string;
        main: string;
        dark: string;
        contrastText: string;
      };
      accent: {
        gradient: string;
        light: string;
        main: string;
        dark: string;
      };
      subscription: {
        basic: {
          gradient: string;
          main: string;
          light: string;
        };
        silver: {
          gradient: string;
          main: string;
          light: string;
        };
        gold: {
          gradient: string;
          main: string;
          light: string;
        };
      };
      functional: {
        success: {
          gradient: string;
          main: string;
          light: string;
          dark: string;
        };
        warning: {
          gradient: string;
          main: string;
          light: string;
          dark: string;
        };
        error: {
          gradient: string;
          main: string;
          light: string;
          dark: string;
        };
        info: {
          gradient: string;
          main: string;
          light: string;
          dark: string;
        };
      };
      neutral: {
        white: string;
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      dark: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
      };
      background: {
        default: string;
        paper: string;
        gradient: string;
      };
      text: {
        primary: string;
        secondary: string;
        disabled: string;
        hint: string;
      };
    };
    typography: {
      fontFamily: {
        primary: string;
        secondary: string;
        display: string;
        mono: string;
      };
      fontWeight: {
        light: number;
        regular: number;
        medium: number;
        semibold: number;
        bold: number;
        extrabold: number;
      };
      fontSize: {
        display1: string;
        display2: string;
        display3: string;
        h1: string;
        h2: string;
        h3: string;
        h4: string;
        h5: string;
        h6: string;
        bodyLarge: string;
        body: string;
        bodySmall: string;
        caption: string;
        overline: string;
        button: string;
      };
      lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
    };
    borderRadius: {
      none: string;
      small: string;
      medium: string;
      large: string;
      xl: string;
      pill: string;
      full: string;
    };
    shadows: {
      none: string;
      light: string;
      medium: string;
      heavy: string;
      glow: string;
      colored: string;
    };
    animations: {
      duration: {
        fast: string;
        normal: string;
        slow: string;
        slower: string;
      };
      easing: {
        standard: string;
        decelerate: string;
        accelerate: string;
        sharp: string;
      };
    };
    breakpoints: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
    zIndex: {
      hide: number;
      base: number;
      docked: number;
      dropdown: number;
      sticky: number;
      banner: number;
      overlay: number;
      modal: number;
      popover: number;
      skipLink: number;
      toast: number;
      tooltip: number;
    };
  }
}