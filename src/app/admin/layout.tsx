'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { Toaster } from 'sonner';

function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
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

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }
  
  if (!user) {
     return (
        <div className="flex h-dvh items-center justify-center bg-gray-900">
            <Spinner size="large" />
        </div>
    );
  }

  return <>{children}</>;
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-gray-900 text-gray-100 antialiased">
        <Toaster richColors theme="dark" />
        <AdminAuthWrapper>{children}</AdminAuthWrapper>
    </div>
  );
}
