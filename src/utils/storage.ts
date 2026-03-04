import type { Destination } from '@/data/destinations';

export interface Booking {
  id: string;
  destinationId: string;
  destination: Destination;
  userName: string;
  userEmail: string;
  userPhone: string;
  numberOfPeople: number;
  bookingDate: string;
  travelDate: string;
  paymentMethod: 'esewa' | 'khalti' | 'cash';
  amount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  paymentDetails?: {
    transactionId: string;
    paidAt: string;
  };
}

const BOOKINGS_KEY = 'nepal_tourism_bookings';

export function getBookings(): Booking[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(BOOKINGS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveBooking(booking: Booking): void {
  if (typeof window === 'undefined') return;
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

export function updateBookingStatus(bookingId: string, status: Booking['status']): void {
  if (typeof window === 'undefined') return;
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === bookingId);
  if (index !== -1) {
    bookings[index].status = status;
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }
}

export function deleteBooking(bookingId: string): void {
  if (typeof window === 'undefined') return;
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== bookingId);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filtered));
}

export function generateBookingId(): string {
  return 'BK' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
}

export function generateTransactionId(): string {
  return 'TXN' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 6).toUpperCase();
}
