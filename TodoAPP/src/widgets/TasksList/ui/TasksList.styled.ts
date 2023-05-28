import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: theme.spacing(1),
  '& > .tasksStack': {
    padding: theme.spacing(1),
    height: 'calc(100vh - 400px)',
    width: '100%',
    overflowX: 'auto',
    gap: theme.spacing(1),
  },
}));
