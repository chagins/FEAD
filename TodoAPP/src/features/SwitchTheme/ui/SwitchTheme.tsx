import React, { useContext } from 'react';
import { ColorModeContext } from 'shared/ui';
import { StyledSwitchTheme } from './SwitchTheme.styled';

export const SwitchTheme = () => {
  const { toggleColorMode, mode } = useContext(ColorModeContext);

  const onSwitchTheme = () => {
    toggleColorMode();
  };

  return <StyledSwitchTheme onClick={onSwitchTheme} checked={mode === 'dark'} />;
};
