import React, { useContext } from 'react';
import { ColorModeContext } from 'shared/ui';
import { StyledSwitchTheme } from './SwitchTheme.styled';

export const SwitchTheme = () => {
  const { toggleColorMode, isDarkMode } = useContext(ColorModeContext);

  const onSwitchTheme = () => {
    toggleColorMode();
  };

  return <StyledSwitchTheme onClick={onSwitchTheme} checked={isDarkMode} />;
};
