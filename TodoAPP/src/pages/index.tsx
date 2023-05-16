import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TasksListPage } from 'pages/TasksListPage';
import { TaskDetailsPage } from 'pages/TaskDetailsPage';

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksListPage />} />
      <Route path="/:taskId" element={<TaskDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
