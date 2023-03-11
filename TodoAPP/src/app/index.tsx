import React from 'react';
import { withProviders } from './providers';
import './index.scss';

const App = () => {
  return <div className="App">hello react</div>;
};

export default withProviders(App);
