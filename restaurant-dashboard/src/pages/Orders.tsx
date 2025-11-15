import { useState } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { ShoppingBag, Clock, CheckCircle, XCircle } from 'lucide-react';
import { mockRestaurants, mockOrders } from '../data/mockData';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useLanguage } from '../contexts/LanguageContext';

export const Orders = () => {
  const { t } = useLanguage();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const restaurant = mockRestaurants[0];
  const orders = mockOrders.filter(o => o.restaurantId === restaurant.id);

  const statusOptions = [
    { value: 'all', label: t('common.all'), icon: ShoppingBag },
    { value: 'pending', label: t('common.pending'), icon: Clock },
    { value: 'preparing', label: t('common.preparing'), icon: Clock },
    { value: 'ready', label: t('common.ready'), icon: CheckCircle },
    { value: 'served', label: t('common.served'), icon: CheckCircle }
  ];

  const filteredOrders = selectedStatus === 'all'
    ? orders
    : orders.filter(order => order.status === selectedStatus);

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { variant: 'success' | 'warning' | 'info' | 'danger'; key: string } } = {
      pending: { variant: 'warning', key: 'common.pending' },
      preparing: { variant: 'info', key: 'common.preparing' },
      ready: { variant: 'success', key: 'common.ready' },
      served: { variant: 'success', key: 'common.served' },
      completed: { variant: 'success', key: 'common.completed' }
    };
    const statusInfo = statusMap[status] || { variant: 'info' as const, key: status };
    return <Badge variant={statusInfo.variant}>{t(statusInfo.key)}</Badge>;
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // Demo için sadece console log
    console.log(`Order ${orderId} status updated to ${newStatus}`);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('orders.title')}</h1>
        <p className="text-gray-600 mt-1">{t('orders.subtitle')}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ShoppingBag className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('orders.totalOrders')}</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="text-yellow-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('common.pending')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('common.preparing')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'preparing').length}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t('common.completed')}</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'served' || o.status === 'completed').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Status Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {statusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setSelectedStatus(option.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedStatus === option.value
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <option.icon size={18} />
            {option.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const table = restaurant.tables.find(t => t.id === order.tableId);
          
          return (
            <Card key={order.id}>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Order Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {t('common.table')} {table?.number}
                        </h3>
                        {getStatusBadge(order.status)}
                      </div>
                      <p className="text-sm text-gray-500">
                        {t('orders.orderNumber')}{order.id} · {formatDistanceToNow(new Date(order.createdAt), { 
                          addSuffix: true,
                          locale: tr 
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-600">₺{order.totalAmount}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">{t('orders.orderDetail')}</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-700">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-medium text-gray-900">₺{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.notes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-sm text-yellow-800">
                        <strong>{t('orders.note')}</strong> {order.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="md:w-48 flex md:flex-col gap-2">
                  {order.status === 'pending' && (
                    <Button
                      fullWidth
                      variant="primary"
                      onClick={() => updateOrderStatus(order.id, 'preparing')}
                    >
                      {t('orders.startPreparing')}
                    </Button>
                  )}
                  {order.status === 'preparing' && (
                    <Button
                      fullWidth
                      variant="success"
                      onClick={() => updateOrderStatus(order.id, 'ready')}
                    >
                      {t('orders.markReady')}
                    </Button>
                  )}
                  {order.status === 'ready' && (
                    <Button
                      fullWidth
                      variant="success"
                      onClick={() => updateOrderStatus(order.id, 'served')}
                    >
                      {t('orders.markServed')}
                    </Button>
                  )}
                  <Button
                    fullWidth
                    variant="secondary"
                  >
                    {t('common.details')}
                  </Button>
                  <Button
                    fullWidth
                    variant="danger"
                    icon={XCircle}
                  >
                    {t('orders.cancelOrder')}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('orders.noOrders')}
            </h3>
            <p className="text-gray-600">
              {t('orders.noOrdersMessage')}
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};
