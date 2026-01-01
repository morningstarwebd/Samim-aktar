'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Toaster } from 'sonner';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading and no user, redirect to login page,
    // but don't redirect if we are already on the login page.
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);

  if (loading && pathname !== '/admin/login') {
    return (
      <div className="flex h-dvh items-center justify-center bg-gray-900">
        <Spinner size="large" />
      </div>
    );
  }

  // Allow login page to render without authentication
  if (pathname === '/admin/login') {
    return (
        <div className="min-h-dvh bg-gray-900 text-gray-100 antialiased">
            <Toaster richColors theme="dark" />
            {children}
        </div>
    );
  }

  // If user is not logged in, AdminDashboard will be replaced by the redirect.
  // We can show a spinner while that happens.
  if (!user) {
    return (
        <div className="flex h-dvh items-center justify-center bg-gray-900">
            <Spinner size="large" />
        </div>
    );
  }


  return (
    <div className="min-h-dvh bg-gray-900 text-gray-100 antialiased">
        <Toaster richColors theme="dark" />
        {children}
    </div>
  );
}
