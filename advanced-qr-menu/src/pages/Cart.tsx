import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, Receipt, Clock, CheckCircle, ChefHat, 
  Send, Trash2, Plus, Minus, Coffee, UtensilsCrossed, Bell
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useLanguage } from '../contexts/LanguageContext';
import { currentTableNumber, TableOrder } from '../data/mockData';

export const Cart = () => {
  const navigate = useNavigate();
  const { t: _t } = useLanguage();
  const [allOrders, setAllOrders] = useState<TableOrder[]>([]);
  const [orderNote, setOrderNote] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('tableOrders');
    if (saved) {
      setAllOrders(JSON.parse(saved));
    }
  }, []);

  // Separate orders by status
  const pendingOrders = allOrders.filter(order => order.status === 'pending');
  const confirmedOrders = allOrders.filter(order => order.status !== 'pending');

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    const updated = allOrders.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setAllOrders(updated);
    localStorage.setItem('tableOrders', JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = allOrders.filter(item => item.id !== id);
    setAllOrders(updated);
    localStorage.setItem('tableOrders', JSON.stringify(updated));
  };

  const confirmOrders = () => {
    // Move pending orders to confirmed status
    const updated = allOrders.map(item => 
      item.status === 'pending' 
        ? { ...item, status: 'preparing' as const, orderTime: new Date().toISOString() }
        : item
    );
    
    setAllOrders(updated);
    localStorage.setItem('tableOrders', JSON.stringify(updated));
    
    // Show success message
    setTimeout(() => {
      navigate('/order-status');
    }, 2000);
  };

  const pendingTotal = pendingOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const confirmedTotal = confirmedOrders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalAmount = pendingTotal + confirmedTotal;

  const getStatusInfo = (status: TableOrder['status']) => {
    switch (status) {
      case 'pending':
        return { 
          icon: Clock, 
          text: 'Onay Bekliyor', 
          color: 'text-yellow-600', 
          bg: 'bg-yellow-50',
          border: 'border-yellow-200'
        };
      case 'preparing':
        return { 
          icon: ChefHat, 
          text: 'Hazırlanıyor', 
          color: 'text-blue-600', 
          bg: 'bg-blue-50',
          border: 'border-blue-200'
        };
      case 'ready':
        return { 
          icon: CheckCircle, 
          text: 'Hazır', 
          color: 'text-green-600', 
          bg: 'bg-green-50',
          border: 'border-green-200'
        };
      case 'served':
        return { 
          icon: UtensilsCrossed, 
          text: 'Servis Edildi', 
          color: 'text-gray-600', 
          bg: 'bg-gray-50',
          border: 'border-gray-200'
        };
    }
  };

  if (allOrders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Receipt className="text-orange-600" size={48} />
            </div>
            <h1 className="text-2xl font-display font-bold text-gray-900 mb-4">
              Adisyon Boş
            </h1>
            <p className="text-gray-600 mb-8">
              Lezzetli yemeklerimizi keşfetmek için menüye göz atın
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
            
            <div className="flex items-center gap-2">
              <div className="bg-primary-100 p-2 rounded-xl">
                <Receipt className="text-primary-600" size={20} />
              </div>
              <span className="font-bold text-gray-900">Adisyon</span>
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
            Masa Adisyonu
          </h1>
          <p className="text-gray-600">
            Siparişlerinizi gözden geçirin ve onaylayın
          </p>
        </motion.div>

        {/* Pending Orders Section */}
        {pendingOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-100 p-2 rounded-xl">
                <Clock className="text-yellow-600" size={20} />
              </div>
              <h2 className="text-xl font-display font-bold text-gray-900">
                Onay Bekleyen Siparişler
              </h2>
              <Badge variant="warning" size="sm">
                {pendingOrders.length} ürün
              </Badge>
            </div>

            <div className="space-y-4 mb-6">
              <AnimatePresence>
                {pendingOrders.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-2 border-yellow-200 bg-yellow-50">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="text-yellow-600" size={16} />
                                <span className="text-sm font-medium text-yellow-600">
                                  Onay Bekliyor
                                </span>
                              </div>
                            </div>
                            <span className="text-xl font-bold text-primary-600">
                              ₺{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                          
                          {item.notes && (
                            <p className="text-sm text-gray-600 mb-3 italic">
                              Not: {item.notes}
                            </p>
                          )}
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                              >
                                <Minus size={16} className="text-gray-600" />
                              </button>
                              <span className="px-3 py-1 font-semibold text-gray-900 min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                              >
                                <Plus size={16} className="text-gray-600" />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Note */}
            <Card className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3">Sipariş Notu</h3>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Özel isteklerinizi buraya yazabilirsiniz..."
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none resize-none"
                rows={3}
              />
            </Card>

            {/* Confirm Orders Button */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 mb-8">
              <div className="text-center">
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                  Siparişleri Onayla
                </h3>
                <p className="text-gray-600 mb-4">
                  Onayladığınız siparişler mutfağa gönderilecek
                </p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="text-2xl font-bold text-green-600">
                    ₺{pendingTotal.toFixed(2)}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-lg font-semibold text-gray-700">
                    {pendingOrders.length} ürün
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="lg"
                  icon={Send}
                  fullWidth
                  onClick={confirmOrders}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Mutfağa Gönder
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Confirmed Orders Section */}
        {confirmedOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-xl">
                <UtensilsCrossed className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-display font-bold text-gray-900">
                Güncel Siparişler
              </h2>
              <Badge variant="info" size="sm">
                {confirmedOrders.length} ürün
              </Badge>
            </div>

            <div className="space-y-4 mb-6">
              <AnimatePresence>
                {confirmedOrders.map((item, index) => {
                  const statusInfo = getStatusInfo(item.status);
                  const StatusIcon = statusInfo.icon;
                  
                  return (
                    <motion.div
                      key={item.id}
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
                              <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                              <p className="text-sm text-gray-600 mb-1">
                                Miktar: {item.quantity} adet
                              </p>
                              <p className={`text-sm font-medium ${statusInfo.color}`}>
                                {statusInfo.text}
                              </p>
                              {item.notes && (
                                <p className="text-sm text-gray-500 italic mt-1">
                                  Not: {item.notes}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-xl font-bold text-primary-600">
                              ₺{(item.price * item.quantity).toFixed(2)}
                            </span>
                            {item.orderTime && (
                              <p className="text-sm text-gray-500 mt-1">
                                {new Date(item.orderTime).toLocaleTimeString('tr-TR', {
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
          </motion.div>
        )}

        {/* Total Summary */}
        <Card className="bg-gradient-to-br from-primary-50 to-amber-50 border-2 border-primary-200 mb-6">
          <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
            Toplam Hesap
          </h3>
          
          <div className="space-y-3 mb-4">
            {pendingOrders.length > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Onay Bekleyen</span>
                <span className="font-semibold">₺{pendingTotal.toFixed(2)}</span>
              </div>
            )}
            {confirmedOrders.length > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>Güncel Siparişler</span>
                <span className="font-semibold">₺{confirmedTotal.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-700">
              <span>Servis Ücreti (10%)</span>
              <span className="font-semibold">₺{(totalAmount * 0.10).toFixed(2)}</span>
            </div>
            <div className="border-t-2 border-primary-300 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Toplam</span>
                <span className="text-2xl font-bold text-primary-600">₺{(totalAmount * 1.10).toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="primary"
              size="lg"
              icon={Coffee}
              onClick={() => navigate('/menu')}
              fullWidth
            >
              Yeni Sipariş
            </Button>
            {confirmedOrders.length > 0 && (
              <Button
                variant="outline"
                size="lg"
                icon={Bell}
                onClick={() => navigate('/order-status')}
              >
                Sipariş Takibi
              </Button>
            )}
          </div>
        </Card>

        {/* Info Card */}
        <Card className="bg-blue-50 border-2 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Bell className="text-blue-600" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">
                Adisyon Sistemi
              </h4>
              <p className="text-sm text-blue-800">
                Siparişlerinizi sepete ekleyin, gözden geçirin ve onaylayın. 
                Onaylanan siparişler mutfağa gönderilir ve güncel siparişler bölümüne geçer.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};