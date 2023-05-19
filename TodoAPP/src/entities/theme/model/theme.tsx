import React, { useMemo, useState } from 'react';

import {
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
  createTheme,
  useMediaQuery,
} from '@mui/material';
import { getThemeOptions, ThemeModeContext } from 'shared/ui';
import { getThemeModeFromLS, setThemeModeToLS } from 'shared/lib';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState<ThemeMode>(() => {
    const loadedMode = getThemeModeFromLS();

    if (loadedMode && ['dark', 'light'].includes(loadedMode)) {
      return loadedMode as ThemeMode;
    }

    return prefersDarkMode ? 'dark' : 'light';
  });

  const colorMode = useMemo(() => {
    return {
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'dark' ? 'light' : 'dark';
          setThemeModeToLS(newMode);
          return newMode;
        });
      },
      mode,
    };
  }, [mode]);

  const theme = React.useMemo(() => createTheme(getThemeOptions(mode)), [mode]);

  return (
    <ThemeModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeModeContext.Provider>
  );
};
