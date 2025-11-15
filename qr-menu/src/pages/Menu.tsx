import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Rating } from '../components/Rating';
import { Modal } from '../components/Modal';
import { 
  ShoppingCart, Bell, Plus, Minus, Clock, 
  AlertTriangle, Video, Globe, Leaf, MessageCircle, X
} from 'lucide-react';
import { mockRestaurants, mockReviews } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';
import { formatDistanceToNow } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';

interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

export const Menu = () => {
  const { t, language, setLanguage } = useLanguage();
  const { restaurantId, tableId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showCallWaiter, setShowCallWaiter] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const restaurant = mockRestaurants.find(r => r.id === restaurantId)!;
  const table = restaurant.tables.find(t => t.id === tableId)!;

  const categories = ['all', ...Array.from(new Set(restaurant.menu.map(item => item.category)))];
  const filteredMenu = selectedCategory === 'all'
    ? restaurant.menu
    : restaurant.menu.filter(item => item.category === selectedCategory);

  const popularItems = restaurant.menu.filter(item => item.isPopular);

  const addToCart = (menuItem: any, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.menuItemId === menuItem.id);
      if (existing) {
        return prev.map(item =>
          item.menuItemId === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        quantity
      }];
    });
    setSelectedItem(null);
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCallWaiter = () => {
    setShowCallWaiter(true);
    setTimeout(() => setShowCallWaiter(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{restaurant.name}</h1>
              <p className="text-sm text-gray-600">{t('qr.table')} {table.number} • {table.capacity} {t('qr.persons')}</p>
            </div>
            <button
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Globe size={18} />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleCallWaiter}
              className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors flex-1"
            >
              <Bell size={18} />
              <span className="text-sm font-medium">{t('qr.callWaiter')}</span>
            </button>
            <button
              onClick={() => navigate(`/cart/${restaurantId}/${tableId}`)}
              className="relative flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex-1"
            >
              <ShoppingCart size={18} />
              <span className="text-sm font-medium">{t('qr.cart')}</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Popular Items */}
        {popularItems.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">⭐ {t('qr.popularItems')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {popularItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="h-32 bg-gray-200 relative">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    {item.isVegan && (
                      <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1.5 shadow-md">
                        <Leaf size={16} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary-600">₺{item.price}</span>
                      <Rating value={item.rating} readonly size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category === 'all' ? t('qr.all') : category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          {filteredMenu.map((item) => (
            <Card
              key={item.id}
              hover
              onClick={() => setSelectedItem(item)}
              className={`flex gap-4 cursor-pointer ${!item.isAvailable ? 'opacity-50' : ''}`}
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 relative">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                {item.isVegan && (
                  <div className="absolute top-1 right-1 bg-green-500 rounded-full p-1 shadow-md">
                    <Leaf size={12} className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <div className="flex gap-1 mt-1">
                      {item.isVegan && <Badge variant="success" size="sm">{t('qr.vegan')}</Badge>}
                      {item.isVegetarian && !item.isVegan && <Badge variant="info" size="sm">{t('qr.vegetarian')}</Badge>}
                      {item.isGlutenFree && <Badge variant="warning" size="sm">{t('qr.glutenFree')}</Badge>}
                    </div>
                  </div>
                  {!item.isAvailable && <Badge variant="danger" size="sm">{t('qr.outOfStock')}</Badge>}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary-600">₺{item.price}</span>
                    <Badge size="sm" variant="info">{item.calories} kcal</Badge>
                  </div>
                  <Rating value={item.rating} readonly size="sm" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (() => {
        const itemReviews = mockReviews.filter(r => r.menuItemId === selectedItem.id);
        return (
          <Modal
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            title={selectedItem.name}
            size="lg"
          >
            <div className="space-y-4">
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between">
                <Rating value={selectedItem.rating} readonly showValue />
                <span className="text-xs text-gray-500">({selectedItem.reviewCount} {t('common.comments').toLowerCase()})</span>
              </div>

              <p className="text-gray-700">{selectedItem.description}</p>

              {/* Diet Badges */}
              <div className="flex gap-2 mb-4">
                {selectedItem.isVegan && <Badge variant="success">{t('qr.vegan')}</Badge>}
                {selectedItem.isVegetarian && !selectedItem.isVegan && <Badge variant="info">{t('qr.vegetarian')}</Badge>}
                {selectedItem.isGlutenFree && <Badge variant="warning">{t('qr.glutenFree')}</Badge>}
              </div>

              <div className="grid grid-cols-3 gap-4 py-4 border-y">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">{t('qr.calories')}</p>
                  <p className="font-bold text-gray-900">{selectedItem.calories} kcal</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">{t('qr.preparation')}</p>
                  <p className="font-bold text-gray-900">{selectedItem.preparationTime} {t('qr.min')}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">{t('common.price')}</p>
                  <p className="font-bold text-primary-600">₺{selectedItem.price}</p>
                </div>
              </div>

              {selectedItem.ingredients.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{t('qr.ingredients')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.ingredients.map((ingredient: string) => (
                      <Badge key={ingredient} size="sm">{ingredient}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.allergens.length > 0 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="text-orange-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="font-semibold text-orange-900 mb-1">{t('qr.allergenWarning')}</p>
                      <p className="text-sm text-orange-800">{selectedItem.allergens.join(', ')}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Section */}
              {itemReviews.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageCircle className="text-gray-600" size={20} />
                    <h4 className="font-semibold text-gray-900">{t('common.comments')} ({itemReviews.length})</h4>
                  </div>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {itemReviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start gap-3 mb-2">
                          <img
                            src={review.userAvatar}
                            alt={review.userName}
                            className="w-10 h-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-semibold text-gray-900">{review.userName}</p>
                              <Rating value={review.rating} readonly size="sm" />
                            </div>
                            <p className="text-xs text-gray-500">
                              {formatDistanceToNow(new Date(review.createdAt), {
                                addSuffix: true,
                                locale: language === 'tr' ? tr : enUS
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-3">{review.comment}</p>
                        {review.images && review.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-2">
                            {review.images.map((img, idx) => (
                              <div 
                                key={idx}
                                onClick={() => setSelectedImageUrl(img)}
                                className="h-32 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                              >
                                <img
                                  src={img}
                                  alt={`Review ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedItem.videoUrl && (
                <Button variant="secondary" fullWidth icon={Video}>
                  {t('qr.watchVideo')}
                </Button>
              )}

              <Button
                fullWidth
                size="lg"
                icon={Plus}
                onClick={() => addToCart(selectedItem)}
                disabled={!selectedItem.isAvailable}
              >
                {selectedItem.isAvailable ? t('qr.addToCart') : t('qr.outOfStock')}
              </Button>
            </div>
          </Modal>
        );
      })()}

      {/* Call Waiter Notification */}
      {showCallWaiter && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          <p className="font-semibold">✓ {t('qr.waiterCalled')}</p>
        </div>
      )}

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-10">
          <Button
            size="lg"
            icon={ShoppingCart}
            onClick={() => navigate(`/cart/${restaurantId}/${tableId}`)}
          >
            {t('qr.goToCartWith')} • {cartItemCount} {t('qr.items')} • ₺{cartTotal}
          </Button>
        </div>
      )}

      {/* Image Viewer Modal */}
      {selectedImageUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setSelectedImageUrl(null)}
        >
          <button
            onClick={() => setSelectedImageUrl(null)}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={selectedImageUrl}
            alt="Review"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

