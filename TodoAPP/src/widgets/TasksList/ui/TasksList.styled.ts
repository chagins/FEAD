import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledTaskList = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));
