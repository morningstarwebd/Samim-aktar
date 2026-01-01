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
import { useToast } from '@/hooks/use-toast';
import { generateContactMessage } from '@/ai/flows/contact-info-suggestion';
import { updateInquiryStatus } from '@/lib/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { Copy, Check } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';

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
  const { toast } = useToast();

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
          toast({
            variant: 'destructive',
            title: 'AI Error',
            description: 'Could not generate a suggested response.',
          });
        } finally {
          setIsLoadingSuggestion(false);
        }
      }
    }
    getSuggestion();
  }, [isOpen, inquiry, toast]);

  const handleMarkAsContacted = async () => {
    setIsUpdatingStatus(true);
    const result = await updateInquiryStatus(inquiry.id, 'contacted');
    setIsUpdatingStatus(false);
    if (result.success) {
      toast({
        title: 'Status Updated',
        description: `${inquiry.name} has been marked as contacted.`,
        className: 'bg-accent text-accent-foreground'
      });
      onStatusChange(inquiry.id, 'contacted');
    } else {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: result.message,
      });
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(suggestedMessage);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };
  
  const handleClose = () => {
    if (!isUpdatingStatus) {
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact {inquiry.name}</DialogTitle>
          <DialogDescription>
            Use the AI-suggested message or write your own. Mark as contacted when done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className='space-y-2'>
                <h4 className="text-sm font-medium">Patient's Message:</h4>
                <p className="text-sm text-muted-foreground p-3 bg-secondary rounded-md">{inquiry.message}</p>
            </div>
            <div className='space-y-2'>
                <h4 className="text-sm font-medium">AI Suggested Response:</h4>
                <div className="relative">
                {isLoadingSuggestion ? (
                    <div className='space-y-2'>
                        <Skeleton className="h-24 w-full" />
                    </div>
                ) : (
                    <>
                        <Textarea value={suggestedMessage} readOnly className="pr-12 min-h-[100px]"/>
                         <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 h-7 w-7"
                            onClick={handleCopyToClipboard}
                        >
                            {hasCopied ? (
                                <Check className="h-4 w-4 text-accent-foreground" />
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
