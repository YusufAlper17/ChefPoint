import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input, TextArea } from '../components/Input';
import { Plus, Minus, X, ChevronLeft } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

// Sepet için state management - gerçek uygulamada context veya state management kullanılmalı
const mockCart = [
  { menuItemId: 'menu-1', name: 'Margherita Pizza', price: 189, quantity: 2, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80' },
  { menuItemId: 'menu-3', name: 'Tiramisu', price: 95, quantity: 1, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80' }
];

export const Cart = () => {
  const { t } = useLanguage();
  const { restaurantId, tableId } = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useState(mockCart);
  const [orderNotes, setOrderNotes] = useState('');

  const restaurant = mockRestaurants.find(r => r.id === restaurantId)!;
  const table = restaurant.tables.find(t => t.id === tableId)!;

  const updateQuantity = (menuItemId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item =>
          item.menuItemId === menuItemId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (menuItemId: string) => {
    setCart(prev => prev.filter(item => item.menuItemId !== menuItemId));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = subtotal * 0.1; // %10 servis ücreti
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t('qr.myCart')}</h1>
              <p className="text-sm text-gray-600">{restaurant.name} • {t('qr.table')} {table.number}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {cart.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-600 mb-4">{t('qr.emptyCart')}</p>
            <Button onClick={() => navigate(-1)}>{t('qr.backToMenu')}</Button>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <Card>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('qr.yourOrder')}</h2>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.menuItemId} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <p className="text-sm font-bold text-primary-600">₺{item.price * item.quantity}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.menuItemId)}
                          className="text-red-500 hover:text-red-600"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.menuItemId, -1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-semibold text-gray-900 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.menuItemId, 1)}
                          className="w-8 h-8 rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center text-primary-600"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Order Notes */}
            <Card>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('qr.orderNotes')}</h2>
              <TextArea
                value={orderNotes}
                onChange={setOrderNotes}
                placeholder={t('qr.orderNotesPlaceholder')}
                rows={3}
              />
            </Card>

            {/* Price Summary */}
            <Card>
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('qr.paymentSummary')}</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>{t('common.subtotal')}</span>
                  <span>₺{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>{t('qr.serviceFee')} (%10)</span>
                  <span>₺{serviceFee.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>{t('common.total')}</span>
                  <span className="text-primary-600">₺{total.toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                fullWidth
                size="lg"
                onClick={() => navigate(`/payment/${restaurantId}/${tableId}`)}
              >
                {t('qr.proceedToPayment')} • ₺{total.toFixed(2)}
              </Button>
              <Button
                fullWidth
                size="lg"
                variant="secondary"
                onClick={() => navigate(-1)}
              >
                {t('qr.backToMenu')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

