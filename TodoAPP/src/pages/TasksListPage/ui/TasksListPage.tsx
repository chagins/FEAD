import React from 'react';
import { PageLayout } from 'shared/ui';
import { TasksList } from 'widgets/TasksList';

export const TasksListPage = () => {
  return (
    <PageLayout title="Tasks list">
      <TasksList />
    </PageLayout>
  );
};
