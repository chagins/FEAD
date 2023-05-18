import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { amber, deepOrange } from '@mui/material/colors';

type TStyledTaskRowProps = {
  isCompleted: boolean;
};

export const StyledTaskRow = styled(Paper, {
  shouldForwardProp: (propName) => propName !== 'isCompleted',
})<TStyledTaskRowProps>(({ theme, isCompleted }) => ({
  padding: theme.spacing(1),
  textAlign: 'left',
  transition: `${theme.transitions.duration.shortest}ms`,
  '& > a, & > a:visited': {
    color: theme.palette.mode === 'dark' ? deepOrange[600] : amber[900],
  },
  textDecoration: isCompleted ? 'line-through' : 'none',
}));
