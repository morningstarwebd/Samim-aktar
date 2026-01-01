'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Stethoscope } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminHeader() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  return (
    <header className="sticky top-0 z-10 w-full border-b border-gray-700 bg-gray-800/60 shadow-lg backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-3">
          <Stethoscope className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold">DocConnect Admin</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut} className="rounded-xl hover:bg-gray-700">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
