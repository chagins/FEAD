import React from 'react';
import { Typography, Stack } from '@mui/material';
import type { ResponsiveStyleValue } from '@mui/system';

import { StyledContainer } from './PageLayout.styled';

type TPageLayoutProps = {
  children: React.ReactNode;
  title?: string;
  direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
};

export const PageLayout = ({ title, children, direction = 'column' }: TPageLayoutProps) => {
  return (
    <StyledContainer maxWidth="md">
      <Typography p={2} variant="h1" align="center">
        {title}
      </Typography>
      <Stack p={2} gap={2} justifyContent="center" direction={direction}>
        {children}
      </Stack>
    </StyledContainer>
  );
};
