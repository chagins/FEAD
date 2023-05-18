import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import Link from '@mui/material/Link';
import { SwitchTheme } from 'features/SwitchTheme';
import { lightBlue } from '@mui/material/colors';

export const MainLayout = () => {
  return (
    <>
      <header>
        <AppBar position="static" variant="elevation" enableColorOnDark>
          <Toolbar>
            <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
              TODO APP with 🍰
              <Link
                color={lightBlue[600]}
                underline="hover"
                href="https://feature-sliced.design/ru/"
              >
                Feature-Sliced Design
              </Link>
            </Typography>

            <SwitchTheme />
          </Toolbar>
        </AppBar>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
