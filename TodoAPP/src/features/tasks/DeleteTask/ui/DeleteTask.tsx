import React, { useCallback } from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { taskModel } from 'entities/task';
import { useAppDispatch } from 'shared/lib';
import { useNavigate } from 'react-router-dom';

type TDeleteTaskProps = {
  id: number;
  redirectHref?: string;
};

export const DeleteTask = ({ id, redirectHref }: TDeleteTaskProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onClick = useCallback(() => {
    dispatch(taskModel.deleteTaskMutation(id));
    if (redirectHref) {
      navigate(redirectHref);
    }
  }, [dispatch, id, navigate, redirectHref]);

  return (
    <IconButton size="medium" onClick={onClick}>
      <DeleteIcon fontSize="medium" />
    </IconButton>
  );
};
