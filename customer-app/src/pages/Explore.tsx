import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Rating } from '../components/Rating';
import { Search, MapPin, Clock, Users, TrendingUp } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Explore = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  const cuisines = ['all', ...Array.from(new Set(mockRestaurants.map(r => r.cuisine)))];

  const filteredRestaurants = mockRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'all' || restaurant.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('explore.search')}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Cuisine Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {cuisines.map((cuisine) => (
          <button
            key={cuisine}
            onClick={() => setSelectedCuisine(cuisine)}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedCuisine === cuisine
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {cuisine === 'all' ? t('common.all') : cuisine}
          </button>
        ))}
      </div>

      {/* Featured Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="text-primary-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900">{t('explore.featured')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRestaurants.slice(0, 3).map((restaurant) => (
            <Card
              key={restaurant.id}
              hover
              className="overflow-hidden p-0 cursor-pointer"
              onClick={() => navigate(`/app/restaurant/${restaurant.id}`)}
            >
              <div className="relative h-48 bg-gray-200">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="warning">⭐ {t('explore.featuredBadge')}</Badge>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                    {restaurant.description}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <Rating value={restaurant.rating} readonly size="sm" showValue />
                  <span className="text-xs text-gray-500">({restaurant.totalReviews} {t('common.comments')})</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={16} />
                  <span>{restaurant.location.district}, {restaurant.location.city}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {restaurant.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} size="sm">{feature}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* All Restaurants */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('explore.allRestaurants')}</h2>
        <div className="space-y-4">
          {filteredRestaurants.map((restaurant) => {
            const availableTables = restaurant.tables.filter(t => t.status === 'available').length;
            const totalCapacity = restaurant.tables
              .filter(t => t.status === 'available')
              .reduce((sum, t) => sum + t.capacity, 0);

            return (
              <Card
                key={restaurant.id}
                hover
                className="cursor-pointer"
                onClick={() => navigate(`/app/restaurant/${restaurant.id}`)}
              >
                <div className="flex gap-4">
                  <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={restaurant.image}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{restaurant.name}</h3>
                        <p className="text-sm text-gray-600">{restaurant.cuisine} · {restaurant.priceRange}</p>
                      </div>
                      <Rating value={restaurant.rating} readonly size="sm" showValue />
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{restaurant.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-green-600">
                        <Users size={16} />
                        <span>{availableTables} {t('explore.tablesAvailable')} ({totalCapacity} {t('explore.capacity')})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock size={16} />
                        <span>{t('explore.avgTime')}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.features.slice(0, 4).map((feature) => (
                        <Badge key={feature} size="sm">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

