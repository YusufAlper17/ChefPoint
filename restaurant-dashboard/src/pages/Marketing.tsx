import { useState } from 'react';
import { Card, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Input, TextArea } from '../components/Input';
import { Plus, Video, Image as ImageIcon, Heart, Eye, MessageCircle } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Marketing = () => {
  const { t } = useLanguage();
  const [isAddVideoModalOpen, setIsAddVideoModalOpen] = useState(false);
  const [isAddBannerModalOpen, setIsAddBannerModalOpen] = useState(false);
  const restaurant = mockRestaurants[0];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('marketing.title')}</h1>
        <p className="text-gray-600 mt-1">{t('marketing.subtitle')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Video className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('marketing.shortsVideos')}</p>
              <p className="text-2xl font-bold text-gray-900">{restaurant.shorts.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Eye className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('marketing.totalViews')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {restaurant.shorts.reduce((sum, s) => sum + s.views, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink-100 rounded-lg">
              <Heart className="text-pink-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('marketing.totalLikes')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {restaurant.shorts.reduce((sum, s) => sum + s.likes, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <ImageIcon className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('marketing.bannerAds')}</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Shorts Videos */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('marketing.shortsVideos')}</h2>
          <Button icon={Plus} onClick={() => setIsAddVideoModalOpen(true)}>
            {t('marketing.addVideo')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {restaurant.shorts.map((short) => (
            <Card key={short.id} hover className="overflow-hidden p-0">
              <div className="relative h-64 bg-gray-200">
                <img
                  src={short.thumbnail}
                  alt={short.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Video className="text-white" size={48} />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="danger">
                    <Video size={12} />
                  </Badge>
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900 line-clamp-2">
                    {short.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                    {short.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{short.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart size={16} />
                    <span>{short.likes.toLocaleString()}</span>
                  </div>
                </div>

                <Button size="sm" fullWidth>
                  {t('common.edit')}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Banner Ads */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{t('marketing.bannerAds')}</h2>
          <Button icon={Plus} onClick={() => setIsAddBannerModalOpen(true)}>
            {t('marketing.addBanner')}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.campaigns.map((campaign) => (
            <Card key={campaign.id} hover className="overflow-hidden p-0">
              <div className="relative h-40 bg-gray-200">
                <img
                  src={campaign.image}
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-bold text-gray-900">{campaign.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {campaign.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="primary" fullWidth>
                    {t('common.edit')}
                  </Button>
                  <Button size="sm" variant="danger" fullWidth>
                    {t('common.delete')}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Video Modal */}
      <Modal
        isOpen={isAddVideoModalOpen}
        onClose={() => setIsAddVideoModalOpen(false)}
        title={t('marketing.addVideo')}
      >
        <div className="space-y-4">
          <Input
            label={t('marketing.videoTitle')}
            value=""
            onChange={() => {}}
            placeholder={t('marketing.videoTitlePlaceholder')}
            required
          />

          <TextArea
            label={t('common.description')}
            value=""
            onChange={() => {}}
            placeholder={t('menu.descriptionPlaceholder')}
            rows={3}
            required
          />

          <Input
            label={t('marketing.videoUrl')}
            value=""
            onChange={() => {}}
            placeholder="https://youtube.com/shorts/..."
            required
          />

          <Input
            label={t('marketing.thumbnailUrl')}
            value=""
            onChange={() => {}}
            placeholder="https://..."
            required
          />

          <div className="flex gap-3 mt-6">
            <Button variant="secondary" fullWidth onClick={() => setIsAddVideoModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button fullWidth onClick={() => setIsAddVideoModalOpen(false)}>
              {t('marketing.addVideo')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Banner Modal */}
      <Modal
        isOpen={isAddBannerModalOpen}
        onClose={() => setIsAddBannerModalOpen(false)}
        title={t('marketing.addBanner')}
      >
        <div className="space-y-4">
          <Input
            label={t('marketing.bannerTitle')}
            value=""
            onChange={() => {}}
            placeholder={t('marketing.bannerTitlePlaceholder')}
            required
          />

          <TextArea
            label={t('common.description')}
            value=""
            onChange={() => {}}
            placeholder={t('menu.descriptionPlaceholder')}
            rows={3}
            required
          />

          <Input
            label={t('marketing.bannerImageUrl')}
            value=""
            onChange={() => {}}
            placeholder="https://..."
            required
          />

          <div className="flex gap-3 mt-6">
            <Button variant="secondary" fullWidth onClick={() => setIsAddBannerModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button fullWidth onClick={() => setIsAddBannerModalOpen(false)}>
              {t('marketing.addBanner')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
