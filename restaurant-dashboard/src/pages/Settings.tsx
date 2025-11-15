import { useState } from 'react';
import { Card, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { Input, TextArea, Select } from '../components/Input';
import { Badge } from '../components/Badge';
import { Save, MapPin, Clock, Star, Wifi, Cigarette, Music, Sunset, Coffee } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Settings = () => {
  const { t } = useLanguage();
  const restaurant = mockRestaurants[0];
  const [name, setName] = useState(restaurant.name);
  const [description, setDescription] = useState(restaurant.description);
  const [address, setAddress] = useState(restaurant.location.address);
  const [openTime, setOpenTime] = useState(restaurant.workingHours.open);
  const [closeTime, setCloseTime] = useState(restaurant.workingHours.close);

  const featureIcons: { [key: string]: any } = {
    'Deniz Kenarı': Sunset,
    'Canlı Müzik': Music,
    'Teras': Coffee,
    'Wifi': Wifi,
    'Sigara İçilmez': Cigarette
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('settings.title')}</h1>
        <p className="text-gray-600 mt-1">{t('settings.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <Card>
            <CardHeader title={t('settings.basicInfo')} />
            <div className="space-y-4">
              <Input
                label={t('settings.restaurantName')}
                value={name}
                onChange={setName}
                required
              />

              <TextArea
                label={t('common.description')}
                value={description}
                onChange={setDescription}
                rows={4}
                required
              />

              <Select
                label={t('settings.cuisine')}
                value={restaurant.cuisine}
                onChange={() => {}}
                options={[
                  { value: 'İtalyan', label: 'İtalyan' },
                  { value: 'Türk', label: 'Türk' },
                  { value: 'Japon', label: 'Japon' },
                  { value: 'Çin', label: 'Çin' },
                  { value: 'Meksika', label: 'Meksika' }
                ]}
                required
              />

              <Select
                label={t('settings.priceRange')}
                value={restaurant.priceRange}
                onChange={() => {}}
                options={[
                  { value: '₺', label: t('settings.economical') },
                  { value: '₺₺', label: t('settings.medium') },
                  { value: '₺₺₺', label: t('settings.expensive') },
                  { value: '₺₺₺₺', label: t('settings.luxury') }
                ]}
                required
              />
            </div>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader title={t('settings.location')} />
            <div className="space-y-4">
              <Input
                label={t('settings.address')}
                value={address}
                onChange={setAddress}
                icon={MapPin}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label={t('settings.city')}
                  value={restaurant.location.city}
                  onChange={() => {}}
                  required
                />
                <Input
                  label={t('settings.district')}
                  value={restaurant.location.district}
                  onChange={() => {}}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Working Hours */}
          <Card>
            <CardHeader title={t('settings.workingHours')} />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('settings.openingTime')}
                type="time"
                value={openTime}
                onChange={setOpenTime}
                icon={Clock}
                required
              />
              <Input
                label={t('settings.closingTime')}
                type="time"
                value={closeTime}
                onChange={setCloseTime}
                icon={Clock}
                required
              />
            </div>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader 
              title={t('settings.features')} 
              subtitle={t('settings.featuresSubtitle')}
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Deniz Kenarı',
                'Canlı Müzik',
                'Teras',
                'Romantik Ortam',
                'Sigara İçilmez',
                'Vale Hizmeti',
                'Wifi',
                'Otopark',
                'Aile Dostu',
                'Açık Alan',
                'Minimal Tasarım',
                'Japon Bahçesi'
              ].map((feature) => {
                const isSelected = restaurant.features.includes(feature);
                const Icon = featureIcons[feature] || Star;
                
                return (
                  <button
                    key={feature}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{feature}</span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Save Button */}
          <Button icon={Save} size="lg" fullWidth>
            {t('settings.saveChanges')}
          </Button>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Restaurant Card Preview */}
          <Card>
            <CardHeader title={t('settings.preview')} />
            <div className="space-y-4">
              <div className="relative h-32 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {description}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={16} />
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
                <span className="text-sm text-gray-500">
                  ({restaurant.totalReviews} {t('common.comments')})
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {restaurant.features.slice(0, 3).map((feature) => (
                  <Badge key={feature} size="sm">{feature}</Badge>
                ))}
                {restaurant.features.length > 3 && (
                  <Badge size="sm" variant="info">+{restaurant.features.length - 3}</Badge>
                )}
              </div>
            </div>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader title={t('settings.statistics')} />
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('settings.totalReviews')}</span>
                <span className="font-semibold text-gray-900">{restaurant.totalReviews}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('settings.averageRating')}</span>
                <span className="font-semibold text-gray-900">{restaurant.rating} / 5.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('settings.menuItems')}</span>
                <span className="font-semibold text-gray-900">{restaurant.menu.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{t('settings.tableCount')}</span>
                <span className="font-semibold text-gray-900">{restaurant.tables.length}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
