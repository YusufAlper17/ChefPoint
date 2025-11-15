import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Armchair,
  UtensilsCrossed,
  ShoppingBag,
  Tag,
  Award,
  Megaphone,
  Settings,
  LogOut
} from 'lucide-react';

export const Layout = () => {
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/tables', icon: Armchair, label: 'Masalar' },
    { path: '/menu', icon: UtensilsCrossed, label: 'Menü' },
    { path: '/orders', icon: ShoppingBag, label: 'Siparişler' },
    { path: '/campaigns', icon: Tag, label: 'Kampanyalar' },
    { path: '/loyalty', icon: Award, label: 'Sadakat' },
    { path: '/marketing', icon: Megaphone, label: 'Pazarlama' },
    { path: '/settings', icon: Settings, label: 'Ayarlar' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-primary-600">RestaurantOS</h1>
            <p className="text-sm text-gray-500 mt-1">Yönetim Paneli</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-semibold">BÇ</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Bella Italia</p>
                <p className="text-xs text-gray-500">İzmir, Alsancak</p>
              </div>
            </div>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <LogOut size={16} />
              <span>Çıkış Yap</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

