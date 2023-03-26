import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

type TStyledTaskRowProps = {
  completed: boolean;
};

export const StyledTaskRow = styled(Paper)<TStyledTaskRowProps>(({ theme, completed }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  transition: `${theme.transitions.duration.short}s`,
  textDecoration: completed ? 'line-through' : 'none',
  opacity: completed ? '0.5' : '1',
}));
