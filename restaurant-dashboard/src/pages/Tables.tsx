import { useState } from 'react';
import { Card, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Input, Select } from '../components/Input';
import { Plus, QrCode, Armchair, Users } from 'lucide-react';
import { mockRestaurants } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

export const Tables = () => {
  const { t } = useLanguage();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<any>(null);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [newTableCapacity, setNewTableCapacity] = useState('');

  const restaurant = mockRestaurants[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'success';
      case 'occupied':
        return 'danger';
      case 'reserved':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return t('common.available');
      case 'occupied':
        return t('common.occupied');
      case 'reserved':
        return t('common.reserved');
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('tables.title')}</h1>
          <p className="text-gray-600 mt-1">{t('tables.subtitle')}</p>
        </div>
        <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>
          {t('tables.addNew')}
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Armchair className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('tables.totalTables')}</p>
              <p className="text-2xl font-bold text-gray-900">{restaurant.tables.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Armchair className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('common.available')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {restaurant.tables.filter(t => t.status === 'available').length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Armchair className="text-red-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('common.occupied')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {restaurant.tables.filter(t => t.status === 'occupied').length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('common.capacity')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {restaurant.tables.reduce((sum, t) => sum + t.capacity, 0)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurant.tables.map((table) => (
          <Card key={table.id} hover>
              <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{t('common.table')} {table.number}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <Users size={16} />
                    {table.capacity} {t('common.persons')}
                  </p>
                </div>
                <Badge variant={getStatusColor(table.status) as any}>
                  {getStatusText(table.status)}
                </Badge>
              </div>

              {/* QR Code */}
              <div className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                <img
                  src={table.qrCode}
                  alt={`QR Code for Table ${table.number}`}
                  className="w-32 h-32 mb-2"
                />
                <p className="text-xs text-gray-500 text-center">
                  {t('tables.scan')}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  icon={QrCode}
                  onClick={() => setSelectedTable(table)}
                >
                  {t('tables.viewQR')}
                </Button>
                <Button variant="primary" size="sm" fullWidth>
                  {t('common.edit')}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Table Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={t('tables.addNew')}
      >
        <div className="space-y-4">
          <Input
            label={t('tables.tableNumber')}
            value={newTableNumber}
            onChange={setNewTableNumber}
            placeholder={t('tables.numberPlaceholder')}
            required
          />
          <Select
            label={t('common.capacity')}
            value={newTableCapacity}
            onChange={setNewTableCapacity}
            options={[
              { value: '2', label: `2 ${t('common.persons')}` },
              { value: '4', label: `4 ${t('common.persons')}` },
              { value: '6', label: `6 ${t('common.persons')}` },
              { value: '8', label: `8 ${t('common.persons')}` },
              { value: '10', label: `10 ${t('common.persons')}` }
            ]}
            placeholder={t('tables.capacitySelect')}
            required
          />
          <div className="flex gap-3 mt-6">
            <Button variant="secondary" fullWidth onClick={() => setIsAddModalOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button fullWidth onClick={() => {
              // Demo için sadece modal'ı kapat
              setIsAddModalOpen(false);
              setNewTableNumber('');
              setNewTableCapacity('');
            }}>
              {t('tables.addNew')}
            </Button>
          </div>
        </div>
      </Modal>

      {/* QR Code Modal */}
      {selectedTable && (
        <Modal
          isOpen={!!selectedTable}
          onClose={() => setSelectedTable(null)}
          title={`${t('common.table')} ${selectedTable.number} - ${t('tables.qrTitle')}`}
        >
          <div className="text-center">
            <img
              src={selectedTable.qrCode}
              alt={`QR Code for Table ${selectedTable.number}`}
              className="w-64 h-64 mx-auto mb-4"
            />
            <p className="text-gray-600 mb-4">
              {t('tables.qrMessage')}
            </p>
            <Button fullWidth onClick={() => setSelectedTable(null)}>
              {t('common.ok')}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

