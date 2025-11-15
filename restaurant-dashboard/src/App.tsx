import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Tables } from './pages/Tables';
import { Menu } from './pages/Menu';
import { Orders } from './pages/Orders';
import Reservations from './pages/Reservations';
import { Campaigns } from './pages/Campaigns';
import { Loyalty } from './pages/Loyalty';
import { Marketing } from './pages/Marketing';
import { Settings } from './pages/Settings';
import { Layout } from './components/Layout';

function App() {
  const basename = import.meta.env.BASE_URL || '/'
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tables" element={<Tables />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
