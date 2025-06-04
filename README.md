# Tekstil/Üretim Maliyeti Hesaplama Uygulaması

Modern ve kullanıcı dostu arayüzü ile tekstil ve üretim maliyetlerini hesaplama, takip etme ve raporlama uygulaması.

## Özellikler

- 🧮 Detaylı maliyet hesaplama
  - Kumaş maliyeti
  - Aksesuar maliyetleri
  - Üretim maliyetleri (Kesim, Dikim, Ütü, Yıkama)
  - İşletme giderleri
  - Kar marjı hesaplama
  - Sevkiyat maliyetleri

- 💱 Çoklu Para Birimi Desteği
  - TL, USD, EUR, GBP para birimleri
  - Otomatik kur hesaplama
  - Para birimi bazlı toplam özeti

- 📊 Sipariş Takip Sistemi
  - Teklif durumu takibi
  - Üretim aşaması takibi
  - Teslimat durumu takibi
  - Tarihsel durum geçmişi

- 🖨️ Form İşlemleri
  - Otomatik seri numarası
  - Form yazdırma
  - Form kopyalama
  - Form arama
  - Form iptal etme
  - Yeni form oluşturma

## Teknolojiler

### Frontend
- React
- TypeScript
- Material-UI (MUI)
- Day.js
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- File-based JSON storage

## Kurulum

### Backend Kurulumu

```bash
cd backend
npm install
npm run build
npm run dev
```

Backend varsayılan olarak http://localhost:3001 adresinde çalışacaktır.

### Frontend Kurulumu

```bash
cd frontend
npm install
npm start
```

Frontend varsayılan olarak http://localhost:3000 adresinde çalışacaktır.

## Kullanım

1. Uygulama açıldığında otomatik olarak yeni bir form oluşturulur.
2. Gerekli alanları doldurun:
   - Ürün kodu
   - Teklif ve termin tarihleri
   - Maliyet kalemleri
   - Notlar
3. "Kaydet" butonuna tıklayarak formu kaydedin.
4. Formun durumunu takip etmek için üst kısımdaki durum butonlarını kullanın.

### Form İşlemleri

- **Yeni**: Yeni bir form oluşturur
- **Kaydet**: Mevcut formu kaydeder
- **Kopyala**: Mevcut formun bir kopyasını oluşturur
- **Ara**: Seri no veya ürün koduna göre form arama
- **Yazdır**: Formu yazdırma önizlemesi
- **İptal**: Formu iptal eder

## Geliştirme

### Backend Geliştirme

```bash
cd backend
npm run dev
```

### Frontend Geliştirme

```bash
cd frontend
npm start
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Proje ile ilgili sorularınız için lütfen iletişime geçin.

## Destek

Projeyi desteklemek isterseniz:

```
EVM: 0xba1AFeca48bCD40eD67F7074658e780c082720Fc
```

💝 Her türlü destek projenin gelişimine katkı sağlayacaktır. 