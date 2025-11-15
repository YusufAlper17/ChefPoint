import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { UtensilsCrossed, MapPin, Star, Zap, TrendingUp, Users, Award, Clock, Heart, ChefHat, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const stats = [
    { icon: UtensilsCrossed, value: '500+', label: t('home.restaurant') },
    { icon: Users, value: '50K+', label: t('home.happyCustomer') },
    { icon: Star, value: '4.8', label: t('home.avgRating') },
    { icon: TrendingUp, value: '1M+', label: t('home.orders') },
  ];

  const features = [
    {
      icon: MapPin,
      title: t('customer.nearbyRestaurants'),
      description: t('customer.nearbyDesc')
    },
    {
      icon: Star,
      title: t('customer.realReviews'),
      description: t('customer.realReviewsDesc')
    },
    {
      icon: Zap,
      title: t('customer.quickOrder'),
      description: t('customer.quickOrderDesc')
    }
  ];

  const categories = [
    { key: 'turkish', name: t('home.cuisineTurkish'), icon: '🇹🇷', count: 120 },
    { key: 'italian', name: t('home.cuisineItalian'), icon: '🇮🇹', count: 85 },
    { key: 'japanese', name: t('home.cuisineJapanese'), icon: '🇯🇵', count: 45 },
    { key: 'chinese', name: t('home.cuisineChinese'), icon: '🇨🇳', count: 38 },
    { key: 'mexican', name: t('home.cuisineMexican'), icon: '🇲🇽', count: 32 },
    { key: 'indian', name: t('home.cuisineIndian'), icon: '🇮🇳', count: 28 },
  ];

  const popularRestaurants = [
    {
      name: 'Bella Italia',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
      rating: 4.8,
      reviews: 248,
      cuisine: t('home.cuisineItalian'),
      deliveryTime: `25-35 ${t('home.deliveryTime')}`,
      badge: t('home.popular')
    },
    {
      name: 'Sushi Master',
      image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=600&q=80',
      rating: 4.9,
      reviews: 312,
      cuisine: t('home.cuisineJapanese'),
      deliveryTime: `30-40 ${t('home.deliveryTime')}`,
      badge: t('home.new')
    },
    {
      name: 'Kebapçı Mahmut',
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=600&q=80',
      rating: 4.7,
      reviews: 189,
      cuisine: t('home.cuisineTurkish'),
      deliveryTime: `20-30 ${t('home.deliveryTime')}`,
      badge: t('home.popular')
    },
    {
      name: 'Pizza Palace',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
      rating: 4.6,
      reviews: 156,
      cuisine: t('home.cuisineItalian'),
      deliveryTime: `25-35 ${t('home.deliveryTime')}`,
      badge: null
    },
    {
      name: 'Dragon Wok',
      image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80',
      rating: 4.7,
      reviews: 203,
      cuisine: t('home.cuisineChinese'),
      deliveryTime: `35-45 ${t('home.deliveryTime')}`,
      badge: t('home.new')
    },
    {
      name: 'Burger House',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80',
      rating: 4.5,
      reviews: 178,
      cuisine: 'Amerikan',
      deliveryTime: '20-30 dk',
      badge: null
    },
  ];

  const trendingRestaurants = [
    {
      name: 'Taco Fiesta',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80',
      rating: 4.8,
      reviews: 142,
      cuisine: 'Meksika',
      deliveryTime: '25-35 dk',
    },
    {
      name: 'Curry House',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
      rating: 4.6,
      reviews: 124,
      cuisine: 'Hint',
      deliveryTime: '30-40 dk',
    },
    {
      name: 'Steakhouse Premium',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&q=80',
      rating: 4.9,
      reviews: 267,
      cuisine: 'Steakhouse',
      deliveryTime: '35-45 dk',
    },
    {
      name: 'Poke Bowl Paradise',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
      rating: 4.7,
      reviews: 198,
      cuisine: 'Hawaii',
      deliveryTime: '20-30 dk',
    },
    {
      name: 'Manti Evi',
      image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&q=80',
      rating: 4.8,
      reviews: 215,
      cuisine: 'Türk',
      deliveryTime: '25-35 dk',
    },
    {
      name: 'Ramen Station',
      image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600&q=80',
      rating: 4.7,
      reviews: 186,
      cuisine: 'Japon',
      deliveryTime: '30-40 dk',
    },
  ];

  const RestaurantCard = ({ restaurant, delay = 0 }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="group bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      onClick={() => navigate('/app/explore')}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {restaurant.badge && (
          <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {restaurant.badge}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
            {restaurant.name}
          </h3>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
            <Star className="text-yellow-400 fill-yellow-400" size={14} />
            <span className="font-bold text-sm">{restaurant.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-3">
          {restaurant.cuisine} • {restaurant.reviews} {t('home.reviews')}
        </p>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-600">
            <Clock size={16} />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <Heart className="text-gray-400 hover:text-red-500 hover:fill-red-500 transition-colors cursor-pointer" size={20} />
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-amber-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
          <div className="flex justify-end mb-8">
            <LanguageSwitcher />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-lg rounded-3xl mb-8 shadow-2xl"
            >
              <UtensilsCrossed className="text-white" size={48} />
            </motion.div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
              {t('customer.title')}
              <br />
              <span className="text-amber-200">{t('customer.subtitle')}</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t('customer.description')}
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" onClick={() => navigate('/app/explore')} className="shadow-2xl hover:shadow-primary-500/30 bg-white text-primary-600 hover:bg-primary-50">
                {t('customer.startExploring')}
              </Button>
              <Button size="lg" variant="secondary" onClick={() => navigate('/login')} className="shadow-2xl bg-white/20 backdrop-blur-lg text-white border-white/30 hover:bg-white/30">
                {t('customer.signIn')}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary-100 to-amber-100 rounded-xl mb-3">
                <stat.icon className="text-primary-600" size={28} />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <ChefHat className="text-primary-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">{t('home.popularCategories')}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="bg-white rounded-xl shadow-md p-5 text-center cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                onClick={() => navigate('/app/explore')}
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{category.icon}</div>
                <div className="font-semibold text-gray-900 mb-1 text-sm">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count} {t('home.restaurant')}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="text-primary-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">{t('home.whyChefPoint')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-br from-white to-primary-50 rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-primary-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl mb-5 shadow-lg">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular Restaurants */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Award className="text-primary-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">{t('home.popularRestaurants')}</h2>
            </div>
            <button
              onClick={() => navigate('/app/explore')}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              {t('home.viewAll')}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularRestaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} delay={0.9 + index * 0.05} />
            ))}
          </div>
        </motion.div>

        {/* Trending Restaurants */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-primary-600" size={32} />
              <h2 className="text-3xl font-bold text-gray-900">{t('home.trendingRestaurants')}</h2>
            </div>
            <button
              onClick={() => navigate('/app/explore')}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              {t('home.viewAll')}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingRestaurants.map((restaurant, index) => (
              <RestaurantCard key={index} restaurant={restaurant} delay={1.1 + index * 0.05} />
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-20 bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-4">{t('home.startExploring')}</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            {t('home.exploreDescription')}
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/app/explore')}
            className="bg-white text-primary-600 hover:bg-gray-50 shadow-2xl"
          >
            {t('home.explore')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

