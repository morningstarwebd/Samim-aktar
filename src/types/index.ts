import type { Timestamp } from 'firebase/firestore';

export type Inquiry = {
  id: string;
  name: string;
  phone: string;
  message: string;
  date: string;
  status: 'new' | 'contacted';
  createdAt: Timestamp;
};

export type InquiryData = Omit<Inquiry, 'id' | 'createdAt'>;
