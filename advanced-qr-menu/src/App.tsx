import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { TableOverview } from './pages/TableOverview';
import { Menu } from './pages/Menu';
import { Cart } from './pages/Cart';
import { OrderStatus } from './pages/OrderStatus';
import { Payment } from './pages/Payment';
import { RestaurantInfo } from './pages/RestaurantInfo';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL || '/ChefPoint/advanced_qr_menu/'}>
        <Routes>
          <Route path="/" element={<TableOverview />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/restaurant-info" element={<RestaurantInfo />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;


