# 🍽️ Gelişmiş QR Menü Uygulaması

Modern ve profesyonel dijital menü deneyimi. Restoranlara özel, masa bazlı sipariş takibi ve ödeme sistemi.

## ✨ Özellikler

### 🎯 Ana Özellikler
- **Masa Bilgileri**: Gerçek zamanlı masa durumu, kapasite ve sipariş takibi
- **Gelişmiş Menü**: Kategorilere göre filtreleme, arama, detaylı ürün bilgileri
- **Sipariş Yönetimi**: Masaya özel sipariş ekleme, durum takibi
- **Demo Ödeme Sistemi**: Kredi kartı ve nakit ödeme seçenekleri
- **Çok Dilli**: Türkçe ve İngilizce dil desteği
- **Responsive Tasarım**: Tüm cihazlarda mükemmel görünüm

### 📱 Kullanıcı Deneyimi
- Sezgisel ve kullanıcı dostu arayüz
- Hızlı sayfa geçişleri ve animasyonlar
- Gerçek yemek fotoğrafları ve kullanıcı yorumları
- Alerjen uyarıları ve besin bilgileri
- Bahşiş seçenekleri
- Fiş indirme özelliği

### 🎨 Tasarım
- Modern ve şık UI/UX
- Profesyonel renk paleti (Turuncu-Amber tonları)
- Framer Motion animasyonları
- Glassmorphism efektleri
- Özel fontlar (Poppins, Inter)

## 🚀 Kurulum

### Gereksinimler
- Node.js (v18+)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın**
```bash
cd advanced-qr-menu
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın**

**Sadece bilgisayarınızda:**
```bash
npm run dev
```

**Mobil cihazdan erişim için (QR kod ile):**
```bash
npm run dev:mobile
```

Bu komut:
- Uygulamayı network erişimine açar
- QR kod oluşturur ve terminalde gösterir
- Mobil cihazınızla QR kodu tarayarak uygulamaya erişebilirsiniz

Uygulama `http://localhost:5177` adresinde çalışacaktır.

## 📦 Build & Deploy

### Build Oluşturma
```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulacaktır.

### Vercel'e Deploy

1. **Vercel hesabı oluşturun** (ücretsiz): https://vercel.com

2. **Vercel CLI yükleyin**
```bash
npm install -g vercel
```

3. **Deploy edin**
```bash
cd advanced-qr-menu
vercel
```

Vercel otomatik olarak projenizi yapılandıracak ve deploy edecektir.

### Netlify'a Deploy

1. **Netlify hesabı oluşturun** (ücretsiz): https://netlify.com

2. **Netlify CLI yükleyin**
```bash
npm install -g netlify-cli
```

3. **Build ve Deploy**
```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages'e Deploy

1. **package.json'a base path ekleyin**
```json
{
  "homepage": "https://kullanici-adi.github.io/repo-adi"
}
```

2. **vite.config.ts'ye base ekleyin**
```typescript
export default defineConfig({
  base: '/repo-adi/',
  // ...
})
```

3. **gh-pages yükleyin**
```bash
npm install --save-dev gh-pages
```

4. **package.json'a scripts ekleyin**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

5. **Deploy edin**
```bash
npm run deploy
```

## 📱 Mobil Cihazdan QR Kod ile Erişim

### Hızlı Başlangıç (3 Adım):

**1. Uygulamayı Network Modunda Başlatın:**
```bash
cd advanced-qr-menu
npm run dev:mobile
```

**2. Terminalde Gösterilen QR Kodu Tarayın:**
- Telefonunuzun kamerasını açın
- QR kodu tarayın (iOS Kamera uygulaması otomatik algılar)
- Android için QR tarayıcı uygulaması gerekebilir

**3. Uygulamayı Mobil Cihazınızda Kullanın!**

### Önemli Notlar:

✅ **Bilgisayar ve telefon aynı WiFi ağında olmalı**
✅ **Firewall QR menü portuna (5177) izin vermeli**
✅ **QR kod her çalıştırmada otomatik oluşturulur**

### Alternatif Yöntemler:

**Manuel IP Adresi ile:**
```bash
npm run dev:network
```
Terminalde gösterilen IP adresini (örn: `192.168.1.100:5177`) telefonunuzun tarayıcısına yazın.

