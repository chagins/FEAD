import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { amber, deepOrange } from '@mui/material/colors';

export const StyledRouterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? deepOrange[600] : amber[900],
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));
