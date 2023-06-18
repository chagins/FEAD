import React, { FC } from 'react';
import { ThemeProvider } from 'entities/theme';

export const withTheme = (Component: FC) => () => {
  return (
    <ThemeProvider>
      <Component />
    </ThemeProvider>
  );
};
