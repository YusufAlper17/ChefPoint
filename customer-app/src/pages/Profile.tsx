import { Card, CardHeader } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { 
  User, MapPin, Award, ShoppingBag, Heart, 
  Settings, LogOut, Star, Clock 
} from 'lucide-react';
import { mockRestaurants, mockOrders } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Profile = () => {
  const { t } = useLanguage();
  const user = {
    name: 'Ayşe Yılmaz',
    email: 'ayse@example.com',
    phone: '+90 532 123 4567',
    memberSince: '2024',
    avatar: 'https://i.pravatar.cc/150?img=1'
  };

  const userOrders = mockOrders.slice(0, 3);
  const favoriteRestaurants = mockRestaurants.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* User Card */}
          <Card className="text-center">
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <Badge variant="info">{t('profile.memberSince').replace('{year}', user.memberSince)}</Badge>
            
            <div className="mt-6 space-y-2">
              <Button fullWidth variant="primary" icon={Settings} size="sm">
                {t('profile.editProfile')}
              </Button>
              <Button fullWidth variant="secondary" icon={LogOut} size="sm">
                {t('nav.logout')}
              </Button>
            </div>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader title={t('profile.stats')} />
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('profile.totalOrders')}</span>
                <span className="text-lg font-bold text-gray-900">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('profile.favoriteRestaurants')}</span>
                <span className="text-lg font-bold text-gray-900">{favoriteRestaurants.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('profile.reviewCount')}</span>
                <span className="text-lg font-bold text-gray-900">12</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('profile.totalPoints')}</span>
                <span className="text-lg font-bold text-primary-600">1,247</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Loyalty Programs */}
          <Card>
            <CardHeader 
              title={t('profile.loyaltyPrograms')} 
              subtitle={t('profile.pointStatus')}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockRestaurants.slice(0, 4).map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-50 to-orange-50 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{restaurant.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Award className="text-primary-600" size={16} />
                      <span className="text-sm font-bold text-primary-600">
                        {Math.floor(Math.random() * 500)} {t('loyalty.points').toLowerCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader 
              title={t('profile.recentOrders')} 
              subtitle={t('profile.orderHistory')}
            />
            <div className="space-y-4">
              {userOrders.map((order) => {
                const restaurant = mockRestaurants.find(r => r.id === order.restaurantId)!;
                
                return (
                  <div
                    key={order.id}
                    className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900">{restaurant.name}</h4>
                          <p className="text-sm text-gray-600">
                            {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                          </p>
                        </div>
                        <Badge variant="success">{t('orders.completed')}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock size={14} />
                          <span>
                            {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <span className="font-bold text-gray-900">₺{order.totalAmount}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button fullWidth variant="secondary" className="mt-4">
              {t('profile.viewAllOrders')}
            </Button>
          </Card>

          {/* Favorite Restaurants */}
          <Card>
            <CardHeader 
              title={t('profile.favoriteRestaurants')} 
              icon={Heart}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {favoriteRestaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="flex gap-3 p-3 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors cursor-pointer"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{restaurant.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{restaurant.cuisine}</p>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="text-sm font-semibold">{restaurant.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader 
              title={t('profile.myReviews')} 
              subtitle={t('profile.yourReviews')}
            />
            <div className="space-y-4">
              {[
                {
                  restaurant: 'Bella Italia',
                  rating: 5,
                  comment: 'Harika bir deneyimdi! Pizzalar muhteşem, manzara eşsiz.',
                  date: '2025-10-05'
                },
                {
                  restaurant: 'Sushi Master',
                  rating: 5,
                  comment: 'Sushi kalitesi inanılmaz. Her şey çok taze ve lezzetli.',
                  date: '2025-10-04'
                }
              ].map((review, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{review.restaurant}</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.date).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

