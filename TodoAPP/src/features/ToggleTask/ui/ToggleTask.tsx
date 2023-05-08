import React, { useCallback } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch } from 'shared/model';
import { taskModel } from 'entities/task';

type TToggleTaskProps = {
  id: number;
  isCompleted: boolean;
};

export const ToggleTask = ({ id, isCompleted }: TToggleTaskProps) => {
  const dispatch = useAppDispatch();

  const onToggle = useCallback(() => {
    dispatch(taskModel.toggleTask(id));
  }, [dispatch, id]);

  return <Checkbox onClick={onToggle} checked={isCompleted} />;
};
