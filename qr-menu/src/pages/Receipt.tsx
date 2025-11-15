import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Check, Download, Share2 } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useLanguage } from '../contexts/LanguageContext';

export const Receipt = () => {
  const { t } = useLanguage();
  const { restaurantId, tableId } = useParams();
  const navigate = useNavigate();

  const restaurant = mockRestaurants.find(r => r.id === restaurantId)!;
  const table = restaurant.tables.find(t => t.id === tableId)!;

  const orderDate = new Date();
  const orderNumber = `#${Math.floor(Math.random() * 10000)}`;

  const items = [
    { name: 'Margherita Pizza', quantity: 2, price: 189, total: 378 },
    { name: 'Tiramisu', quantity: 1, price: 95, total: 95 }
  ];

  const subtotal = 473;
  const serviceFee = 47.30;
  const tip = 47.30;
  const reservationFee = 50; // Mock reservation fee
  const hasReservation = true; // Mock: customer has a reservation
  const total = subtotal + serviceFee + tip - (hasReservation ? reservationFee : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="text-green-600" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('qr.paymentSuccessful')}</h1>
          <p className="text-gray-600">{t('qr.thankYouForOrder')}</p>
        </div>

        {/* Receipt */}
        <Card className="mb-6">
          {/* Header */}
          <div className="text-center border-b pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{restaurant.name}</h2>
            <p className="text-sm text-gray-600">{restaurant.location.address}</p>
            <p className="text-sm text-gray-600">
              {restaurant.location.district}, {restaurant.location.city}
            </p>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 py-4 border-b">
            <div>
              <p className="text-sm text-gray-600">{t('qr.orderNumber')}</p>
              <p className="font-bold text-gray-900">{orderNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('qr.table')}</p>
              <p className="font-bold text-gray-900">{t('qr.table')} {table.number}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('qr.date')}</p>
              <p className="font-bold text-gray-900">
                {format(orderDate, 'dd MMMM yyyy', { locale: tr })}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('qr.time')}</p>
              <p className="font-bold text-gray-900">
                {format(orderDate, 'HH:mm')}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="py-4 border-b">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="pb-2">{t('qr.item')}</th>
                  <th className="pb-2 text-center">{t('qr.quantity')}</th>
                  <th className="pb-2 text-right">{t('common.price')}</th>
                  <th className="pb-2 text-right">{t('common.total')}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index} className="text-sm">
                    <td className="py-2">{item.name}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">₺{item.price}</td>
                    <td className="py-2 text-right font-semibold">₺{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="py-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>{t('common.subtotal')}</span>
              <span>₺{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{t('qr.serviceFee')}</span>
              <span>₺{serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{t('qr.tip')}</span>
              <span>₺{tip.toFixed(2)}</span>
            </div>
            {hasReservation && (
              <div className="flex justify-between text-green-600">
                <span>{t('qr.reservationFeeDeduction')}</span>
                <span>-₺{reservationFee.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between text-xl font-bold">
              <span>{t('common.total').toUpperCase()}</span>
              <span className="text-primary-600">₺{total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-600">{t('qr.paymentMethod')}</p>
            <p className="font-semibold text-gray-900">{t('qr.creditCard')} (**** 1234)</p>
          </div>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Button variant="secondary" icon={Download} fullWidth>
            {t('qr.downloadReceipt')}
          </Button>
          <Button variant="secondary" icon={Share2} fullWidth>
            {t('qr.share')}
          </Button>
        </div>

        {/* Next Steps */}
        <div className="space-y-3">
          <Button
            fullWidth
            size="lg"
            onClick={() => navigate(`/review/${restaurantId}/${tableId}`)}
          >
            {t('qr.rateExperience')}
          </Button>
          <Button
            fullWidth
            size="lg"
            variant="secondary"
            onClick={() => navigate(`/menu/${restaurantId}/${tableId}`)}
          >
            {t('qr.backToMenu')}
          </Button>
        </div>

        {/* Thank You Note */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Tekrar görüşmek dileğiyle, afiyet olsun! 🍽️
          </p>
        </div>
      </div>
    </div>
  );
};

