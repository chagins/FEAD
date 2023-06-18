import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';

export const withStore = (Component: FC) => (
  <Provider store={store}>
    <Component />
  </Provider>
);
