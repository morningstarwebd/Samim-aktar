import type { Inquiry } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Phone, Mail, Trash2, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


type InquiryCardProps = {
  inquiry: Inquiry;
  onContact: () => void;
  onDelete: (id: string) => void;
};

export default function InquiryCard({ inquiry, onContact, onDelete }: InquiryCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
            <div>
                <CardTitle>{inquiry.name}</CardTitle>
                <CardDescription className="pt-1">{inquiry.phone}</CardDescription>
            </div>
             <Badge variant={inquiry.status === 'contacted' ? 'default' : 'secondary'} className={inquiry.status === 'contacted' ? 'bg-accent text-accent-foreground' : ''}>
                {inquiry.status}
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Preferred: {format(new Date(inquiry.date), 'PPP')}</span>
        </div>
        <p className="text-sm border-l-2 border-primary pl-3">{inquiry.message}</p>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href={`tel:${inquiry.phone}`}>
            <Phone className="mr-2 h-4 w-4" />
            Call
          </a>
        </Button>
        <Button size="sm" onClick={onContact} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Mail className="mr-2 h-4 w-4" />
          Contact
        </Button>
         <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this inquiry.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(inquiry.id)} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
