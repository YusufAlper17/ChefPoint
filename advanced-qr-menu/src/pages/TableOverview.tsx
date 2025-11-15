import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Clock, Users, Receipt, Bell, CreditCard,
  ChefHat, Globe, Info, UtensilsCrossed, Coffee
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  restaurant, 
  currentTableNumber, 
  currentTableCapacity,
  TableOrder 
} from '../data/mockData';

export const TableOverview = () => {
  const navigate = useNavigate();
  const { t, language, setLanguage } = useLanguage();
  const [tableOrders, setTableOrders] = useState<TableOrder[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('tableOrders');
    if (savedOrders) {
      setTableOrders(JSON.parse(savedOrders));
    }
  }, []);

  const subtotal = tableOrders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
  const serviceFee = subtotal * 0.10;
  const total = subtotal + serviceFee;

  const handleCallWaiter = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const getStatusBadge = (status: TableOrder['status']) => {
    const variants: Record<TableOrder['status'], { variant: 'warning' | 'info' | 'success'; text: string }> = {
      pending: { variant: 'warning', text: t('table.orderStatus.pending') },
      preparing: { variant: 'info', text: t('table.orderStatus.preparing') },
      ready: { variant: 'success', text: t('table.orderStatus.ready') },
      served: { variant: 'success', text: t('table.orderStatus.served') }
    };
    return variants[status];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtNi42MjcgMC0xMiA1LjM3My0xMiAxMnM1LjM3MyAxMiAxMiAxMiAxMi01LjM3MyAxMi0xMi01LjM3My0xMi0xMi0xMnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="relative max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 sm:gap-3 min-w-0"
            >
              <div className="bg-white/20 backdrop-blur-md p-2 sm:p-3 rounded-lg sm:rounded-2xl flex-shrink-0">
                <UtensilsCrossed size={24} />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-3xl font-display font-bold truncate">{restaurant.name}</h1>
                <p className="text-white/90 text-xs sm:text-sm mt-0.5 sm:mt-1">{restaurant.cuisine} • {restaurant.priceRange}</p>
              </div>
            </motion.div>
            
            <Button
              variant="ghost"
              size="sm"
              icon={Globe}
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="bg-white/20 backdrop-blur-md text-white hover:bg-white/30 flex-shrink-0 h-11"
            >
              <span className="hidden sm:inline">{language.toUpperCase()}</span>
              <span className="sm:hidden text-sm font-bold">{language.toUpperCase()}</span>
            </Button>
          </div>

          {/* Table Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="bg-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-white/80 text-xs sm:text-sm">{t('table.number')}</p>
                  <p className="text-2xl sm:text-3xl font-bold">{currentTableNumber}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-xs sm:text-sm">{t('table.capacity')}</p>
                <p className="text-xl sm:text-2xl font-semibold">{currentTableCapacity} {t('common.persons')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-3 sm:mb-4">Hızlı İşlemler</h2>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ChefHat}
                  fullWidth
                  onClick={() => navigate('/menu')}
                  className="h-20 sm:h-24 flex-col text-sm sm:text-base"
                >
                  {t('menu.title')}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={Bell}
                  fullWidth
                  onClick={handleCallWaiter}
                  className="h-20 sm:h-24 flex-col text-sm sm:text-base"
                >
                  {t('action.callWaiter')}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  icon={Info}
                  fullWidth
                  onClick={() => navigate('/restaurant-info')}
                  className="h-20 sm:h-24 flex-col text-sm sm:text-base"
                >
                  {t('restaurant.info')}
                </Button>
                {tableOrders.length > 0 && (
                  <Button
                    variant="primary"
                    size="lg"
                    icon={CreditCard}
                    fullWidth
                    onClick={() => navigate('/payment')}
                    className="h-20 sm:h-24 flex-col bg-green-600 hover:bg-green-700 text-sm sm:text-base"
                  >
                    {t('payment.title')}
                  </Button>
                )}
              </div>
            </motion.div>

            {/* Current Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl sm:text-2xl font-display font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <Receipt className="text-primary-600" size={24} />
                {t('table.currentOrders')}
              </h2>
              
              {tableOrders.length === 0 ? (
                <Card>
                  <div className="text-center py-8 sm:py-12">
                    <div className="bg-gray-100 w-16 sm:w-20 h-16 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Receipt className="text-gray-400" size={32} />
                    </div>
                    <p className="text-gray-600 mb-4 text-sm sm:text-base">{t('table.noOrders')}</p>
                    <Button
                      variant="primary"
                      icon={ChefHat}
                      onClick={() => navigate('/menu')}
                      size="sm"
                    >
                      {t('menu.title')}
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {tableOrders.map((order) => {
                    const statusInfo = getStatusBadge(order.status);
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Card>
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{order.name}</h3>
                                <Badge variant={statusInfo.variant} size="sm">
                                  {statusInfo.text}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 flex-wrap">
                                <span className="flex items-center gap-1">
                                  <Clock size={14} />
                                  {new Date(order.orderTime).toLocaleTimeString('tr-TR', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </span>
                                <span>{t('common.quantity')}: {order.quantity}</span>
                              </div>
                              {order.notes && (
                                <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 italic">Not: {order.notes}</p>
                              )}
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className="text-base sm:text-lg font-bold text-primary-600">
                                ₺{(order.price * order.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar - Total Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-4"
            >
              <Card className="bg-gradient-to-br from-primary-50 to-amber-50 border-2 border-primary-200">
                <h3 className="text-lg sm:text-xl font-display font-bold text-gray-900 mb-3 sm:mb-4">
                  {t('table.totalAmount')}
                </h3>
                
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-base text-gray-700">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-semibold">₺{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base text-gray-700">
                    <span>{t('cart.serviceFee')} (10%)</span>
                    <span className="font-semibold">₺{serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-primary-300 pt-2 sm:pt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-base sm:text-lg font-bold text-gray-900">{t('common.total')}</span>
                      <span className="text-xl sm:text-2xl font-bold text-primary-600">₺{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  <Button
                    variant="primary"
                    size="lg"
                    icon={Coffee}
                    fullWidth
                    onClick={() => navigate('/menu')}
                    className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 h-11"
                  >
                    <span className="hidden sm:inline">🍽️ Yeni Sipariş Ver</span>
                    <span className="sm:hidden">Yeni Sipariş</span>
                  </Button>
                  
                  {tableOrders.filter(order => order.status === 'pending').length > 0 && (
                    <Button
                      variant="outline"
                      size="md"
                      icon={Receipt}
                      fullWidth
                      onClick={() => navigate('/cart')}
                      className="relative h-10"
                    >
                      📋 Adisyon ({tableOrders.filter(order => order.status === 'pending').length})
                    </Button>
                  )}
                  
                  {tableOrders.filter(order => order.status !== 'pending').length > 0 && (
                    <>
                      <Button
                        variant="outline"
                        size="md"
                        icon={UtensilsCrossed}
                        fullWidth
                        onClick={() => navigate('/order-status')}
                        className="h-10"
                      >
                        <span className="hidden sm:inline">Güncel Siparişler</span>
                        <span className="sm:hidden">Siparişler</span>
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        icon={CreditCard}
                        fullWidth
                        onClick={() => navigate('/payment')}
                        className="bg-green-600 hover:bg-green-700 h-10"
                      >
                        <span className="hidden sm:inline">💳 Ödeme Yap</span>
                        <span className="sm:hidden">Ödeme</span>
                      </Button>
                    </>
                  )}
                </div>
              </Card>

              {/* Restaurant Info Summary */}
              <Card className="mt-3 sm:mt-4">
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Bilgi</h4>
                <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <Clock size={14} className="text-primary-600 flex-shrink-0" />
                    <span className="truncate">{restaurant.workingHours}</span>
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Info}
                    fullWidth
                    onClick={() => navigate('/restaurant-info')}
                    className="mt-2 h-10"
                  >
                    {t('restaurant.info')}
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Waiter Called Notification */}
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2"
        >
          <Bell size={20} />
          <span className="font-semibold">{t('action.waiterCalled')}</span>
        </motion.div>
      )}
    </div>
  );
};


