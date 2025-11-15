export interface MenuItem {
  id: string;
  name: string;
  nameTr: string;
  nameEn: string;
  description: string;
  descriptionTr: string;
  descriptionEn: string;
  category: string;
  categoryTr: string;
  categoryEn: string;
  price: number;
  image: string;
  images: string[]; // Multiple images
  videoUrl?: string; // Preparation video
  calories: number;
  preparationTime: number;
  ingredients: string[];
  allergens: string[];
  rating: number;
  reviewCount: number;
  isPopular: boolean;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
  spicyLevel?: number;
  chefNote?: string; // Chef's special note
  nutritionInfo?: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  menuItemId: string;
  rating: number;
  comment: string;
  commentTr: string;
  commentEn: string;
  createdAt: string;
  images: string[];
  isVerified: boolean; // Verified purchase
  helpfulCount: number; // How many found this helpful
  userLevel: 'new' | 'regular' | 'vip'; // User level
  tags?: string[]; // Review tags like "delicious", "fast service", etc.
}

export interface TableOrder {
  id: string;
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  status: 'pending' | 'preparing' | 'ready' | 'served';
  orderTime: string;
  notes?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  descriptionTr: string;
  descriptionEn: string;
  image: string;
  rating: number;
  reviewCount: number;
  cuisine: string;
  priceRange: string;
  phone: string;
  address: string;
  workingHours: string;
  features: string[];
}

// Demo Restaurant Data
export const restaurant: Restaurant = {
  id: 'rest-1',
  name: 'La Cucina Italiana Premium',
  description: 'İtalyan mutfağının en seçkin lezzetleri, zarif ambiyans ve mükemmel servisle buluşuyor.',
  descriptionTr: 'İtalyan mutfağının en seçkin lezzetleri, zarif ambiyans ve mükemmel servisle buluşuyor. 1995 yılından beri İstanbul\'un kalbinde, İtalya\'dan getirilen en taze malzemeler ve geleneksel tariflerle hazırlanan yemeklerimizle misafirlerimize unutulmaz bir gastronomi deneyimi sunuyoruz.',
  descriptionEn: 'The most distinguished flavors of Italian cuisine meet elegant ambiance and perfect service. Since 1995, in the heart of Istanbul, we offer our guests an unforgettable gastronomy experience with dishes prepared using the freshest ingredients from Italy and traditional recipes.',
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop&crop=center',
  rating: 4.8,
  reviewCount: 1247,
  cuisine: 'İtalyan',
  priceRange: '₺₺₺',
  phone: '+90 212 555 0123',
  address: 'Nişantaşı, Teşvikiye Cad. No:45, İstanbul',
  workingHours: '11:00 - 23:00',
  features: ['Vale Hizmeti', 'Sigara İçilmez', 'Çocuk Menüsü', 'WiFi', 'Engelli Erişimi', 'Kredi Kartı', 'Canlı Müzik', 'Şarap Mahzeni']
};

