import React from 'react';
import { PaletteMode, ThemeOptions } from '@mui/material';
import { amber, deepOrange, grey, orange } from '@mui/material/colors';

const generalThemeOptions: ThemeOptions = {
  typography: {
    h1: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 'bolder',
    },
    caption: {
      fontSize: '1rem',
    },
  },
};

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
  isDarkMode: false,
});

export const getThemeOptions = (mode: PaletteMode): ThemeOptions => {
  return {
    ...generalThemeOptions,
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: amber,
            secondary: orange,
            background: {
              paper: amber[100],
            },
          }
        : {
            primary: deepOrange,
            secondary: grey,
            background: {
              paper: grey[900],
            },
          }),
    },
  };
};
