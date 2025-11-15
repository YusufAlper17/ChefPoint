import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Rating } from '../components/Rating';
import { TextArea } from '../components/Input';
import { Check } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Review = () => {
  const { t } = useLanguage();
  const { restaurantId, tableId } = useParams();
  const navigate = useNavigate();

  const restaurant = mockRestaurants.find(r => r.id === restaurantId)!;

  const [overallRating, setOverallRating] = useState(5);
  const [ambianceRating, setAmbianceRating] = useState(5);
  const [hygieneRating, setHygieneRating] = useState(5);
  const [serviceRating, setServiceRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock menu items from order
  const orderedItems = restaurant.menu.slice(0, 2);
  const [itemRatings, setItemRatings] = useState<{ [key: string]: number }>(
    orderedItems.reduce((acc, item) => ({ ...acc, [item.id]: 5 }), {})
  );

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('qr.thankYou')}</h1>
          <p className="text-gray-600">{t('qr.reviewSubmitted')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
            <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('qr.shareExperience')}</h1>
          <p className="text-gray-600">{restaurant.name}</p>
        </div>

        <div className="space-y-6">
          {/* Overall Rating */}
          <Card>
            <div className="text-center">
              <h2 className="text-lg font-bold text-gray-900 mb-4">{t('qr.overallRating')}</h2>
              <div className="flex justify-center mb-2">
                <Rating value={overallRating} onChange={setOverallRating} size="lg" />
              </div>
              <p className="text-sm text-gray-600">
                {overallRating === 5
                  ? 'Mükemmel! 🌟'
                  : overallRating === 4
                  ? 'Çok iyi! 👍'
                  : overallRating === 3
                  ? 'İyi 😊'
                  : overallRating === 2
                  ? 'Orta 😐'
                  : 'Kötü 😞'}
              </p>
            </div>
          </Card>

          {/* Detailed Ratings */}
          <Card>
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('qr.detailedRating')}</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{t('restaurant.ambiance')}</span>
                <Rating value={ambianceRating} onChange={setAmbianceRating} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{t('restaurant.hygiene')}</span>
                <Rating value={hygieneRating} onChange={setHygieneRating} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">{t('restaurant.service')}</span>
                <Rating value={serviceRating} onChange={setServiceRating} />
              </div>
            </div>
          </Card>

          {/* Food Ratings */}
          <Card>
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('qr.foodRating')}</h2>
            <div className="space-y-4">
              {orderedItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                    <Rating
                      value={itemRatings[item.id] || 5}
                      onChange={(value) => setItemRatings(prev => ({ ...prev, [item.id]: value }))}
                      size="sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Comment */}
          <Card>
            <h2 className="text-lg font-bold text-gray-900 mb-4">{t('qr.yourComment')}</h2>
            <TextArea
              value={comment}
              onChange={setComment}
              placeholder={t('qr.commentPlaceholder')}
              rows={5}
            />
          </Card>

          {/* Submit Button */}
          <Button fullWidth size="lg" onClick={handleSubmit}>
            {t('qr.submitReview')}
          </Button>

          <Button
            fullWidth
            size="lg"
            variant="secondary"
            onClick={() => navigate('/')}
          >
            {t('qr.notNow')}
          </Button>
        </div>
      </div>
    </div>
  );
};

