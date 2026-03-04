import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Phone, 
  Mail, 
  User, 
  CreditCard,
  Check,
  Loader2,
  Download,
  MapPin,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getDestinationById } from '@/data/destinations';
import { saveBooking, generateBookingId, generateTransactionId } from '@/utils/storage';
import { toast } from 'sonner';

type PaymentMethod = 'esewa' | 'khalti' | 'cash';
type BookingStep = 'details' | 'payment' | 'processing' | 'success';

export function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const destination = id ? getDestinationById(id) : null;

  const [step, setStep] = useState<BookingStep>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('esewa');
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    numberOfPeople: 1,
  });
  
  const [bookingId, setBookingId] = useState('');
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (!destination) {
      navigate('/destinations');
    }
  }, [destination, navigate]);

  if (!destination) return null;

  const totalAmount = destination.price * formData.numberOfPeople;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.travelDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    setStep('payment');
  };

  const handlePayment = async () => {
    setStep('processing');
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newBookingId = generateBookingId();
    const newTransactionId = generateTransactionId();
    
    setBookingId(newBookingId);
    setTransactionId(newTransactionId);
    
    // Save booking
    saveBooking({
      id: newBookingId,
      destinationId: destination.id,
      destination,
      userName: formData.name,
      userEmail: formData.email,
      userPhone: formData.phone,
      numberOfPeople: formData.numberOfPeople,
      bookingDate: new Date().toISOString(),
      travelDate: formData.travelDate,
      paymentMethod,
      amount: totalAmount,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      paymentDetails: {
        transactionId: newTransactionId,
        paidAt: new Date().toISOString(),
      },
    });
    
    setStep('success');
    toast.success('Booking confirmed successfully!');
  };

  const downloadReceipt = () => {
    const receiptData = `
BOOKING RECEIPT
===============

Booking ID: ${bookingId}
Transaction ID: ${transactionId}
Date: ${new Date().toLocaleDateString()}

DESTINATION
-----------
Name: ${destination.name}
Location: ${destination.location}
Duration: ${destination.duration}

CUSTOMER DETAILS
----------------
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

BOOKING DETAILS
---------------
Travel Date: ${formData.travelDate}
Number of People: ${formData.numberOfPeople}
Payment Method: ${paymentMethod.toUpperCase()}

PAYMENT
-------
Amount per person: NPR ${destination.price.toLocaleString()}
Total Amount: NPR ${totalAmount.toLocaleString()}

Thank you for booking with Nepal Tourism!
    `;
    
    const blob = new Blob([receiptData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${bookingId}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to={`/destination/${id}`} className="inline-flex items-center text-gray-500 hover:text-[#ff7f50] mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Destination
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">Book Your Adventure</h1>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['Details', 'Payment', 'Confirmation'].map((s, index) => {
              const stepNum = index + 1;
              const currentStepNum = step === 'details' ? 1 : step === 'payment' ? 2 : 3;
              const isActive = stepNum <= currentStepNum;
              const isCurrent = stepNum === currentStepNum;
              
              return (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    isCurrent 
                      ? 'bg-[#ff7f50] text-white' 
                      : isActive 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}>
                    {isActive && stepNum < currentStepNum ? <Check className="w-5 h-5" /> : stepNum}
                  </div>
                  <span className={`ml-2 font-medium hidden sm:block ${
                    isCurrent ? 'text-[#ff7f50]' : isActive ? 'text-green-500' : 'text-gray-400'
                  }`}>
                    {s}
                  </span>
                  {index < 2 && (
                    <div className={`w-16 sm:w-24 h-1 mx-4 ${
                      stepNum < currentStepNum ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Details */}
              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-xl font-bold mb-6">Enter Your Details</h2>
                  
                  <form onSubmit={handleSubmitDetails} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="+977 98XXXXXXXX"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="travelDate">Travel Date *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="travelDate"
                            name="travelDate"
                            type="date"
                            value={formData.travelDate}
                            onChange={handleInputChange}
                            className="pl-10"
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="numberOfPeople">Number of People</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="numberOfPeople"
                          name="numberOfPeople"
                          type="number"
                          min={1}
                          max={20}
                          value={formData.numberOfPeople}
                          onChange={handleInputChange}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-[#ff7f50] hover:bg-[#e86a3a] text-white py-6"
                    >
                      Continue to Payment
                    </Button>
                  </form>
                </motion.div>
              )}

              {/* Step 2: Payment */}
              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
                >
                  <h2 className="text-xl font-bold mb-6">Select Payment Method</h2>
                  
                  <div className="space-y-4 mb-8">
                    {/* eSewa */}
                    <button
                      onClick={() => setPaymentMethod('esewa')}
                      className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                        paymentMethod === 'esewa'
                          ? 'border-[#ff7f50] bg-[#ff7f50]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">e</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold">eSewa</p>
                        <p className="text-sm text-gray-500">Pay with eSewa wallet</p>
                      </div>
                      {paymentMethod === 'esewa' && (
                        <div className="w-6 h-6 bg-[#ff7f50] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Khalti */}
                    <button
                      onClick={() => setPaymentMethod('khalti')}
                      className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                        paymentMethod === 'khalti'
                          ? 'border-[#ff7f50] bg-[#ff7f50]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">K</span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold">Khalti</p>
                        <p className="text-sm text-gray-500">Pay with Khalti wallet</p>
                      </div>
                      {paymentMethod === 'khalti' && (
                        <div className="w-6 h-6 bg-[#ff7f50] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>

                    {/* Cash */}
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                        paymentMethod === 'cash'
                          ? 'border-[#ff7f50] bg-[#ff7f50]/5'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="w-14 h-14 bg-gray-600 rounded-xl flex items-center justify-center">
                        <CreditCard className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-bold">Pay on Arrival</p>
                        <p className="text-sm text-gray-500">Pay cash when you arrive</p>
                      </div>
                      {paymentMethod === 'cash' && (
                        <div className="w-6 h-6 bg-[#ff7f50] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setStep('details')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handlePayment}
                      className="flex-1 bg-[#ff7f50] hover:bg-[#e86a3a] text-white"
                    >
                      Pay NPR {totalAmount.toLocaleString()}
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Processing */}
              {step === 'processing' && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg text-center"
                >
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-full h-full"
                    >
                      <Loader2 className="w-20 h-20 text-[#ff7f50]" />
                    </motion.div>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Processing Payment...</h2>
                  <p className="text-gray-500">Please wait while we confirm your booking</p>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Check className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
                  <p className="text-gray-500 mb-6">Your adventure awaits. Check your email for details.</p>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6 text-left">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Booking ID</p>
                        <p className="font-bold">{bookingId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Transaction ID</p>
                        <p className="font-bold">{transactionId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Amount Paid</p>
                        <p className="font-bold text-[#ff7f50]">NPR {totalAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-bold uppercase">{paymentMethod}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={downloadReceipt}
                      variant="outline"
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Receipt
                    </Button>
                    <Button
                      onClick={() => navigate('/bookings')}
                      className="flex-1 bg-[#ff7f50] hover:bg-[#e86a3a] text-white"
                    >
                      View My Bookings
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar - Booking Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24"
            >
              <h3 className="font-bold mb-4">Booking Summary</h3>
              
              <div className="flex gap-4 mb-4">
                <img
                  src={destination.images[0]}
                  alt={destination.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div>
                  <h4 className="font-bold">{destination.name}</h4>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    {destination.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    {destination.rating}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Price per person</span>
                  <span>NPR {destination.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Number of people</span>
                  <span>x {formData.numberOfPeople}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span>{destination.duration}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#ff7f50]">NPR {totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                  <Check className="w-5 h-5" />
                  <span className="font-medium">Free cancellation</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Cancel up to 24 hours before for a full refund
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
