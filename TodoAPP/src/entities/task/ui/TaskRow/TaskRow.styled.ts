import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

type TStyledTaskRowProps = {
  isCompleted: boolean;
};

export const StyledTaskRow = styled(Paper, {
  shouldForwardProp: (propName) => propName !== 'isCompleted',
})<TStyledTaskRowProps>(({ theme, isCompleted }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  transition: `${theme.transitions.duration.short}s`,
  textDecoration: isCompleted ? 'line-through' : 'none',
  opacity: isCompleted ? '0.5' : '1',
}));
