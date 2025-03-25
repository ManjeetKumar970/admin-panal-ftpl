'use client';
import React from 'react';
import Login from '@/page/login/Login';
import AuthGuard from '@/components/Auth/AuthGuard';

const Page = () => {
  return (
    <>
      <AuthGuard>
        <Login />
      </AuthGuard>
    </>
  );
};

export default Page;
