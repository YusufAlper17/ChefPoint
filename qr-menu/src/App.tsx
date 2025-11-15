import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QRScan } from './pages/QRScan';
import { Menu } from './pages/Menu';
import { Cart } from './pages/Cart';
import { Payment } from './pages/Payment';
import { Receipt } from './pages/Receipt';
import { Review } from './pages/Review';

function App() {
  const basename = import.meta.env.BASE_URL || '/'
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<QRScan />} />
        <Route path="/menu/:restaurantId/:tableId" element={<Menu />} />
        <Route path="/cart/:restaurantId/:tableId" element={<Cart />} />
        <Route path="/payment/:restaurantId/:tableId" element={<Payment />} />
        <Route path="/receipt/:restaurantId/:tableId" element={<Receipt />} />
        <Route path="/review/:restaurantId/:tableId" element={<Review />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
