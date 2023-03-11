import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const TestPage = lazy(() =>
  import('pages/test-page').then(({ TestPage: lazyTestPage }) => ({ default: lazyTestPage }))
);

const NotFoundPage = lazy(() =>
  import('pages/not-found-page').then(({ NotFoundPage: lazyNotFoundPage }) => ({
    default: lazyNotFoundPage,
  }))
);

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
