'use client';

import { useState } from 'react';
import type { Inquiry } from '@/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Phone, Trash2, Mail, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import ContactDialog from './ContactDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteInquiry } from '@/lib/actions';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

export default function InquiryList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isContactDialogOpen, setContactDialogOpen] = useState(false);

  const handleOpenContactDialog = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setContactDialogOpen(true);
  };

  const onStatusChange = (inquiryId: string, status: 'new' | 'contacted') => {
    setInquiries(prev => prev.map(inq => inq.id === inquiryId ? {...inq, status} : inq));
    setContactDialogOpen(false);
  }

  const handleDelete = async (id: string) => {
    const toastId = toast.loading('Deleting inquiry...');
    const result = await deleteInquiry(id);
    if(result.success) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
        toast.success('Inquiry deleted', { id: toastId });
    } else {
        toast.error('Failed to delete', { id: toastId, description: result.message });
    }
  }

  if (inquiries.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-700 bg-gray-800/50 py-16 text-center">
            <h3 className="text-xl font-semibold">No Inquiries Yet</h3>
            <p className="mt-2 text-gray-400">New patient inquiries will appear here.</p>
        </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Inquiry Feed</h2>
        <div className="rounded-2xl border border-gray-700 bg-gray-800/60 shadow-lg backdrop-blur-md">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Patient</TableHead>
                <TableHead className="text-gray-300">Phone</TableHead>
                <TableHead className="text-gray-300">Preferred Date</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-right text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id} className="border-gray-700">
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell className="text-gray-300">{inquiry.phone}</TableCell>
                  <TableCell className="text-gray-300">{format(new Date(inquiry.date), 'PPP')}</TableCell>
                  <TableCell>
                    <Badge variant={inquiry.status === 'contacted' ? 'accent' : 'secondary'}>
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-700">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-gray-700 bg-gray-800 text-gray-100">
                         <DropdownMenuItem onSelect={() => handleOpenContactDialog(inquiry)} className="focus:bg-gray-700">
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Contact Patient</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="focus:bg-gray-700">
                           <a href={`tel:${inquiry.phone}`} className="flex items-center">
                              <Phone className="mr-2 h-4 w-4" />
                              <span>Call Now</span>
                           </a>
                        </DropdownMenuItem>
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-red-400 focus:bg-red-900/50 focus:text-red-300">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="border-gray-700 bg-gray-800 text-gray-100">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                This action cannot be undone. This will permanently delete the inquiry from {inquiry.name}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-gray-600 bg-transparent hover:bg-gray-700">Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(inquiry.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {selectedInquiry && (
        <ContactDialog
          inquiry={selectedInquiry}
          isOpen={isContactDialogOpen}
          onOpenChange={setContactDialogOpen}
          onStatusChange={onStatusChange}
        />
      )}
    </>
  );
}
