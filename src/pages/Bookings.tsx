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
import { SEO } from '@/components/SEO';
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

Thank you for booking with Himaly!
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
    <div className="min-h-screen pt-24 pb-20 overflow-x-hidden bg-gray-50 dark:bg-gray-900">
      <SEO
        title="My Bookings | Himaly"
        description="Review and manage your Himaly Nepal tour and trekking bookings."
        canonicalPath="/bookings"
      />
      {/* Header */}
      <section className="bg-gradient-to-b from-[#E8672A]/10 to-transparent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              My <span className="text-[#E8672A]">Bookings</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              View and manage all your upcoming Nepal trekking and tour bookings
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
                  transition={{ delay: Math.min(index, 6) * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image */}
                    <div className="lg:w-48 h-32 sm:h-48 lg:h-auto relative shrink-0">
                      <img
                        src={booking.destination.images[0]}
                        alt={`${booking.destination.name} in ${booking.destination.province}, Nepal`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 p-4 sm:p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold mb-2 break-words">{booking.destination.name}</h3>
                          <div className="flex items-center gap-2 text-gray-500 mb-4">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{booking.destination.location}</span>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4">
                            <div className="flex items-center gap-2 min-w-0">
                              <Calendar className="w-4 h-4 text-[#E8672A] flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500">Travel Date</p>
                                <p className="font-medium text-xs sm:text-sm break-words">
                                  {new Date(booking.travelDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <Users className="w-4 h-4 text-[#E8672A] flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500">People</p>
                                <p className="font-medium text-xs sm:text-sm">{booking.numberOfPeople}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <CreditCard className="w-4 h-4 text-[#E8672A] flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500">Payment</p>
                                <p className="font-medium text-xs sm:text-sm uppercase break-words">{booking.paymentMethod}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 min-w-0">
                              <Package className="w-4 h-4 text-[#E8672A] flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="text-[10px] sm:text-xs text-gray-500">Booking ID</p>
                                <p className="font-medium text-xs sm:text-sm break-all">{booking.id}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 shrink-0 lg:block lg:text-right">
                          <p className="text-xl sm:text-2xl font-bold text-[#E8672A]">
                            NPR {booking.amount.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            Booked on {new Date(booking.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="w-full sm:w-auto border-0 dark:border-0 shadow-none"
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">
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
                                    alt={`${selectedBooking.destination.name} in ${selectedBooking.destination.province}, Nepal`}
                                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl object-cover flex-shrink-0"
                                  />
                                  <div className="min-w-0">
                                    <h3 className="text-lg sm:text-xl font-bold break-words">{selectedBooking.destination.name}</h3>
                                    <p className="text-gray-500 text-sm sm:text-base break-words">{selectedBooking.destination.location}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      {getStatusIcon(selectedBooking.status)}
                                      <span className="capitalize">{selectedBooking.status}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                  <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-xl min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500">Booking ID</p>
                                    <p className="font-bold text-sm sm:text-base break-all">{selectedBooking.id}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-xl min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500">Transaction ID</p>
                                    <p className="font-bold text-sm sm:text-base break-all">{selectedBooking.paymentDetails?.transactionId || 'N/A'}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-xl min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500">Customer Name</p>
                                    <p className="font-bold text-sm sm:text-base break-words">{selectedBooking.userName}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-xl min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500">Email</p>
                                    <p className="font-bold text-sm sm:text-base break-all">{selectedBooking.userEmail}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-xl min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                                    <p className="font-bold text-sm sm:text-base break-words">{selectedBooking.userPhone}</p>
                                  </div>
                                  <div className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-4 rounded-xl min-w-0">
                                    <p className="text-xs sm:text-sm text-gray-500">Travel Date</p>
                                    <p className="font-bold text-sm sm:text-base break-words">
                                      {new Date(selectedBooking.travelDate).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                  <div className="flex justify-between items-center gap-4">
                                    <span className="text-gray-500 text-sm sm:text-base">Number of People</span>
                                    <span className="font-bold">{selectedBooking.numberOfPeople}</span>
                                  </div>
                                  <div className="flex justify-between items-center gap-4 mt-2">
                                    <span className="text-gray-500 text-sm sm:text-base">Price per Person</span>
                                    <span className="font-bold text-right break-words">
                                      NPR {selectedBooking.destination.price.toLocaleString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <span className="text-base sm:text-lg font-bold">Total Amount</span>
                                    <span className="text-xl sm:text-2xl font-bold text-[#E8672A] text-right break-words">
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
                          className="w-full sm:w-auto border-0 dark:border-0 shadow-none"
                          onClick={() => downloadReceipt(booking)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Receipt
                        </Button>

                        <Link to={`/destination/${booking.destinationId}`} className="w-full sm:w-auto border-0 dark:border-0 shadow-none">
                          <Button variant="outline" size="sm" className="w-full sm:w-auto border-0 dark:border-0 shadow-none">
                            <Compass className="w-4 h-4 mr-2" />
                            View Destination
                          </Button>
                        </Link>

                        {booking.status !== 'cancelled' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full sm:w-auto border-0 dark:border-0 shadow-none text-red-500 hover:bg-red-50 hover:text-red-600"
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
                <Button className="bg-[#E8672A] hover:bg-[#c85a22] text-white">
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
