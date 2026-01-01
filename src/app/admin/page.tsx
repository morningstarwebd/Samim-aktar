'use client';

import { useEffect, useState } from 'react';
import AdminHeader from './components/AdminHeader';
import InquiryList from './components/InquiryList';
import { getInquiries } from '@/lib/actions';
import type { Inquiry } from '@/types';
import { Spinner } from '@/components/ui/spinner';
import StatsCard from './components/StatsCard';
import { Users, Clock } from 'lucide-react';

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

  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;
  const contactedInquiriesCount = inquiries.filter(i => i.status === 'contacted').length;

  return (
    <div className="flex min-h-dvh flex-col">
      <AdminHeader />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <Spinner size="large" />
            </div>
          ) : (
            <div className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <StatsCard title="Total Inquiries" value={inquiries.length} icon={Users} />
                  <StatsCard title="New Inquiries" value={newInquiriesCount} icon={Users} variant="secondary" />
                  <StatsCard title="Contacted" value={contactedInquiriesCount} icon={Clock} variant="accent" />
              </div>
              <InquiryList initialInquiries={inquiries} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
