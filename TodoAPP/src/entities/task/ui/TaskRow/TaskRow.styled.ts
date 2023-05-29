import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

type TStyledTaskRowProps = {
  isCompleted: boolean;
};

export const StyledPaper = styled(Paper, {
  shouldForwardProp: (propName) => propName !== 'isCompleted',
})<TStyledTaskRowProps>(({ theme, isCompleted }) => ({
  padding: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  textAlign: 'left',
  transition: `${theme.transitions.duration.shortest}ms`,
  textDecoration: isCompleted ? 'line-through' : 'none',
  '& > .titleWrapper': {
    flexGrow: 1,
  },
}));
