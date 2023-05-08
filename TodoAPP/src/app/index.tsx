import React from 'react';
import { Routing } from 'pages';
import CssBaseline from '@mui/material/CssBaseline';
import { withProviders } from './providers';
import './index.scss';

const App = () => {
  return (
    <div className="App">
      <CssBaseline />
      <Routing />
    </div>
  );
};

export default withProviders(App);
