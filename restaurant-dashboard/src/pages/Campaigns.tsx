import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Input, TextArea, Select } from '../components/Input';
import { Plus, Edit, Trash2, Tag, Calendar } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useLanguage } from '../contexts/LanguageContext';

export const Campaigns = () => {
  const { t } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const restaurant = mockRestaurants[0];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('campaigns.title')}</h1>
          <p className="text-gray-600 mt-1">{t('campaigns.subtitle')}</p>
        </div>
        <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          {t('campaigns.addNew')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Tag className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('campaigns.activeCampaigns')}</p>
              <p className="text-2xl font-bold text-gray-900">{restaurant.campaigns.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('campaigns.thisMonthUsage')}</p>
              <p className="text-2xl font-bold text-gray-900">127</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Tag className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('campaigns.totalDiscount')}</p>
              <p className="text-2xl font-bold text-gray-900">₺3,240</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurant.campaigns.map((campaign) => (
          <Card key={campaign.id} hover className="overflow-hidden p-0">
            {/* Image */}
            <div className="relative h-40 bg-gray-200">
              <img
                src={campaign.image}
                alt={campaign.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge variant="warning" size="lg">
                  {campaign.type === 'percentage' 
                    ? `%${campaign.discount}` 
                    : campaign.type === 'bogo'
                    ? t('campaigns.bogo')
                    : `₺${campaign.discount}`}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{campaign.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {campaign.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={16} />
                <span>
                  {t('campaigns.validUntil')} {format(new Date(campaign.validUntil), 'dd MMMM yyyy', { locale: tr })}
                </span>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Button size="sm" variant="primary" icon={Edit} fullWidth>
                  {t('common.edit')}
                </Button>
                <Button size="sm" variant="danger" icon={Trash2} fullWidth>
                  {t('common.delete')}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Campaign Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('campaigns.addNew')}
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label={t('campaigns.campaignTitle')}
            value=""
            onChange={() => {}}
            placeholder={t('campaigns.titlePlaceholder')}
            required
          />

          <TextArea
            label={t('common.description')}
            value=""
            onChange={() => {}}
            placeholder={t('campaigns.descriptionPlaceholder')}
            rows={3}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label={t('campaigns.campaignType')}
              value=""
              onChange={() => {}}
              options={[
                { value: 'percentage', label: t('campaigns.percentageDiscount') },
                { value: 'fixed', label: t('campaigns.fixedDiscount') },
                { value: 'bogo', label: t('campaigns.bogoFull') }
              ]}
              placeholder={t('campaigns.typeSelect')}
              required
            />
            <Input
              label={t('campaigns.discountAmount')}
              type="number"
              value=""
              onChange={() => {}}
              placeholder="0"
              required
            />
          </div>

          <Input
            label={t('campaigns.endDate')}
            type="date"
            value=""
            onChange={() => {}}
            required
          />

          <Input
            label={t('campaigns.bannerUrl')}
            value=""
            onChange={() => {}}
            placeholder="https://..."
            required
          />

          <div className="flex gap-3 mt-6">
            <Button variant="secondary" fullWidth onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button fullWidth onClick={() => setIsAddModalOpen(false)}>
              {t('campaigns.addNew')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
