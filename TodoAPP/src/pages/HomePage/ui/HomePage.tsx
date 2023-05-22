import React from 'react';
import { PageLayout } from 'shared/ui';
import { Typography } from '@mui/material';
import { NavigationList } from 'widgets/NavigationList';

import { StyledPaper } from './HomePage.styled';

export const HomePage = () => {
  return (
    <PageLayout title="Welcome to 📃TodoApp" direction="row">
      <StyledPaper>
        <Typography>
          Feature-Sliced Design (FSD) — это архитектурная методология для проектирования
          frontend-приложений. Проще говоря, это свод правил и соглашений по организации кода.
          Главная цель методологии — сделать проект понятным и структурированным, особенно в
          условиях регулярного изменения требований бизнеса.
        </Typography>
      </StyledPaper>
      <NavigationList />
    </PageLayout>
  );
};
