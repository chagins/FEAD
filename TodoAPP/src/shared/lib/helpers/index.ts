import { themeModeValuePath } from 'shared/config';

export const getThemeModeFromLS = () => {
  const mode = localStorage.getItem(themeModeValuePath);
  return mode;
};

export const setThemeModeToLS = (mode: ThemeMode) => {
  localStorage.setItem(themeModeValuePath, mode);
};
