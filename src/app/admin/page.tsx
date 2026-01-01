'use client';

import { useEffect, useState } from 'react';
import AdminHeader from './components/AdminHeader';
import InquiryList from './components/InquiryList';
import { getInquiries } from '@/lib/actions';
import type { Inquiry } from '@/types';
import { Spinner } from '@/components/ui/spinner';

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInquiries() {
      try {
        const fetchedInquiries = await getInquiries();
        setInquiries(fetchedInquiries);
      } catch (error) {
        console.error("Failed to fetch inquiries", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInquiries();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Spinner size="large" />
            </div>
          ) : (
            <InquiryList initialInquiries={inquiries} />
          )}
        </div>
      </main>
    </div>
  );
}