**Sadece QR Kod Oluştur:**
```bash
npm run qr
```
Bu komut QR kodu terminalde gösterir ve `public/qr-code-generated.svg` dosyasına kaydeder.

### Sorun Giderme:

**"Bağlantı kurulamadı" hatası:**
- Bilgisayar ve telefon aynı WiFi'de mi kontrol edin
- Firewall ayarlarını kontrol edin
- VPN kapalı olmalı

**QR kod oluşturulmadı:**
```bash
npm install qrcode
npm run qr
```

**Port zaten kullanımda:**
`vite.config.ts` dosyasında port numarasını değiştirin.

## 🌐 İNTERNETE DEPLOY (Herkes Erişebilir)

### Herkese Açık QR Kod İçin (WiFi'dan Bağımsız):

#### ⚡ En Hızlı Yöntem - Vercel (5 dakika):

```bash
# 1. Vercel CLI yükle
npm install -g vercel

# 2. Vercel'e giriş yap
vercel login

# 3. Deploy et
cd advanced-qr-menu
vercel --prod
```

URL'inizi alacaksınız: `https://advanced-qr-menu-xxx.vercel.app`

#### 4. QR Kod Oluştur:
```bash
npm run qr:url
```
Vercel URL'inizi girin, QR kod oluşturulsun!

📚 **Detaylı kılavuz:** `DEPLOY_GUIDE.md` dosyasına bakın

### Alternatif Deploy Seçenekleri:
- **Netlify** - Vercel alternatifi
- **GitHub Pages** - Geliştiriciler için
- **ngrok** - Geçici test için

---

## 🎯 Kullanım Senaryosu

### Yatırımcı Sunumu İçin:
1. Uygulamayı deploy edin (Vercel/Netlify) - 5 dakika
2. QR kodu oluşturun (`npm run qr:url`)
3. QR kodu sunum slaytına ekleyin
4. Canlı demo için katılımcılar QR'ı okutabilir
5. "Masa 10" deneyimi otomatik başlar

### Özelleştirme:
- `src/data/mockData.ts` - Restoran ve menü verilerini düzenleyin
- `src/contexts/LanguageContext.tsx` - Çevirileri güncelleyin
- `tailwind.config.js` - Renk temasını değiştirin

## 📊 Proje Yapısı

```
advanced-qr-menu/
├── public/
│   ├── qr-code.svg          # QR kod dosyası
│   └── vite.svg
├── src/
│   ├── components/          # Yeniden kullanılabilir bileşenler
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Rating.tsx
│   ├── contexts/            # React Context'ler
│   │   └── LanguageContext.tsx
│   ├── data/                # Mock veriler
│   │   └── mockData.ts
│   ├── pages/               # Sayfa bileşenleri
│   │   ├── TableOverview.tsx    # Ana sayfa (Masa bilgileri)
│   │   ├── Menu.tsx             # Menü sayfası
│   │   ├── Payment.tsx          # Ödeme sayfası
│   │   └── RestaurantInfo.tsx   # Restoran bilgileri
│   ├── App.tsx              # Ana uygulama
│   ├── main.tsx             # Giriş noktası
│   └── index.css            # Global stiller
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## 🛠️ Teknolojiler

- **React 18** - UI Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Routing
- **Lucide React** - Icons
- **date-fns** - Date formatting

## 🎨 Özelleştirme

### Renk Teması Değiştirme
`tailwind.config.js` dosyasında `colors.primary` değerlerini düzenleyin:

```javascript
colors: {
  primary: {
    50: '#your-color-50',
    // ...
  }
}
```

### Restoran Bilgilerini Güncelleme
`src/data/mockData.ts` dosyasında `restaurant` nesnesini düzenleyin:

```typescript
export const restaurant: Restaurant = {
  id: 'rest-1',
  name: 'Restoran Adınız',
  // ...
}
```

### Menü Ekleme/Düzenleme
`src/data/mockData.ts` dosyasında `menuItems` dizisine yeni ürünler ekleyin.

## 📞 Destek

Sorularınız için:
- GitHub Issues açın
- Email: support@example.com

## 📄 Lisans

MIT License

## 🎉 Teşekkürler

Bu proje modern restoran yönetimi için geliştirilmiş profesyonel bir çözümdür.

---

**Not**: Bu demo projedir. Production kullanımı için backend entegrasyonu ve güvenlik önlemleri eklemeniz önerilir.




