import { useState } from 'react';
import { Card, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Rating } from '../components/Rating';
import { Modal } from '../components/Modal';
import { Select } from '../components/Input';
import { ShoppingBag, Plus, Minus, X, Check } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const TakeAway = () => {
  const { t } = useLanguage();
  const [selectedRestaurant, setSelectedRestaurant] = useState(mockRestaurants[0].id);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const restaurant = mockRestaurants.find(r => r.id === selectedRestaurant)!;

  const addToCart = (menuItem: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.menuItemId === menuItem.id);
      if (existing) {
        return prev.map(item =>
          item.menuItemId === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: 1,
        image: menuItem.image
      }];
    });
  };

  const updateQuantity = (menuItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item =>
          item.menuItemId === menuItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter(item => item.quantity > 0);
    });
  };

  const removeFromCart = (menuItemId: string) => {
    setCart(prev => prev.filter(item => item.menuItemId !== menuItemId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setIsCheckoutModalOpen(false);
      setOrderPlaced(false);
      setCart([]);
    }, 3000);
  };

  const categories = Array.from(new Set(restaurant.menu.map(item => item.category)));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('takeaway.title')}</h1>
        <p className="text-gray-600">{t('takeaway.subtitle')}</p>
      </div>

      {/* Restaurant Selector */}
      <Card className="mb-6">
        <Select
          label={t('takeaway.selectRestaurant')}
          value={selectedRestaurant}
          onChange={setSelectedRestaurant}
          options={mockRestaurants.map(r => ({ value: r.id, label: r.name }))}
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu */}
        <div className="lg:col-span-2 space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.menu
                  .filter(item => item.category === category && item.isAvailable)
                  .map((item) => (
                    <Card key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-2">
                          <h4 className="font-bold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary-600">
                            ₺{item.price}
                          </span>
                          <Button size="sm" icon={Plus} onClick={() => addToCart(item)}>
                            {t('takeaway.addToCart')}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart */}
        <div>
          <div className="sticky top-4">
            <Card>
              <CardHeader title={t('takeaway.myCart')} />
              
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="mx-auto text-gray-400 mb-3" size={48} />
                  <p className="text-gray-600">{t('takeaway.emptyCart')}</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.menuItemId} className="flex gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900">{item.name}</h4>
                              <p className="text-sm font-bold text-primary-600">
                                ₺{item.price * item.quantity}
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.menuItemId)}
                              className="text-red-500 hover:text-red-600"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.menuItemId, -1)}
                              className="w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-semibold text-gray-900 w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.menuItemId, 1)}
                              className="w-6 h-6 rounded-full bg-primary-100 hover:bg-primary-200 flex items-center justify-center text-primary-600"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">{t('common.subtotal')}</span>
                      <span className="font-semibold">₺{totalAmount}</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>{t('common.total')}</span>
                      <span className="text-primary-600">₺{totalAmount}</span>
                    </div>
                  </div>

                  <Button
                    fullWidth
                    size="lg"
                    icon={ShoppingBag}
                    onClick={() => setIsCheckoutModalOpen(true)}
                  >
                    {t('takeaway.completeOrder')}
                  </Button>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        title={orderPlaced ? t('takeaway.orderReceived') : t('takeaway.confirmOrder')}
      >
        {orderPlaced ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{t('takeaway.orderReceivedMessage')}</h3>
            <p className="text-gray-600 mb-4">{t('takeaway.orderNumber').replace('{number}', '12345')}</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                {t('takeaway.pickupMessage')}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-3">{t('takeaway.orderSummary')}</h4>
              <div className="space-y-2">
                {cart.map((item) => (
                  <div key={item.menuItemId} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-medium">₺{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-3 pt-3">
                <div className="flex justify-between font-bold">
                  <span>{t('common.total')}</span>
                  <span className="text-primary-600">₺{totalAmount}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>{t('takeaway.restaurant')}</strong> {restaurant.name}
                <br />
                <strong>{t('settings.address')}</strong> {restaurant.location.address}
                <br />
                <strong>{t('takeaway.estimatedTime')}</strong>
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" fullWidth onClick={() => setIsCheckoutModalOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button fullWidth onClick={handleCheckout}>
                {t('takeaway.confirmOrder')}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

