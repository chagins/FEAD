import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

export const StyledContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: theme.spacing(4),
}));
