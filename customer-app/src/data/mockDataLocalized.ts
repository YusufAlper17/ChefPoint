// Localized Mock Data
// This file contains mock data in both Turkish and English

export interface LocalizedRestaurantData {
  tr: any;
  en: any;
}

// Helper function to get localized data
export function getLocalizedRestaurants(language: 'tr' | 'en') {
  return mockRestaurantsLocalized[language];
}

export function getLocalizedReviews(language: 'tr' | 'en') {
  return mockReviewsLocalized[language];
}

const mockRestaurantsLocalized: LocalizedRestaurantData = {
  tr: [
    {
      id: 'rest-1',
      name: 'Bella Italia',
      description: 'İzmir\'in en prestijli lokasyonunda, muhteşem Ege denizi manzarası eşliğinde otantik İtalyan mutfağının en lezzetli örneklerini sunan romantik bir restoran. 1998 yılından beri İtalyan şeflerimiz tarafından hazırlanan geleneksel tarifler ve taze İtalya\'dan getirilen malzemeler ile misafirlerimize unutulmaz bir deneyim sunuyoruz. Geniş şarap koleksiyonumuz, canlı piyano müziği ve şık ambiyansıyla özel günleriniz için ideal. Profesyonel servis ekibimiz ve deneyimli şeflerimizle her ziyaretinizi özel kılmak için buradayız.',
      cuisine: 'İtalyan',
      rating: 4.8,
      totalReviews: 342,
      priceRange: '₺₺₺',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      introVideo: 'https://www.youtube.com/watch?v=n1yxVjD6hZE',
      location: {
        address: 'Kordon Boyu No:45',
        city: 'İzmir',
        district: 'Alsancak'
      },
      features: ['Deniz Kenarı', 'Canlı Müzik', 'Teras', 'Romantik Ortam', 'Sigara İçilmez', 'Vale Hizmeti', 'WiFi', 'Otopark', 'Çocuk Menüsü', 'Engelli Erişimi', 'Rezervasyon Önerilir', 'Kredi Kartı'],
      workingHours: {
        open: '11:00',
        close: '23:00'
      },
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
          calories: 450,
          ingredients: ['Mascarpone', 'Kedi Dili', 'Espresso', 'Kakao'],
          allergens: ['Gluten', 'Süt', 'Yumurta'],
          rating: 4.8,
          reviewCount: 156,
          isPopular: true,
          isAvailable: true,
          preparationTime: 5
        }
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
        }
      ]
    },
    {
      id: 'rest-2',
      name: 'Sushi Master',
      description: 'İstanbul\'un kalbinde, Japon kültürünün inceliklerini yansıtan otantik bir deneyim sunan premium sushi restoranı. Tokyo\'dan özel olarak getirilen malzemeler ve 20 yıllık deneyime sahip Master Sushi Chef Takeshi Yamamoto\'nun liderliğindeki ekibimiz, her ruloyu bir sanat eseri gibi hazırlıyor. Minimalist Japon tasarımı, geleneksel Japon bahçesi manzarası ve özel sake koleksiyonumuzla benzersiz bir atmosfer yaratıyoruz. Omakase menümüz, sushi bar\'ımızda şefimizin özel seçimiyle hazırlanan yemekleri ve premium sake eşleştirmelerini içeriyor. Özel etkinlikler, kurumsal toplantılar ve özel günler için ayrı odalarımız mevcuttur.',
      cuisine: 'Japon',
      rating: 4.9,
      totalReviews: 456,
      priceRange: '₺₺₺₺',
      image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80',
      introVideo: 'https://www.youtube.com/watch?v=x9SVBLKjHX0',
      location: {
        address: 'Nispetiye Cad. No:12',
        city: 'İstanbul',
        district: 'Etiler'
      },
      features: ['Minimal Tasarım', 'Sushi Bar', 'Sake Bar', 'Japon Bahçesi', 'Özel Etkinlikler', 'Omakase Menü', 'WiFi', 'Vale Hizmeti', 'Özel Odalar', 'Engelli Erişimi', 'Kredi Kartı', 'Rezervasyon Zorunlu'],
      workingHours: {
        open: '12:00',
        close: '00:00'
      },
      menu: [
        {
          id: 'menu-9',
          name: 'California Roll',
          description: 'Surimi, avokado, salatalık, susam',
          category: 'Sushi',
          price: 145,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80',
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
          calories: 280,
          ingredients: ['Somon', 'Sushi Pirinci', 'Wasabi'],
          allergens: ['Balık'],
          rating: 4.9,
          reviewCount: 312,
          isPopular: true,
          isAvailable: true,
          preparationTime: 8
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
        }
      ],
      loyaltyProgram: {
        id: 'loyalty-2',
        name: 'Sushi Club',
        pointsPerLira: 2,
        rewards: [
          { id: 'reward-5', name: 'Ücretsiz Edamame', pointsRequired: 150, description: 'Tuzlu soya fasulyesi' },
          { id: 'reward-6', name: 'California Roll', pointsRequired: 400, description: 'Ücretsiz California Roll' }
        ]
      },
      shorts: []
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
      menu: [
        {
          id: 'menu-17',
          name: 'Adana Kebap',
          description: 'Acılı kıyma kebap, bulgur pilavı ve közlenmiş sebze',
          category: 'Kebap',
          price: 185,
          image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80',
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
          id: 'menu-21',
          name: 'Künefe',
          description: 'Tel kadayıf, peynir ve şerbet',
          category: 'Tatlı',
          price: 85,
          image: 'https://images.unsplash.com/photo-1625935219315-b0e2c9ee6010?w=600&q=80',
          calories: 520,
          ingredients: ['Tel Kadayıf', 'Peynir', 'Şerbet', 'Fıstık'],
          allergens: ['Gluten', 'Süt', 'Sert Kabuklu Meyveler'],
          rating: 4.9,
          reviewCount: 678,
          isPopular: true,
          isAvailable: true,
          preparationTime: 10
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
        }
      ],
      loyaltyProgram: {
        id: 'loyalty-3',
        name: 'Mahmut Sadakat',
        pointsPerLira: 1,
        rewards: [
          { id: 'reward-8', name: 'Ücretsiz Çorba', pointsRequired: 50, description: 'Mercimek çorbası' },
          { id: 'reward-9', name: 'Tatlı İkramı', pointsRequired: 200, description: 'Künefe veya Baklava' }
        ]
      },
      shorts: []
    }
  ],
  en: [
    {
      id: 'rest-1',
      name: 'Bella Italia',
      description: 'A romantic restaurant with sea views, offering the most delicious examples of authentic Italian cuisine.',
      cuisine: 'Italian',
      rating: 4.8,
      totalReviews: 342,
      priceRange: '₺₺₺',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      location: {
        address: 'Kordon Boyu No:45',
        city: 'Izmir',
        district: 'Alsancak'
      },
      features: ['Seaside', 'Live Music', 'Terrace', 'Romantic Setting', 'Non-Smoking', 'Valet Service'],
      workingHours: {
        open: '11:00',
        close: '23:00'
      },
      menu: [
        {
          id: 'menu-1',
          name: 'Margherita Pizza',
          description: 'Classic Italian pizza with fresh mozzarella, tomato sauce, and basil',
          category: 'Pizza',
          price: 189,
          image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80',
          videoUrl: 'https://www.youtube.com/watch?v=1-SJGQ2HLp8',
          calories: 850,
          ingredients: ['Flour', 'Mozzarella', 'Tomato Sauce', 'Basil', 'Olive Oil'],
          allergens: ['Gluten', 'Dairy'],
          rating: 4.9,
          reviewCount: 127,
          isPopular: true,
          isAvailable: true,
          preparationTime: 15
        },
        {
          id: 'menu-2',
          name: 'Spaghetti Carbonara',
          description: 'Creamy sauce with guanciale, parmesan cheese, and egg',
          category: 'Pasta',
          price: 165,
          image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600&q=80',
          calories: 720,
          ingredients: ['Spaghetti', 'Guanciale', 'Egg', 'Parmesan', 'Black Pepper'],
          allergens: ['Gluten', 'Egg', 'Dairy'],
          rating: 4.7,
          reviewCount: 89,
          isPopular: true,
          isAvailable: true,
          preparationTime: 12
        },
        {
          id: 'menu-3',
          name: 'Tiramisu',
          description: 'Traditional Italian dessert with mascarpone and espresso',
          category: 'Dessert',
          price: 95,
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80',
          calories: 450,
          ingredients: ['Mascarpone', 'Ladyfingers', 'Espresso', 'Cocoa'],
          allergens: ['Gluten', 'Dairy', 'Egg'],
          rating: 4.8,
          reviewCount: 156,
          isPopular: true,
          isAvailable: true,
          preparationTime: 5
        }
      ],
      campaigns: [
        {
          id: 'camp-1',
          title: 'Weekend 20% Discount',
          description: '20% discount on all pizzas on Saturday and Sunday',
          discount: 20,
          image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=80',
          validUntil: '2025-12-31',
          type: 'percentage'
        },
        {
          id: 'camp-2',
          title: 'Buy 2 Get 1 - Tiramisu',
          description: 'Get one free tiramisu when you buy two',
          discount: 50,
          image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
          validUntil: '2025-11-30',
          type: 'bogo'
        }
      ],
      loyaltyProgram: {
        id: 'loyalty-1',
        name: 'Bella Club',
        pointsPerLira: 1,
        rewards: [
          { id: 'reward-1', name: 'Free Coffee', pointsRequired: 100, description: 'One cup of espresso' },
          { id: 'reward-2', name: 'Dessert Treat', pointsRequired: 250, description: 'Dessert of your choice' },
          { id: 'reward-3', name: '15% Discount', pointsRequired: 500, description: '15% off entire bill' },
          { id: 'reward-4', name: 'Free Pizza', pointsRequired: 1000, description: 'Medium size pizza' }
        ]
      },
      shorts: [
        {
          id: 'short-1',
          restaurantId: 'rest-1',
          videoUrl: 'https://www.youtube.com/shorts/example1',
          thumbnail: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
          title: 'Pizza Making Secrets',
          description: 'Discover our dough rolling techniques',
          likes: 1243,
          views: 15600,
          comments: []
        }
      ]
    },
    {
      id: 'rest-2',
      name: 'Sushi Master',
      description: 'A special venue where traditional Japanese cuisine meets modern presentation art.',
      cuisine: 'Japanese',
      rating: 4.9,
      totalReviews: 456,
      priceRange: '₺₺₺₺',
      image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b?w=800&q=80',
      location: {
        address: 'Nispetiye Cad. No:12',
        city: 'Istanbul',
        district: 'Etiler'
      },
      features: ['Minimal Design', 'Sushi Bar', 'Sake Bar', 'Japanese Garden', 'Private Events'],
      workingHours: {
        open: '12:00',
        close: '00:00'
      },
      menu: [
        {
          id: 'menu-9',
          name: 'California Roll',
          description: 'Surimi, avocado, cucumber, sesame',
          category: 'Sushi',
          price: 145,
          image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&q=80',
          calories: 320,
          ingredients: ['Sushi Rice', 'Nori', 'Surimi', 'Avocado', 'Cucumber', 'Sesame'],
          allergens: ['Fish', 'Soy', 'Sesame'],
          rating: 4.7,
          reviewCount: 234,
          isPopular: true,
          isAvailable: true,
          preparationTime: 10
        },
        {
          id: 'menu-10',
          name: 'Salmon Nigiri',
          description: 'Fresh Norwegian salmon nigiri (8 pieces)',
          category: 'Sushi',
          price: 195,
          image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&q=80',
          calories: 280,
          ingredients: ['Salmon', 'Sushi Rice', 'Wasabi'],
          allergens: ['Fish'],
          rating: 4.9,
          reviewCount: 312,
          isPopular: true,
          isAvailable: true,
          preparationTime: 8
        }
      ],
      campaigns: [
        {
          id: 'camp-4',
          title: 'Happy Hour Sake',
          description: '30% discount on all sake varieties between 5:00-7:00 PM',
          discount: 30,
          image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
          validUntil: '2025-12-31',
          type: 'percentage'
        }
      ],
      loyaltyProgram: {
        id: 'loyalty-2',
        name: 'Sushi Club',
        pointsPerLira: 2,
        rewards: [
          { id: 'reward-5', name: 'Free Edamame', pointsRequired: 150, description: 'Salted soy beans' },
          { id: 'reward-6', name: 'California Roll', pointsRequired: 400, description: 'Free California Roll' }
        ]
      },
      shorts: []
    },
    {
      id: 'rest-3',
      name: 'Kebapçı Mahmut',
      description: 'Traditional Turkish cuisine with Antep-style kebab varieties and homemade mezes.',
      cuisine: 'Turkish',
      rating: 4.7,
      totalReviews: 589,
      priceRange: '₺₺',
      image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80',
      location: {
        address: 'Eski Çarşı İçi No:23',
        city: 'Gaziantep',
        district: 'Şehitkamil'
      },
      features: ['Family Friendly', 'Traditional', 'Outdoor Area', 'Parking', 'Takeaway Service'],
      workingHours: {
        open: '10:00',
        close: '22:00'
      },
      menu: [
        {
          id: 'menu-17',
          name: 'Adana Kebab',
          description: 'Spicy minced meat kebab with bulgur pilaf and grilled vegetables',
          category: 'Kebab',
          price: 185,
          image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=600&q=80',
          calories: 780,
          ingredients: ['Beef Mince', 'Pepper', 'Garlic', 'Spices'],
          allergens: ['Gluten'],
          rating: 4.9,
          reviewCount: 456,
          isPopular: true,
          isAvailable: true,
          preparationTime: 20
        },
        {
          id: 'menu-21',
          name: 'Künefe',
          description: 'Shredded phyllo dough, cheese, and syrup',
          category: 'Dessert',
          price: 85,
          image: 'https://images.unsplash.com/photo-1625935219315-b0e2c9ee6010?w=600&q=80',
          calories: 520,
          ingredients: ['Shredded Phyllo', 'Cheese', 'Syrup', 'Pistachio'],
          allergens: ['Gluten', 'Dairy', 'Tree Nuts'],
          rating: 4.9,
          reviewCount: 678,
          isPopular: true,
          isAvailable: true,
          preparationTime: 10
        }
      ],
      campaigns: [
        {
          id: 'camp-6',
          title: 'Lunch Menu',
          description: 'Soup + Kebab + Dessert + Drink = 199₺',
          discount: 80,
          image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80',
          validUntil: '2025-12-31',
          type: 'fixed'
        }
      ],
      loyaltyProgram: {
        id: 'loyalty-3',
        name: 'Mahmut Loyalty',
        pointsPerLira: 1,
        rewards: [
          { id: 'reward-8', name: 'Free Soup', pointsRequired: 50, description: 'Lentil soup' },
          { id: 'reward-9', name: 'Dessert Treat', pointsRequired: 200, description: 'Künefe or Baklava' }
        ]
      },
      shorts: []
    }
  ]
};

