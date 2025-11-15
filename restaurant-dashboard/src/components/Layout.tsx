import { Outlet, NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Armchair,
  UtensilsCrossed,
  ShoppingBag,
  Calendar,
  Tag,
  Award,
  Megaphone,
  Settings,
  LogOut,
  Search,
  Bell,
  ChefHat
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Layout = () => {
  const { t } = useLanguage();
  
  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { path: '/tables', icon: Armchair, label: t('nav.tables') },
    { path: '/menu', icon: UtensilsCrossed, label: t('nav.menu') },
    { path: '/orders', icon: ShoppingBag, label: t('nav.orders') },
    { path: '/reservations', icon: Calendar, label: t('nav.reservations') },
    { path: '/campaigns', icon: Tag, label: t('nav.campaigns') },
    { path: '/loyalty', icon: Award, label: t('nav.loyalty') },
    { path: '/marketing', icon: Megaphone, label: t('nav.marketing') },
    { path: '/settings', icon: Settings, label: t('nav.settings') }
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-68 bg-white/70 backdrop-blur-xl shadow-lg ring-1 ring-black/5">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200/70">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 grid place-items-center text-white shadow">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">Chef Point</h1>
                <p className="text-xs text-gray-500">Restaurant OS</p>
              </div>
            </div>
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
                      ? 'bg-brand-50 text-brand-700 font-semibold ring-1 ring-brand-200'
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
          <div className="p-4 border-t border-gray-200/70">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                <span className="text-brand-700 font-semibold">BÇ</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Bella Italia</p>
                <p className="text-xs text-gray-500">İzmir, Alsancak</p>
              </div>
            </div>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <LogOut size={16} />
              <span>{t('nav.logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gradient-to-b from-white/60 to-gray-50">
        {/* Topbar */}
        <div className="sticky top-0 z-10 bg-white/70 backdrop-blur-xl ring-1 ring-black/5">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="hidden md:flex items-center gap-3 flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 bg-white/60 focus:outline-none focus:ring-2 focus:ring-brand-500"
                  placeholder={t('home.search') || 'Ara...'}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600">
                <Bell size={18} />
                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-pink-500 rounded-full animate-pulse-subtle" />
              </button>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

