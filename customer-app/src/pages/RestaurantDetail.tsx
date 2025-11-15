import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Rating } from '../components/Rating';
import { 
  MapPin, Clock, Star, Award, Tag, ChevronLeft, 
  Heart, Calendar, Play, X
} from 'lucide-react';
import { mockRestaurants, mockReviews } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const RestaurantDetail = () => {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'menu' | 'reviews' | 'campaigns'>('menu');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const restaurant = mockRestaurants.find(r => r.id === id);
  const reviews = mockReviews.filter(r => r.restaurantId === id);

  if (!restaurant) {
    return <div className="p-8 text-center">{t('restaurant.notFound')}</div>;
  }

  const categories = Array.from(new Set(restaurant.menu.map(item => item.category)));

  return (
    <div className="pb-6">
      {/* Header Image */}
      <div className="relative h-64 bg-gray-200">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
        >
          <Heart
            size={24}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'}
          />
        </button>

        {/* Video Play Button */}
        {restaurant.introVideo && (
          <button
            onClick={() => setShowVideo(true)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all shadow-lg group"
          >
            <Play size={32} className="text-primary-600 fill-primary-600 ml-1 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Restaurant Name */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-3xl font-bold text-white mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-1">
              <Star className="fill-yellow-400 text-yellow-400" size={20} />
              <span className="font-semibold">{restaurant.rating}</span>
              <span className="text-gray-200">({restaurant.totalReviews} {t('common.comments')})</span>
            </div>
            <span>{restaurant.cuisine}</span>
            <span>{restaurant.priceRange}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <p className="text-gray-700">{restaurant.description}</p>
            </Card>

            {/* Tabs */}
            <div className="flex gap-2 border-b">
              {[
                { key: 'menu', label: t('restaurant.menu') },
                { key: 'reviews', label: t('restaurant.reviews') },
                { key: 'campaigns', label: t('restaurant.campaigns') }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Menu Tab */}
            {activeTab === 'menu' && (
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {restaurant.menu
                        .filter(item => item.category === category)
                        .map((item) => (
                          <Card key={item.id} hover className="flex gap-4">
                            <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                                  <p className="text-sm text-gray-600 line-clamp-1">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-lg font-bold text-primary-600">
                                  ₺{item.price}
                                </span>
                                <Rating value={item.rating} readonly size="sm" />
                              </div>
                            </div>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                            <p className="text-sm text-gray-500">
                              {new Date(review.createdAt).toLocaleDateString('tr-TR')}
                            </p>
                          </div>
                          <Rating value={review.rating} readonly size="sm" />
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        {review.ambiance && (
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-600">{t('restaurant.ambiance')}</span>
                              <span className="ml-1 font-semibold">{review.ambiance}/5</span>
                            </div>
                            <div>
                              <span className="text-gray-600">{t('restaurant.hygiene')}</span>
                              <span className="ml-1 font-semibold">{review.hygiene}/5</span>
                            </div>
                            <div>
                              <span className="text-gray-600">{t('restaurant.service')}</span>
                              <span className="ml-1 font-semibold">{review.service}/5</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Campaigns Tab */}
            {activeTab === 'campaigns' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {restaurant.campaigns.map((campaign) => (
                  <Card key={campaign.id} className="overflow-hidden p-0">
                    <div className="h-32 bg-gray-200">
                      <img
                        src={campaign.image}
                        alt={campaign.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-bold text-gray-900">{campaign.title}</h4>
                        <Badge variant="warning">
                          {campaign.type === 'percentage' ? `%${campaign.discount}` : `₺${campaign.discount}`}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{campaign.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <Card>
              <CardHeader title={t('restaurant.info')} />
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-gray-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('settings.address')}</p>
                    <p className="text-sm text-gray-600">
                      {restaurant.location.address}, {restaurant.location.district}, {restaurant.location.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="text-gray-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t('restaurant.workingHours')}</p>
                    <p className="text-sm text-gray-600">
                      {restaurant.workingHours.open} - {restaurant.workingHours.close}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader title={t('settings.features')} />
              <div className="flex flex-wrap gap-2">
                {restaurant.features.map((feature) => (
                  <Badge key={feature}>{feature}</Badge>
                ))}
              </div>
            </Card>

            {/* Loyalty Program */}
            <Card>
              <CardHeader title={t('restaurant.loyaltyProgram')} />
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <Award className="text-primary-600" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{restaurant.loyaltyProgram.name}</p>
                  <p className="text-sm text-gray-600">
                    {t('restaurant.earnPerLira').replace('{points}', restaurant.loyaltyProgram.pointsPerLira.toString())}
                  </p>
                </div>
              </div>
              <Button fullWidth size="sm">{t('restaurant.joinProgram')}</Button>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button fullWidth size="lg" icon={Tag}>
                {t('restaurant.takeaway')}
              </Button>
              <Button 
                fullWidth 
                size="lg" 
                variant="secondary" 
                icon={Calendar}
                onClick={() => navigate(`/reservation/${id}`)}
              >
                {t('restaurant.makeReservation')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && restaurant.introVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-4xl">
            <button
              onClick={() => setShowVideo(false)}
              className="absolute -top-12 right-0 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition-colors"
            >
              <X size={24} />
            </button>
            <div 
              className="relative w-full bg-black rounded-lg overflow-hidden"
              style={{ paddingBottom: '56.25%' }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`${restaurant.introVideo.replace('watch?v=', 'embed/')}?autoplay=1`}
                title="Restaurant Introduction Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-4 text-center text-white">
              <h3 className="text-xl font-semibold">{restaurant.name} - {t('restaurant.introVideo')}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

