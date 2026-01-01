'use server';

import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import type { Inquiry, InquiryData } from '@/types';
import { revalidatePath } from 'next/cache';

const inquiriesCollection = collection(db, 'inquiries');

// Add a new inquiry
export async function addInquiry(data: InquiryData) {
  try {
    await addDoc(inquiriesCollection, {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
    });
    return { success: true, message: 'Inquiry submitted successfully.' };
  } catch (error) {
    console.error('Error adding inquiry:', error);
    return { success: false, message: 'Failed to submit inquiry.' };
  }
}

// Get all inquiries
export async function getInquiries(): Promise<Inquiry[]> {
  try {
    const q = query(inquiriesCollection, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Inquiry));
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return [];
  }
}

// Update inquiry status
export async function updateInquiryStatus(id: string, status: 'new' | 'contacted') {
  try {
    const inquiryDoc = doc(db, 'inquiries', id);
    await updateDoc(inquiryDoc, { status });
    revalidatePath('/admin');
    return { success: true, message: 'Inquiry status updated.' };
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    return { success: false, message: 'Failed to update status.' };
  }
}

// Delete an inquiry
export async function deleteInquiry(id: string) {
  try {
    const inquiryDoc = doc(db, 'inquiries', id);
    await deleteDoc(inquiryDoc);
    revalidatePath('/admin');
    return { success: true, message: 'Inquiry deleted.' };
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return { success: false, message: 'Failed to delete inquiry.' };
  }
}
