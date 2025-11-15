import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard, DollarSign, CheckCircle, ChevronLeft,
  Receipt, Download, Home
} from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useLanguage } from '../contexts/LanguageContext';
import { restaurant, currentTableNumber, TableOrder } from '../data/mockData';

export const Payment = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [tip, setTip] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  const orders: TableOrder[] = JSON.parse(localStorage.getItem('tableOrders') || '[]');
  const subtotal = orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
  const serviceFee = subtotal * 0.10;
  const total = subtotal + serviceFee + tip;

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setPaymentSuccess(true);
    
    // Clear orders after successful payment
    localStorage.removeItem('tableOrders');
  };

  const handleDownloadReceipt = () => {
    // Create receipt content
    const receiptContent = `
═══════════════════════════════
${restaurant.name}
═══════════════════════════════
Masa: ${currentTableNumber}
Tarih: ${new Date().toLocaleDateString('tr-TR')}
Saat: ${new Date().toLocaleTimeString('tr-TR')}
───────────────────────────────
ÜRÜNLER
───────────────────────────────
${orders.map(order => 
  `${order.quantity}x ${order.name}\n   ${(order.price * order.quantity).toFixed(2)}₺`
).join('\n')}
───────────────────────────────
Ara Toplam:     ${subtotal.toFixed(2)}₺
Servis (%10):   ${serviceFee.toFixed(2)}₺
${tip > 0 ? `Bahşiş:         ${tip.toFixed(2)}₺\n` : ''}───────────────────────────────
TOPLAM:         ${total.toFixed(2)}₺
═══════════════════════════════
Ödeme: ${paymentMethod === 'card' ? 'Kredi Kartı' : 'Nakit'}
${paymentMethod === 'card' ? `Kart: **** **** **** ${cardNumber.slice(-4)}` : ''}

Teşekkür ederiz!
Tekrar görüşmek dileğiyle...
═══════════════════════════════
    `;

    // Create and download file
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fiş-masa${currentTableNumber}-${new Date().getTime()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="text-center p-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="text-green-600" size={48} />
            </motion.div>

            <h1 className="text-3xl font-display font-bold text-gray-900 mb-3">
              {t('payment.success')}
            </h1>
            <p className="text-gray-600 mb-8">
              {t('payment.successDesc')}
            </p>

            {/* Receipt */}
            <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
              <div className="flex items-center gap-2 mb-4">
                <Receipt className="text-primary-600" size={24} />
                <h3 className="font-bold text-gray-900">{t('payment.receipt')}</h3>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>{restaurant.name}</span>
                  <span>Masa {currentTableNumber}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{new Date().toLocaleDateString('tr-TR')}</span>
                  <span>{new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                
                <div className="border-t border-gray-300 my-3"></div>

                {orders.map((order, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-700">
                      {order.quantity}x {order.name}
                    </span>
                    <span className="font-semibold">₺{(order.price * order.quantity).toFixed(2)}</span>
                  </div>
                ))}

                <div className="border-t border-gray-300 my-3"></div>

                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span>₺{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.serviceFee')} (10%)</span>
                  <span>₺{serviceFee.toFixed(2)}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>{t('payment.tip')}</span>
                    <span>₺{tip.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t-2 border-gray-400 my-3"></div>

                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>{t('common.total')}</span>
                  <span className="text-primary-600">₺{total.toFixed(2)}</span>
                </div>

                <div className="text-xs text-gray-500 mt-3">
                  {t('payment.method')}: {paymentMethod === 'card' ? t('payment.creditCard') : t('payment.cash')}
                  {paymentMethod === 'card' && ` (**** ${cardNumber.slice(-4)})`}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="lg"
                fullWidth
                icon={Download}
                onClick={handleDownloadReceipt}
              >
                {t('payment.downloadReceipt')}
              </Button>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={Home}
                onClick={() => navigate('/')}
              >
                {t('payment.goBackToMenu')}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ChevronLeft size={24} />
            <span className="font-semibold">{t('common.back')}</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
          {t('payment.title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-4">{t('payment.method')}</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className="mx-auto mb-2 text-primary-600" size={32} />
                  <p className="font-semibold text-gray-900">{t('payment.creditCard')}</p>
                </button>
                <button
                  onClick={() => setPaymentMethod('cash')}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'cash'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <DollarSign className="mx-auto mb-2 text-primary-600" size={32} />
                  <p className="font-semibold text-gray-900">{t('payment.cash')}</p>
                </button>
              </div>
            </Card>

            {/* Card Details */}
            {paymentMethod === 'card' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Kart Bilgileri</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('payment.cardNumber')}
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                        maxLength={19}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('payment.cardHolder')}
                      </label>
                      <input
                        type="text"
                        placeholder="AD SOYAD"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('payment.expiryDate')}
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          maxLength={5}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t('payment.cvv')}
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          maxLength={3}
                          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Tip Selection */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-2">{t('payment.tip')}</h2>
              <p className="text-sm text-gray-600 mb-4">{t('payment.tipDesc')}</p>
              <div className="grid grid-cols-4 gap-3">
                {[0, 10, 20, 30].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setTip(amount)}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      tip === amount
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {amount === 0 ? t('payment.noTip') : `₺${amount}`}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card className="bg-gradient-to-br from-primary-50 to-amber-50 border-2 border-primary-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Sipariş Özeti</h2>

                <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                  {orders.map((order, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {order.quantity}x {order.name}
                      </span>
                      <span className="font-semibold">₺{(order.price * order.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-primary-300 pt-3 space-y-2 mb-4">
                  <div className="flex justify-between text-gray-700">
                    <span>{t('cart.subtotal')}</span>
                    <span className="font-semibold">₺{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>{t('cart.serviceFee')} (10%)</span>
                    <span className="font-semibold">₺{serviceFee.toFixed(2)}</span>
                  </div>
                  {tip > 0 && (
                    <div className="flex justify-between text-gray-700">
                      <span>{t('payment.tip')}</span>
                      <span className="font-semibold">₺{tip.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className="border-t-2 border-primary-400 pt-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">{t('common.total')}</span>
                    <span className="text-2xl font-bold text-primary-600">₺{total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  icon={CreditCard}
                  onClick={handlePayment}
                  loading={isProcessing}
                  disabled={paymentMethod === 'card' && (!cardNumber || !cardHolder || !expiryDate || !cvv)}
                >
                  {isProcessing ? t('payment.processing') : t('payment.pay')}
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





