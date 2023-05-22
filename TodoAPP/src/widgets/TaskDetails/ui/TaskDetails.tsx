import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { taskModel, TaskCard } from 'entities/task';
import Alert from '@mui/material/Alert';
import { AlertTitle } from '@mui/material';
import { ToggleTask } from 'features/ToggleTask';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledRouterLink } from 'shared/ui';

import { StyledBox } from './TaskDetails.styled';

export const TaskDetails = () => {
  const { taskId } = useParams();
  const task = useAppSelector((state) => taskModel.selectTaskById(state, Number(taskId)));
  const dispatch = useAppDispatch();

  const [tasksStatus, tasksError] = useAppSelector((state) => [
    state.tasks.status,
    state.tasks.error,
  ]);

  if (!task && tasksStatus !== 'rejected') {
    dispatch(taskModel.fetchTaskByIdQuery(Number(taskId)));
  }

  return (
    <StyledBox>
      {tasksStatus === 'pending' && <CircularProgress className="progress" />}
      {((!task && tasksStatus !== 'pending') || tasksStatus === 'rejected') && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {tasksError}
        </Alert>
      )}
      {task && (
        <TaskCard
          data={task}
          titleAction={<StyledRouterLink to="/tasks">Back to list</StyledRouterLink>}
          cardAction={<ToggleTask id={task.id} isCompleted={task.completed} withStatus />}
        />
      )}
    </StyledBox>
  );
};
