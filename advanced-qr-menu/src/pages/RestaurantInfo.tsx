import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft, Star, MapPin, Phone, Clock, Award, Users, Camera, Shield
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Rating } from '../components/Rating';
import { useLanguage } from '../contexts/LanguageContext';
import { restaurant, reviews } from '../data/mockData';

export const RestaurantInfo = () => {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const restaurantReviews = reviews.slice(0, 6); // Show first 6 reviews

  const stats = [
    { icon: Star, value: restaurant.rating.toFixed(1), label: t('restaurant.rating') },
    { icon: Users, value: `${restaurant.reviewCount}+`, label: t('restaurant.reviews') },
    { icon: Award, value: '15+', label: language === 'tr' ? 'Yıl Deneyim' : 'Years Experience' },
    { icon: Camera, value: '500+', label: language === 'tr' ? 'Fotoğraf' : 'Photos' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-gray-900 p-3 rounded-full hover:bg-white transition-colors shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-display font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center gap-3 text-white/90">
              <span>{restaurant.cuisine}</span>
              <span>•</span>
              <span>{restaurant.priceRange}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <stat.icon className="text-primary-600" size={24} />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </Card>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
                  {t('restaurant.about')}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {language === 'tr' ? restaurant.descriptionTr : restaurant.descriptionEn}
                </p>
              </Card>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield size={24} className="text-primary-600" />
                  {t('restaurant.features')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {restaurant.features.map((feature, index) => (
                    <Badge key={index} variant="info" size="md">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star size={24} className="text-primary-600" />
                  {t('restaurant.reviews')} ({restaurant.reviewCount})
                </h2>

                <div className="space-y-6">
                  {restaurantReviews.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={review.userAvatar}
                          alt={review.userName}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-semibold text-gray-900">{review.userName}</p>
                            <Rating value={review.rating} size="sm" readonly />
                          </div>
                          <p className="text-gray-700 mb-3">
                            {language === 'tr' ? review.commentTr : review.commentEn}
                          </p>
                          {review.images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {review.images.map((img, idx) => (
                                <div
                                  key={idx}
                                  className="h-32 rounded-lg overflow-hidden"
                                >
                                  <img
                                    src={img}
                                    alt={`Review ${idx + 1}`}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar - Contact Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <h3 className="font-bold text-gray-900 mb-4">{t('restaurant.info')}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {t('restaurant.address')}
                        </p>
                        <p className="text-sm text-gray-600">{restaurant.address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {t('restaurant.phone')}
                        </p>
                        <a
                          href={`tel:${restaurant.phone}`}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          {restaurant.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-1">
                          {t('restaurant.workingHours')}
                        </p>
                        <p className="text-sm text-gray-600">{restaurant.workingHours}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => navigate('/menu')}
                >
                  {t('menu.title')}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





