import { Suspense } from 'react';
import LoginForm from './LoginForm';

export const metadata = { title: 'Admin Login' };

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
