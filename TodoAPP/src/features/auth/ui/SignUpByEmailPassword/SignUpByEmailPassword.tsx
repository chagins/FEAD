import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Grid, TextField, Collapse, Alert } from '@mui/material';
import { userModel } from 'entities/user';
import { isValidField, getInvalidMessage } from 'features/auth/lib';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { StyledRouterLink } from 'shared/ui';
import { taskModel } from 'entities/task';

import { StyledBox, StyledSubmit } from './SignInByEmailPassword.styled';

export const SignUpByEmailPassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(userModel.selectUserStatus);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isSignUpError, setIsSignUpError] = useState(false);
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
      dispatch(userModel.signUpUserByEmailPassword({ email, password }))
        .unwrap()
        .then(() => {
          dispatch(taskModel.clearState());
          setIsSignUpError(false);
          return navigate('/signIn');
        })
        .catch((err) => {
          setErrorMsg(err);
          setIsSignUpError(true);
        });
    }
  };

  return (
    <StyledBox>
      <Collapse in={isSignUpError}>
        <Alert severity="error">{errorMsg}</Alert>
      </Collapse>
      <Box component="form" onSubmit={onSubmit} noValidate>
        <TextField
          margin="normal"
          fullWidth
          id="nickname"
          label="nickname"
          name="nickname"
          disabled
        />
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
        <StyledSubmit type="submit" fullWidth variant="contained" disabled={isLoading}>
          Submit
        </StyledSubmit>
        <Grid container>
          <Grid item>
            <StyledRouterLink to="/signIn">`Do you have an account? Sign In</StyledRouterLink>
          </Grid>
        </Grid>
      </Box>
    </StyledBox>
  );
};
