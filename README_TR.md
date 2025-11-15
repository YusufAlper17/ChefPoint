# ChefPoint - Restoran Yönetim Platformu

**Dil / Language:** [Türkçe](README_TR.md) | [English](README.md)

---

Restoranlar için kapsamlı bir dijital çözüm paketi. Birbirleriyle entegre çalışan birden fazla web uygulamasından oluşan eksiksiz bir restoran yönetim ekosistemi sunar.

## Genel Bakış

Bu platform, dört temel uygulamayı tek bir sorunsuz deneyim altında birleştirir:

1. **Chef Point Dashboard** - Tüm uygulamalara erişim için ana hub
2. **Customer App** - Restoran keşfi, rezervasyon ve sipariş için müşteri odaklı uygulama
3. **QR Application** - Anında masa başı menü erişimi, sipariş ve ödeme için gelişmiş QR Menü
4. **Restaurant OS** - Sipariş yönetimi, menü düzenleme ve analitik için dashboard

## Repository Yapısı

```
ChefPoint/
├── chef-point/           # Ana dashboard hub
├── customer-app/         # Müşteri odaklı uygulama
├── restaurant-dashboard/ # Restoran yönetim dashboard'u
├── advanced-qr-menu/     # QR Menü uygulaması
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions deployment
├── deploy.sh            # Manuel deployment script
└── package.json         # Root package.json with deploy scripts
```

## Uygulamalar

### Chef Point Dashboard

Tüm diğer uygulamalara merkezi erişim sağlayan ana hub uygulaması.

**Canlı URL:** `https://[username].github.io/ChefPoint/`

**Özellikler:**
- Tüm uygulamalara merkezi erişim
- Modern ve sezgisel arayüz
- Çoklu dil desteği (TR/EN)

**Port:** 3000 (Geliştirme)

### Customer App

Restoran keşfi, rezervasyon ve paket servis siparişleri için tasarlanmış müşteri odaklı uygulama.

**Canlı URL:** `https://[username].github.io/ChefPoint/customer-app/`

**Özellikler:**
- Gelişmiş filtreleme ve arama ile restoran keşfi
- Rezervasyon Sistemi
- Kısa Videolar (YouTube Shorts benzeri restoran içerikleri)
- Paket Servis Sipariş Sistemi
- Kullanıcı Profili ve Sipariş Geçmişi
- Sadakat Programı Takibi
- Favori Restoranlar

**Port:** 5174 (Geliştirme)

### QR Application

Müşterilerin masalarından menülere erişmesini, sipariş vermesini ve ödeme yapmasını sağlayan gelişmiş QR Menü sistemi.

**Canlı URL:** `https://[username].github.io/ChefPoint/advanced_qr_menu/`

**Özellikler:**
- QR Menü (Gelişmiş)
- Anlık Sipariş Verme
- Entegre Ödeme Sistemi
- Yorum ve Değerlendirme Sistemi
- Çoklu Dil Desteği (TR/EN)

**Port:** 5177 (Geliştirme)

### Restaurant OS

Restoran sahiplerinin operasyonlarının tüm yönlerini yönetmesi için kapsamlı dashboard.

**Canlı URL:** `https://[username].github.io/ChefPoint/restaurant-dashboard/`

**Özellikler:**
- Dashboard ve Analitik
- Sipariş Yönetimi
- Menü Düzenleme
- Kampanya Yönetimi
- Masa Yönetimi
- Personel Yönetimi
- Ayarlar ve Yapılandırma

**Port:** 5173 (Geliştirme)

## Başlangıç

### Gereksinimler

- Node.js (v16 veya üzeri)
- npm veya yarn paket yöneticisi

### Kurulum

Tüm uygulamaların bağımlılıklarını yükleyin:

```bash
npm run install:all
```

Veya ayrı ayrı:

```bash
# Customer App
cd customer-app && npm install && cd ..

# Restaurant Dashboard
cd restaurant-dashboard && npm install && cd ..

# Advanced QR Menu
cd advanced-qr-menu && npm install && cd ..

# Chef Point Dashboard
cd chef-point && npm install && cd ..
```

