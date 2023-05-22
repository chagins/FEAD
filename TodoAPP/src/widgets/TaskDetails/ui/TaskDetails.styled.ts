import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  '& > .progress': {
    display: 'block',
    margin: '0 auto',
  },
}));
