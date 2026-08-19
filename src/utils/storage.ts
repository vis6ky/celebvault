import { InquiryFormData } from '../types';

const FAVORITES_KEY = 'celeb_vault_favorites';
const INQUIRIES_KEY = 'celeb_vault_inquiries';

export function getStoredFavorites(): string[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleStoredFavorite(celebrityId: string): string[] {
  const current = getStoredFavorites();
  const exists = current.includes(celebrityId);
  const updated = exists
    ? current.filter((id) => id !== celebrityId)
    : [...current, celebrityId];
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to update favorites', err);
  }
  return updated;
}

export function getStoredInquiries(): InquiryFormData[] {
  try {
    const data = localStorage.getItem(INQUIRIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveStoredInquiry(inquiry: Omit<InquiryFormData, 'id' | 'submittedAt' | 'referenceCode' | 'status'>): InquiryFormData {
  const list = getStoredInquiries();
  const newInquiry: InquiryFormData = {
    ...inquiry,
    id: 'inq-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
    submittedAt: new Date().toLocaleString(),
    status: 'Pending Review',
    referenceCode: `BOOK-${inquiry.celebrityId.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
  };
  const updated = [newInquiry, ...list];
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save inquiry', err);
  }
  return newInquiry;
}
