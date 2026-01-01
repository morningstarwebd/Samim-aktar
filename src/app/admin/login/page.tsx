'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Stethoscope } from 'lucide-react';
import { FirebaseError } from 'firebase/app';
import { Spinner } from '@/components/ui/spinner';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export default function LoginPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const toastId = toast.loading('Signing in...');
    try {
      await signIn(auth, values.email, values.password);
      toast.success('Login Successful', {
        id: toastId,
        description: 'Welcome back, Doctor!',
      });
      router.push('/admin');
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            errorMessage = 'Invalid email or password.';
            break;
          default:
            errorMessage = 'Failed to log in. Please try again.';
            break;
        }
      }
      toast.error('Login Failed', {
        id: toastId,
        description: errorMessage,
      });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm border-gray-700 bg-gray-800/60 text-gray-100 shadow-2xl backdrop-blur-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Stethoscope className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="font-sans text-2xl">DocConnect Admin</CardTitle>
          <CardDescription className="text-gray-400">Please sign in to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="doctor@example.com" {...field} className="rounded-xl border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 focus:ring-primary"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} className="rounded-xl border-gray-600 bg-gray-700/50 text-white placeholder:text-gray-400 focus:ring-primary"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full rounded-xl" disabled={isLoading}>
                {isLoading ? <Spinner size="small" /> : 'Sign In'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
