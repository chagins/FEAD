import React from 'react';
import { Outlet } from 'react-router-dom';
import { Alert, AlertTitle } from '@mui/material';
import { PageLayout, StyledRouterLink } from 'shared/ui';
import Button from '@mui/material/Button';

type TProtectedRouteProps = {
  isSignIn: boolean;
};
export const ProtectedRoute = ({ isSignIn }: TProtectedRouteProps) => {
  return isSignIn ? (
    <Outlet />
  ) : (
    <PageLayout title="Info">
      <Alert
        severity="info"
        action={
          <Button color="inherit" size="small">
            <StyledRouterLink to="/signIn">SIGN IN</StyledRouterLink>
          </Button>
        }
      >
        <AlertTitle>You are not signed in</AlertTitle>
        Please click a button!
      </Alert>
    </PageLayout>
  );
};
