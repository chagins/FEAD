import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';

export const StyledCard = styled(Card)(() => ({
  '& > .cardActions': {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
