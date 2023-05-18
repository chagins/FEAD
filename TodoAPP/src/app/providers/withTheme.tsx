import React from 'react';
import { CustomThemeProvider } from 'entities/theme';

export const withTheme = (component: () => React.ReactNode) => () => {
  return <CustomThemeProvider>{component()}</CustomThemeProvider>;
};
