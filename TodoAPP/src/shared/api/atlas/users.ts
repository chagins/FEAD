import * as realm from 'realm-web';
import { atlasApiInstance } from './base';

export type TRegisterUserEmailPasswordParams = {
  email: string;
  password: string;
};

export const getCurrentUser = () => {
  return atlasApiInstance.currentUser;
};

export const signUpByEmailPassword = (params: TRegisterUserEmailPasswordParams) => {
  return atlasApiInstance.emailPasswordAuth.registerUser(params);
};

export const signInByEmailPassword = ({ email, password }: TRegisterUserEmailPasswordParams) => {
  const credentials = realm.Credentials.emailPassword(email, password);
  return atlasApiInstance.logIn(credentials);
};

export const signOut = () => {
  atlasApiInstance.storage.clear();
  return atlasApiInstance.currentUser?.logOut();
};
