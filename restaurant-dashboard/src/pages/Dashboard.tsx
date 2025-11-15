import { Card, CardHeader } from '../components/Card';
import { Badge } from '../components/Badge';
import { TrendingUp, Users, ShoppingBag, DollarSign, Armchair } from 'lucide-react';
import { mockRestaurants, mockOrders } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';

export const Dashboard = () => {
  const { t } = useLanguage();
  const restaurant = mockRestaurants[0]; // Bella Italia
  const orders = mockOrders.filter(o => o.restaurantId === restaurant.id);

  const stats = [
    {
      title: t('dashboard.todayOrders'),
      value: '24',
      change: '+12%',
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      title: t('dashboard.dailyRevenue'),
      value: '₺8,450',
      change: '+8%',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: t('dashboard.activeTables'),
      value: '8/12',
      change: '67%',
      icon: Armchair,
      color: 'bg-orange-500'
    },
    {
      title: t('dashboard.satisfaction'),
      value: restaurant.rating.toFixed(1),
      change: '+0.2',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ];

  const weeklyData = [
    { day: 'Pzt', orders: 18, revenue: 6200 },
    { day: 'Sal', orders: 22, revenue: 7800 },
    { day: 'Çar', orders: 20, revenue: 7100 },
    { day: 'Per', orders: 25, revenue: 8900 },
    { day: 'Cum', orders: 32, revenue: 11200 },
    { day: 'Cmt', orders: 38, revenue: 13500 },
    { day: 'Paz', orders: 35, revenue: 12100 }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { variant: 'success' | 'warning' | 'info' | 'danger'; text: string } } = {
      pending: { variant: 'warning', text: t('orders.pending') },
      preparing: { variant: 'info', text: t('orders.preparing') },
      ready: { variant: 'success', text: t('orders.ready') },
      served: { variant: 'success', text: t('orders.served') },
      completed: { variant: 'success', text: t('orders.completed') }
    };
    const status_info = statusMap[status] || { variant: 'info' as const, text: status };
    return <Badge variant={status_info.variant}>{status_info.text}</Badge>;
  };

  return (
    <div className="p-6 md:p-8">
      {/* Hero */}
      <div className="mb-8">
        <div className="bg-white/70 backdrop-blur rounded-2xl ring-1 ring-black/5 p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-56 h-56 bg-gradient-to-br from-brand-200 to-pink-200 rounded-full opacity-40 blur-2xl pointer-events-none" />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
              {t('dashboard.title')}
            </span>
          </h1>
          <p className="text-gray-600 mt-2">{t('dashboard.welcome')}, {restaurant.name}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <TrendingUp size={14} />
                  {stat.change}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Weekly Orders Chart */}
        <Card>
          <CardHeader title={t('dashboard.weeklyOrders')} subtitle={t('dashboard.last7days')} />
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="orders" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Table Status */}
        <Card>
          <CardHeader title={t('dashboard.tableStatus')} subtitle={t('dashboard.liveView')} />
          <div className="grid grid-cols-3 gap-4">
            {restaurant.tables.map((table) => (
              <div
                key={table.id}
                className={`p-4 rounded-lg border-2 ${
                  table.status === 'available'
                    ? 'border-green-200 bg-green-50'
                    : table.status === 'occupied'
                    ? 'border-red-200 bg-red-50'
                    : 'border-yellow-200 bg-yellow-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">Masa {table.number}</span>
                  <Armchair
                    size={16}
                    className={
                      table.status === 'available'
                        ? 'text-green-600'
                        : table.status === 'occupied'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }
                  />
                </div>
                <p className="text-sm text-gray-600">{table.capacity} {t('tables.persons')}</p>
                <Badge
                  variant={
                    table.status === 'available'
                      ? 'success'
                      : table.status === 'occupied'
                      ? 'danger'
                      : 'warning'
                  }
                  size="sm"
                >
                  {table.status === 'available'
                    ? t('tables.available')
                    : table.status === 'occupied'
                    ? t('tables.occupied')
                    : t('tables.reserved')}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader title={t('dashboard.recentOrders')} subtitle={t('dashboard.todaysOrders')} />
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-semibold text-gray-900">
                    {t('tables.table')} {restaurant.tables.find(t => t.id === order.tableId)?.number}
                  </span>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-sm text-gray-600">
                  {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">₺{order.totalAmount}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleTimeString('tr-TR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

