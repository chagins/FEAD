import React, { useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from 'shared/lib';
import { taskModel, taskLib } from 'entities/task';
import FormControlLabel from '@mui/material/FormControlLabel';

type TToggleTaskProps = {
  id: number;
  isCompleted: boolean;
  withStatus?: boolean;
};

export const ToggleTask = ({ id, isCompleted, withStatus }: TToggleTaskProps) => {
  const dispatch = useAppDispatch();

  const onToggle = useCallback(() => {
    dispatch(taskModel.toggleTaskMutation(id));
  }, [dispatch, id]);

  const checkbox = <Checkbox onClick={onToggle} checked={isCompleted} />;
  const checkboxWithStatus = (
    <FormControlLabel control={checkbox} label={taskLib.getTaskStatus(isCompleted)} />
  );

  return withStatus ? checkboxWithStatus : checkbox;
};
