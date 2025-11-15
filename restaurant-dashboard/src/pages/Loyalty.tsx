import { useState } from 'react';
import { Card, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Input, TextArea } from '../components/Input';
import { Plus, Award, Users, Gift, Edit, Trash2 } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Loyalty = () => {
  const { t } = useLanguage();
  const [isAddRewardModalOpen, setIsAddRewardModalOpen] = useState(false);
  const restaurant = mockRestaurants[0];
  const { loyaltyProgram } = restaurant;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('loyalty.title')}</h1>
          <p className="text-gray-600 mt-1">{t('loyalty.subtitle')}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('loyalty.programMembers')}</p>
              <p className="text-2xl font-bold text-gray-900">1,248</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Gift className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('loyalty.thisMonthRewards')}</p>
              <p className="text-2xl font-bold text-gray-900">84</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('loyalty.activeUsers')}</p>
              <p className="text-2xl font-bold text-gray-900">872</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Program Info */}
      <Card className="mb-8">
        <CardHeader 
          title={loyaltyProgram.name} 
          subtitle={t('loyalty.programDetails')}
          action={
            <Button size="sm" icon={Edit}>{t('common.edit')}</Button>
          }
        />
        <div className="bg-gradient-to-r from-primary-50 to-orange-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-2">
                {t('loyalty.earnPoints').replace('{points}', loyaltyProgram.pointsPerLira.toString())}
              </p>
              <p className="text-gray-600">
                {t('loyalty.collectPoints')}
              </p>
            </div>
            <Award className="text-primary-600" size={64} />
          </div>
        </div>
      </Card>

      {/* Rewards */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t('loyalty.rewards')}</h2>
        <Button icon={Plus} onClick={() => setIsAddRewardModalOpen(true)}>
          {t('loyalty.addReward')}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loyaltyProgram.rewards.map((reward, index) => (
          <Card key={reward.id} hover className="relative">
            <div className="absolute top-4 right-4">
              <Badge variant="warning" size="lg">
                {reward.pointsRequired} {t('loyalty.points')}
              </Badge>
            </div>

            <div className="pt-12 space-y-4">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <Gift className="text-primary-600" size={32} />
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {reward.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {reward.description}
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t">
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

      {/* Recent Redemptions */}
      <Card className="mt-8">
        <CardHeader 
          title={t('loyalty.recentRedemptions')} 
          subtitle={t('loyalty.last7Days')}
        />
        <div className="space-y-3">
          {[
            { user: 'Ayşe Yılmaz', reward: 'Ücretsiz Kahve', points: 100, date: '2 saat önce' },
            { user: 'Mehmet Kaya', reward: '%15 İndirim', points: 500, date: '5 saat önce' },
            { user: 'Zeynep Demir', reward: 'Tatlı İkramı', points: 250, date: 'Dün' },
            { user: 'Can Öztürk', reward: 'Ücretsiz Kahve', points: 100, date: 'Dün' },
          ].map((redemption, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Users size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{redemption.user}</p>
                  <p className="text-sm text-gray-600">{redemption.reward}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary-600">-{redemption.points} {t('loyalty.points').toLowerCase()}</p>
                <p className="text-sm text-gray-500">{redemption.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Add Reward Modal */}
      <Modal
        isOpen={isAddRewardModalOpen}
        onClose={() => setIsAddRewardModalOpen(false)}
        title={t('loyalty.addReward')}
      >
        <div className="space-y-4">
          <Input
            label={t('loyalty.rewardName')}
            value=""
            onChange={() => {}}
            placeholder={t('loyalty.rewardNamePlaceholder')}
            required
          />

          <TextArea
            label={t('common.description')}
            value=""
            onChange={() => {}}
            placeholder={t('loyalty.rewardDescription')}
            rows={3}
            required
          />

          <Input
            label={t('loyalty.requiredPoints')}
            type="number"
            value=""
            onChange={() => {}}
            placeholder="0"
            required
          />

          <div className="flex gap-3 mt-6">
            <Button variant="secondary" fullWidth onClick={() => setIsAddRewardModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button fullWidth onClick={() => setIsAddRewardModalOpen(false)}>
              {t('loyalty.addReward')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
