import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

type TStyledTaskRowProps = {
  isCompleted: boolean;
};

export const StyledTaskRow = styled(Paper, {
  shouldForwardProp: (propName) => propName !== 'isCompleted',
})<TStyledTaskRowProps>(({ theme, isCompleted }) => ({
  padding: theme.spacing(1),
  textAlign: 'left',
  transition: `${theme.transitions.duration.shortest}ms`,
  textDecoration: isCompleted ? 'line-through' : 'none',
}));
