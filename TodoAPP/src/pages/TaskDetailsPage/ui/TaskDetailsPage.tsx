import React from 'react';
import { PageLayout } from 'shared/ui';
import { TaskDetails } from 'widgets/TaskDetails';

export const TaskDetailsPage = () => {
  return (
    <PageLayout title="Tasks details">
      <TaskDetails />
    </PageLayout>
  );
};
