import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'tr' | 'en';

interface Translations {
  [key: string]: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: { [key: string]: string | number }) => string;
}

const translations: Record<Language, Translations> = {
  tr: {
    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Bir hata oluştu',
    'common.total': 'Toplam',
    'common.quantity': 'Adet',
    'common.add': 'Ekle',
    'common.remove': 'Çıkar',
    'common.close': 'Kapat',
    'common.back': 'Geri',
    'common.next': 'İleri',
    'common.confirm': 'Onayla',
    'common.cancel': 'İptal',
    'common.persons': 'Kişi',
    
    // Table
    'table.number': 'Masa',
    'table.capacity': 'Kişilik',
    'table.currentOrders': 'Güncel Siparişler',
    'table.totalAmount': 'Toplam Tutar',
    'table.noOrders': 'Henüz sipariş verilmedi',
    'table.orderStatus.pending': 'Bekliyor',
    'table.orderStatus.preparing': 'Hazırlanıyor',
    'table.orderStatus.ready': 'Hazır',
    'table.orderStatus.served': 'Servis Edildi',
    
    // Menu
    'menu.title': 'Menü',
    'menu.categories': 'Kategoriler',
    'menu.all': 'Tümü',
    'menu.popular': 'Popüler',
    'menu.searchPlaceholder': 'Menüde ara...',
    'menu.calories': 'kalori',
    'menu.preparationTime': 'dk',
    'menu.addToTable': 'Masaya Ekle',
    'menu.itemDetails': 'Ürün Detayları',
    'menu.ingredients': 'İçindekiler',
    'menu.allergens': 'Alerjenler',
    'menu.reviews': 'Yorumlar',
    'menu.rating': 'Puan',
    'menu.vegan': 'Vegan',
    'menu.vegetarian': 'Vejetaryen',
    'menu.glutenFree': 'Glutensiz',
    'menu.spicyLevel': 'Acılık Seviyesi',
    
    // Restaurant
    'restaurant.about': 'Hakkımızda',
    'restaurant.info': 'Restoran Bilgileri',
    'restaurant.phone': 'Telefon',
    'restaurant.address': 'Adres',
    'restaurant.workingHours': 'Çalışma Saatleri',
    'restaurant.features': 'Özellikler',
    'restaurant.rating': 'Puan',
    'restaurant.reviews': 'Değerlendirme',
    
    // Cart/Orders
    'cart.title': 'Sipariş Özeti',
    'cart.empty': 'Henüz sipariş vermediniz',
    'cart.emptyDesc': 'Menüden ürün seçerek siparişinizi oluşturun',
    'cart.goToMenu': 'Menüye Dön',
    'cart.subtotal': 'Ara Toplam',
    'cart.serviceFee': 'Servis Ücreti',
    'cart.tableFee': 'Masa Ücreti',
    'cart.sendOrder': 'Siparişi Gönder',
    'cart.proceedToPayment': 'Ödemeye Geç',
    'cart.orderNote': 'Sipariş Notu',
    'cart.orderNotePlaceholder': 'Özel isteklerinizi buraya yazabilirsiniz...',
    'cart.orderSent': 'Sipariş Gönderildi!',
    'cart.orderSentDesc': 'Siparişiniz mutfağa iletildi. Hazır olduğunda size servis edilecek.',
    'cart.sendToKitchen': 'Mutfağa Gönder',
    'cart.orderStatus': 'Sipariş Durumu',
    'cart.viewCart': 'Sepeti Görüntüle',
    'cart.newOrder': 'Yeni Sipariş Ver',
    'cart.orderTracking': 'Sipariş Takibi',
    'cart.orderTrackingDesc': 'Siparişleriniz otomatik olarak güncellenir. Hazır olduğunda ödeme yapabilir ve yeni siparişler verebilirsiniz.',
    
    // Payment
    'payment.title': 'Ödeme',
    'payment.method': 'Ödeme Yöntemi',
    'payment.creditCard': 'Kredi/Banka Kartı',
    'payment.cash': 'Nakit',
    'payment.cardNumber': 'Kart Numarası',
    'payment.cardHolder': 'Kart Sahibi',
    'payment.expiryDate': 'Son Kullanma',
    'payment.cvv': 'CVV',
    'payment.pay': 'Ödeme Yap',
    'payment.processing': 'İşleniyor...',
    'payment.success': 'Ödeme Başarılı!',
    'payment.successDesc': 'Ödemeniz alınmıştır. Afiyet olsun!',
    'payment.tip': 'Bahşiş',
    'payment.tipDesc': 'Hizmetimizden memnun kaldıysanız bahşiş bırakabilirsiniz',
    'payment.noTip': 'Bahşiş Yok',
    'payment.receipt': 'Fiş',
    'payment.downloadReceipt': 'Fişi İndir',
    'payment.goBackToMenu': 'Menüye Dön',
    
    // Actions
    'action.callWaiter': 'Garson Çağır',
    'action.waiterCalled': 'Garson çağrıldı!',
    'action.requestBill': 'Hesap İste',
    'action.billRequested': 'Hesap istendi!',
    'action.viewRestaurant': 'Restoran Bilgileri',
    'action.changeLanguage': 'Dil Değiştir',
    
    // Categories
    'category.appetizers': 'Başlangıçlar',
    'category.pasta': 'Makarnalar',
    'category.pizza': 'Pizzalar',
    'category.mainCourse': 'Ana Yemekler',
    'category.risotto': 'Risottolar',
    'category.salad': 'Salatalar',
    'category.dessert': 'Tatlılar',
    'category.beverage': 'İçecekler',
  },
  en: {
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.total': 'Total',
    'common.quantity': 'Quantity',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.confirm': 'Confirm',
    'common.cancel': 'Cancel',
    'common.persons': 'Persons',
    
    // Table
    'table.number': 'Table',
    'table.capacity': 'Capacity',
    'table.currentOrders': 'Current Orders',
    'table.totalAmount': 'Total Amount',
    'table.noOrders': 'No orders yet',
    'table.orderStatus.pending': 'Pending',
    'table.orderStatus.preparing': 'Preparing',
    'table.orderStatus.ready': 'Ready',
    'table.orderStatus.served': 'Served',
    
    // Menu
    'menu.title': 'Menu',
    'menu.categories': 'Categories',
    'menu.all': 'All',
    'menu.popular': 'Popular',
    'menu.searchPlaceholder': 'Search menu...',
    'menu.calories': 'calories',
    'menu.preparationTime': 'min',
    'menu.addToTable': 'Add to Table',
    'menu.itemDetails': 'Item Details',
    'menu.ingredients': 'Ingredients',
    'menu.allergens': 'Allergens',
    'menu.reviews': 'Reviews',
    'menu.rating': 'Rating',
    'menu.vegan': 'Vegan',
    'menu.vegetarian': 'Vegetarian',
    'menu.glutenFree': 'Gluten Free',
    'menu.spicyLevel': 'Spicy Level',
    
    // Restaurant
    'restaurant.about': 'About Us',
    'restaurant.info': 'Restaurant Information',
    'restaurant.phone': 'Phone',
    'restaurant.address': 'Address',
    'restaurant.workingHours': 'Working Hours',
    'restaurant.features': 'Features',
    'restaurant.rating': 'Rating',
    'restaurant.reviews': 'Reviews',
    
    // Cart/Orders
    'cart.title': 'Order Summary',
    'cart.empty': 'No orders yet',
    'cart.emptyDesc': 'Select items from the menu to create your order',
    'cart.goToMenu': 'Go to Menu',
    'cart.subtotal': 'Subtotal',
    'cart.serviceFee': 'Service Fee',
    'cart.tableFee': 'Table Fee',
    'cart.sendOrder': 'Send Order',
    'cart.proceedToPayment': 'Proceed to Payment',
    'cart.orderNote': 'Order Note',
    'cart.orderNotePlaceholder': 'You can write your special requests here...',
    'cart.orderSent': 'Order Sent!',
    'cart.orderSentDesc': 'Your order has been sent to the kitchen. It will be served when ready.',
    'cart.sendToKitchen': 'Send to Kitchen',
    'cart.orderStatus': 'Order Status',
    'cart.viewCart': 'View Cart',
    'cart.newOrder': 'New Order',
    'cart.orderTracking': 'Order Tracking',
    'cart.orderTrackingDesc': 'Your orders are automatically updated. You can pay when ready and place new orders.',
    
    // Payment
    'payment.title': 'Payment',
    'payment.method': 'Payment Method',
    'payment.creditCard': 'Credit/Debit Card',
    'payment.cash': 'Cash',
    'payment.cardNumber': 'Card Number',
    'payment.cardHolder': 'Card Holder',
    'payment.expiryDate': 'Expiry Date',
    'payment.cvv': 'CVV',
    'payment.pay': 'Pay',
    'payment.processing': 'Processing...',
    'payment.success': 'Payment Successful!',
    'payment.successDesc': 'Your payment has been received. Enjoy your meal!',
    'payment.tip': 'Tip',
    'payment.tipDesc': 'If you were satisfied with our service, you can leave a tip',
    'payment.noTip': 'No Tip',
    'payment.receipt': 'Receipt',
    'payment.downloadReceipt': 'Download Receipt',
    'payment.goBackToMenu': 'Back to Menu',
    
    // Actions
    'action.callWaiter': 'Call Waiter',
    'action.waiterCalled': 'Waiter called!',
    'action.requestBill': 'Request Bill',
    'action.billRequested': 'Bill requested!',
    'action.viewRestaurant': 'Restaurant Info',
    'action.changeLanguage': 'Change Language',
    
    // Categories
    'category.appetizers': 'Appetizers',
    'category.pasta': 'Pasta',
    'category.pizza': 'Pizza',
    'category.mainCourse': 'Main Course',
    'category.risotto': 'Risotto',
    'category.salad': 'Salads',
    'category.dessert': 'Desserts',
    'category.beverage': 'Beverages',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('advanced-qr-language');
    return (saved === 'en' || saved === 'tr') ? saved : 'tr';
  });

  useEffect(() => {
    localStorage.setItem('advanced-qr-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, params?: { [key: string]: string | number }): string => {
    let translation = translations[language][key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    
    // Replace parameters if provided
    if (params) {
      Object.keys(params).forEach(paramKey => {
        translation = translation.replace(`{${paramKey}}`, String(params[paramKey]));
      });
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

