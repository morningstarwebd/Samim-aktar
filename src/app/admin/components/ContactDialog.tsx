'use client';

import { useState, useEffect } from 'react';
import type { Inquiry } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { generateContactMessage } from '@/ai/flows/contact-info-suggestion';
import { updateInquiryStatus } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Copy, Check } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';

type ContactDialogProps = {
  inquiry: Inquiry;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onStatusChange: (inquiryId: string, status: 'new' | 'contacted') => void;
};

export default function ContactDialog({
  inquiry,
  isOpen,
  onOpenChange,
  onStatusChange,
}: ContactDialogProps) {
  const [suggestedMessage, setSuggestedMessage] = useState('');
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    async function getSuggestion() {
      if (isOpen && inquiry) {
        setIsLoadingSuggestion(true);
        setSuggestedMessage('');
        try {
          const result = await generateContactMessage({ patientMessage: inquiry.message });
          setSuggestedMessage(result.suggestedMessage);
        } catch (error) {
          console.error('Failed to generate message:', error);
          toast.error('AI Error', {
            description: 'Could not generate a suggested response.',
          });
        } finally {
          setIsLoadingSuggestion(false);
        }
      }
    }
    getSuggestion();
  }, [isOpen, inquiry]);

  const handleMarkAsContacted = async () => {
    setIsUpdatingStatus(true);
    const toastId = toast.loading('Updating status...');
    const result = await updateInquiryStatus(inquiry.id, 'contacted');
    setIsUpdatingStatus(false);
    if (result.success) {
      toast.success('Status Updated', {
        id: toastId,
        description: `${inquiry.name} has been marked as contacted.`,
      });
      onStatusChange(inquiry.id, 'contacted');
    } else {
       toast.error('Update Failed', {
        id: toastId,
        description: result.message,
      });
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(suggestedMessage);
    setHasCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setHasCopied(false), 2000);
  };
  
  const handleClose = () => {
    if (!isUpdatingStatus) {
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="border-gray-700 bg-gray-800 text-gray-100 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact {inquiry.name}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Use the AI-suggested message or write your own. Mark as contacted when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className='space-y-2'>
                <h4 className="text-sm font-medium text-gray-300">Patient's Message:</h4>
                <p className="text-sm text-gray-300 p-3 bg-gray-700/50 rounded-md">{inquiry.message}</p>
            </div>
            <div className='space-y-2'>
                <h4 className="text-sm font-medium text-gray-300">AI Suggested Response:</h4>
                <div className="relative">
                {isLoadingSuggestion ? (
                    <div className='space-y-2'>
                        <Skeleton className="h-24 w-full bg-gray-700" />
                    </div>
                ) : (
                    <>
                        <Textarea value={suggestedMessage} readOnly className="pr-12 min-h-[100px] bg-gray-700/50 border-gray-600 text-gray-200"/>
                         <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 h-7 w-7 text-gray-300 hover:bg-gray-700"
                            onClick={handleCopyToClipboard}
                        >
                            {hasCopied ? (
                                <Check className="h-4 w-4 text-green-400" />
                            ) : (
                                <Copy className="h-4 w-4" />
                            )}
                            <span className="sr-only">Copy</span>
                        </Button>
                    </>
                )}
                </div>
            </div>
        </div>
        <DialogFooter>
          <Button
            onClick={handleMarkAsContacted}
            disabled={isUpdatingStatus}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isUpdatingStatus ? <Spinner size="small"/> : 'Mark as Contacted'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
