import React, { FormEvent, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { userModel } from 'entities/user';
import { taskModel } from 'entities/task';

export const AddTask = () => {
  const user = useAppSelector(userModel.selectUser);
  const dispatch = useAppDispatch();

  const [isTaskError, setIsTaskError] = useState(false);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const task = data.get('task')?.toString() || '';
      const isTaskValid = task.length > 0;
      setIsTaskError(!isTaskValid);
      if (user && user.isLoggedIn && isTaskValid) {
        dispatch(taskModel.addTaskMutation({ title: task, userId: user.id }));
      }
    },
    [dispatch, user]
  );

  return (
    <Box component="form" onSubmit={onSubmit} noValidate pb={2} width="75%">
      <TextField
        margin="normal"
        required
        fullWidth
        id="task"
        label="Add task"
        name="task"
        autoFocus
        error={isTaskError}
        helperText={isTaskError && 'Task must be at least 1 symbol'}
      />
      <Button type="submit" fullWidth variant="contained" disabled={false}>
        Submit
      </Button>
    </Box>
  );
};
