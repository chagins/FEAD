import React, { useMemo, useState } from 'react';

import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { getThemeOptions, ColorModeContext } from 'shared/ui';

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(prefersDarkMode);

  const colorMode = useMemo(() => {
    return {
      toggleColorMode: () => {
        setIsDarkMode((prevMode) => !prevMode);
      },
      isDarkMode,
    };
  }, [isDarkMode]);

  const theme = React.useMemo(
    () => createTheme(getThemeOptions(isDarkMode ? 'dark' : 'light')),
    [isDarkMode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
