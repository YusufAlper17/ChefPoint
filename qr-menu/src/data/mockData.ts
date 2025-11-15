export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  rating: number;
  totalReviews: number;
  priceRange: string;
  image: string;
  location: {
    address: string;
    city: string;
    district: string;
  };
  features: string[];
  workingHours: {
    open: string;
    close: string;
  };
  tables: Table[];
  menu: MenuItem[];
  campaigns: Campaign[];
  loyaltyProgram: LoyaltyProgram;
  shorts: Short[];
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  qrCode: string;
  currentOrder?: Order;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  videoUrl?: string;
  calories: number;
  ingredients: string[];
  allergens: string[];
  rating: number;
  reviewCount: number;
  isPopular: boolean;
  isAvailable: boolean;
  preparationTime: number;
  isVegan?: boolean;
  isVegetarian?: boolean;
  isGlutenFree?: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  discount: number;
  image: string;
  validUntil: string;
  type: 'percentage' | 'fixed' | 'bogo';
}

export interface LoyaltyProgram {
  id: string;
  name: string;
  pointsPerLira: number;
  rewards: Reward[];
}

export interface Reward {
  id: string;
  name: string;
  pointsRequired: number;
  description: string;
}

export interface Short {
  id: string;
  restaurantId: string;
  videoUrl: string;
  thumbnail: string;
  title: string;
  description: string;
  likes: number;
  views: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  rating?: number;
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  restaurantId?: string;
  menuItemId?: string;
  rating: number;
  comment: string;
  ambiance?: number;
  hygiene?: number;
  service?: number;
  createdAt: string;
  images?: string[];
}

export interface Order {
  id: string;
  restaurantId: string;
  tableId: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'completed';
  totalAmount: number;
  createdAt: string;
  servedAt?: string;
  notes?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
}

