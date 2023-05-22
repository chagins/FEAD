import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TasksListPage } from 'pages/TasksListPage';
import { TaskDetailsPage } from 'pages/TaskDetailsPage';
import { SignInPage, SignUpPage } from 'pages/auth';
import { HomePage } from 'pages/HomePage';
import { AppLayout } from 'widgets/AppLayout';
import { useAppDispatch, useAppSelector } from 'shared/lib';
import { ProtectedRoute, userModel } from 'entities/user';

export const Routing = () => {
  const user = useAppSelector(userModel.selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userModel.getUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/signIn" element={<SignInPage />} />
        <Route path="/signUp" element={<SignUpPage />} />
        <Route element={<ProtectedRoute isSignIn={user?.isLoggedIn || false} />}>
          <Route path="/tasks" element={<TasksListPage />} />
          <Route path="/tasks/:taskId" element={<TaskDetailsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