const mockReviewsLocalized: LocalizedRestaurantData = {
  tr: [
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
      images: []
    },
    {
      id: 'review-2',
      userId: 'user-2',
      userName: 'Mehmet Kaya',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      restaurantId: 'rest-1',
      menuItemId: 'menu-1',
      rating: 5,
      comment: 'Margherita pizzası tam bir İtalyan klasiği. Hamuru mükemmel.',
      createdAt: '2025-10-03T20:15:00Z'
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
      createdAt: '2025-10-04T21:00:00Z'
    }
  ],
  en: [
    {
      id: 'review-1',
      userId: 'user-1',
      userName: 'Ayşe Yılmaz',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      restaurantId: 'rest-1',
      rating: 5,
      comment: 'Great experience! Pizzas are amazing, the view is unique. I will definitely come again.',
      ambiance: 5,
      hygiene: 5,
      service: 5,
      createdAt: '2025-10-05T19:30:00Z',
      images: []
    },
    {
      id: 'review-2',
      userId: 'user-2',
      userName: 'Mehmet Kaya',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      restaurantId: 'rest-1',
      menuItemId: 'menu-1',
      rating: 5,
      comment: 'Margherita pizza is a true Italian classic. Perfect dough.',
      createdAt: '2025-10-03T20:15:00Z'
    },
    {
      id: 'review-3',
      userId: 'user-3',
      userName: 'Zeynep Demir',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      restaurantId: 'rest-2',
      rating: 5,
      comment: 'Sushi quality is incredible. Everything is so fresh and delicious.',
      ambiance: 5,
      hygiene: 5,
      service: 4,
      createdAt: '2025-10-04T21:00:00Z'
    }
  ]
};

