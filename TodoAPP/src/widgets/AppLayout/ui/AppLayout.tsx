import React from 'react';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Outlet } from 'react-router-dom';
import Link from '@mui/material/Link';
import { SwitchTheme } from 'features/SwitchTheme';
import { lightBlue } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { StyledRouterLink } from 'shared/ui';
import { SignOut } from 'features/auth';

export const AppLayout = () => {
  return (
    <>
      <header>
        <AppBar position="static" variant="elevation" enableColorOnDark>
          <Toolbar>
            <IconButton color="default" size="large">
              <StyledRouterLink to="/">
                <HomeOutlinedIcon fontSize="large" color="inherit" />
              </StyledRouterLink>
            </IconButton>
            <Typography fontSize={24} fontWeight="bold" component="div" sx={{ flexGrow: 1 }}>
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
            <SignOut />
          </Toolbar>
        </AppBar>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
