import React from 'react';
import { Routing } from 'pages';
import { withProviders } from './providers';
import './index.scss';

const App = () => {
  return <Routing />;
};

export default withProviders(App);
