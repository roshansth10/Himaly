import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Home } from '@/pages/Home';
import { Destinations } from '@/pages/Destinations';
import { DestinationDetail } from '@/pages/DestinationDetail';
import { MapView } from '@/pages/MapView';
import { Bookings } from '@/pages/Bookings';
import { BookingPage } from '@/pages/BookingPage';
import { Contact } from '@/pages/Contact';
import { Toaster } from '@/components/ui/sonner';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/destination/:id" element={<DestinationDetail />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  );
}

export default App;
