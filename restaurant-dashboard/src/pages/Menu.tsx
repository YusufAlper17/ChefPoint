import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Input, TextArea, Select } from '../components/Input';
import { Rating } from '../components/Rating';
import { Plus, Edit, Image, Video, AlertTriangle } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Menu = () => {
  const { t } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const restaurant = mockRestaurants[0];

  const categories = ['all', ...Array.from(new Set(restaurant.menu.map(item => item.category)))];

  const filteredMenu = selectedCategory === 'all'
    ? restaurant.menu
    : restaurant.menu.filter(item => item.category === selectedCategory);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('menu.title')}</h1>
          <p className="text-gray-600 mt-1">{t('menu.subtitle')}</p>
        </div>
        <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          {t('menu.addNew')}
        </Button>
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
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
            {category === 'all' ? t('common.all') : category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenu.map((item) => (
          <Card key={item.id} hover className="overflow-hidden p-0">
            {/* Image */}
            <div className="relative h-48 bg-gray-200">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {item.isPopular && (
                <div className="absolute top-3 left-3">
                  <Badge variant="warning">⭐ {t('common.popular')}</Badge>
                </div>
              )}
              <div className="absolute top-3 right-3">
                <Badge variant={item.isAvailable ? 'success' : 'danger'}>
                  {item.isAvailable ? t('common.inStock') : t('common.outOfStock')}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <Rating value={item.rating} readonly size="sm" showValue />
                <span className="text-xs text-gray-500">({item.reviewCount} {t('common.comments')})</span>
              </div>

              <div className="flex items-center gap-2">
                <Badge size="sm">{item.category}</Badge>
                <Badge size="sm" variant="info">{item.calories} {t('menu.kcal')}</Badge>
                <Badge size="sm" variant="info">{item.preparationTime} {t('menu.min')}</Badge>
              </div>

              {item.allergens.length > 0 && (
                <div className="flex items-start gap-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                  <AlertTriangle size={14} className="mt-0.5 flex-shrink-0" />
                  <span>{item.allergens.join(', ')}</span>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2 border-t">
                {item.videoUrl && (
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Video size={14} />
                    {t('menu.hasVideo')}
                  </div>
                )}
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <Image size={14} />
                  {t('menu.hasImage')}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <span className="text-2xl font-bold text-primary-600">₺{item.price}</span>
                <Button size="sm" icon={Edit}>
                  {t('common.edit')}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Menu Item Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('menu.addNew')}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label={t('menu.productName')}
              value=""
              onChange={() => {}}
              placeholder={t('menu.productNamePlaceholder')}
              required
            />
            <Select
              label={t('menu.category')}
              value=""
              onChange={() => {}}
              options={categories
                .filter(c => c !== 'all')
                .map(c => ({ value: c, label: c }))}
              placeholder={t('menu.categorySelect')}
              required
            />
          </div>

          <TextArea
            label={t('common.description')}
            value=""
            onChange={() => {}}
            placeholder={t('menu.descriptionPlaceholder')}
            rows={3}
            required
          />

          <div className="grid grid-cols-3 gap-4">
            <Input
              label={`${t('common.price')} (₺)`}
              type="number"
              value=""
              onChange={() => {}}
              placeholder="0"
              required
            />
            <Input
              label={t('menu.calories')}
              type="number"
              value=""
              onChange={() => {}}
              placeholder="0"
              required
            />
            <Input
              label={t('menu.preparationTime')}
              type="number"
              value=""
              onChange={() => {}}
              placeholder="0"
              required
            />
          </div>

          <Input
            label={t('menu.imageUrl')}
            value=""
            onChange={() => {}}
            placeholder="https://..."
          />

          <Input
            label={t('menu.videoUrl')}
            value=""
            onChange={() => {}}
            placeholder="https://youtube.com/..."
          />

          <TextArea
            label={t('menu.ingredients')}
            value=""
            onChange={() => {}}
            placeholder="Un&#10;Peynir&#10;Domates"
            rows={4}
          />

          <TextArea
            label={t('menu.allergens')}
            value=""
            onChange={() => {}}
            placeholder="Gluten, Süt, Yumurta"
            rows={2}
          />

          <div className="flex gap-3 mt-6">
            <Button variant="secondary" fullWidth onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button fullWidth onClick={() => setIsAddModalOpen(false)}>
              {t('menu.addNew')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

