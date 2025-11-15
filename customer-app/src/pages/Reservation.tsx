import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { 
  Clock, 
  CreditCard,
  Check,
  ArrowLeft,
  MapPin,
  Star
} from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const mockRestaurant = {
  id: '1',
  name: 'Bella Italia',
  image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
  rating: 4.8,
  reviews: 1247,
  address: 'Alsancak, İzmir',
  features: ['Deniz Kenarı', 'Canlı Müzik', 'WiFi', 'Otopark'],
  workingHours: '10:00 - 23:00',
  tables: [
    { id: '1', number: '1', capacity: 2, available: true },
    { id: '2', number: '2', capacity: 4, available: true },
    { id: '3', number: '3', capacity: 2, available: false },
    { id: '4', number: '4', capacity: 6, available: true },
    { id: '5', number: '5', capacity: 4, available: true },
    { id: '6', number: '6', capacity: 8, available: true }
  ],
  reservationFee: 50,
  reservationFeePerPerson: 25
};

const Reservation: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('19:00');
  const [partySize, setPartySize] = useState(2);
  const [selectedTable, setSelectedTable] = useState<string>('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');

  const availableTimeSlots = [
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const availableTables = mockRestaurant.tables.filter(table => 
    table.available && table.capacity >= partySize
  );

  const calculateReservationFee = () => {
    return Math.max(mockRestaurant.reservationFee, partySize * mockRestaurant.reservationFeePerPerson);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReservationSubmit = () => {
    // Mock reservation submission
    console.log('Reservation submitted:', {
      restaurant: mockRestaurant.id,
      date: selectedDate,
      time: selectedTime,
      partySize,
      table: selectedTable,
      customerInfo,
      reservationFee: calculateReservationFee(),
      paymentMethod
    });
    
    setIsPaymentModalOpen(false);
    // Redirect to success page or show success message
  };

  const isFormValid = () => {
    switch (currentStep) {
      case 1:
        return selectedDate && selectedTime && partySize > 0;
      case 2:
        return selectedTable;
      case 3:
        return customerInfo.name && customerInfo.phone && customerInfo.email;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="secondary" size="sm" icon={ArrowLeft}>
              {t('common.back')}
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">{t('reservation.title')}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Restaurant Info */}
          <div className="lg:col-span-1">
            <Card>
              <div className="space-y-4">
                <img 
                  src={mockRestaurant.image} 
                  alt={mockRestaurant.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{mockRestaurant.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="text-yellow-500" size={20} />
                    <span className="font-semibold">{mockRestaurant.rating}</span>
                    <span className="text-gray-500">({mockRestaurant.reviews} {t('common.reviews')})</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <MapPin size={16} />
                    <span>{mockRestaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Clock size={16} />
                    <span>{mockRestaurant.workingHours}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">{t('reservation.features')}</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockRestaurant.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <Card>
              {/* Progress Steps */}
              <div className="flex items-center justify-between mb-8">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      step <= currentStep 
                        ? 'bg-red-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        step < currentStep ? 'bg-red-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">{t('reservation.selectDateTime')}</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('reservation.selectDate')}
                    </label>
                    <Input
                      type="date"
                      value={format(selectedDate, 'yyyy-MM-dd')}
                      onChange={(value) => setSelectedDate(new Date(value))}
                      min={format(new Date(), 'yyyy-MM-dd')}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('reservation.selectTime')}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                            selectedTime === time
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-white text-gray-700 border-gray-300 hover:border-red-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('reservation.partySize')}
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPartySize(Math.max(1, partySize - 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span className="px-4 py-2 bg-gray-100 rounded-lg min-w-[60px] text-center">
                        {partySize}
                      </span>
                      <button
                        onClick={() => setPartySize(Math.min(10, partySize + 1))}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">{t('reservation.selectTable')}</h3>
                  <p className="text-gray-600">{t('reservation.tableSelectionNote')}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {availableTables.map((table) => (
                      <button
                        key={table.id}
                        onClick={() => setSelectedTable(table.id)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedTable === table.id
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-300 hover:border-red-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {table.number}
                          </div>
                          <div className="text-sm text-gray-600">
                            {table.capacity} {t('common.persons')}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">{t('reservation.customerInfo')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label={t('reservation.customerName')}
                      value={customerInfo.name}
                      onChange={(value) => setCustomerInfo({...customerInfo, name: value})}
                      placeholder={t('reservation.namePlaceholder')}
                      required
                    />
                    <Input
                      label={t('reservation.phone')}
                      value={customerInfo.phone}
                      onChange={(value) => setCustomerInfo({...customerInfo, phone: value})}
                      placeholder="+90 532 123 4567"
                      required
                    />
                  </div>
                  
                  <Input
                    label={t('reservation.email')}
                    type="email"
                    value={customerInfo.email}
                    onChange={(value) => setCustomerInfo({...customerInfo, email: value})}
                    placeholder="ornek@email.com"
                    required
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('reservation.specialRequests')}
                    </label>
                    <textarea
                      value={customerInfo.notes}
                      onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      placeholder={t('reservation.requestsPlaceholder')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900">{t('reservation.confirmReservation')}</h3>
                  
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('reservation.restaurant')}</span>
                      <span className="font-semibold">{mockRestaurant.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('reservation.date')}</span>
                      <span className="font-semibold">
                        {format(selectedDate, 'dd MMMM yyyy', { locale: tr })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('reservation.time')}</span>
                      <span className="font-semibold">{selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('reservation.partySize')}</span>
                      <span className="font-semibold">{partySize} {t('common.persons')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('common.table')}</span>
                      <span className="font-semibold">
                        {mockRestaurant.tables.find(t => t.id === selectedTable)?.number}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('reservation.customerName')}</span>
                      <span className="font-semibold">{customerInfo.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('reservation.phone')}</span>
                      <span className="font-semibold">{customerInfo.phone}</span>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-red-900">{t('reservation.reservationFee')}</h4>
                        <p className="text-sm text-red-700">{t('reservation.feeDescription')}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-red-900">₺{calculateReservationFee()}</div>
                        <div className="text-sm text-red-700">
                          {partySize} × ₺{mockRestaurant.reservationFeePerPerson}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  variant="secondary"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  {t('common.back')}
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!isFormValid()}
                >
                  {currentStep === 4 ? t('reservation.proceedToPayment') : t('common.next')}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title={t('reservation.payment')}
      >
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">{t('reservation.paymentSummary')}</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('reservation.reservationFee')}</span>
                <span className="font-semibold">₺{calculateReservationFee()}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>{t('common.total')}</span>
                  <span>₺{calculateReservationFee()}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">{t('reservation.paymentMethod')}</h4>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <CreditCard size={20} className="mr-3 text-gray-600" />
                <span>{t('reservation.creditCard')}</span>
              </label>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <Check className="text-yellow-600 mt-0.5 mr-2" size={20} />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold mb-1">{t('reservation.feeRefundInfo')}</p>
                <p>{t('reservation.feeRefundDescription')}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              variant="secondary"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              {t('common.cancel')}
            </Button>
            <Button onClick={handleReservationSubmit}>
              {t('reservation.payAndReserve')}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Reservation;