// Comprehensive Menu Data
export const menuItems: MenuItem[] = [
  // ANTIPASTI (Başlangıçlar)
  {
    id: 'item-1',
    name: 'Carpaccio di Manzo',
    nameTr: 'Carpaccio di Manzo',
    nameEn: 'Beef Carpaccio',
    description: 'İnce dilimlenmiş dana bonfile, roka, parmesan pul biber ve limon soslu',
    descriptionTr: 'İnce dilimlenmiş dana bonfile, roka, parmesan pul biber ve limon soslu',
    descriptionEn: 'Thinly sliced beef tenderloin, arugula, parmesan shavings with lemon dressing',
    category: 'Başlangıç',
    categoryTr: 'Başlangıç',
    categoryEn: 'Appetizers',
    price: 295,
    image: 'https://images.unsplash.com/photo-1625938145312-90a0463fc498?w=800&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1625938145312-90a0463fc498?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 180,
    preparationTime: 10,
    ingredients: ['Dana Bonfile', 'Roka', 'Parmesan', 'Limon', 'Zeytinyağı', 'Tuz', 'Karabiber'],
    allergens: ['Süt'],
    rating: 4.9,
    reviewCount: 87,
    isPopular: true,
    isGlutenFree: true,
    chefNote: 'Şefimizin özel tarifi: Dana bonfileyi -2°C\'de 2 saat bekletip ince dilimler halinde kesiyoruz.',
    nutritionInfo: {
      protein: 18,
      carbs: 3,
      fat: 12,
      fiber: 1
    }
  },
  {
    id: 'item-2',
    name: 'Burrata con Pomodorini',
    nameTr: 'Burrata Peyniri',
    nameEn: 'Burrata with Cherry Tomatoes',
    description: 'Apulyalı burrata peyniri, kiraz domates, fesleğen ve ekstra sızma zeytinyağı',
    descriptionTr: 'Apulyalı burrata peyniri, kiraz domates, fesleğen ve ekstra sızma zeytinyağı',
    descriptionEn: 'Apulian burrata cheese, cherry tomatoes, basil and extra virgin olive oil',
    category: 'Başlangıç',
    categoryTr: 'Başlangıç',
    categoryEn: 'Appetizers',
    price: 245,
    image: 'https://images.unsplash.com/photo-1575932444949-e5ef14cf4ab0?w=800&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1575932444949-e5ef14cf4ab0?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1580116293943-0e9e0ce15d55?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1589881133595-c7f2cddd9111?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1554835279-b0b8213e2143?w=800&h=600&fit=crop&crop=center&auto=format&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 280,
    preparationTime: 8,
    ingredients: ['Burrata Peyniri', 'Kiraz Domates', 'Fesleğen', 'Zeytinyağı', 'Balsamik Sirke'],
    allergens: ['Süt'],
    rating: 4.8,
    reviewCount: 145,
    isPopular: true,
    isVegetarian: true,
    isGlutenFree: true,
    chefNote: 'İtalya\'dan özel olarak getirilen burrata peyniri, günlük taze kiraz domateslerle servis edilir.',
    nutritionInfo: {
      protein: 12,
      carbs: 8,
      fat: 22,
      fiber: 2
    }
  },
  {
    id: 'item-3',
    name: 'Bruschetta Mista',
    nameTr: 'Karışık Bruschetta',
    nameEn: 'Mixed Bruschetta',
    description: '3 çeşit bruschetta: klasik domates, mantar-truffle, ricotta-bal (6 adet)',
    descriptionTr: '3 çeşit bruschetta: klasik domates, mantar-truffle, ricotta-bal (6 adet)',
    descriptionEn: '3 varieties of bruschetta: classic tomato, mushroom-truffle, ricotta-honey (6 pcs)',
    category: 'Başlangıç',
    categoryTr: 'Başlangıç',
    categoryEn: 'Appetizers',
    price: 185,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://picsum.photos/800/600?random=5',
      'https://picsum.photos/800/600?random=6',
      'https://source.unsplash.com/800x600/?food,bread',
      'https://source.unsplash.com/800x600/?food,appetizer'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 320,
    preparationTime: 12,
    ingredients: ['Ekmek', 'Domates', 'Mantar', 'Truffle', 'Ricotta', 'Bal', 'Sarımsak'],
    allergens: ['Gluten', 'Süt'],
    rating: 4.7,
    reviewCount: 98,
    isPopular: true,
    isVegetarian: true,
    chefNote: 'Taze fırın ekmeği üzerine sürülen çeşitli soslar, İtalyan mutfağının en sevilen başlangıçlarından.',
    nutritionInfo: {
      protein: 8,
      carbs: 45,
      fat: 12,
      fiber: 3
    }
  },

  // PRIMI PIATTI (Ana Yemekler - Makarnalar)
  {
    id: 'item-4',
    name: 'Tagliatelle al Tartufo Nero',
    nameTr: 'Siyah Trüflü Tagliatelle',
    nameEn: 'Tagliatelle with Black Truffle',
    description: 'Ev yapımı tagliatelle, siyah trüf, parmesan ve tereyağı',
    descriptionTr: 'Ev yapımı tagliatelle, siyah trüf, parmesan ve tereyağı',
    descriptionEn: 'Homemade tagliatelle, black truffle, parmesan and butter',
    category: 'Makarna',
    categoryTr: 'Makarna',
    categoryEn: 'Pasta',
    price: 425,
    image: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=800&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 680,
    preparationTime: 18,
    ingredients: ['Tagliatelle', 'Siyah Trüf', 'Parmesan', 'Tereyağı', 'Tuz', 'Karabiber'],
    allergens: ['Gluten', 'Yumurta', 'Süt'],
    rating: 5.0,
    reviewCount: 234,
    isPopular: true,
    isVegetarian: true,
    chefNote: 'İtalya\'dan getirilen siyah trüf mantarı ile hazırlanan bu makarna, gerçek bir lüks deneyimi sunar.',
    nutritionInfo: {
      protein: 22,
      carbs: 85,
      fat: 18,
      fiber: 4
    }
  },
  {
    id: 'item-5',
    name: 'Spaghetti alle Vongole',
    nameTr: 'Deniz Tarağı Spagetti',
    nameEn: 'Spaghetti with Clams',
    description: 'Taze deniz tarağı, beyaz şarap, sarımsak, maydanoz ve acı biber',
    descriptionTr: 'Taze deniz tarağı, beyaz şarap, sarımsak, maydanoz ve acı biber',
    descriptionEn: 'Fresh clams, white wine, garlic, parsley and chili pepper',
    category: 'Makarna',
    categoryTr: 'Makarna',
    categoryEn: 'Pasta',
    price: 365,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 520,
    preparationTime: 15,
    ingredients: ['Spagetti', 'Deniz Tarağı', 'Beyaz Şarap', 'Sarımsak', 'Maydanoz', 'Acı Biber'],
    allergens: ['Gluten', 'Kabuklu Deniz Ürünleri'],
    rating: 4.9,
    reviewCount: 178,
    isPopular: true,
    spicyLevel: 1,
    chefNote: 'Taze deniz tarağını beyaz şarap ve sarımsakla marine edip, spagetti ile servis ediyoruz.',
    nutritionInfo: {
      protein: 25,
      carbs: 68,
      fat: 8,
      fiber: 3
    }
  },
  {
    id: 'item-6',
    name: 'Ravioli di Ricotta e Spinaci',
    nameTr: 'Ricotta ve Ispanaklı Ravioli',
    nameEn: 'Ricotta and Spinach Ravioli',
    description: 'Ev yapımı ravioli, ricotta peyniri, taze ıspanak, tereyağı ve adaçayı sosu',
    descriptionTr: 'Ev yapımı ravioli, ricotta peyniri, taze ıspanak, tereyağı ve adaçayı sosu',
    descriptionEn: 'Homemade ravioli, ricotta cheese, fresh spinach, butter and sage sauce',
    category: 'Makarna',
    categoryTr: 'Makarna',
    categoryEn: 'Pasta',
    price: 295,
    image: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
    images: [
      'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=800&h=600&fit=crop&crop=center&auto=format&q=80',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 580,
    preparationTime: 16,
    ingredients: ['Ravioli Hamuru', 'Ricotta', 'Ispanak', 'Tereyağı', 'Adaçayı', 'Parmesan'],
    allergens: ['Gluten', 'Yumurta', 'Süt'],
    rating: 4.8,
    reviewCount: 156,
    isPopular: false,
    isVegetarian: true,
    chefNote: 'Ev yapımı ravioli hamurunu her gün taze hazırlıyoruz. Ricotta ve ıspanak dolgulu.',
    nutritionInfo: {
      protein: 18,
      carbs: 72,
      fat: 15,
      fiber: 4
    }
  },
  {
    id: 'item-7',
    name: 'Pappardelle al Ragù di Cinghiale',
    nameTr: 'Yaban Domuzu Soslu Pappardelle',
    nameEn: 'Pappardelle with Wild Boar Ragù',
    description: 'Geniş şerit makarna, yaban domuzu haşlaması, kırmızı şarap ve domates sosu',
    descriptionTr: 'Geniş şerit makarna, yaban domuzu haşlaması, kırmızı şarap ve domates sosu',
    descriptionEn: 'Wide ribbon pasta, wild boar stew, red wine and tomato sauce',
    category: 'Makarna',
    categoryTr: 'Makarna',
    categoryEn: 'Pasta',
    price: 385,
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 720,
    preparationTime: 20,
    ingredients: ['Pappardelle', 'Yaban Domuzu', 'Kırmızı Şarap', 'Domates', 'Havuç', 'Kereviz'],
    allergens: ['Gluten', 'Yumurta'],
    rating: 4.9,
    reviewCount: 92,
    isPopular: true,
    chefNote: 'Yaban domuzu etini 4 saat yavaş ateşte kırmızı şarap ve sebzelerle pişiriyoruz.',
    nutritionInfo: {
      protein: 32,
      carbs: 78,
      fat: 22,
      fiber: 5
    }
  },

  // PIZZA
  {
    id: 'item-8',
    name: 'Pizza Margherita DOC',
    nameTr: 'Margherita Pizza',
    nameEn: 'Margherita Pizza DOC',
    description: 'Klasik Napoli pizzası, San Marzano domates, Fior di Latte mozzarella, fesleğen',
    descriptionTr: 'Klasik Napoli pizzası, San Marzano domates, Fior di Latte mozzarella, fesleğen',
    descriptionEn: 'Classic Neapolitan pizza, San Marzano tomatoes, Fior di Latte mozzarella, basil',
    category: 'Pizza',
    categoryTr: 'Pizza',
    categoryEn: 'Pizza',
    price: 275,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=90',
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 820,
    preparationTime: 15,
    ingredients: ['Pizza Hamuru', 'San Marzano Domates', 'Mozzarella', 'Fesleğen', 'Zeytinyağı'],
    allergens: ['Gluten', 'Süt'],
    rating: 4.9,
    reviewCount: 456,
    isPopular: true,
    isVegetarian: true,
    chefNote: 'Napoli usulü taş fırında 450°C\'de 90 saniyede pişirilen otantik pizza.',
    nutritionInfo: {
      protein: 28,
      carbs: 95,
      fat: 24,
      fiber: 6
    }
  },
  {
    id: 'item-9',
    name: 'Pizza Quattro Formaggi',
    nameTr: 'Dört Peynirli Pizza',
    nameEn: 'Four Cheese Pizza',
    description: 'Mozzarella, gorgonzola, fontina, parmesan ve bal',
    descriptionTr: 'Mozzarella, gorgonzola, fontina, parmesan ve bal',
    descriptionEn: 'Mozzarella, gorgonzola, fontina, parmesan and honey',
    category: 'Pizza',
    categoryTr: 'Pizza',
    categoryEn: 'Pizza',
    price: 315,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 920,
    preparationTime: 15,
    ingredients: ['Pizza Hamuru', 'Mozzarella', 'Gorgonzola', 'Fontina', 'Parmesan', 'Bal'],
    allergens: ['Gluten', 'Süt'],
    rating: 4.8,
    reviewCount: 267,
    isPopular: true,
    isVegetarian: true,
    chefNote: 'Dört farklı İtalyan peynirinin mükemmel uyumu. Bal ile servis ediliyor.',
    nutritionInfo: {
      protein: 32,
      carbs: 88,
      fat: 35,
      fiber: 5
    }
  },
  {
    id: 'item-10',
    name: 'Pizza Diavola',
    nameTr: 'Diavola Pizza',
    nameEn: 'Diavola Pizza',
    description: 'Acı salam, mozzarella, domates sosu ve taze acı biber',
    descriptionTr: 'Acı salam, mozzarella, domates sosu ve taze acı biber',
    descriptionEn: 'Spicy salami, mozzarella, tomato sauce and fresh chili pepper',
    category: 'Pizza',
    categoryTr: 'Pizza',
    categoryEn: 'Pizza',
    price: 295,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 880,
    preparationTime: 15,
    ingredients: ['Pizza Hamuru', 'Acı Salam', 'Mozzarella', 'Domates Sosu', 'Acı Biber'],
    allergens: ['Gluten', 'Süt'],
    rating: 4.7,
    reviewCount: 198,
    isPopular: true,
    spicyLevel: 3,
    chefNote: 'Acı severler için özel tarif. İtalyan acı salamı ve taze acı biber ile hazırlanır.',
    nutritionInfo: {
      protein: 30,
      carbs: 92,
      fat: 28,
      fiber: 6
    }
  },
  {
    id: 'item-11',
    name: 'Pizza Prosciutto e Funghi',
    nameTr: 'Jambonlu Mantarlı Pizza',
    nameEn: 'Prosciutto and Mushroom Pizza',
    description: 'Parma jambonu, karma mantar, mozzarella ve truffle yağı',
    descriptionTr: 'Parma jambonu, karma mantar, mozzarella ve truffle yağı',
    descriptionEn: 'Parma ham, mixed mushrooms, mozzarella and truffle oil',
    category: 'Pizza',
    categoryTr: 'Pizza',
    categoryEn: 'Pizza',
    price: 345,
    image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 850,
    preparationTime: 15,
    ingredients: ['Pizza Hamuru', 'Parma Jambonu', 'Mantar', 'Mozzarella', 'Truffle Yağı'],
    allergens: ['Gluten', 'Süt'],
    rating: 4.8,
    reviewCount: 189,
    isPopular: false,
    chefNote: 'Parma jambonu ve taze mantarların leziz buluşması. Truffle yağı ile tamamlanıyor.',
    nutritionInfo: {
      protein: 31,
      carbs: 90,
      fat: 26,
      fiber: 5
    }
  },

  // SECONDI PIATTI (Ana Yemekler - Et/Balık)
  {
    id: 'item-12',
    name: 'Filetto al Pepe Verde',
    nameTr: 'Yeşil Biberli Dana Fileto',
    nameEn: 'Beef Fillet with Green Pepper',
    description: 'Dana fileto (250g), yeşil biber sosu, patates pure ve mevsim sebzeleri',
    descriptionTr: 'Dana fileto (250g), yeşil biber sosu, patates pure ve mevsim sebzeleri',
    descriptionEn: 'Beef fillet (250g), green pepper sauce, mashed potatoes and seasonal vegetables',
    category: 'Ana Yemek',
    categoryTr: 'Ana Yemek',
    categoryEn: 'Main Course',
    price: 595,
    image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=90',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 720,
    preparationTime: 25,
    ingredients: ['Dana Fileto', 'Yeşil Biber', 'Krema', 'Patates', 'Tereyağı', 'Sebze'],
    allergens: ['Süt'],
    rating: 5.0,
    reviewCount: 312,
    isPopular: true,
    isGlutenFree: true,
    chefNote: '250g dana fileto medium-rare pişiriliyor. Yeşil biber sosu ile mükemmel bir uyum.',
    nutritionInfo: {
      protein: 48,
      carbs: 35,
      fat: 28,
      fiber: 4
    }
  },
  {
    id: 'item-13',
    name: 'Branzino al Forno',
    nameTr: 'Fırın Levrek',
    nameEn: 'Oven-Baked Sea Bass',
    description: 'Bütün levrek, fırında patates, kiraz domates, zeytin ve kapari',
    descriptionTr: 'Bütün levrek, fırında patates, kiraz domates, zeytin ve kapari',
    descriptionEn: 'Whole sea bass, oven-roasted potatoes, cherry tomatoes, olives and capers',
    category: 'Ana Yemek',
    categoryTr: 'Ana Yemek',
    categoryEn: 'Main Course',
    price: 485,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 580,
    preparationTime: 30,
    ingredients: ['Levrek', 'Patates', 'Kiraz Domates', 'Zeytin', 'Kapari', 'Limon'],
    allergens: ['Balık'],
    rating: 4.9,
    reviewCount: 245,
    isPopular: true,
    isGlutenFree: true,
    chefNote: 'Taze levrek fırında sebzeler ile birlikte pişiriliyor. Akdeniz mutfağının klasiği.',
    nutritionInfo: {
      protein: 42,
      carbs: 38,
      fat: 18,
      fiber: 5
    }
  },
  {
    id: 'item-14',
    name: 'Ossobuco alla Milanese',
    nameTr: 'Milano Usulü Ossobuco',
    nameEn: 'Ossobuco Milanese Style',
    description: 'Dana incik, gremolata, safran risotto',
    descriptionTr: 'Dana incik, gremolata, safran risotto',
    descriptionEn: 'Veal shank, gremolata, saffron risotto',
    category: 'Ana Yemek',
    categoryTr: 'Ana Yemek',
    categoryEn: 'Main Course',
    price: 525,
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 820,
    preparationTime: 35,
    ingredients: ['Dana İncik', 'Arborio Pirinç', 'Safran', 'Limon', 'Maydanoz', 'Sarımsak'],
    allergens: ['Süt'],
    rating: 4.9,
    reviewCount: 167,
    isPopular: true,
    isGlutenFree: true,
    chefNote: 'Milano\'nun meşhur yemeği. Dana incik 3 saat yavaş pişiriliyor, safran risotto ile servis ediliyor.',
    nutritionInfo: {
      protein: 45,
      carbs: 72,
      fat: 25,
      fiber: 4
    }
  },

  // RISOTTO
  {
    id: 'item-15',
    name: 'Risotto ai Funghi Porcini',
    nameTr: 'Porcini Mantarlı Risotto',
    nameEn: 'Porcini Mushroom Risotto',
    description: 'Carnaroli pirinci, porcini mantarı, parmesan ve truffle yağı',
    descriptionTr: 'Carnaroli pirinci, porcini mantarı, parmesan ve truffle yağı',
    descriptionEn: 'Carnaroli rice, porcini mushrooms, parmesan and truffle oil',
    category: 'Risotto',
    categoryTr: 'Risotto',
    categoryEn: 'Risotto',
    price: 335,
    image: 'https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 620,
    preparationTime: 22,
    ingredients: ['Carnaroli Pirinç', 'Porcini Mantarı', 'Parmesan', 'Truffle Yağı', 'Beyaz Şarap'],
    allergens: ['Süt'],
    rating: 4.8,
    reviewCount: 198,
    isPopular: true,
    isVegetarian: true,
    isGlutenFree: true,
    chefNote: 'Porcini mantarının eşsiz aroması ile hazırlanan risotto. Truffle yağı ile tamamlanıyor.',
    nutritionInfo: {
      protein: 15,
      carbs: 88,
      fat: 18,
      fiber: 4
    }
  },
  {
    id: 'item-16',
    name: 'Risotto allo Zafferano',
    nameTr: 'Safranlı Risotto',
    nameEn: 'Saffron Risotto',
    description: 'İtalyan safranlı risotto, parmesan ve tereyağı',
    descriptionTr: 'İtalyan safranlı risotto, parmesan ve tereyağı',
    descriptionEn: 'Italian saffron risotto, parmesan and butter',
    category: 'Risotto',
    categoryTr: 'Risotto',
    categoryEn: 'Risotto',
    price: 285,
    image: 'https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 580,
    preparationTime: 20,
    ingredients: ['Carnaroli Pirinç', 'Safran', 'Parmesan', 'Tereyağı', 'Beyaz Şarap'],
    allergens: ['Süt'],
    rating: 4.7,
    reviewCount: 134,
    isPopular: false,
    isVegetarian: true,
    isGlutenFree: true,
    chefNote: 'Safranın altın sarısı rengi ve eşsiz aroması ile hazırlanan klasik risotto.',
    nutritionInfo: {
      protein: 14,
      carbs: 85,
      fat: 16,
      fiber: 3
    }
  },

  // INSALATE (Salatalar)
  {
    id: 'item-17',
    name: 'Insalata di Mare',
    nameTr: 'Deniz Ürünleri Salatası',
    nameEn: 'Seafood Salad',
    description: 'Ahtapot, karides, midye, kalamar, limon ve zeytinyağı',
    descriptionTr: 'Ahtapot, karides, midye, kalamar, limon ve zeytinyağı',
    descriptionEn: 'Octopus, shrimp, mussels, squid, lemon and olive oil',
    category: 'Salata',
    categoryTr: 'Salata',
    categoryEn: 'Salad',
    price: 345,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 280,
    preparationTime: 15,
    ingredients: ['Ahtapot', 'Karides', 'Midye', 'Kalamar', 'Limon', 'Zeytinyağı', 'Maydanoz'],
    allergens: ['Kabuklu Deniz Ürünleri'],
    rating: 4.9,
    reviewCount: 176,
    isPopular: true,
    isGlutenFree: true,
    chefNote: 'Deniz ürünlerini taze olarak her gün tedarik ediyoruz. Limon ve zeytinyağı ile marine edilir.',
    nutritionInfo: {
      protein: 32,
      carbs: 8,
      fat: 12,
      fiber: 2
    }
  },
  {
    id: 'item-18',
    name: 'Insalata Caprese',
    nameTr: 'Caprese Salatası',
    nameEn: 'Caprese Salad',
    description: 'Bufala mozzarella, domates, fesleğen, ekstra sızma zeytinyağı',
    descriptionTr: 'Bufala mozzarella, domates, fesleğen, ekstra sızma zeytinyağı',
    descriptionEn: 'Buffalo mozzarella, tomatoes, basil, extra virgin olive oil',
    category: 'Salata',
    categoryTr: 'Salata',
    categoryEn: 'Salad',
    price: 225,
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&q=90',
      'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=800&q=90',
      'https://images.unsplash.com/photo-1547928578-c303cbf49d6c?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 320,
    preparationTime: 8,
    ingredients: ['Bufala Mozzarella', 'Domates', 'Fesleğen', 'Zeytinyağı', 'Balsamik Sirke'],
    allergens: ['Süt'],
    rating: 4.8,
    reviewCount: 234,
    isPopular: false,
    isVegetarian: true,
    isGlutenFree: true,
    chefNote: 'Capri adasının meşhur salatası. Taze bufala mozzarella ve domates ile hazırlanır.',
    nutritionInfo: {
      protein: 16,
      carbs: 12,
      fat: 24,
      fiber: 2
    }
  },

  // DOLCI (Tatlılar)
  {
    id: 'item-19',
    name: 'Tiramisu Classico',
    nameTr: 'Klasik Tiramisu',
    nameEn: 'Classic Tiramisu',
    description: 'Ev yapımı geleneksel tiramisu, mascarpone, espresso ve kakao',
    descriptionTr: 'Ev yapımı geleneksel tiramisu, mascarpone, espresso ve kakao',
    descriptionEn: 'Homemade traditional tiramisu, mascarpone, espresso and cocoa',
    category: 'Tatlı',
    categoryTr: 'Tatlı',
    categoryEn: 'Dessert',
    price: 165,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=90',
      'https://images.unsplash.com/photo-1606312619070-d48b4cac5ccf?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 450,
    preparationTime: 5,
    ingredients: ['Mascarpone', 'Kedi Dili', 'Espresso', 'Kakao', 'Yumurta', 'Şeker'],
    allergens: ['Gluten', 'Süt', 'Yumurta'],
    rating: 5.0,
    reviewCount: 567,
    isPopular: true,
    chefNote: 'Geleneksel İtalyan tarifi ile hazırlanan tiramisu. Her gün taze yapılır.',
    nutritionInfo: {
      protein: 8,
      carbs: 45,
      fat: 28,
      fiber: 1
    }
  },
  {
    id: 'item-20',
    name: 'Panna Cotta ai Frutti di Bosco',
    nameTr: 'Orman Meyveli Panna Cotta',
    nameEn: 'Panna Cotta with Forest Berries',
    description: 'Vanilya panna cotta, orman meyvesi sosu',
    descriptionTr: 'Vanilya panna cotta, orman meyvesi sosu',
    descriptionEn: 'Vanilla panna cotta with forest berry sauce',
    category: 'Tatlı',
    categoryTr: 'Tatlı',
    categoryEn: 'Dessert',
    price: 145,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 380,
    preparationTime: 5,
    ingredients: ['Krema', 'Vanilya', 'Şeker', 'Jelatin', 'Orman Meyveleri'],
    allergens: ['Süt'],
    rating: 4.8,
    reviewCount: 289,
    isPopular: true,
    isGlutenFree: true,
    chefNote: 'Hafif ve kremamsı panna cotta, taze orman meyveleri sosu ile servis edilir.',
    nutritionInfo: {
      protein: 6,
      carbs: 38,
      fat: 22,
      fiber: 2
    }
  },
  {
    id: 'item-21',
    name: 'Cannoli Siciliani',
    nameTr: 'Sicilya Canolisi',
    nameEn: 'Sicilian Cannoli',
    description: 'Çıtır hamur, ricotta dolgusu, Antep fıstığı ve çikolata (3 adet)',
    descriptionTr: 'Çıtır hamur, ricotta dolgusu, Antep fıstığı ve çikolata (3 adet)',
    descriptionEn: 'Crispy shell, ricotta filling, pistachio and chocolate (3 pcs)',
    category: 'Tatlı',
    categoryTr: 'Tatlı',
    categoryEn: 'Dessert',
    price: 155,
    image: 'https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1619985632461-f33748ef8f3e?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 520,
    preparationTime: 5,
    ingredients: ['Cannoli Hamuru', 'Ricotta', 'Şeker', 'Antep Fıstığı', 'Çikolata'],
    allergens: ['Gluten', 'Süt', 'Yumurta', 'Sert Kabuklu Meyveler'],
    rating: 4.9,
    reviewCount: 198,
    isPopular: false,
    chefNote: 'Sicilya\'nın geleneksel tatlısı. Çıtır hamur, kremalı ricotta dolgusu ile doldurulur.',
    nutritionInfo: {
      protein: 10,
      carbs: 58,
      fat: 24,
      fiber: 2
    }
  },
  {
    id: 'item-22',
    name: 'Affogato al Caffè',
    nameTr: 'Affogato',
    nameEn: 'Affogato',
    description: 'Vanilya dondurması, sıcak espresso, amaretto likörü',
    descriptionTr: 'Vanilya dondurması, sıcak espresso, amaretto likörü',
    descriptionEn: 'Vanilla ice cream, hot espresso, amaretto liqueur',
    category: 'Tatlı',
    categoryTr: 'Tatlı',
    categoryEn: 'Dessert',
    price: 125,
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    calories: 280,
    preparationTime: 3,
    ingredients: ['Vanilya Dondurması', 'Espresso', 'Amaretto'],
    allergens: ['Süt', 'Sert Kabuklu Meyveler'],
    rating: 4.7,
    reviewCount: 145,
    isPopular: false,
    isGlutenFree: true,
    chefNote: 'Soğuk dondurma ile sıcak espresso\'nun muhteşem buluşması.',
    nutritionInfo: {
      protein: 5,
      carbs: 32,
      fat: 14,
      fiber: 0
    }
  },

  // BEVANDE (İçecekler)
  {
    id: 'item-23',
    name: 'Acqua Minerale',
    nameTr: 'Maden Suyu',
    nameEn: 'Mineral Water',
    description: 'San Pellegrino veya Acqua Panna (750ml)',
    descriptionTr: 'San Pellegrino veya Acqua Panna (750ml)',
    descriptionEn: 'San Pellegrino or Acqua Panna (750ml)',
    category: 'İçecek',
    categoryTr: 'İçecek',
    categoryEn: 'Beverage',
    price: 45,
    image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90'
    ],
    calories: 0,
    preparationTime: 1,
    ingredients: ['Maden Suyu'],
    allergens: [],
    rating: 4.5,
    reviewCount: 89,
    isPopular: false,
    isVegan: true,
    isGlutenFree: true
  },
  {
    id: 'item-24',
    name: 'Limonata Fatta in Casa',
    nameTr: 'Ev Yapımı Limonata',
    nameEn: 'Homemade Lemonade',
    description: 'Taze sıkılmış limon, nane, şeker',
    descriptionTr: 'Taze sıkılmış limon, nane, şeker',
    descriptionEn: 'Freshly squeezed lemon, mint, sugar',
    category: 'İçecek',
    categoryTr: 'İçecek',
    categoryEn: 'Beverage',
    price: 65,
    image: 'https://images.unsplash.com/photo-1585518419759-c5400b199ffc?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1585518419759-c5400b199ffc?w=800&q=90',
      'https://images.unsplash.com/photo-1599599810694-2514bc2af913?w=800&q=90',
      'https://images.unsplash.com/photo-1627518527917-7f37e1e70b79?w=800&q=90'
    ],
    calories: 120,
    preparationTime: 3,
    ingredients: ['Limon', 'Nane', 'Şeker', 'Su'],
    allergens: [],
    rating: 4.7,
    reviewCount: 167,
    isPopular: true,
    isVegan: true,
    isGlutenFree: true
  },
  {
    id: 'item-25',
    name: 'Espresso',
    nameTr: 'Espresso',
    nameEn: 'Espresso',
    description: 'İtalyan espresso',
    descriptionTr: 'İtalyan espresso',
    descriptionEn: 'Italian espresso',
    category: 'İçecek',
    categoryTr: 'İçecek',
    categoryEn: 'Beverage',
    price: 55,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90'
    ],
    calories: 5,
    preparationTime: 2,
    ingredients: ['Espresso Kahvesi'],
    allergens: [],
    rating: 4.8,
    reviewCount: 345,
    isPopular: true,
    isVegan: true,
    isGlutenFree: true
  },
  {
    id: 'item-26',
    name: 'Vino della Casa (Calice)',
    nameTr: 'Ev Şarabı (Kadeh)',
    nameEn: 'House Wine (Glass)',
    description: 'Kırmızı veya beyaz şarap',
    descriptionTr: 'Kırmızı veya beyaz şarap',
    descriptionEn: 'Red or white wine',
    category: 'İçecek',
    categoryTr: 'İçecek',
    categoryEn: 'Beverage',
    price: 125,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=90',
    images: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90'
    ],
    calories: 125,
    preparationTime: 2,
    ingredients: ['Şarap'],
    allergens: ['Sülfitler'],
    rating: 4.6,
    reviewCount: 234,
    isPopular: false,
    isVegan: true,
    isGlutenFree: true
  }
];

