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
  transition: `${theme.transitions.duration.short}s`,
  textDecoration: isCompleted ? 'line-through' : 'none',
  '& > a, & > a:visited': {
    color: theme.palette.primary.main,
  },
}));
