import { MongoDBRealmError } from 'realm-web';
import { themeModeValuePath } from 'shared/config';

export const getThemeModeFromLS = () => {
  const mode = localStorage.getItem(themeModeValuePath);
  return mode;
};

export const setThemeModeToLS = (mode: ThemeMode) => {
  localStorage.setItem(themeModeValuePath, mode);
};

export const makeMessageError = (prefixMsg: string, error: unknown) => {
  let messageError = prefixMsg;
  if (error instanceof MongoDBRealmError) {
    messageError = `${messageError}: ${error.error}`;
  } else if (error instanceof Error) {
    messageError = `${messageError}: ${error.message}`;
  }
  return messageError;
};
