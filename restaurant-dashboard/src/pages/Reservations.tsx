import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Input } from '../components/Input';
import { Modal } from '../components/Modal';
import { 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  Check, 
  X, 
  Eye,
  Search
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';

const mockReservations = [
  {
    id: '1',
    customerName: 'Ahmet Yılmaz',
    customerPhone: '+90 532 123 4567',
    customerEmail: 'ahmet@email.com',
    tableNumber: '5',
    tableCapacity: 4,
    partySize: 3,
    date: '2025-01-20',
    time: '19:30',
    status: 'pending',
    reservationFee: 50,
    notes: 'Doğum günü kutlaması',
    createdAt: '2025-01-19T10:30:00Z'
  },
  {
    id: '2',
    customerName: 'Elif Demir',
    customerPhone: '+90 533 987 6543',
    customerEmail: 'elif@email.com',
    tableNumber: '2',
    tableCapacity: 2,
    partySize: 2,
    date: '2025-01-20',
    time: '20:00',
    status: 'confirmed',
    reservationFee: 25,
    notes: '',
    createdAt: '2025-01-19T14:20:00Z'
  },
  {
    id: '3',
    customerName: 'Mehmet Kaya',
    customerPhone: '+90 534 555 1234',
    customerEmail: 'mehmet@email.com',
    tableNumber: '8',
    tableCapacity: 6,
    partySize: 5,
    date: '2025-01-21',
    time: '18:00',
    status: 'completed',
    reservationFee: 75,
    notes: 'İş yemeği',
    createdAt: '2025-01-18T16:45:00Z'
  },
  {
    id: '4',
    customerName: 'Zeynep Özkan',
    customerPhone: '+90 535 777 8899',
    customerEmail: 'zeynep@email.com',
    tableNumber: '3',
    tableCapacity: 4,
    partySize: 4,
    date: '2025-01-21',
    time: '19:00',
    status: 'cancelled',
    reservationFee: 40,
    notes: 'Rezervasyon iptal edildi',
    createdAt: '2025-01-19T09:15:00Z'
  },
  {
    id: '5',
    customerName: 'Can Öztürk',
    customerPhone: '+90 536 444 7890',
    customerEmail: 'can@email.com',
    tableNumber: '1',
    tableCapacity: 2,
    partySize: 2,
    date: '2025-01-20',
    time: '18:30',
    status: 'confirmed',
    reservationFee: 30,
    notes: 'Romantik akşam yemeği',
    createdAt: '2025-01-19T11:45:00Z'
  },
  {
    id: '6',
    customerName: 'Ayşe Şahin',
    customerPhone: '+90 537 888 5555',
    customerEmail: 'ayse@email.com',
    tableNumber: '6',
    tableCapacity: 4,
    partySize: 4,
    date: '2025-01-20',
    time: '20:30',
    status: 'pending',
    reservationFee: 60,
    notes: 'Aile yemeği',
    createdAt: '2025-01-19T15:20:00Z'
  },
  {
    id: '7',
    customerName: 'Burak Kara',
    customerPhone: '+90 538 999 1234',
    customerEmail: 'burak@email.com',
    tableNumber: '4',
    tableCapacity: 6,
    partySize: 6,
    date: '2025-01-21',
    time: '19:30',
    status: 'confirmed',
    reservationFee: 90,
    notes: 'İş arkadaşları ile toplantı',
    createdAt: '2025-01-18T20:30:00Z'
  },
  {
    id: '8',
    customerName: 'Selin Yıldız',
    customerPhone: '+90 539 777 8888',
    customerEmail: 'selin@email.com',
    tableNumber: '7',
    tableCapacity: 4,
    partySize: 3,
    date: '2025-01-21',
    time: '21:00',
    status: 'pending',
    reservationFee: 45,
    notes: '',
    createdAt: '2025-01-19T16:10:00Z'
  },
  {
    id: '9',
    customerName: 'Oğuz Demir',
    customerPhone: '+90 540 666 7777',
    customerEmail: 'oguz@email.com',
    tableNumber: '9',
    tableCapacity: 8,
    partySize: 8,
    date: '2025-01-22',
    time: '19:00',
    status: 'confirmed',
    reservationFee: 120,
    notes: 'Doğum günü partisi',
    createdAt: '2025-01-19T12:00:00Z'
  },
  {
    id: '10',
    customerName: 'Gül Aydın',
    customerPhone: '+90 541 555 4444',
    customerEmail: 'gul@email.com',
    tableNumber: '2',
    tableCapacity: 2,
    partySize: 2,
    date: '2025-01-22',
    time: '20:00',
    status: 'completed',
    reservationFee: 35,
    notes: 'Anneler günü kutlaması',
    createdAt: '2025-01-20T09:30:00Z'
  },
  {
    id: '11',
    customerName: 'Emre Koç',
    customerPhone: '+90 542 333 2222',
    customerEmail: 'emre@email.com',
    tableNumber: '5',
    tableCapacity: 4,
    partySize: 4,
    date: '2025-01-22',
    time: '18:30',
    status: 'pending',
    reservationFee: 55,
    notes: 'Çocuklar için özel menü',
    createdAt: '2025-01-20T14:45:00Z'
  },
  {
    id: '12',
    customerName: 'Deniz Aktaş',
    customerPhone: '+90 543 111 9999',
    customerEmail: 'deniz@email.com',
    tableNumber: '3',
    tableCapacity: 4,
    partySize: 2,
    date: '2025-01-23',
    time: '19:45',
    status: 'confirmed',
    reservationFee: 40,
    notes: 'İlk buluşma',
    createdAt: '2025-01-21T10:15:00Z'
  },
  {
    id: '13',
    customerName: 'Mert Çelik',
    customerPhone: '+90 544 222 3333',
    customerEmail: 'mert@email.com',
    tableNumber: '8',
    tableCapacity: 6,
    partySize: 5,
    date: '2025-01-23',
    time: '20:15',
    status: 'completed',
    reservationFee: 85,
    notes: 'Kurumsal yemek',
    createdAt: '2025-01-20T16:20:00Z'
  },
  {
    id: '14',
    customerName: 'Ece Özdemir',
    customerPhone: '+90 545 444 5555',
    customerEmail: 'ece@email.com',
    tableNumber: '1',
    tableCapacity: 2,
    partySize: 2,
    date: '2025-01-23',
    time: '21:30',
    status: 'cancelled',
    reservationFee: 25,
    notes: 'Hasta olduğu için iptal',
    createdAt: '2025-01-22T08:30:00Z'
  },
  {
    id: '15',
    customerName: 'Arda Yılmaz',
    customerPhone: '+90 546 777 6666',
    customerEmail: 'arda@email.com',
    tableNumber: '6',
    tableCapacity: 4,
    partySize: 3,
    date: '2025-01-24',
    time: '19:00',
    status: 'confirmed',
    reservationFee: 50,
    notes: 'Üniversite mezuniyet kutlaması',
    createdAt: '2025-01-21T13:45:00Z'
  }
];

const Reservations: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDate, setSelectedDate] = useState(new Date('2025-01-20'));
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReservation, setSelectedReservation] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const filteredReservations = mockReservations.filter(reservation => {
    const matchesDate = format(parseISO(reservation.date), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    const matchesStatus = statusFilter === 'all' || reservation.status === statusFilter;
    const matchesSearch = reservation.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.customerPhone.includes(searchTerm) ||
                         reservation.tableNumber.includes(searchTerm);
    
    return matchesDate && matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: 'warning' as const, text: t('reservations.pending') },
      confirmed: { variant: 'success' as const, text: t('reservations.confirmed') },
      completed: { variant: 'info' as const, text: t('reservations.completed') },
      cancelled: { variant: 'danger' as const, text: t('reservations.cancelled') },
      noShow: { variant: 'danger' as const, text: t('reservations.noShow') }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  const updateReservationStatus = (id: string, status: string) => {
    // Mock update function
    console.log(`Reservation ${id} status updated to ${status}`);
  };

  const getStats = () => {
    const today = format(selectedDate, 'yyyy-MM-dd');
    const todayReservations = mockReservations.filter(r => r.date === today);
    
    return {
      total: todayReservations.length,
      pending: todayReservations.filter(r => r.status === 'pending').length,
      confirmed: todayReservations.filter(r => r.status === 'confirmed').length,
      revenue: todayReservations
        .filter(r => r.status === 'completed')
        .reduce((sum, r) => sum + r.reservationFee, 0)
    };
  };

  const stats = getStats();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('reservations.title')}</h1>
        <p className="text-gray-600 mt-1">{t('reservations.subtitle')}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center p-4">
            <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-sm">
              <Calendar className="text-blue-600" size={28} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('reservations.totalReservations')}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center p-4">
            <div className="p-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow-sm">
              <Clock className="text-yellow-600" size={28} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('reservations.pendingReservations')}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.pending}</p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center p-4">
            <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-sm">
              <Check className="text-green-600" size={28} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('reservations.confirmedReservations')}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.confirmed}</p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-200">
          <div className="flex items-center p-4">
            <div className="p-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl shadow-sm">
              <Users className="text-purple-600" size={28} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{t('reservations.reservationRevenue')}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">₺{stats.revenue}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder={t('reservations.searchPlaceholder')}
            value={searchTerm}
            onChange={setSearchTerm}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            <option value="all">{t('reservations.allStatus')}</option>
            <option value="pending">{t('reservations.pending')}</option>
            <option value="confirmed">{t('reservations.confirmed')}</option>
            <option value="completed">{t('reservations.completed')}</option>
            <option value="cancelled">{t('reservations.cancelled')}</option>
          </select>
          <Input
            type="date"
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={(value) => setSelectedDate(new Date(value))}
          />
        </div>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => (
          <Card key={reservation.id} hover className="transition-all duration-200 hover:shadow-lg">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-red-600 font-bold text-xl">
                      {reservation.tableNumber}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">{t('common.table')}</p>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-bold text-lg text-gray-900 truncate">{reservation.customerName}</h3>
                    {getStatusBadge(reservation.status)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-blue-500" />
                      <span className="font-medium">{reservation.partySize} {t('common.persons')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-green-500" />
                      <span className="font-medium">{reservation.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="mr-2 text-purple-500" />
                      <span className="font-medium truncate">{reservation.customerPhone}</span>
                    </div>
                  </div>
                  {reservation.notes && (
                    <div className="mt-3 p-2 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                      <p className="text-sm text-gray-700 italic">
                        <span className="font-medium">Not:</span> {reservation.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end space-y-3">
                <div className="text-right">
                  <p className="text-sm text-gray-500">{t('reservations.reservationFee')}</p>
                  <p className="font-bold text-xl text-gray-900">₺{reservation.reservationFee}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={Eye}
                    onClick={() => {
                      setSelectedReservation(reservation);
                      setIsDetailModalOpen(true);
                    }}
                    className="hover:bg-gray-100"
                  >
                    {t('common.details')}
                  </Button>

                  {reservation.status === 'pending' && (
                    <>
                      <Button
                        variant="success"
                        size="sm"
                        icon={Check}
                        onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                        className="hover:bg-green-600"
                      >
                        {t('reservations.confirm')}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={X}
                        onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                        className="hover:bg-red-600"
                      >
                        {t('reservations.cancel')}
                      </Button>
                    </>
                  )}

                  {reservation.status === 'confirmed' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => updateReservationStatus(reservation.id, 'completed')}
                      className="hover:bg-blue-600"
                    >
                      {t('reservations.markCompleted')}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredReservations.length === 0 && (
          <Card className="border-2 border-dashed border-gray-200">
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-gray-400" size={48} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {t('reservations.noReservations')}
              </h3>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                {t('reservations.noReservationsMessage')}
              </p>
              <div className="mt-6">
                <Button variant="primary" size="lg">
                  Yeni Rezervasyon Ekle
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Reservation Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={t('reservations.reservationDetails')}
      >
        {selectedReservation && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('reservations.customerName')}
                </label>
                <p className="text-gray-900">{selectedReservation.customerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('reservations.phone')}
                </label>
                <p className="text-gray-900">{selectedReservation.customerPhone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('reservations.email')}
                </label>
                <p className="text-gray-900">{selectedReservation.customerEmail}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('reservations.partySize')}
                </label>
                <p className="text-gray-900">{selectedReservation.partySize} {t('common.persons')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.table')}
                </label>
                <p className="text-gray-900">{t('reservations.table')} {selectedReservation.tableNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('reservations.dateTime')}
                </label>
                <p className="text-gray-900">
                  {format(parseISO(selectedReservation.date), 'dd MMMM yyyy', { locale: tr })} - {selectedReservation.time}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('reservations.reservationFee')}
                </label>
                <p className="text-gray-900 font-semibold">₺{selectedReservation.reservationFee}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.status')}
                </label>
                {getStatusBadge(selectedReservation.status)}
              </div>
            </div>

            {selectedReservation.notes && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('reservations.notes')}
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedReservation.notes}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                variant="secondary"
                onClick={() => setIsDetailModalOpen(false)}
              >
                {t('common.close')}
              </Button>
              
              {selectedReservation.status === 'pending' && (
                <>
                  <Button
                    variant="success"
                    icon={Check}
                    onClick={() => {
                      updateReservationStatus(selectedReservation.id, 'confirmed');
                      setIsDetailModalOpen(false);
                    }}
                  >
                    {t('reservations.confirm')}
                  </Button>
                  <Button
                    variant="danger"
                    icon={X}
                    onClick={() => {
                      updateReservationStatus(selectedReservation.id, 'cancelled');
                      setIsDetailModalOpen(false);
                    }}
                  >
                    {t('reservations.cancel')}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reservations;

