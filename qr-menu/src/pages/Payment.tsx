import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { CreditCard, Banknote, Coins, Check } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Payment = () => {
  const { t } = useLanguage();
  const { restaurantId, tableId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [tipPercentage, setTipPercentage] = useState(10);
  const [isProcessing, setIsProcessing] = useState(false);

  const restaurant = mockRestaurants.find(r => r.id === restaurantId)!;
  const table = restaurant.tables.find(t => t.id === tableId)!;

  // Mock cart data
  const subtotal = 473;
  const serviceFee = subtotal * 0.1;
  const tip = subtotal * (tipPercentage / 100);
  const reservationFee = 50; // Mock reservation fee
  const hasReservation = true; // Mock: customer has a reservation
  const total = subtotal + serviceFee + tip - (hasReservation ? reservationFee : 0);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      navigate(`/receipt/${restaurantId}/${tableId}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900">{t('qr.payment')}</h1>
          <p className="text-sm text-gray-600">{restaurant.name} • {t('qr.table')} {table.number}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Payment Method */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('qr.paymentMethod')}</h2>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard size={32} className={paymentMethod === 'card' ? 'text-primary-600' : 'text-gray-600'} />
              <span className="font-semibold text-gray-900">{t('qr.creditCard')}</span>
            </button>
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all ${
                paymentMethod === 'cash'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Banknote size={32} className={paymentMethod === 'cash' ? 'text-primary-600' : 'text-gray-600'} />
              <span className="font-semibold text-gray-900">{t('qr.cash')}</span>
            </button>
          </div>
        </Card>

        {/* Tip */}
        <Card>
          <div className="flex items-center gap-2 mb-4">
            <Coins className="text-primary-600" size={24} />
            <h2 className="text-lg font-bold text-gray-900">{t('qr.tip')}</h2>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[0, 10, 15, 20].map((percent) => (
              <button
                key={percent}
                onClick={() => setTipPercentage(percent)}
                className={`py-3 rounded-lg font-semibold transition-all ${
                  tipPercentage === percent
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {percent === 0 ? t('qr.noTip') : `%${percent}`}
              </button>
            ))}
          </div>
          {tipPercentage > 0 && (
            <div className="bg-primary-50 rounded-lg p-3">
              <p className="text-sm text-primary-900">
                {t('qr.tipAmount')}: <strong>₺{tip.toFixed(2)}</strong>
              </p>
            </div>
          )}
        </Card>

        {/* Payment Summary */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-4">{t('qr.paymentSummary')}</h2>
          
          {hasReservation && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-start">
                <Check className="text-green-600 mt-0.5 mr-2" size={20} />
                <div className="text-sm text-green-800">
                  <p className="font-semibold mb-1">{t('qr.reservationFeeInfo')}</p>
                  <p>{t('qr.reservationFeeDescription')}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>{t('common.subtotal')}</span>
              <span>₺{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>{t('qr.serviceFee')} (%10)</span>
              <span>₺{serviceFee.toFixed(2)}</span>
            </div>
            {tipPercentage > 0 && (
              <div className="flex justify-between text-gray-700">
                <span>{t('qr.tip')} (%{tipPercentage})</span>
                <span>₺{tip.toFixed(2)}</span>
              </div>
            )}
            {hasReservation && (
              <div className="flex justify-between text-green-600">
                <span>{t('qr.reservationFeeDeduction')}</span>
                <span>-₺{reservationFee.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between text-xl font-bold">
              <span>{t('common.total')}</span>
              <span className="text-primary-600">₺{total.toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Payment Button */}
        <Button
          fullWidth
          size="lg"
          onClick={handlePayment}
          disabled={isProcessing}
        >
          {isProcessing ? t('qr.processing') : `${t('qr.pay')} • ₺${total.toFixed(2)}`}
        </Button>

        {paymentMethod === 'cash' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>{t('qr.cashPayment')}:</strong> {t('qr.cashPaymentNote')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

