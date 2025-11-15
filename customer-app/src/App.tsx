import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Explore } from './pages/Explore';
import { Shorts } from './pages/Shorts';
import { RestaurantDetail } from './pages/RestaurantDetail';
import { TakeAway } from './pages/TakeAway';
import { Profile } from './pages/Profile';
import Reservation from './pages/Reservation';
import { Layout } from './components/CustomerLayout';

function App() {
  const basename = import.meta.env.BASE_URL || '/'
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservation/:restaurantId" element={<Reservation />} />
        <Route path="/app" element={<Layout />}>
          <Route index element={<Navigate to="/app/explore" replace />} />
          <Route path="explore" element={<Explore />} />
          <Route path="shorts" element={<Shorts />} />
          <Route path="restaurant/:id" element={<RestaurantDetail />} />
          <Route path="takeaway" element={<TakeAway />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
