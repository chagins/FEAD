import React, { FormEvent, useState } from 'react';
import { Alert, Box, Checkbox, Collapse, FormControlLabel, Grid, TextField } from '@mui/material';
import { StyledRouterLink } from 'shared/ui';
import { isValidField, getInvalidMessage } from 'features/auth/lib';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { userModel } from 'entities/user';
import { taskModel } from 'entities/task';

import { StyledBox, StyledSubmit } from './SignInByEmailPassword.styled';

export const SignInByEmailPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(userModel.selectUserStatus);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isSignInError, setIsSignInError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const email = data.get('email')?.toString() || '';
    const isValidEmail = isValidField('email', email);
    setIsEmailError(!isValidEmail);

    const password = data.get('password')?.toString() || '';
    const isValidPassword = isValidField('password', password);
    setIsPasswordError(!isValidPassword);

    if (isValidEmail && isValidPassword) {
      dispatch(userModel.signInUserByEmailPassword({ email, password }))
        .unwrap()
        .then(() => {
          dispatch(taskModel.clearState());
          setIsSignInError(false);
          return navigate('/tasks');
        })
        .catch((err) => {
          setErrorMsg(err);
          setIsSignInError(true);
        });
    }
  };

  return (
    <StyledBox>
      <Collapse in={isSignInError}>
        <Alert severity="error">{errorMsg}</Alert>
      </Collapse>
      <Box component="form" onSubmit={onSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          error={isEmailError}
          helperText={isEmailError && getInvalidMessage('email')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={isPasswordError}
          helperText={isPasswordError && getInvalidMessage('password')}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          disabled
        />
        <StyledSubmit type="submit" fullWidth variant="contained" disabled={isLoading}>
          Submit
        </StyledSubmit>
        <Grid container>
          <Grid item xs>
            <StyledRouterLink to="/">Forgot password?</StyledRouterLink>
          </Grid>
          <Grid item>
            <StyledRouterLink to="/signUp">{`Don't have an account? Sign Up`}</StyledRouterLink>
          </Grid>
        </Grid>
      </Box>
    </StyledBox>
  );
};
