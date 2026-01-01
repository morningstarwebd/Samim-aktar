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
    <header className="sticky top-0 z-10 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          <h1 className="font-headline text-xl font-bold">DocConnect Admin</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
