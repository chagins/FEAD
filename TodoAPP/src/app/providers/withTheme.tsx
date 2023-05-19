import React from 'react';
import { ThemeProvider } from 'entities/theme';

export const withTheme = (component: () => React.ReactNode) => () => {
  return <ThemeProvider>{component()}</ThemeProvider>;
};
