import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Clock, ChefHat, CheckCircle, UtensilsCrossed,
  Coffee, Bell, CreditCard, Receipt, RefreshCw
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useLanguage } from '../contexts/LanguageContext';
import { currentTableNumber, TableOrder } from '../data/mockData';

export const OrderStatus = () => {
  const navigate = useNavigate();
  const { t: _t } = useLanguage();
  const [orders, setOrders] = useState<TableOrder[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
    // Auto refresh every 10 seconds
    const interval = setInterval(loadOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = () => {
    const saved = localStorage.getItem('tableOrders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  };

  const refreshOrders = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadOrders();
      setIsRefreshing(false);
    }, 1000);
  };

  const getStatusInfo = (status: TableOrder['status']) => {
    switch (status) {
      case 'pending':
        return { 
          icon: Clock, 
          text: 'Onay Bekliyor', 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          description: 'Siparişiniz onay bekliyor'
        };
      case 'preparing':
        return { 
          icon: ChefHat, 
          text: 'Hazırlanıyor', 
          color: 'text-blue-600', 
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          description: 'Mutfakta hazırlanıyor'
        };
      case 'ready':
        return { 
          icon: CheckCircle, 
          text: 'Hazır', 
          color: 'text-green-600', 
          bg: 'bg-green-50',
          border: 'border-green-200',
          description: 'Siparişiniz hazır!'
        };
      case 'served':
        return { 
          icon: UtensilsCrossed, 
          text: 'Servis Edildi', 
          color: 'text-gray-600', 
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          description: 'Siparişiniz servis edildi'
        };
    }
  };

  const getTotalAmount = () => {
    return orders.reduce((sum, order) => sum + (order.price * order.quantity), 0);
  };

  const getServiceFee = () => {
    return getTotalAmount() * 0.10;
  };

  const getFinalTotal = () => {
    return getTotalAmount() + getServiceFee();
  };

  const hasActiveOrders = orders.some(order => 
    order.status === 'pending' || order.status === 'preparing' || order.status === 'ready'
  );

  const hasReadyOrders = orders.some(order => order.status === 'ready');

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Coffee className="text-orange-600" size={48} />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Aktif Sipariş Yok
            </h1>
            <p className="text-gray-600 mb-8">
              Henüz bir sipariş vermediniz. Menüden sipariş verebilirsiniz.
            </p>
            <Button
              variant="primary"
              size="lg"
              icon={Coffee}
              onClick={() => navigate('/menu')}
            >
              Menüyü Keşfet
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
            >
              <ChevronLeft size={24} />
              <span className="font-semibold">Masa {currentTableNumber}</span>
            </button>
            
            <div className="flex items-center gap-3">
              <button
                onClick={refreshOrders}
                className={`p-2 rounded-xl transition-colors ${
                  isRefreshing ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <RefreshCw size={20} className={isRefreshing ? 'animate-spin' : ''} />
              </button>
              
              <div className="bg-primary-100 p-2 rounded-xl">
                <Bell className="text-primary-600" size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Sipariş Durumu
          </h1>
          <p className="text-gray-600">
            Siparişlerinizin güncel durumunu takip edin
          </p>
        </motion.div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {['pending', 'preparing', 'ready', 'served'].map((status) => {
            const statusInfo = getStatusInfo(status as TableOrder['status']);
            const StatusIcon = statusInfo.icon;
            const count = orders.filter(order => order.status === status).length;
            
            return (
              <motion.div
                key={status}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Card className={`text-center ${statusInfo.bg} ${statusInfo.border} border-2`}>
                  <div className="flex flex-col items-center">
                    <StatusIcon className={`${statusInfo.color} mb-2`} size={24} />
                    <span className={`font-bold text-lg ${statusInfo.color}`}>{count}</span>
                    <span className="text-sm text-gray-600">{statusInfo.text}</span>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Orders List */}
        <div className="space-y-4 mb-6">
          <AnimatePresence>
            {orders.map((order, index) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className={`border-2 ${statusInfo.border} ${statusInfo.bg}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${statusInfo.bg}`}>
                          <StatusIcon className={statusInfo.color} size={24} />
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{order.name}</h3>
                          <p className="text-sm text-gray-600 mb-1">
                            Miktar: {order.quantity} adet
                          </p>
                          <p className={`text-sm font-medium ${statusInfo.color}`}>
                            {statusInfo.description}
                          </p>
                          {order.notes && (
                            <p className="text-sm text-gray-500 italic mt-1">
                              Not: {order.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-xl font-bold text-primary-600">
                          ₺{(order.price * order.quantity).toFixed(2)}
                        </span>
                        {order.orderTime && (
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(order.orderTime).toLocaleTimeString('tr-TR', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Total Summary */}
        {hasActiveOrders && (
          <Card className="bg-gradient-to-br from-primary-50 to-amber-50 border-2 border-primary-200 mb-6">
            <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
              Masa Hesabı
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Ara Toplam</span>
                <span className="font-semibold">₺{getTotalAmount().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Servis Ücreti (10%)</span>
                <span className="font-semibold">₺{getServiceFee().toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-primary-300 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Toplam</span>
                  <span className="text-2xl font-bold text-primary-600">₺{getFinalTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {hasReadyOrders && (
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  icon={CreditCard}
                  fullWidth
                  onClick={() => navigate('/payment')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Ödeme Yap
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  icon={Receipt}
                  onClick={() => navigate('/menu')}
                >
                  Yeni Sipariş
                </Button>
              </div>
            )}
          </Card>
        )}

        {/* Info Cards */}
        <div className="space-y-4">
          {hasActiveOrders && (
            <Card className="bg-blue-50 border-2 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Bell className="text-blue-600" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">
                    Sipariş Takibi
                  </h4>
                  <p className="text-sm text-blue-800">
                    Siparişleriniz otomatik olarak güncellenir. Hazır olduğunda 
                    ödeme yapabilir ve yeni siparişler verebilirsiniz.
                  </p>
                </div>
              </div>
            </Card>
          )}

          <Card className="bg-amber-50 border-2 border-amber-200">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 p-2 rounded-lg">
                <Coffee className="text-amber-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">
                  Masa {currentTableNumber}
                </h4>
                <p className="text-sm text-amber-800">
                  Tüm siparişleriniz bu masa hesabına eklenir. 
                  İstediğiniz zaman yeni siparişler verebilirsiniz.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};


