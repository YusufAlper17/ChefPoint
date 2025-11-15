import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Translations> = {
  tr: {
    // Common
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.delete': 'Sil',
    'common.edit': 'Düzenle',
    'common.add': 'Ekle',
    'common.search': 'Ara',
    'common.close': 'Kapat',
    'common.loading': 'Yükleniyor...',
    'common.yes': 'Evet',
    'common.no': 'Hayır',
    'common.or': 'veya',
    'common.ok': 'Tamam',
    'common.pending': 'Beklemede',
    'common.preparing': 'Hazırlanıyor',
    'common.ready': 'Hazır',
    'common.served': 'Servis Edildi',
    'common.completed': 'Tamamlandı',
    'common.table': 'Masa',
    'common.total': 'Toplam',
    
    // Chef Point - Home
    'chef.welcome': 'Hoş Geldiniz',
    'chef.title': 'Chef Point',
    'chef.subtitle': 'Mutfak Yönetim Sistemi',
    'chef.activeOrders': 'Aktif Siparişler',
    'chef.pendingOrders': 'Bekleyen Siparişler',
    'chef.preparingOrders': 'Hazırlanan Siparişler',
    'chef.readyOrders': 'Hazır Siparişler',
    'chef.completedToday': 'Bugün Tamamlanan',
    'chef.orderNumber': 'Sipariş #',
    'chef.items': 'Ürün',
    'chef.startPreparing': 'Hazırlamaya Başla',
    'chef.markReady': 'Hazır İşaretle',
    'chef.markCompleted': 'Tamamlandı İşaretle',
    'chef.noOrders': 'Sipariş Yok',
    'chef.noOrdersMessage': 'Şu anda bu durumda sipariş bulunmuyor.',
    'chef.orderDetails': 'Sipariş Detayları',
    'chef.prepTime': 'Hazırlama Süresi',
    'chef.notes': 'Notlar',
    'chef.minutes': 'dakika',
  },
  en: {
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.search': 'Search',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.yes': 'Yes',
    'common.no': 'No',
    'common.or': 'or',
    'common.ok': 'OK',
    'common.pending': 'Pending',
    'common.preparing': 'Preparing',
    'common.ready': 'Ready',
    'common.served': 'Served',
    'common.completed': 'Completed',
    'common.table': 'Table',
    'common.total': 'Total',
    
    // Chef Point - Home
    'chef.welcome': 'Welcome',
    'chef.title': 'Chef Point',
    'chef.subtitle': 'Kitchen Management System',
    'chef.activeOrders': 'Active Orders',
    'chef.pendingOrders': 'Pending Orders',
    'chef.preparingOrders': 'Preparing Orders',
    'chef.readyOrders': 'Ready Orders',
    'chef.completedToday': 'Completed Today',
    'chef.orderNumber': 'Order #',
    'chef.items': 'Items',
    'chef.startPreparing': 'Start Preparing',
    'chef.markReady': 'Mark Ready',
    'chef.markCompleted': 'Mark Completed',
    'chef.noOrders': 'No Orders',
    'chef.noOrdersMessage': 'There are no orders in this status at the moment.',
    'chef.orderDetails': 'Order Details',
    'chef.prepTime': 'Preparation Time',
    'chef.notes': 'Notes',
    'chef.minutes': 'minutes',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'tr') ? saved : 'tr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const translation = translations[language][key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

