import React, { useContext } from 'react';
import { ThemeModeContext } from 'shared/ui';

import { StyledSwitch } from './SwitchTheme.styled';

export const SwitchTheme = () => {
  const { toggleColorMode, mode } = useContext(ThemeModeContext);

  const onSwitchTheme = () => {
    toggleColorMode();
  };

  return <StyledSwitch onClick={onSwitchTheme} checked={mode === 'dark'} />;
};
