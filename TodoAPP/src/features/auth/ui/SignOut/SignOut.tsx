import React, { useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { taskModel } from 'entities/task';
import { userModel } from 'entities/user';
import { useNavigate } from 'react-router-dom';

const stateTypes = [
  {
    label: 'Sign Out',
    href: '/',
  },
  {
    label: 'Sign In',
    href: '/signIn',
  },
];

export const SignOut = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userModel.selectUser);
  const navigate = useNavigate();
  const [state, setState] = useState<(typeof stateTypes)[number]>(stateTypes[0]);

  useEffect(() => {
    if (user && user.isLoggedIn) {
      setState(stateTypes[0]);
    } else {
      setState(stateTypes[1]);
    }
  }, [user]);

  const onClick = useCallback(() => {
    dispatch(taskModel.clearState());
    dispatch(userModel.signOutUser());
    navigate(state.href);
  }, [dispatch, navigate, state]);

  return (
    <Button id="basic-button" variant="outlined" onClick={onClick} color="inherit">
      {state.label}
    </Button>
  );
};
