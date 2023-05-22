import React from 'react';
import { PageLayout } from 'shared/ui';
import { SignInByEmailPassword } from 'features/auth';

export const SignInPage = () => {
  return (
    <PageLayout title="Sign In">
      <SignInByEmailPassword />
    </PageLayout>
  );
};
