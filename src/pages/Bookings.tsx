import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle,
  ArrowRight,
  Download,
  Trash2,
  Eye,
  Compass,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getBookings, deleteBooking, type Booking } from '@/utils/storage';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const loaded = getBookings();
    // Sort by date, newest first
    loaded.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setBookings(loaded);
  };

  const handleDelete = (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      deleteBooking(bookingId);
      loadBookings();
      toast.success('Booking cancelled successfully');
    }
  };

  const downloadReceipt = (booking: Booking) => {
    const receiptData = `
BOOKING RECEIPT
===============

Booking ID: ${booking.id}
Transaction ID: ${booking.paymentDetails?.transactionId || 'N/A'}
Date: ${new Date(booking.createdAt).toLocaleDateString()}

DESTINATION
-----------
Name: ${booking.destination.name}
Location: ${booking.destination.location}
Duration: ${booking.destination.duration}

CUSTOMER DETAILS
----------------
Name: ${booking.userName}
Email: ${booking.userEmail}
Phone: ${booking.userPhone}

BOOKING DETAILS
---------------
Travel Date: ${new Date(booking.travelDate).toLocaleDateString()}
Number of People: ${booking.numberOfPeople}
Payment Method: ${booking.paymentMethod.toUpperCase()}
Status: ${booking.status.toUpperCase()}

PAYMENT
-------
Amount per person: NPR ${booking.destination.price.toLocaleString()}
Total Amount: NPR ${booking.amount.toLocaleString()}

Thank you for booking with Nepal Tourism!
    `;
    
    const blob = new Blob([receiptData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${booking.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-green-500 text-white">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500 text-white">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 text-white">Cancelled</Badge>;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#ff7f50]/10 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-[#ff7f50]">Bookings</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              View and manage all your upcoming adventures
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bookings List */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-48 h-48 lg:h-auto relative">
                      <img
                        src={booking.destination.images[0]}
                        alt={booking.destination.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold mb-2">{booking.destination.name}</h3>
                          <div className="flex items-center gap-2 text-gray-500 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{booking.destination.location}</span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-[#ff7f50]" />
                              <div>
                                <p className="text-xs text-gray-500">Travel Date</p>
                                <p className="font-medium text-sm">
                                  {new Date(booking.travelDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-[#ff7f50]" />
                              <div>
                                <p className="text-xs text-gray-500">People</p>
                                <p className="font-medium text-sm">{booking.numberOfPeople}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-4 h-4 text-[#ff7f50]" />
                              <div>
                                <p className="text-xs text-gray-500">Payment</p>
                                <p className="font-medium text-sm uppercase">{booking.paymentMethod}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Package className="w-4 h-4 text-[#ff7f50]" />
                              <div>
                                <p className="text-xs text-gray-500">Booking ID</p>
                                <p className="font-medium text-sm">{booking.id}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#ff7f50]">
                            NPR {booking.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Booked on {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Booking Details</DialogTitle>
                              <DialogDescription>
                                Complete information about your booking
                              </DialogDescription>
                            </DialogHeader>
                            {selectedBooking && (
                              <div className="space-y-6">
                                <div className="flex gap-4">
                                  <img
                                    src={selectedBooking.destination.images[0]}
                                    alt={selectedBooking.destination.name}
                                    className="w-32 h-32 rounded-xl object-cover"
                                  />
                                  <div>
                                    <h3 className="text-xl font-bold">{selectedBooking.destination.name}</h3>
                                    <p className="text-gray-500">{selectedBooking.destination.location}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      {getStatusIcon(selectedBooking.status)}
                                      <span className="capitalize">{selectedBooking.status}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                    <p className="text-sm text-gray-500">Booking ID</p>
                                    <p className="font-bold">{selectedBooking.id}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                    <p className="text-sm text-gray-500">Transaction ID</p>
                                    <p className="font-bold">{selectedBooking.paymentDetails?.transactionId || 'N/A'}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                    <p className="text-sm text-gray-500">Customer Name</p>
                                    <p className="font-bold">{selectedBooking.userName}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-bold">{selectedBooking.userEmail}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                    <p className="text-sm text-gray-500">Phone</p>
                                    <p className="font-bold">{selectedBooking.userPhone}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl">
                                    <p className="text-sm text-gray-500">Travel Date</p>
                                    <p className="font-bold">
                                      {new Date(selectedBooking.travelDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Number of People</span>
                                    <span className="font-bold">{selectedBooking.numberOfPeople}</span>
                                  </div>
                                  <div className="flex justify-between items-center mt-2">
                                    <span className="text-gray-500">Price per Person</span>
                                    <span className="font-bold">
                                      NPR {selectedBooking.destination.price.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-lg font-bold">Total Amount</span>
                                    <span className="text-2xl font-bold text-[#ff7f50]">
                                      NPR {selectedBooking.amount.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadReceipt(booking)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Receipt
                        </Button>

                        <Link to={`/destination/${booking.destinationId}`}>
                          <Button variant="outline" size="sm">
                            <Compass className="w-4 h-4 mr-2" />
                            View Destination
                          </Button>
                        </Link>

                        {booking.status !== 'cancelled' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDelete(booking.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No bookings yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start exploring and book your first adventure!
              </p>
              <Link to="/destinations">
                <Button className="bg-[#ff7f50] hover:bg-[#e86a3a] text-white">
                  Explore Destinations
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