// Mock Restaurants Data
export const mockRestaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Bella Italia',
    description: 'Otantik İtalyan mutfağının en lezzetli örneklerini sunan, deniz manzaralı romantik bir restoran.',
    cuisine: 'İtalyan',
    rating: 4.8,
    totalReviews: 342,
    priceRange: '₺₺₺',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    location: {
      address: 'Kordon Boyu No:45',
      city: 'İzmir',
      district: 'Alsancak'
    },
    features: ['Deniz Kenarı', 'Canlı Müzik', 'Teras', 'Romantik Ortam', 'Sigara İçilmez', 'Vale Hizmeti'],
    workingHours: {
      open: '11:00',
      close: '23:00'
    },
    tables: [
      { id: 'table-1', number: 1, capacity: 2, status: 'available', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-1-table-1' },
      { id: 'table-2', number: 2, capacity: 4, status: 'occupied', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-1-table-2' },
      { id: 'table-3', number: 3, capacity: 2, status: 'available', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-1-table-3' },
      { id: 'table-4', number: 4, capacity: 6, status: 'reserved', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-1-table-4' },
      { id: 'table-5', number: 5, capacity: 4, status: 'available', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-1-table-5' },
      { id: 'table-6', number: 6, capacity: 2, status: 'occupied', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-1-table-6' },
    ],
    menu: [
      {
        id: 'menu-1',
        name: 'Margherita Pizza',
        description: 'Klasik İtalyan pizzası, taze mozzarella, domates sosu ve fesleğen',
        category: 'Pizza',
        price: 189,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=1-SJGQ2HLp8',
        calories: 850,
        ingredients: ['Un', 'Mozzarella', 'Domates Sosu', 'Fesleğen', 'Zeytinyağı'],
        allergens: ['Gluten', 'Süt'],
        rating: 4.9,
        reviewCount: 127,
        isPopular: true,
        isAvailable: true,
        preparationTime: 15
      },
      {
        id: 'menu-2',
        name: 'Spaghetti Carbonara',
        description: 'Kremsi sos, guanciale, parmesan peyniri ve yumurta',
        category: 'Makarna',
        price: 165,
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=qoHnwOHLiMk',
        calories: 720,
        ingredients: ['Spagetti', 'Guanciale', 'Yumurta', 'Parmesan', 'Karabiber'],
        allergens: ['Gluten', 'Yumurta', 'Süt'],
        rating: 4.7,
        reviewCount: 89,
        isPopular: true,
        isAvailable: true,
        preparationTime: 12
      },
      {
        id: 'menu-3',
        name: 'Tiramisu',
        description: 'Geleneksel İtalyan tatlısı, mascarpone ve espresso',
        category: 'Tatlı',
        price: 95,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=JVT900H6s1g',
        calories: 450,
        ingredients: ['Mascarpone', 'Kedi Dili', 'Espresso', 'Kakao'],
        allergens: ['Gluten', 'Süt', 'Yumurta'],
        rating: 4.8,
        reviewCount: 156,
        isPopular: true,
        isAvailable: true,
        preparationTime: 5
      },
      {
        id: 'menu-4',
        name: 'Quattro Formaggi Pizza',
        description: 'Dört peynir pizzası: mozzarella, gorgonzola, parmesan, ricotta',
        category: 'Pizza',
        price: 215,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=nMKtMsn-xRk',
        calories: 950,
        ingredients: ['Un', 'Mozzarella', 'Gorgonzola', 'Parmesan', 'Ricotta'],
        allergens: ['Gluten', 'Süt'],
        rating: 4.6,
        reviewCount: 94,
        isPopular: false,
        isAvailable: true,
        preparationTime: 15
      },
      {
        id: 'menu-5',
        name: 'Caprese Salata',
        description: 'Taze mozzarella, domates, fesleğen ve zeytinyağı',
        category: 'Salata',
        price: 125,
        image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=JgEHCsshFZw',
        calories: 320,
        ingredients: ['Mozzarella', 'Domates', 'Fesleğen', 'Zeytinyağı', 'Balsamik Sirke'],
        allergens: ['Süt'],
        rating: 4.5,
        reviewCount: 67,
        isPopular: false,
        isAvailable: true,
        preparationTime: 8,
        isVegetarian: true
      },
      {
        id: 'menu-6',
        name: 'Risotto ai Funghi',
        description: 'Mantarlı risotto, parmesan ve beyaz şarap',
        category: 'Risotto',
        price: 175,
        image: 'https://images.unsplash.com/photo-1637806930600-37fa8892069d?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=5LYv6FondsE',
        calories: 680,
        ingredients: ['Arborio Pirinci', 'Mantar', 'Parmesan', 'Beyaz Şarap', 'Tereyağı'],
        allergens: ['Süt', 'Alkol'],
        rating: 4.7,
        reviewCount: 78,
        isPopular: true,
        isAvailable: true,
        preparationTime: 20
      },
      {
        id: 'menu-7',
        name: 'Bruschetta',
        description: 'Kızarmış ekmek üstünde domates, fesleğen ve sarımsak',
        category: 'Başlangıç',
        price: 85,
        image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=RsmarTB39y4',
        calories: 280,
        ingredients: ['Ekmek', 'Domates', 'Fesleğen', 'Sarımsak', 'Zeytinyağı'],
        allergens: ['Gluten'],
        rating: 4.4,
        reviewCount: 112,
        isPopular: true,
        isAvailable: true,
        preparationTime: 10,
        isVegan: true
      },
      {
        id: 'menu-8',
        name: 'Lasagna',
        description: 'Kıymalı lazanya, beşamel sos ve parmesan',
        category: 'Makarna',
        price: 185,
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=3aJNNWkDj0w',
        calories: 820,
        ingredients: ['Lazanya Yaprağı', 'Kıyma', 'Beşamel Sos', 'Domates Sosu', 'Parmesan'],
        allergens: ['Gluten', 'Süt'],
        rating: 4.8,
        reviewCount: 143,
        isPopular: true,
        isAvailable: true,
        preparationTime: 18
      },
    ],
    campaigns: [
      {
        id: 'camp-1',
        title: 'Hafta Sonu %20 İndirim',
        description: 'Cumartesi ve Pazar tüm pizzalarda %20 indirim',
        discount: 20,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
        validUntil: '2025-12-31',
        type: 'percentage'
      },
      {
        id: 'camp-2',
        title: '2 Al 1 Öde - Tiramisu',
        description: 'İki tiramisu alana bir tanesi bizden',
        discount: 50,
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
        validUntil: '2025-11-30',
        type: 'bogo'
      },
      {
        id: 'camp-3',
        title: 'Öğle Menüsü',
        description: 'Öğle saatlerinde makarna + içecek + tatlı 199₺',
        discount: 50,
        image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80',
        validUntil: '2025-12-31',
        type: 'fixed'
      }
    ],
    loyaltyProgram: {
      id: 'loyalty-1',
      name: 'Bella Club',
      pointsPerLira: 1,
      rewards: [
        { id: 'reward-1', name: 'Ücretsiz Kahve', pointsRequired: 100, description: 'Bir fincan espresso' },
        { id: 'reward-2', name: 'Tatlı İkramı', pointsRequired: 250, description: 'Seçeceğiniz bir tatlı' },
        { id: 'reward-3', name: '%15 İndirim', pointsRequired: 500, description: 'Tüm hesaba %15 indirim' },
        { id: 'reward-4', name: 'Ücretsiz Pizza', pointsRequired: 1000, description: 'Orta boy pizza' }
      ]
    },
    shorts: [
      {
        id: 'short-1',
        restaurantId: 'rest-1',
        videoUrl: 'https://www.youtube.com/shorts/example1',
        thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
        title: 'Pizza Yapımının Sırları',
        description: 'Hamur açma tekniklerimizi keşfedin',
        likes: 1243,
        views: 15600,
        comments: []
      },
      {
        id: 'short-2',
        restaurantId: 'rest-1',
        videoUrl: 'https://www.youtube.com/shorts/example2',
        thumbnail: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=80',
        title: 'Deniz Manzarası Eşliğinde Yemek',
        description: 'Terasımızda unutulmaz anlar',
        likes: 892,
        views: 9800,
        comments: []
      }
    ]
  },
  {
    id: 'rest-2',
    name: 'Sushi Master',
    description: 'Geleneksel Japon mutfağı ve modern sunum sanatının buluştuğu özel bir mekan.',
    cuisine: 'Japon',
    rating: 4.9,
    totalReviews: 456,
    priceRange: '₺₺₺₺',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80',
    location: {
      address: 'Nispetiye Cad. No:12',
      city: 'İstanbul',
      district: 'Etiler'
    },
    features: ['Minimal Tasarım', 'Sushi Bar', 'Sake Bar', 'Japon Bahçesi', 'Özel Etkinlikler'],
    workingHours: {
      open: '12:00',
      close: '00:00'
    },
    tables: [
      { id: 'table-7', number: 1, capacity: 2, status: 'available', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-2-table-1' },
      { id: 'table-8', number: 2, capacity: 4, status: 'available', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-2-table-2' },
      { id: 'table-9', number: 3, capacity: 2, status: 'occupied', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-2-table-3' },
      { id: 'table-10', number: 4, capacity: 6, status: 'available', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-2-table-4' },
    ],
    menu: [
      {
        id: 'menu-9',
        name: 'California Roll',
        description: 'Surimi, avokado, salatalık, susam',
        category: 'Sushi',
        price: 145,
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=q1LGqDUjC-g',
        calories: 320,
        ingredients: ['Sushi Pirinci', 'Nori', 'Surimi', 'Avokado', 'Salatalık', 'Susam'],
        allergens: ['Balık', 'Soya', 'Susam'],
        rating: 4.7,
        reviewCount: 234,
        isPopular: true,
        isAvailable: true,
        preparationTime: 10
      },
      {
        id: 'menu-10',
        name: 'Salmon Nigiri',
        description: 'Taze Norveç somonlu nigiri (8 adet)',
        category: 'Sushi',
        price: 195,
        image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=joweUxpHessage',
        calories: 280,
        ingredients: ['Somon', 'Sushi Pirinci', 'Wasabi'],
        allergens: ['Balık'],
        rating: 4.9,
        reviewCount: 312,
        isPopular: true,
        isAvailable: true,
        preparationTime: 8
      },
      {
        id: 'menu-11',
        name: 'Dragon Roll',
        description: 'Karides tempura, avokado, unagi sos',
        category: 'Sushi',
        price: 235,
        image: 'https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=qKqj85vc5lY',
        calories: 420,
        ingredients: ['Karides', 'Avokado', 'Nori', 'Sushi Pirinci', 'Unagi Sos'],
        allergens: ['Kabuklu Deniz Ürünleri', 'Soya', 'Gluten'],
        rating: 4.8,
        reviewCount: 189,
        isPopular: true,
        isAvailable: true,
        preparationTime: 15
      },
      {
        id: 'menu-12',
        name: 'Miso Soup',
        description: 'Geleneksel Japon çorbası',
        category: 'Çorba',
        price: 65,
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=W_qlmQWOzso',
        calories: 85,
        ingredients: ['Miso Macunu', 'Tofu', 'Wakame', 'Yeşil Soğan'],
        allergens: ['Soya'],
        rating: 4.6,
        reviewCount: 145,
        isPopular: false,
        isAvailable: true,
        preparationTime: 5,
        isVegan: true
      },
      {
        id: 'menu-13',
        name: 'Chicken Teriyaki',
        description: 'Teriyaki soslu tavuk, pirinç ve sebze',
        category: 'Ana Yemek',
        price: 175,
        image: 'https://images.unsplash.com/photo-1629978755451-fef0c61c6a99?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=EH7FB3zHjeI',
        calories: 650,
        ingredients: ['Tavuk', 'Teriyaki Sos', 'Pirinç', 'Brokoli', 'Havuç'],
        allergens: ['Soya', 'Gluten'],
        rating: 4.7,
        reviewCount: 167,
        isPopular: true,
        isAvailable: true,
        preparationTime: 18
      },
      {
        id: 'menu-14',
        name: 'Edamame',
        description: 'Tuzlu soya fasulyesi',
        category: 'Başlangıç',
        price: 55,
        image: 'https://images.unsplash.com/photo-1584255014406-2a68ea38e48c?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=j9Ho3tzT6VI',
        calories: 120,
        ingredients: ['Soya Fasulyesi', 'Tuz'],
        allergens: ['Soya'],
        rating: 4.5,
        reviewCount: 201,
        isPopular: true,
        isAvailable: true,
        preparationTime: 5,
        isVegan: true
      },
      {
        id: 'menu-15',
        name: 'Tempura Set',
        description: 'Karışık sebze ve karides tempura',
        category: 'Başlangıç',
        price: 165,
        image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=NGsh7dF-4nQ',
        calories: 520,
        ingredients: ['Karides', 'Patates', 'Patlıcan', 'Kabak', 'Tempura Hamuru'],
        allergens: ['Kabuklu Deniz Ürünleri', 'Gluten', 'Yumurta'],
        rating: 4.8,
        reviewCount: 178,
        isPopular: true,
        isAvailable: true,
        preparationTime: 12
      },
      {
        id: 'menu-16',
        name: 'Ramen',
        description: 'Zengin tonkotsu çorbası, chashu domuz eti, yumurta',
        category: 'Çorba',
        price: 195,
        image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=yzqzI_mopponent',
        calories: 720,
        ingredients: ['Ramen Eriştesi', 'Domuz Eti', 'Yumurta', 'Nori', 'Bambu'],
        allergens: ['Gluten', 'Yumurta', 'Soya'],
        rating: 4.9,
        reviewCount: 287,
        isPopular: true,
        isAvailable: true,
        preparationTime: 20
      }
    ],
    campaigns: [
      {
        id: 'camp-4',
        title: 'Happy Hour Sake',
        description: '17:00-19:00 arası tüm sake çeşitlerinde %30 indirim',
        discount: 30,
        image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
        validUntil: '2025-12-31',
        type: 'percentage'
      },
      {
        id: 'camp-5',
        title: 'Sushi Combo',
        description: '3 farklı roll + miso çorba sadece 399₺',
        discount: 100,
        image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80',
        validUntil: '2025-11-15',
        type: 'fixed'
      }
    ],
    loyaltyProgram: {
      id: 'loyalty-2',
      name: 'Sushi Club',
      pointsPerLira: 2,
      rewards: [
        { id: 'reward-5', name: 'Ücretsiz Edamame', pointsRequired: 150, description: 'Tuzlu soya fasulyesi' },
        { id: 'reward-6', name: 'California Roll', pointsRequired: 400, description: 'Ücretsiz California Roll' },
        { id: 'reward-7', name: '%20 İndirim', pointsRequired: 800, description: 'Tüm hesaba %20 indirim' }
      ]
    },
    shorts: [
      {
        id: 'short-3',
        restaurantId: 'rest-2',
        videoUrl: 'https://www.youtube.com/shorts/example3',
        thumbnail: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80',
        title: 'Sushi Ustasının Elleri',
        description: 'Mükemmel kesim teknikleri',
        likes: 2341,
        views: 28900,
        comments: []
      }
    ]
  },
  {
    id: 'rest-3',
    name: 'Kebapçı Mahmut',
    description: 'Antep usulü kebap çeşitleri ve ev yapımı mezelerle geleneksel Türk mutfağı.',
    cuisine: 'Türk',
    rating: 4.7,
    totalReviews: 589,
    priceRange: '₺₺',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
    location: {
      address: 'Eski Çarşı İçi No:23',
      city: 'Gaziantep',
      district: 'Şehitkamil'
    },
    features: ['Aile Dostu', 'Geleneksel', 'Açık Alan', 'Otopark', 'Paket Servis'],
    workingHours: {
      open: '10:00',
      close: '22:00'
    },
    tables: [
      { id: 'table-11', number: 1, capacity: 4, status: 'available', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-3-table-1' },
      { id: 'table-12', number: 2, capacity: 6, status: 'occupied', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-3-table-2' },
      { id: 'table-13', number: 3, capacity: 4, status: 'available', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-3-table-3' },
      { id: 'table-14', number: 4, capacity: 8, status: 'reserved', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-3-table-4' },
      { id: 'table-15', number: 5, capacity: 4, status: 'available', qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=rest-3-table-5' },
    ],
    menu: [
      {
        id: 'menu-17',
        name: 'Adana Kebap',
        description: 'Acılı kıyma kebap, bulgur pilavı ve közlenmiş sebze',
        category: 'Kebap',
        price: 185,
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=O0tNG6xDK4I',
        calories: 780,
        ingredients: ['Dana Kıyma', 'Biber', 'Sarımsak', 'Baharatlar'],
        allergens: ['Gluten'],
        rating: 4.9,
        reviewCount: 456,
        isPopular: true,
        isAvailable: true,
        preparationTime: 20
      },
      {
        id: 'menu-18',
        name: 'Urfa Kebap',
        description: 'Acısız kıyma kebap',
        category: 'Kebap',
        price: 185,
        image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=5Ix5HREnYzM',
        calories: 760,
        ingredients: ['Dana Kıyma', 'Baharatlar'],
        allergens: ['Gluten'],
        rating: 4.8,
        reviewCount: 389,
        isPopular: true,
        isAvailable: true,
        preparationTime: 20
      },
      {
        id: 'menu-19',
        name: 'Karışık Meze Tabağı',
        description: 'Humus, haydari, acılı ezme, patlıcan salatası',
        category: 'Meze',
        price: 95,
        image: 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=IVOuDj33rwo',
        calories: 420,
        ingredients: ['Nohut', 'Yoğurt', 'Patlıcan', 'Biber', 'Domates'],
        allergens: ['Süt', 'Susam'],
        rating: 4.6,
        reviewCount: 234,
        isPopular: false,
        isAvailable: true,
        preparationTime: 5
      },
      {
        id: 'menu-20',
        name: 'Lahmacun',
        description: 'İnce hamur üzerine kıymalı karışım (3 adet)',
        category: 'Ana Yemek',
        price: 75,
        image: 'https://images.unsplash.com/photo-1593504049359-74330189a345?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=RsSx-K2WnpQ',
        calories: 650,
        ingredients: ['Hamur', 'Kıyma', 'Domates', 'Biber', 'Maydanoz'],
        allergens: ['Gluten'],
        rating: 4.7,
        reviewCount: 512,
        isPopular: true,
        isAvailable: true,
        preparationTime: 15
      },
      {
        id: 'menu-21',
        name: 'Künefe',
        description: 'Tel kadayıf, peynir ve şerbet',
        category: 'Tatlı',
        price: 85,
        image: 'https://images.unsplash.com/photo-1625935219315-b0e2c9ee6010?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=0AV6z8jMoX8',
        calories: 520,
        ingredients: ['Tel Kadayıf', 'Peynir', 'Şerbet', 'Fıstık'],
        allergens: ['Gluten', 'Süt', 'Sert Kabuklu Meyveler'],
        rating: 4.9,
        reviewCount: 678,
        isPopular: true,
        isAvailable: true,
        preparationTime: 10
      },
      {
        id: 'menu-22',
        name: 'Mercimek Çorbası',
        description: 'Geleneksel kırmızı mercimek çorbası',
        category: 'Çorba',
        price: 45,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=YFpPJYzsz3E',
        calories: 180,
        ingredients: ['Mercimek', 'Soğan', 'Havuç', 'Baharatlar'],
        allergens: [],
        rating: 4.5,
        reviewCount: 289,
        isPopular: true,
        isAvailable: true,
        preparationTime: 5,
        isVegan: true,
        isGlutenFree: true
      },
      {
        id: 'menu-23',
        name: 'Beyti Sarma',
        description: 'Lavaş içinde kebap, yoğurt ve tereyağı',
        category: 'Kebap',
        price: 205,
        image: 'https://images.unsplash.com/photo-1596491731197-c9e032e3c321?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=iHWZKfPRqC0',
        calories: 850,
        ingredients: ['Dana Eti', 'Lavaş', 'Yoğurt', 'Tereyağı', 'Biber'],
        allergens: ['Gluten', 'Süt'],
        rating: 4.8,
        reviewCount: 367,
        isPopular: true,
        isAvailable: true,
        preparationTime: 25
      },
      {
        id: 'menu-24',
        name: 'Ayran',
        description: 'Ev yapımı ayran',
        category: 'İçecek',
        price: 25,
        image: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=600&q=80',
        videoUrl: 'https://www.youtube.com/watch?v=w9m9c2CJfq4',
        calories: 60,
        ingredients: ['Yoğurt', 'Su', 'Tuz'],
        allergens: ['Süt'],
        rating: 4.6,
        reviewCount: 445,
        isPopular: true,
        isAvailable: true,
        preparationTime: 2
      }
    ],
    campaigns: [
      {
        id: 'camp-6',
        title: 'Öğle Menüsü',
        description: 'Çorba + Kebap + Tatlı + İçecek = 199₺',
        discount: 80,
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80',
        validUntil: '2025-12-31',
        type: 'fixed'
      },
      {
        id: 'camp-7',
        title: 'Aile Paketi',
        description: '4 kişilik özel menü %25 indirimli',
        discount: 25,
        image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&q=80',
        validUntil: '2025-11-30',
        type: 'percentage'
      }
    ],
    loyaltyProgram: {
      id: 'loyalty-3',
      name: 'Mahmut Sadakat',
      pointsPerLira: 1,
      rewards: [
        { id: 'reward-8', name: 'Ücretsiz Çorba', pointsRequired: 50, description: 'Mercimek çorbası' },
        { id: 'reward-9', name: 'Tatlı İkramı', pointsRequired: 200, description: 'Künefe veya Baklava' },
        { id: 'reward-10', name: '%10 İndirim', pointsRequired: 500, description: 'Tüm hesaba indirim' }
      ]
    },
    shorts: [
      {
        id: 'short-4',
        restaurantId: 'rest-3',
        videoUrl: 'https://www.youtube.com/shorts/example4',
        thumbnail: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80',
        title: 'Kebap Nasıl Yapılır?',
        description: 'Ustamızdan kebap sırları',
        likes: 3456,
        views: 45200,
        comments: []
      }
    ]
  }
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'review-1',
    userId: 'user-1',
    userName: 'Ayşe Yılmaz',
    userAvatar: 'https://i.pravatar.cc/150?img=1',
    restaurantId: 'rest-1',
    rating: 5,
    comment: 'Harika bir deneyimdi! Pizzalar muhteşem, manzara eşsiz. Kesinlikle tekrar geleceğim.',
    ambiance: 5,
    hygiene: 5,
    service: 5,
    createdAt: '2025-10-05T19:30:00Z',
    images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80']
  },
  {
    id: 'review-2',
    userId: 'user-2',
    userName: 'Mehmet Kaya',
    userAvatar: 'https://i.pravatar.cc/150?img=2',
    restaurantId: 'rest-1',
    menuItemId: 'menu-1',
    rating: 5,
    comment: 'Margherita pizzası tam bir İtalyan klasiği. Hamuru mükemmel, malzemeler çok taze!',
    createdAt: '2025-10-03T20:15:00Z',
    images: ['https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80']
  },
  {
    id: 'review-3',
    userId: 'user-3',
    userName: 'Zeynep Demir',
    userAvatar: 'https://i.pravatar.cc/150?img=3',
    restaurantId: 'rest-2',
    rating: 5,
    comment: 'Sushi kalitesi inanılmaz. Her şey çok taze ve lezzetli.',
    ambiance: 5,
    hygiene: 5,
    service: 4,
    createdAt: '2025-10-04T21:00:00Z',
    images: ['https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800&q=80']
  },
  {
    id: 'review-4',
    userId: 'user-4',
    userName: 'Can Öztürk',
    userAvatar: 'https://i.pravatar.cc/150?img=4',
    restaurantId: 'rest-2',
    menuItemId: 'menu-10',
    rating: 5,
    comment: 'Salmon nigiri harikaydı, ağzınızda eriyor. Sunumu da çok güzel.',
    createdAt: '2025-10-02T18:45:00Z',
    images: ['https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=800&q=80', 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=800&q=80']
  },
  {
    id: 'review-5',
    userId: 'user-5',
    userName: 'Elif Şahin',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    restaurantId: 'rest-3',
    rating: 5,
    comment: 'Adana kebap ve künefe için buraya gelmeye değer. Çok lezzetli!',
    ambiance: 4,
    hygiene: 5,
    service: 5,
    createdAt: '2025-10-01T19:20:00Z',
    images: ['https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80']
  },
  {
    id: 'review-6',
    userId: 'user-6',
    userName: 'Burak Arslan',
    userAvatar: 'https://i.pravatar.cc/150?img=6',
    restaurantId: 'rest-1',
    menuItemId: 'menu-2',
    rating: 5,
    comment: 'Carbonara harika! Kreması tam kıvamında ve lezzeti enfes. Porsiyonu da doyurucu.',
    createdAt: '2025-10-06T19:00:00Z',
    images: ['https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=800&q=80']
  },
  {
    id: 'review-7',
    userId: 'user-7',
    userName: 'Selin Öz',
    userAvatar: 'https://i.pravatar.cc/150?img=7',
    restaurantId: 'rest-1',
    menuItemId: 'menu-3',
    rating: 5,
    comment: 'Tiramisu muhteşem! İtalya\'da yediğimden bile daha lezzetliydi. Kesinlikle denemelisiniz.',
    createdAt: '2025-10-07T21:30:00Z',
    images: ['https://images.unsplash.com/photo-1606312619070-d48b4cac5ccf?w=800&q=80', 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80']
  },
  {
    id: 'review-8',
    userId: 'user-8',
    userName: 'Deniz Yıldız',
    userAvatar: 'https://i.pravatar.cc/150?img=8',
    restaurantId: 'rest-1',
    menuItemId: 'menu-6',
    rating: 4,
    comment: 'Mantarlı risotto çok güzeldi. Mantarları bol ve taze, pirinç de tam kıvamındaydı.',
    createdAt: '2025-10-08T20:00:00Z',
    images: ['https://images.unsplash.com/photo-1595908129746-8d0c5d63f0d8?w=800&q=80']
  },
  {
    id: 'review-9',
    userId: 'user-9',
    userName: 'Ali Kılıç',
    userAvatar: 'https://i.pravatar.cc/150?img=9',
    restaurantId: 'rest-1',
    menuItemId: 'menu-5',
    rating: 5,
    comment: 'Caprese salata çok taze ve hafif. Mozzarella kalitesi belli. Yaz için ideal bir başlangıç.',
    createdAt: '2025-10-09T18:15:00Z',
    images: ['https://images.unsplash.com/photo-1592417817038-d13e8532f0b6?w=800&q=80']
  },
  {
    id: 'review-10',
    userId: 'user-10',
    userName: 'Merve Aydın',
    userAvatar: 'https://i.pravatar.cc/150?img=10',
    restaurantId: 'rest-1',
    menuItemId: 'menu-7',
    rating: 5,
    comment: 'Bruschetta harika! Ekmeği tam kıvamında kızarmış, üzeri de çok lezzetli.',
    createdAt: '2025-10-10T19:45:00Z',
    images: ['https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=800&q=80']
  },
  {
    id: 'review-11',
    userId: 'user-11',
    userName: 'Kemal Özkan',
    userAvatar: 'https://i.pravatar.cc/150?img=11',
    restaurantId: 'rest-2',
    menuItemId: 'menu-11',
    rating: 5,
    comment: 'Dragon Roll görselliği ve lezzeti ile harikulade! Sunum da çok özenli.',
    createdAt: '2025-10-05T20:30:00Z',
    images: ['https://images.unsplash.com/photo-1564489563601-c53cfc451e93?w=800&q=80', 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800&q=80']
  },
  {
    id: 'review-12',
    userId: 'user-12',
    userName: 'Aylin Demirtaş',
    userAvatar: 'https://i.pravatar.cc/150?img=12',
    restaurantId: 'rest-2',
    menuItemId: 'menu-16',
    rating: 5,
    comment: 'Ramen muhteşem! Çorbası zengin, eti yumuşacık. Tokyo\'daki gibi.',
    createdAt: '2025-10-08T19:30:00Z',
    images: ['https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80']
  },
  {
    id: 'review-13',
    userId: 'user-13',
    userName: 'Emre Çelik',
    userAvatar: 'https://i.pravatar.cc/150?img=13',
    restaurantId: 'rest-3',
    menuItemId: 'menu-17',
    rating: 5,
    comment: 'Adana kebap lezzetine doyum olmuyor! Acısı tam kıvamında, eti de çok yumuşak.',
    createdAt: '2025-10-06T18:00:00Z',
    images: ['https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80', 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800&q=80']
  },
  {
    id: 'review-14',
    userId: 'user-14',
    userName: 'Gizem Yılmaz',
    userAvatar: 'https://i.pravatar.cc/150?img=14',
    restaurantId: 'rest-3',
    menuItemId: 'menu-21',
    rating: 5,
    comment: 'Künefe tam bir harika! Sıcak sıcak geldi, peyniri bol ve şerbeti tam kıvamında.',
    createdAt: '2025-10-09T20:45:00Z',
    images: ['https://images.unsplash.com/photo-1625935219315-b0e2c9ee6010?w=800&q=80']
  }
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    restaurantId: 'rest-1',
    tableId: 'table-2',
    items: [
      { menuItemId: 'menu-1', name: 'Margherita Pizza', quantity: 2, price: 189 },
      { menuItemId: 'menu-3', name: 'Tiramisu', quantity: 1, price: 95 }
    ],
    status: 'preparing',
    totalAmount: 473,
    createdAt: '2025-10-10T18:30:00Z',
    notes: 'Pizzalardan biri az pişmiş olsun'
  },
  {
    id: 'order-2',
    restaurantId: 'rest-2',
    tableId: 'table-9',
    items: [
      { menuItemId: 'menu-10', name: 'Salmon Nigiri', quantity: 1, price: 195 },
      { menuItemId: 'menu-11', name: 'Dragon Roll', quantity: 1, price: 235 }
    ],
    status: 'ready',
    totalAmount: 430,
    createdAt: '2025-10-10T19:00:00Z'
  },
  {
    id: 'order-3',
    restaurantId: 'rest-3',
    tableId: 'table-12',
    items: [
      { menuItemId: 'menu-17', name: 'Adana Kebap', quantity: 3, price: 185 },
      { menuItemId: 'menu-19', name: 'Karışık Meze Tabağı', quantity: 2, price: 95 },
      { menuItemId: 'menu-24', name: 'Ayran', quantity: 3, price: 25 }
    ],
    status: 'served',
    totalAmount: 820,
    createdAt: '2025-10-10T17:45:00Z',
    servedAt: '2025-10-10T18:10:00Z'
  }
];

