import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: theme.spacing(1),
  '& > .tasksStack': {
    paddingRight: theme.spacing(1),
    height: 'calc(100vh - 200px)',
    width: '100%',
    overflowX: 'auto',
    gap: theme.spacing(1),
  },
}));
