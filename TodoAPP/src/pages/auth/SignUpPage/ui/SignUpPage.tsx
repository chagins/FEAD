import React from 'react';
import { PageLayout } from 'shared/ui';
import { SignUpByEmailPassword } from 'features/auth';

export const SignUpPage = () => {
  return (
    <PageLayout title="Sign Up">
      <SignUpByEmailPassword />
    </PageLayout>
  );
};
