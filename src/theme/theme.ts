import {
  extendTheme,
  StyleFunctionProps,
  ThemeConfig,
  withDefaultColorScheme,
} from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
  cssVarPrefix: 'tg',
};

const theme = extendTheme(
  {
    styles: {
      global: (p: StyleFunctionProps) => ({
        'html, body': {
          background: p.colorMode === 'dark' ? 'gray.900' : 'gray.50',
          minHeight: '100vh',
        },
      }),
    },
    fonts: {
      heading: `"Open Sans", sans-serif`,
      body: `"Open Sans", sans-serif`,
    },
    colors: {
      brand: {
        50: '#F8F2FF',
        100: '#F3E8FF',
        200: '#E2C2FF',
        300: '#C499FF',
        400: '#A373FF',
        500: '#8451FF',
        600: '#683EDF',
        700: '#4D2DBF',
        800: '#321F9F',
        900: '#180F80',
      },
    },
    config,
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
);

export default theme;
