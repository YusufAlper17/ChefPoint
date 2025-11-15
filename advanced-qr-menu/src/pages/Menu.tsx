import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Star, Clock, Flame, Leaf, X,
  ChevronLeft, MessageCircle, AlertTriangle,
  Coffee, UtensilsCrossed, Receipt, Play,
  CheckCircle, ThumbsUp, ChefHat
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Rating } from '../components/Rating';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { menuItems, reviews, currentTableNumber, MenuItem, Review, TableOrder } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { tr, enUS } from 'date-fns/locale';

export const Menu = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [cart, setCart] = useState<TableOrder[]>(() => {
    const saved = localStorage.getItem('tableOrders');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [orderNote, setOrderNote] = useState('');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...Array.from(new Set(menuItems.map(item => 
      language === 'tr' ? item.categoryTr : item.categoryEn
    )))];
    return cats;
  }, [language]);

  // Filter menu items
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      const matchesSearch = (language === 'tr' ? item.nameTr : item.nameEn)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || 
        (language === 'tr' ? item.categoryTr : item.categoryEn) === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, language]);

  // Get reviews for selected item
  const itemReviews = useMemo(() => {
    if (!selectedItem) return [];
    return reviews.filter(r => r.menuItemId === selectedItem.id);
  }, [selectedItem]);


  const addToCart = (item: MenuItem, quantity: number = 1) => {
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => 
      cartItem.menuItemId === item.id && cartItem.status === 'pending'
    );

    let updatedCart;
    if (existingItemIndex >= 0) {
      // Update existing item quantity
      updatedCart = cart.map((cartItem, index) => 
        index === existingItemIndex 
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
    } else {
      // Add new item to cart
      const newOrder: TableOrder = {
        id: `order-${Date.now()}`,
        menuItemId: item.id,
        name: language === 'tr' ? item.nameTr : item.nameEn,
        quantity,
        price: item.price,
        status: 'pending',
        orderTime: new Date().toISOString(),
        notes: orderNote || undefined
      };
      updatedCart = [...cart, newOrder];
    }

    setCart(updatedCart);
    localStorage.setItem('tableOrders', JSON.stringify(updatedCart));
    setSelectedItem(null);
    setOrderNote('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-primary-600 transition-colors min-h-[44px] min-w-[44px]"
            >
              <ChevronLeft size={24} />
              <span className="font-semibold text-sm sm:text-base hidden xs:inline">{t('table.number')} {currentTableNumber}</span>
              <span className="font-semibold text-sm sm:text-base xs:hidden">Masa {currentTableNumber}</span>
            </button>
            
            <div className="flex gap-1 sm:gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={UtensilsCrossed}
                onClick={() => navigate('/order-status')}
                className="relative h-11 sm:h-10 px-2 sm:px-3"
                title="Güncel Siparişler"
              >
                <span className="mr-1 hidden sm:inline text-xs">Sipariş</span>
                {cart.filter(item => item.status !== 'pending').length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.filter(item => item.status !== 'pending').length}
                  </span>
                )}
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={Receipt}
                onClick={() => navigate('/cart')}
                className="relative h-11 sm:h-10 px-2 sm:px-3"
                title="Adisyon"
              >
                <span className="mr-1 hidden sm:inline text-xs">Adisyon</span>
                {cart.filter(item => item.status === 'pending').length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.filter(item => item.status === 'pending').length}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t('menu.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none transition-colors text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Categories */}
        <div className="mb-4 sm:mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-2 rounded-lg sm:rounded-xl font-semibold whitespace-nowrap transition-all text-sm sm:text-base h-10 sm:h-11 flex items-center justify-center ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category === 'all' ? t('menu.all') : category}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card hover onClick={() => setSelectedItem(item)} className="overflow-hidden h-full flex flex-col cursor-pointer active:scale-95 sm:active:scale-100 transition-transform">
                <div className="relative h-40 sm:h-48 overflow-hidden rounded-lg sm:rounded-xl mb-2 sm:mb-3">
                  <ImageWithFallback
                    src={item.image}
                    alt={language === 'tr' ? item.nameTr : item.nameEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    fallbackImages={item.images}
                  />
                  {item.isPopular && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-primary-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <Star size={12} className="fill-white" />
                      {t('menu.popular')}
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex gap-2">
                    {item.isVegan && (
                      <Badge variant="success" size="sm">
                        <Leaf size={12} className="mr-1" />
                        Vegan
                      </Badge>
                    )}
                    {item.isVegetarian && !item.isVegan && (
                      <Badge variant="info" size="sm">{t('menu.vegetarian')}</Badge>
                    )}
                    {item.spicyLevel && item.spicyLevel > 0 && (
                      <Badge variant="danger" size="sm">
                        <Flame size={12} />
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                    {language === 'tr' ? item.nameTr : item.nameEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                    {language === 'tr' ? item.descriptionTr : item.descriptionEn}
                  </p>

                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      <span className="hidden sm:inline">{item.preparationTime} {t('menu.preparationTime')}</span>
                      <span className="sm:hidden">{item.preparationTime}dk</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">{item.calories} {t('menu.calories')}</span>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <Rating value={item.rating} size="sm" readonly />
                      <span className="text-xs text-gray-500">({item.reviewCount})</span>
                    </div>
                    <span className="text-lg sm:text-xl font-bold text-primary-600">₺{item.price}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Item Detail Modal */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => {
          setSelectedItem(null);
          setOrderNote('');
        }}
        size="xl"
      >
        {selectedItem && (
          <div className="space-y-4 sm:space-y-6">
            {/* Image */}
            <div className="h-64 sm:h-80 rounded-lg sm:rounded-2xl overflow-hidden relative">
              <ImageWithFallback
                src={selectedItem.image}
                alt={language === 'tr' ? selectedItem.nameTr : selectedItem.nameEn}
                className="w-full h-full object-cover"
                fallbackImages={selectedItem.images}
              />
              
              {selectedItem.videoUrl && (
                <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10">
                  <button
                    onClick={() => window.open(selectedItem.videoUrl, '_blank')}
                    className="bg-red-600 text-white p-2 sm:p-3 rounded-full hover:bg-red-700 transition-colors shadow-lg flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <Play size={14} />
                    <span className="hidden sm:inline">Video</span>
                  </button>
                </div>
              )}
            </div>

            {/* Title and Rating */}
            <div>
              <div className="flex items-start justify-between mb-1 sm:mb-2 gap-2">
                <h2 className="text-xl sm:text-3xl font-display font-bold text-gray-900 flex-1">
                  {language === 'tr' ? selectedItem.nameTr : selectedItem.nameEn}
                </h2>
                <span className="text-lg sm:text-3xl font-bold text-primary-600 flex-shrink-0">₺{selectedItem.price}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Rating value={selectedItem.rating} size="md" readonly showValue />
                <span className="text-xs sm:text-sm text-gray-500">({selectedItem.reviewCount} {t('menu.reviews')})</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              {language === 'tr' ? selectedItem.descriptionTr : selectedItem.descriptionEn}
            </p>

            {/* Chef Note */}
            {selectedItem.chefNote && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="bg-amber-100 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                    <ChefHat className="text-amber-600" size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-900 mb-1 text-sm sm:text-base">
                      Şefin Özel Notu
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-800">
                      {selectedItem.chefNote}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {selectedItem.isVegan && (
                <Badge variant="success">
                  <Leaf size={14} className="mr-1" />
                  {t('menu.vegan')}
                </Badge>
              )}
              {selectedItem.isVegetarian && !selectedItem.isVegan && (
                <Badge variant="info">{t('menu.vegetarian')}</Badge>
              )}
              {selectedItem.isGlutenFree && (
                <Badge variant="warning">{t('menu.glutenFree')}</Badge>
              )}
              {selectedItem.spicyLevel && selectedItem.spicyLevel > 0 && (
                <Badge variant="danger">
                  {Array.from({ length: selectedItem.spicyLevel }).map((_, i) => (
                    <Flame key={i} size={12} />
                  ))}
                </Badge>
              )}
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 py-3 sm:py-4 border-y border-gray-200">
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('menu.calories')}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{selectedItem.calories}</p>
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('menu.preparationTime')}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{selectedItem.preparationTime} dk</p>
              </div>
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-1">{t('menu.rating')}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">{selectedItem.rating}</p>
              </div>
            </div>

            {/* Nutrition Info */}
            {selectedItem.nutritionInfo && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <h3 className="font-bold text-blue-900 mb-3 text-sm sm:text-base">Beslenme Bilgileri (100g)</h3>
                <div className="grid grid-cols-4 gap-2 sm:gap-4">
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-blue-700 mb-1">Protein</p>
                    <p className="text-sm sm:text-lg font-bold text-blue-900">{selectedItem.nutritionInfo.protein}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-blue-700 mb-1">Karbonhidrat</p>
                    <p className="text-sm sm:text-lg font-bold text-blue-900">{selectedItem.nutritionInfo.carbs}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-blue-700 mb-1">Yağ</p>
                    <p className="text-sm sm:text-lg font-bold text-blue-900">{selectedItem.nutritionInfo.fat}g</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs sm:text-sm text-blue-700 mb-1">Lif</p>
                    <p className="text-sm sm:text-lg font-bold text-blue-900">{selectedItem.nutritionInfo.fiber}g</p>
                  </div>
                </div>
              </div>
            )}

            {/* Ingredients */}
            {selectedItem.ingredients.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3">{t('menu.ingredients')}</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.ingredients.map((ingredient, index) => (
                    <Badge key={index} size="sm">{ingredient}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Allergens */}
            {selectedItem.allergens.length > 0 && (
              <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="text-orange-600 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <p className="font-bold text-orange-900 mb-1">{t('menu.allergens')}</p>
                    <p className="text-sm text-orange-800">{selectedItem.allergens.join(', ')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            {itemReviews.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MessageCircle size={20} />
                  {t('menu.reviews')} ({itemReviews.length})
                </h3>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {itemReviews.map((review: Review) => (
                    <div key={review.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-gray-900">{review.userName}</p>
                              {review.isVerified && (
                                <CheckCircle className="text-green-500" size={16} />
                              )}
                              {review.userLevel === 'vip' && (
                                <Badge variant="warning" size="sm">VIP</Badge>
                              )}
                            </div>
                            <Rating value={review.rating} size="sm" readonly />
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-xs text-gray-500">
                              {formatDistanceToNow(new Date(review.createdAt), {
                                addSuffix: true,
                                locale: language === 'tr' ? tr : enUS
                              })}
                            </p>
                            {review.helpfulCount > 0 && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <ThumbsUp size={12} />
                                <span>{review.helpfulCount} kişi faydalı buldu</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-3">
                        {language === 'tr' ? review.commentTr : review.commentEn}
                      </p>
                      
                      {/* Review Tags */}
                      {review.tags && review.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {review.tags.map((tag, idx) => (
                            <Badge key={idx} variant="info" size="sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      {review.images.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {review.images.map((img, idx) => (
                            <div
                              key={idx}
                              onClick={() => setSelectedImage(img)}
                              className="h-32 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
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

            {/* Order Note */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('cart.orderNote')}
              </label>
              <textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder={t('cart.orderNotePlaceholder')}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none resize-none"
                rows={3}
              />
            </div>

            {/* Add to Table Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              icon={Coffee}
              onClick={() => addToCart(selectedItem, 1)}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
            >
              🍽️ Masaya Ekle • ₺{selectedItem.price}
            </Button>
          </div>
        )}
      </Modal>

      {/* Image Viewer Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={selectedImage}
            alt="Review"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Floating Cart Button */}
      {cart.filter(item => item.status === 'pending').length > 0 && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-40"
        >
          <button
            onClick={() => navigate('/cart')}
            className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white rounded-lg sm:rounded-full px-3 sm:px-6 py-3 sm:py-3 shadow-2xl flex items-center justify-between sm:justify-center gap-2 sm:gap-3 font-semibold text-sm sm:text-base transition-all active:scale-95 sm:active:scale-100 touch-highlight-transparent"
          >
            <div className="flex items-center gap-2 flex-1 sm:flex-none justify-between sm:justify-center">
              <span className="hidden sm:inline">📋</span>
              <span className="sm:hidden text-base">📋</span>
              <div className="sm:hidden flex-1">
                <div className="text-xs text-orange-100">
                  {cart.filter(item => item.status === 'pending').length} ürün
                </div>
                <div className="text-sm font-bold">
                  ₺{cart.filter(item => item.status === 'pending').reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                </div>
              </div>
              <span className="hidden sm:inline">Adisyon ({cart.filter(item => item.status === 'pending').length}) • ₺{cart.filter(item => item.status === 'pending').reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
            </div>
          </button>
        </motion.div>
      )}
    </div>
  );
};


