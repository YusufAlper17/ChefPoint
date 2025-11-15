import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';
import { QrCode, UtensilsCrossed } from 'lucide-react';
import { motion } from 'framer-motion';
import { mockRestaurants } from '../data/mockData';

export const QRScan = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Demo amaçlı - ilk restoranın ilk masası
  const demoRestaurant = mockRestaurants[0];
  const demoTable = demoRestaurant.tables[0];

  const handleScanDemo = () => {
    navigate(`/menu/${demoRestaurant.id}/${demoTable.id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-orange-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-600 rounded-3xl mb-6">
          <UtensilsCrossed className="text-white" size={40} />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('qr.digitalMenu')}</h1>
        <p className="text-gray-600 mb-8">{t('qr.scanQR')}</p>

        {/* QR Code Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: 'reverse' }}
          className="w-64 h-64 mx-auto mb-8 bg-white rounded-2xl shadow-xl p-6 flex items-center justify-center"
        >
          <QrCode size={200} className="text-gray-300" />
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">{t('qr.howToUse')}</h3>
          <div className="space-y-3 text-left text-sm text-gray-600">
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xs">
                1
              </span>
              <p>{t('qr.step1')}</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xs">
                2
              </span>
              <p>{t('qr.step2')}</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-xs">
                3
              </span>
              <p>{t('qr.step3')}</p>
            </div>
          </div>
        </div>

        {/* Demo Button */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
          <p className="text-sm text-blue-800 mb-3">
            <strong>{t('qr.demoMode')}:</strong> {t('qr.demoDesc')}
          </p>
          <Button fullWidth size="lg" onClick={handleScanDemo}>
            {t('qr.openDemoMenu')} ({t('qr.table')} {demoTable.number})
          </Button>
        </div>

        <p className="text-xs text-gray-500">
          {t('qr.scanIssue')}
        </p>
      </motion.div>
    </div>
  );
};

