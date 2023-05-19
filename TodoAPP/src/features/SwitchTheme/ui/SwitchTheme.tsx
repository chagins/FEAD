import React, { useContext } from 'react';
import { ThemeModeContext } from 'shared/ui';
import { StyledSwitchTheme } from './SwitchTheme.styled';

export const SwitchTheme = () => {
  const { toggleColorMode, mode } = useContext(ThemeModeContext);

  const onSwitchTheme = () => {
    toggleColorMode();
  };

  return <StyledSwitchTheme onClick={onSwitchTheme} checked={mode === 'dark'} />;
};
