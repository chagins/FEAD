import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '@mui/material';
import { taskModel } from 'entities/task';
import { useAppDispatch } from 'shared/lib';

type TFilterType = { label: string; config: taskModel.TQueryConfig };

const filterTypes: TFilterType[] = [
  {
    label: 'All',
    config: {},
  },
  {
    label: 'Opened',
    config: { completed: false },
  },
  {
    label: 'Closed',
    config: { completed: true },
  },
];

export const FilterTasks = () => {
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<taskModel.TQueryConfig>(filterTypes[0].config);

  const onFilter = (value: taskModel.TQueryConfig) => {
    if (value !== null) {
      setFilter(value);
      dispatch(taskModel.setQueryConfig(value));
    }
  };

  return (
    <ToggleButtonGroup
      color="secondary"
      value={filter}
      onChange={(_, value) => onFilter(value)}
      exclusive
    >
      {filterTypes.map(({ label, config }) => (
        <ToggleButton key={label} value={config}>
          <Typography>{label}</Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
