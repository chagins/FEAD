import React from 'react';
import { ThemeProvider } from '@mui/material';
import { theme } from 'shared/lib';

export const withTheme = (component: () => React.ReactNode) => () =>
  <ThemeProvider theme={theme}>{component()}</ThemeProvider>;
