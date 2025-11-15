# 📱 QR Menu - Dijital Menü Uygulaması

Müşterilerin masalarındaki QR kodu okutarak eriştiği modern dijital menü sistemi.

## 🚀 Hızlı Başlangıç

```bash
npm install
npm run dev
```

Tarayıcıda açın: **http://localhost:5175**

## 📸 Demo Kullanım

1. Ana sayfayı açın
2. **"Demo Menüyü Aç (Masa 1)"** butonuna tıklayın
3. Dijital menü deneyimini yaşayın

## ✨ Özellikler

### 📋 Dijital Menü
- **Kategori Filtreleme:** Pizza, Makarna, Tatlı, Salata, vb.
- **Popüler Ürünler:** En çok tercih edilen yemekler
- **Detaylı Ürün Bilgileri:**
  - Yüksek çözünürlüklü fotoğraf
  - Detaylı açıklama
  - Fiyat bilgisi
  - Kalori değeri
  - Hazırlık süresi
  - İçindekiler listesi
  - Alerjen uyarıları
  - Müşteri yorumları ve puanlar
  - Yapılış videosu (varsa)

### 🛒 Sepet Yönetimi
- Ürün ekleme/çıkarma
- Miktar güncelleme
- Sipariş notu ekleme
- Anlık fiyat hesaplama
- Servis ücreti gösterimi

### 🔔 Garson Çağırma
- Tek tıkla garson çağırma
- Anlık bildirim
- Hızlı erişim

### 💳 Ödeme Sistemi
- **Ödeme Yöntemleri:**
  - Kredi/Banka Kartı
  - Nakit
- **Bahşiş Seçenekleri:**
  - %0, %10, %15, %20
  - Özel tutar
- **Ödeme Özeti:**
  - Ara toplam
  - Servis ücreti
  - Bahşiş
  - Genel toplam

### 🧾 Dijital Fiş
- Detaylı sipariş özeti
- Tarih ve saat bilgisi
- Masa numarası
- Sipariş numarası
- Ödeme yöntemi
- İndirilir/Paylaşılır

### ⭐ Değerlendirme Sistemi
- **Genel Değerlendirme:** 1-5 yıldız
- **Detaylı Puanlama:**
  - Ambiyans
  - Hijyen
  - Hizmet
- **Yemek Puanlama:** Sipariş edilen her yemek için
- **Yorum:** Deneyimi yazılı olarak paylaşma

### 🌍 Çoklu Dil Desteği
- Türkçe (TR)
- İngilizce (EN)
- Kolay dil geçişi

## 🎯 Kullanıcı Akışı

```
QR Tarama → Menü → Sepet → Ödeme → Fiş → Değerlendirme
     ↓
Garson Çağır (her an)
```

## 💡 Özellikler ve İpuçları

### Menü Gezinme
- Üst kısımda kategorilere tıklayarak filtreleyin
- Popüler ürünler özel olarak vurgulanmıştır
- Ürüne tıklayarak detaylı bilgi görün

### Sipariş Verme
1. İstediğiniz ürünü seçin
2. Detayları inceleyin (alerjenler önemli!)
3. "Sepete Ekle" butonuna tıklayın
4. Daha fazla ürün ekleyin veya sepete gidin
5. Sipariş notları ekleyebilirsiniz
6. Ödemeye geçin

### Ödeme Süreci
1. Ödeme yöntemini seçin (Kart/Nakit)
2. Bahşiş yüzdesini belirleyin
3. Özeti kontrol edin
4. "Ödeme Yap" butonuna tıklayın
5. Dijital fişinizi alın

### Değerlendirme
- Ödeme sonrası deneyiminizi paylaşın
- Her yemek için ayrı puan verin
- Yorumlarınız diğer müşterilere yardımcı olur

## 🎨 Tasarım Özellikleri

- **Temiz ve Modern:** Minimal, kolay anlaşılır arayüz
- **Görsel Öncelikli:** Büyük, çekici yemek fotoğrafları
- **Hızlı Erişim:** Önemli butonlar her zaman görünür
- **Mobil Optimize:** Tek elle kullanım için tasarlandı
- **Smooth Animations:** Akıcı sayfa geçişleri

## 🔒 Güvenlik

- Ödeme bilgileri simülasyon amaçlıdır
- Gerçek uygulamada PCI-DSS uyumlu ödeme gateway kullanılmalıdır
- SSL sertifikası gereklidir

## 📊 Demo Verileri

**Bella Italia - Masa 1**
- 8+ menü öğesi
- 3 aktif kampanya
- Gerçek görsel içerikler
- Örnek yorumlar ve puanlar

## 🚀 Gerçek Uygulama için Gereksinimler

- [ ] QR kod okuyucu entegrasyonu
- [ ] Gerçek ödeme gateway (Stripe, PayPal, vb.)
- [ ] Backend API entegrasyonu
- [ ] Sipariş mutfağa iletme sistemi
- [ ] Garson bildirim sistemi
- [ ] Stok yönetimi entegrasyonu
- [ ] Multi-language JSON dosyaları

## 💻 Teknolojiler

- React 18 + TypeScript
- Tailwind CSS
- React Router v6
- Lucide React (İkonlar)
- Framer Motion (Animasyonlar)
- date-fns

## 🎯 Kullanım Senaryosu

1. **Müşteri gelir:** Masaya oturur
2. **QR okutma:** Telefon kamerasıyla QR kodu tarar
3. **Menü görüntüleme:** Dijital menüyü inceler
4. **Sipariş verme:** İstediği ürünleri sepete ekler
5. **Garson çağırma:** Gerekirse garson çağırır
6. **Ek sipariş:** Yemek yerken ek ürün sipariş eder
7. **Ödeme:** Kalkarken ödeme yapar
8. **Değerlendirme:** Deneyimini puanlar
9. **Fiş alır:** Dijital fişi kaydeder/paylaşır

Bu akıcı süreç müşteri memnuniyetini artırır ve restoran operasyonlarını hızlandırır.
