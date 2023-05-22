import { styled } from '@mui/material/styles';
import { Paper } from '@mui/material';

export const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: '350px',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1),
}));
