import { Outlet, NavLink } from 'react-router-dom';
import { Compass, Video, ShoppingBag, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

export const Layout = () => {
  const { t } = useLanguage();
  
  const navItems = [
    { path: '/app/explore', icon: Compass, label: t('nav.explore') },
    { path: '/app/shorts', icon: Video, label: t('nav.shorts') },
    { path: '/app/takeaway', icon: ShoppingBag, label: t('nav.takeaway') },
    { path: '/app/profile', icon: User, label: t('nav.profile') }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary-600">FoodieApp</h1>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-around">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-3 px-6 transition-colors ${
                    isActive ? 'text-primary-600' : 'text-gray-600'
                  }`
                }
              >
                <item.icon size={24} />
                <span className="text-xs font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
};