### Geliştirme

Her uygulamayı ayrı ayrı çalıştırın:

```bash
# Chef Point Dashboard (Ana Hub)
cd chef-point
npm run dev
# http://localhost:3000 adresinde açılır

# Customer App
cd customer-app
npm run dev
# http://localhost:5174 adresinde açılır

# Restaurant Dashboard
cd restaurant-dashboard
npm run dev
# http://localhost:5173 adresinde açılır

# Advanced QR Menu
cd advanced-qr-menu
npm run dev
# http://localhost:5177 adresinde açılır
```

## Dağıtım

### Otomatik Dağıtım (GitHub Actions)

Bu repository GitHub Pages'e otomatik dağıtım için yapılandırılmıştır:

1. `main` veya `master` branch'ine push yapın
2. GitHub Actions otomatik olarak tüm uygulamaları build eder
3. GitHub Pages'e dağıtır

**İlk kurulum:**
- Repository Settings → Pages
- Source: **GitHub Actions** seçin

### Manuel Dağıtım

```bash
# Tüm uygulamaları build et ve dağıt
npm run deploy
```

Veya adım adım:

```bash
# Tüm uygulamaları build et
./deploy.sh

# GitHub Pages'e dağıt
gh-pages -d deploy-dist
```

## Teknoloji Yığını

- **Frontend Framework:** TypeScript ile React 18
- **Stil:** Tailwind CSS
- **Yönlendirme:** React Router
- **İkonlar:** Lucide React
- **Animasyonlar:** Framer Motion
- **Build Aracı:** Vite
- **Durum Yönetimi:** Zustand (bazı uygulamalarda)
- **Grafikler:** Recharts (dashboard'da)

## Proje Yapısı

Her uygulama bağımsızdır ve ayrı ayrı geliştirilebilir:

- `chef-point/` - Ana dashboard hub
- `customer-app/` - Müşteri odaklı uygulama
- `restaurant-dashboard/` - Restoran yönetim dashboard'u
- `advanced-qr-menu/` - QR Menü uygulaması

## GitHub Pages URL'leri

Dağıtımdan sonra uygulamalar şu adreslerde erişilebilir olacaktır:

- **Ana Dashboard:** `https://[username].github.io/ChefPoint/`
- **Customer App:** `https://[username].github.io/ChefPoint/customer-app/`
- **Restaurant Dashboard:** `https://[username].github.io/ChefPoint/restaurant-dashboard/`
- **QR Application:** `https://[username].github.io/ChefPoint/advanced_qr_menu/`

## Özellikler

- Modern ve kullanıcı dostu arayüz
- Mobil-öncelikli responsive tasarım
- Profesyonel görsel tasarım
- Hızlı ve akıcı performans
- Gerçek zamanlı güncellemeler (simüle edilmiş)
- Entegre ödeme sistemi (demo)
- Detaylı raporlama ve analitik
- Çoklu dil desteği

## Demo Verileri

Tüm uygulamalar kapsamlı mock veriler içerir:
- Birden fazla restoran türü (İtalyan, Japon, Türk)
- Detaylı bilgilerle menü öğeleri
- Yorumlar ve değerlendirmeler
- Kampanyalar ve promosyonlar
- Sadakat programları
- Kısa video içerikleri

## Notlar

Bu bir frontend gösterim projesidir. Üretim kullanımı için aşağıdaki bileşenlerin eklenmesi gerekir:
- Backend API entegrasyonu
- Veritabanı uygulaması
- Gerçek ödeme gateway entegrasyonu
- Kimlik doğrulama ve yetkilendirme
- Gerçek zamanlı iletişim (WebSockets)
- Dosya yükleme ve depolama
- E-posta ve bildirim servisleri

## Lisans

Bu proje bir gösterim uygulamasıdır.

## Destek

Sorular veya sorunlar için lütfen bireysel uygulama README dosyalarına bakın veya repository'de bir issue oluşturun.

