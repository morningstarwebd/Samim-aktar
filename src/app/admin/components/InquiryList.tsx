'use client';

import { useState } from 'react';
import type { Inquiry } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Phone, Trash2, Mail, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import InquiryCard from './InquiryCard';
import ContactDialog from './ContactDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteInquiry } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


export default function InquiryList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isContactDialogOpen, setContactDialogOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const handleOpenContactDialog = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setContactDialogOpen(true);
  };

  const onStatusChange = (inquiryId: string, status: 'new' | 'contacted') => {
    setInquiries(prev => prev.map(inq => inq.id === inquiryId ? {...inq, status} : inq));
    setContactDialogOpen(false);
  }

  const handleDelete = async (id: string) => {
    const result = await deleteInquiry(id);
    if(result.success) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
        toast({ title: 'Success', description: 'Inquiry deleted successfully.' });
    } else {
        toast({ variant: 'destructive', title: 'Error', description: result.message });
    }
  }

  if (inquiries.length === 0) {
    return (
        <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No Inquiries Yet</h3>
            <p className="text-muted-foreground mt-2">New patient inquiries will appear here.</p>
        </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">Patient Inquiries ({inquiries.length})</h2>
        {isMobile ? (
          <div className="grid grid-cols-1 gap-4">
            {inquiries.map((inquiry) => (
              <InquiryCard key={inquiry.id} inquiry={inquiry} onContact={() => handleOpenContactDialog(inquiry)} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <Table className="bg-background rounded-lg shadow-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Preferred Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.map((inquiry) => (
                <TableRow key={inquiry.id}>
                  <TableCell className="font-medium">{inquiry.name}</TableCell>
                  <TableCell>{inquiry.phone}</TableCell>
                  <TableCell>{format(new Date(inquiry.date), 'PPP')}</TableCell>
                  <TableCell>
                    <Badge variant={inquiry.status === 'contacted' ? 'default' : 'secondary'} className={inquiry.status === 'contacted' ? 'bg-accent text-accent-foreground' : ''}>
                      {inquiry.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">More actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                         <DropdownMenuItem onSelect={() => handleOpenContactDialog(inquiry)}>
                            <Mail className="mr-2 h-4 w-4" />
                            <span>Contact Patient</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                           <a href={`tel:${inquiry.phone}`} className="flex items-center">
                              <Phone className="mr-2 h-4 w-4" />
                              <span>Call Now</span>
                           </a>
                        </DropdownMenuItem>
                         <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the inquiry from {inquiry.name}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(inquiry.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
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
        )}
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