// Comprehensive Reviews Data
export const reviews: Review[] = [
  {
    id: 'rev-1',
    userName: 'Ayşe Yılmaz',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    menuItemId: 'item-8',
    rating: 5,
    comment: 'Harika bir pizza! Hamuru çok lezzetli ve malzemeler çok taze.',
    commentTr: 'Harika bir pizza! Hamuru çok lezzetli ve malzemeler çok taze. İtalya\'da yediğim pizzalardan hiç farkı yok. Mozzarella peyniri gerçekten çok kaliteli ve domates sosu ev yapımı gibi.',
    commentEn: 'Amazing pizza! The dough is delicious and the ingredients are very fresh. No different from the pizzas I ate in Italy. The mozzarella cheese is really high quality and the tomato sauce tastes homemade.',
    createdAt: '2025-10-15T19:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=90',
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=90',
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=90'
    ],
    isVerified: true,
    helpfulCount: 12,
    userLevel: 'regular',
    tags: ['delicious', 'authentic', 'fresh ingredients']
  },
  {
    id: 'rev-2',
    userName: 'Mehmet Kaya',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    menuItemId: 'item-8',
    rating: 5,
    comment: 'İtalyan pizzasının gerçek tadı! Kesinlikle tavsiye ederim.',
    commentTr: 'İtalyan pizzasının gerçek tadı! Fırını taş fırın olduğu için çok güzel pişmiş. Kesinlikle tavsiye ederim.',
    commentEn: 'The real taste of Italian pizza! The stone oven makes it cook perfectly. Definitely recommend.',
    createdAt: '2025-10-14T20:15:00Z',
    images: ['https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=90'],
    isVerified: true,
    helpfulCount: 8,
    userLevel: 'regular'
  },
  {
    id: 'rev-3',
    userName: 'Zeynep Demir',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    menuItemId: 'item-19',
    rating: 5,
    comment: 'En iyi tiramisu! Çok kremsi ve espresso tadı mükemmel.',
    commentTr: 'En iyi tiramisu! Çok kremsi ve espresso tadı mükemmel. Sunumu da çok şık.',
    commentEn: 'The best tiramisu! Very creamy and the espresso flavor is perfect. The presentation is also very elegant.',
    createdAt: '2025-10-13T21:00:00Z',
    images: ['https://images.unsplash.com/photo-1606312619070-d48b4cac5ccf?w=800&q=90', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=90'],
    isVerified: true,
    helpfulCount: 15,
    userLevel: 'vip'
  },
  {
    id: 'rev-4',
    userName: 'Can Öztürk',
    userAvatar: 'https://i.pravatar.cc/150?img=4',
    menuItemId: 'item-12',
    rating: 5,
    comment: 'Dana fileto mükemmeldi! Tam kıvamında pişmiş.',
    commentTr: 'Dana fileto mükemmeldi! Tam kıvamında pişmiş ve yeşil biber sosu harika. Patates püremesi de çok lezzetliydi.',
    commentEn: 'The beef fillet was perfect! Cooked to perfection and the green pepper sauce is amazing. The mashed potatoes were also delicious.',
    createdAt: '2025-10-12T19:45:00Z',
    images: ['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=90'],
    isVerified: true,
    helpfulCount: 9,
    userLevel: 'regular'
  },
  {
    id: 'rev-5',
    userName: 'Elif Şahin',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    menuItemId: 'item-4',
    rating: 5,
    comment: 'Trüflü makarna harikaydı! Kokusu ve tadı mükemmel.',
    commentTr: 'Trüflü makarna harikaydı! Siyah trüfün kokusu ve tadı mükemmel. Porsiyon da yeterli.',
    commentEn: 'The truffle pasta was amazing! The aroma and taste of black truffle is perfect. The portion is also sufficient.',
    createdAt: '2025-10-11T20:30:00Z',
    images: ['https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&q=90'],
    isVerified: true,
    helpfulCount: 11,
    userLevel: 'regular'
  },
  {
    id: 'rev-6',
    userName: 'Burak Arslan',
    userAvatar: 'https://i.pravatar.cc/150?img=6',
    menuItemId: 'item-1',
    rating: 5,
    comment: 'Carpaccio çok taze ve lezzetliydi.',
    commentTr: 'Carpaccio çok taze ve lezzetliydi. Dana etinin kalitesi belli. Parmesan ve roka ile mükemmel uyum.',
    commentEn: 'The carpaccio was very fresh and delicious. The quality of the beef is evident. Perfect harmony with parmesan and arugula.',
    createdAt: '2025-10-10T18:15:00Z',
    images: ['https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90'],
    isVerified: true,
    helpfulCount: 7,
    userLevel: 'regular'
  },
  {
    id: 'rev-7',
    userName: 'Selin Öz',
    userAvatar: 'https://i.pravatar.cc/150?img=7',
    menuItemId: 'item-2',
    rating: 5,
    comment: 'Burrata peyniri harikaydı! Çok kremsi.',
    commentTr: 'Burrata peyniri harikaydı! İçi çok kremsi ve taze. Kiraz domates ve balsamik sirke ile mükemmel.',
    commentEn: 'The burrata cheese was amazing! Very creamy and fresh inside. Perfect with cherry tomatoes and balsamic vinegar.',
    createdAt: '2025-10-09T19:00:00Z',
    images: ['https://images.unsplash.com/photo-1575932444949-e5ef14cf4ab0?w=800&q=90'],
    isVerified: true,
    helpfulCount: 13,
    userLevel: 'vip'
  },
  {
    id: 'rev-8',
    userName: 'Deniz Yıldız',
    userAvatar: 'https://i.pravatar.cc/150?img=8',
    menuItemId: 'item-9',
    rating: 5,
    comment: 'Dört peynirli pizza tam bir şölen!',
    commentTr: 'Dört peynirli pizza tam bir şölen! Her peynirin tadı ayrı ayrı hissediliyor. Bal ile servis süper.',
    commentEn: 'Four cheese pizza is a feast! You can taste each cheese separately. Service with honey is super.',
    createdAt: '2025-10-08T20:45:00Z',
    images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=90'],
    isVerified: true,
    helpfulCount: 6,
    userLevel: 'regular'
  },
  {
    id: 'rev-9',
    userName: 'Ali Kılıç',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    menuItemId: 'item-5',
    rating: 5,
    comment: 'Deniz tarağı spagetti muhteşemdi!',
    commentTr: 'Deniz tarağı spagetti muhteşemdi! Deniz ürünleri çok taze ve bol. Beyaz şarap sosu mükemmel.',
    commentEn: 'The clam spaghetti was magnificent! Seafood is very fresh and plentiful. White wine sauce is perfect.',
    createdAt: '2025-10-07T19:30:00Z',
    images: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&q=90'],
    isVerified: true,
    helpfulCount: 10,
    userLevel: 'regular'
  },
  {
    id: 'rev-10',
    userName: 'Merve Aydın',
    userAvatar: 'https://i.pravatar.cc/150?img=10',
    menuItemId: 'item-15',
    rating: 5,
    comment: 'Porcini mantarlı risotto favorim oldu!',
    commentTr: 'Porcini mantarlı risotto favorim oldu! Pirinç tam kıvamında ve mantar aroması harika. Truffle yağı ile servis mükemmel.',
    commentEn: 'Porcini mushroom risotto became my favorite! Rice is perfect consistency and mushroom aroma is amazing. Service with truffle oil is perfect.',
    createdAt: '2025-10-06T20:15:00Z',
    images: ['https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=800&q=90'],
    isVerified: true,
    helpfulCount: 14,
    userLevel: 'vip'
  },
  {
    id: 'rev-11',
    userName: 'Kemal Özkan',
    userAvatar: 'https://i.pravatar.cc/150?img=11',
    menuItemId: 'item-13',
    rating: 5,
    comment: 'Fırın levrek çok lezzetliydi!',
    commentTr: 'Fırın levrek çok lezzetliydi! Balık taze ve pişmesi mükemmel. Sebzeleri de çok güzel pişmiş.',
    commentEn: 'Oven-baked sea bass was delicious! Fish is fresh and cooking is perfect. Vegetables are also nicely cooked.',
    createdAt: '2025-10-05T19:00:00Z',
    images: ['https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=90'],
    isVerified: true,
    helpfulCount: 9,
    userLevel: 'regular'
  },
  {
    id: 'rev-12',
    userName: 'Aylin Demirtaş',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    menuItemId: 'item-20',
    rating: 5,
    comment: 'Panna cotta çok hafif ve lezzetli!',
    commentTr: 'Panna cotta çok hafif ve lezzetli! Orman meyvesi sosu ile mükemmel uyum. Vanilya kokusu harika.',
    commentEn: 'Panna cotta is very light and delicious! Perfect harmony with forest berry sauce. Vanilla aroma is amazing.',
    createdAt: '2025-10-04T21:30:00Z',
    images: ['https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=90'],
    isVerified: true,
    helpfulCount: 8,
    userLevel: 'vip',
    tags: ['light', 'delicious', 'perfect presentation']
  },
  // Carpaccio Reviews
  {
    id: 'rev-16',
    userName: 'Marco Rossi',
    userAvatar: 'https://i.pravatar.cc/150?img=16',
    menuItemId: 'item-1',
    rating: 5,
    comment: 'Perfect carpaccio! Just like in Rome.',
    commentTr: 'Mükemmel carpaccio! Roma\'da yediğim gibi. Dana bonfile çok taze ve ince kesilmiş.',
    commentEn: 'Perfect carpaccio! Just like in Rome. The beef tenderloin is very fresh and thinly sliced.',
    createdAt: '2025-10-20T18:45:00Z',
    images: [
      'https://images.unsplash.com/photo-1625938145312-90a0463fc498?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90'
    ],
    isVerified: true,
    helpfulCount: 15,
    userLevel: 'vip',
    tags: ['authentic', 'fresh', 'perfect']
  },
  {
    id: 'rev-17',
    userName: 'Emre Kaya',
    userAvatar: 'https://i.pravatar.cc/150?img=17',
    menuItemId: 'item-1',
    rating: 4,
    comment: 'Çok lezzetli ama biraz daha parmesan olabilirdi.',
    commentTr: 'Çok lezzetli ama biraz daha parmesan olabilirdi. Roka salatası çok taze.',
    commentEn: 'Very delicious but could have a bit more parmesan. The arugula salad is very fresh.',
    createdAt: '2025-10-19T20:15:00Z',
    images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'],
    isVerified: true,
    helpfulCount: 6,
    userLevel: 'regular',
    tags: ['delicious', 'fresh', 'could be better']
  },
  // Burrata Reviews
  {
    id: 'rev-18',
    userName: 'Giulia Bianchi',
    userAvatar: 'https://i.pravatar.cc/150?img=18',
    menuItemId: 'item-2',
    rating: 5,
    comment: 'Incredible burrata! Creamy and perfect.',
    commentTr: 'İnanılmaz burrata! Kremamsı ve mükemmel. İtalya\'dan getirilen peynir gerçekten kaliteli.',
    commentEn: 'Incredible burrata! Creamy and perfect. The cheese imported from Italy is really high quality.',
    createdAt: '2025-10-18T19:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1575932444949-e5ef14cf4ab0?w=800&q=90',
      'https://images.unsplash.com/photo-1580116293943-0e9e0ce15d55?w=800&q=90'
    ],
    isVerified: true,
    helpfulCount: 22,
    userLevel: 'vip',
    tags: ['incredible', 'creamy', 'high quality']
  },
  {
    id: 'rev-19',
    userName: 'Ahmet Yıldız',
    userAvatar: 'https://i.pravatar.cc/150?img=19',
    menuItemId: 'item-2',
    rating: 5,
    comment: 'Burrata peyniri çok lezzetli! Kiraz domatesler çok tatlı.',
    commentTr: 'Burrata peyniri çok lezzetli! Kiraz domatesler çok tatlı. Fesleğen aroması harika.',
    commentEn: 'The burrata cheese is very delicious! The cherry tomatoes are very sweet. The basil aroma is amazing.',
    createdAt: '2025-10-17T21:00:00Z',
    images: ['https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=90'],
    isVerified: true,
    helpfulCount: 9,
    userLevel: 'regular',
    tags: ['delicious', 'sweet tomatoes', 'amazing aroma']
  },
  // Bruschetta Reviews
  {
    id: 'rev-20',
    userName: 'Francesca Romano',
    userAvatar: 'https://i.pravatar.cc/150?img=20',
    menuItemId: 'item-3',
    rating: 5,
    comment: 'Perfect bruschetta! All 3 varieties are amazing.',
    commentTr: 'Mükemmel bruschetta! 3 çeşidi de harika. Özellikle mantar-truffle olanı çok lezzetli.',
    commentEn: 'Perfect bruschetta! All 3 varieties are amazing. Especially the mushroom-truffle one is very delicious.',
    createdAt: '2025-10-16T20:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=800&q=90',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&q=90'
    ],
    isVerified: true,
    helpfulCount: 18,
    userLevel: 'vip',
    tags: ['perfect', 'amazing varieties', 'delicious']
  },
  {
    id: 'rev-21',
    userName: 'Emre Kaya',
    userAvatar: 'https://i.pravatar.cc/150?img=21',
    menuItemId: 'item-3',
    rating: 4,
    comment: 'Çok güzel ama biraz daha ekmek olabilirdi.',
    commentTr: 'Çok güzel ama biraz daha ekmek olabilirdi. Soslar harika ama ekmek miktarı az.',
    commentEn: 'Very nice but could have a bit more bread. The sauces are amazing but the bread amount is little.',
    createdAt: '2025-10-15T19:45:00Z',
    images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&q=90'],
    isVerified: true,
    helpfulCount: 5,
    userLevel: 'regular',
    tags: ['nice', 'good sauces', 'more bread needed']
  },
  // Pizza Reviews
  {
    id: 'rev-22',
    userName: 'Antonio Rossi',
    userAvatar: 'https://i.pravatar.cc/150?img=22',
    menuItemId: 'item-8',
    rating: 5,
    comment: 'Best pizza in Istanbul! Authentic Neapolitan style.',
    commentTr: 'İstanbul\'daki en iyi pizza! Otantik Napoli tarzı. Hamur mükemmel, malzemeler taze.',
    commentEn: 'Best pizza in Istanbul! Authentic Neapolitan style. Perfect dough, fresh ingredients.',
    createdAt: '2025-10-14T18:20:00Z',
    images: [
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=90',
      'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=90'
    ],
    isVerified: true,
    helpfulCount: 25,
    userLevel: 'vip',
    tags: ['best pizza', 'authentic', 'perfect dough']
  },
  {
    id: 'rev-23',
    userName: 'Selin Yılmaz',
    userAvatar: 'https://i.pravatar.cc/150?img=23',
    menuItemId: 'item-8',
    rating: 5,
    comment: 'Margherita pizza harika! Mozzarella çok kaliteli.',
    commentTr: 'Margherita pizza harika! Mozzarella çok kaliteli. Fesleğen taze ve aromatik.',
    commentEn: 'Margherita pizza is amazing! The mozzarella is very high quality. Basil is fresh and aromatic.',
    createdAt: '2025-10-13T21:15:00Z',
    images: ['https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=90'],
    isVerified: true,
    helpfulCount: 12,
    userLevel: 'regular',
    tags: ['amazing', 'high quality', 'fresh basil']
  },
  // Tagliatelle Reviews
  {
    id: 'rev-24',
    userName: 'Luca Ferrari',
    userAvatar: 'https://i.pravatar.cc/150?img=24',
    menuItemId: 'item-4',
    rating: 5,
    comment: 'Best truffle pasta I have ever had!',
    commentTr: 'Şimdiye kadar yediğim en iyi trüflü makarna! Trüf aroması harika.',
    commentEn: 'Best truffle pasta I have ever had! The truffle aroma is amazing.',
    createdAt: '2025-10-12T19:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'
    ],
    isVerified: true,
    helpfulCount: 28,
    userLevel: 'vip',
    tags: ['best truffle', 'amazing aroma', 'perfect']
  },
  {
    id: 'rev-25',
    userName: 'Deniz Aydın',
    userAvatar: 'https://i.pravatar.cc/150?img=25',
    menuItemId: 'item-4',
    rating: 5,
    comment: 'Trüf mantarı çok kaliteli! Makarna harika.',
    commentTr: 'Trüf mantarı çok kaliteli! Makarna harika. Parmesan peyniri de mükemmel.',
    commentEn: 'The truffle is very high quality! The pasta is amazing. The parmesan cheese is also perfect.',
    createdAt: '2025-10-11T20:45:00Z',
    images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800'],
    isVerified: true,
    helpfulCount: 16,
    userLevel: 'regular',
    tags: ['high quality', 'amazing pasta', 'perfect cheese']
  },
  // Spaghetti Vongole Reviews
  {
    id: 'rev-26',
    userName: 'Giovanni Rossi',
    userAvatar: 'https://i.pravatar.cc/150?img=26',
    menuItemId: 'item-5',
    rating: 5,
    comment: 'Fresh clams and perfect pasta!',
    commentTr: 'Taze deniz tarağı ve mükemmel makarna! İtalya\'dan hiç farkı yok.',
    commentEn: 'Fresh clams and perfect pasta! No different from Italy.',
    createdAt: '2025-10-10T21:15:00Z',
    images: [
      'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'
    ],
    isVerified: true,
    helpfulCount: 22,
    userLevel: 'vip',
    tags: ['fresh seafood', 'perfect pasta', 'authentic']
  },
  {
    id: 'rev-27',
    userName: 'Ayşe Demir',
    userAvatar: 'https://i.pravatar.cc/150?img=27',
    menuItemId: 'item-5',
    rating: 4,
    comment: 'Çok lezzetli ama biraz acı.',
    commentTr: 'Çok lezzetli ama biraz acı. Deniz tarağı çok taze ve lezzetli.',
    commentEn: 'Very delicious but a bit spicy. The clams are very fresh and tasty.',
    createdAt: '2025-10-09T19:00:00Z',
    images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800'],
    isVerified: true,
    helpfulCount: 8,
    userLevel: 'regular',
    tags: ['delicious', 'fresh', 'spicy']
  },
  // Tiramisu Reviews
  {
    id: 'rev-28',
    userName: 'Sofia Bianchi',
    userAvatar: 'https://i.pravatar.cc/150?img=28',
    menuItemId: 'item-19',
    rating: 5,
    comment: 'Perfect tiramisu! Just like in Italy.',
    commentTr: 'Mükemmel tiramisu! İtalya\'daki gibi. Kremamsı ve espresso tadı harika.',
    commentEn: 'Perfect tiramisu! Just like in Italy. Creamy and the espresso flavor is amazing.',
    createdAt: '2025-10-08T20:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1606312619070-d48b4cac5ccf?w=800',
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800'
    ],
    isVerified: true,
    helpfulCount: 35,
    userLevel: 'vip',
    tags: ['perfect', 'authentic', 'creamy']
  },
  {
    id: 'rev-29',
    userName: 'Mehmet Yılmaz',
    userAvatar: 'https://i.pravatar.cc/150?img=29',
    menuItemId: 'item-19',
    rating: 5,
    comment: 'En iyi tiramisu! Kesinlikle tavsiye ederim.',
    commentTr: 'En iyi tiramisu! Kesinlikle tavsiye ederim. Ladyfinger bisküvileri mükemmel.',
    commentEn: 'The best tiramisu! Definitely recommend. The ladyfinger biscuits are perfect.',
    createdAt: '2025-10-07T21:45:00Z',
    images: ['https://images.unsplash.com/photo-1606312619070-d48b4cac5ccf?w=800'],
    isVerified: true,
    helpfulCount: 19,
    userLevel: 'regular',
    tags: ['best dessert', 'recommend', 'perfect']
  },
  // Dana Fileto Reviews
  {
    id: 'rev-30',
    userName: 'Alessandro Conti',
    userAvatar: 'https://i.pravatar.cc/150?img=30',
    menuItemId: 'item-12',
    rating: 5,
    comment: 'Best beef fillet ever! Perfectly cooked.',
    commentTr: 'Şimdiye kadar yediğim en iyi dana fileto! Mükemmel pişmiş.',
    commentEn: 'Best beef fillet ever! Perfectly cooked. The green pepper sauce is incredible.',
    createdAt: '2025-10-06T19:15:00Z',
    images: [
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800'
    ],
    isVerified: true,
    helpfulCount: 31,
    userLevel: 'vip',
    tags: ['best meat', 'perfectly cooked', 'incredible sauce']
  }
];

// Current Table ID (For demo purposes)
export const currentTableId = 'table-10';
export const currentTableNumber = 10;
export const currentTableCapacity = 4;

// Initial table orders (empty at start)
export const initialTableOrders: TableOrder[] = [];


