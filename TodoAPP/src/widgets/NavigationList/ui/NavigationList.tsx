import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import { Person, PersonAdd, List as IconList, Code, InfoOutlined } from '@mui/icons-material';
import { StyledRouterLink } from 'shared/ui';

const navigationListItems = [
  {
    title: 'Sign In',
    href: '/signIn',
    icon: Person,
  },
  {
    title: 'Sign Up',
    href: '/signUp',
    icon: PersonAdd,
  },
  {
    title: 'Tasks List',
    href: '/tasks',
    icon: IconList,
  },
  {
    title: 'Source Code',
    href: 'https://github.com/chagins/FEAD/tree/TodoAPP',
    icon: Code,
  },
  {
    title: 'Feature-Sliced Design',
    href: 'https://feature-sliced.design/',
    icon: InfoOutlined,
  },
];

export const NavigationList = () => {
  return (
    <Box>
      <nav aria-label="main mailbox folders">
        <List>
          {navigationListItems.map(({ title, icon: Icon, href }) => (
            <ListItem key={href} disablePadding>
              <StyledRouterLink to={href}>
                <ListItemButton>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={title} />
                </ListItemButton>
              </StyledRouterLink>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
};
