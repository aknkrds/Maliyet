# Maliyet Hesaplama Uygulaması v1.2

Textile/üretim maliyet hesaplama web uygulaması. React (TypeScript, Material-UI) frontend ve Node.js/Express (TypeScript) backend ile geliştirilmiştir.

## 🚀 Özellikler

### v1.2 - Basitleştirilmiş Raporlar ve İyileştirmeler
- **Basitleştirilmiş Raporlar**: Karmaşık tablolar kaldırıldı, özet kartları eklendi
- **USD Para Birimi**: Tüm tutarlar USD formatında gösteriliyor
- **Aktif Form Hesaplaması**: Red edilen ve teslim edilen formlar aktif sayılmıyor
- **TypeScript Hataları Düzeltildi**: Grid component sorunları çözüldü
- **Backend İyileştirmeleri**: paraBirimiToplam undefined hatası düzeltildi

### v1.1 - Lisans Sistemi ve Görsel Özellikler
- **Lisans ve Ayarlar**: Kullanıcı kayıt, lisans doğrulama, admin paneli
- **Resim Yükleme**: Maliyet kalıp, ürün 1, ürün 2 resimleri
- **Resim Yönetimi**: Önizleme, popup görüntüleme, silme
- **Donanım ID**: Güvenli lisans doğrulama sistemi
- **Admin Paneli**: Kullanıcı ve lisans yönetimi

### v1.0 - Temel Özellikler
- **Maliyet Formu**: Detaylı maliyet hesaplama
- **İş Akışları**: Form durumu takibi
- **Form Şablonları**: Hazır şablonlar
- **Raporlar**: Basit özet raporları
- **JSON Veri Saklama**: Dosya tabanlı veri yönetimi

## 📋 Raporlar (v1.2)

### Genel Özet
- Toplam form sayısı
- Toplam tutar (USD)
- Ortalama tutar
- Aktif form sayısı (red edilen ve teslim edilenler hariç)

### Durum Bazında Özet
- **Onaylanan İşler**: 4 adet, Toplam: $120
- **Red Edilen İşler**: 2 adet, Toplam: $23
- **Teklif Verildi**: 3 adet, Toplam: $45
- **Üretimde**: 1 adet, Toplam: $15
- **Teslim Edildi**: 2 adet, Toplam: $30

### Para Birimi Bazında Toplamlar
- TL, USD, EUR, GBP toplamları

## 🛠️ Teknoloji Stack

### Frontend
- React 19.1.0
- TypeScript 4.9.5
- Material-UI 7.1.1
- Day.js (tarih işlemleri)
- React Hot Toast (bildirimler)

### Backend
- Node.js
- Express.js
- TypeScript
- Multer (dosya yükleme)
- JSON dosya tabanlı veri saklama

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Backend Kurulumu
```bash
cd backend
npm install
npm run dev
```

### Frontend Kurulumu
```bash
cd frontend
npm install
npm start
```

## 📁 Proje Yapısı

```
Maliyet/
├── backend/
│   ├── src/
│   │   ├── index.ts          # Ana server dosyası
│   │   └── data/             # JSON veri dosyaları
│   ├── uploads/              # Yüklenen resimler
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/       # React bileşenleri
│   │   ├── App.tsx          # Ana uygulama
│   │   └── index.tsx        # Giriş noktası
│   └── package.json
├── README.md
├── DEVELOPMENT_NOTES.md
└── BACKEND.md
```

## 🔧 API Endpoints

### Form İşlemleri
- `GET /api/forms` - Tüm formları getir
- `POST /api/forms` - Yeni form oluştur
- `PUT /api/forms/:id` - Form güncelle
- `DELETE /api/forms/:id` - Form sil

### Resim İşlemleri
- `POST /api/forms/:id/images` - Resim yükle
- `DELETE /api/forms/:id/images/:imageType` - Resim sil

### Raporlar
- `GET /api/reports/summary` - Özet rapor
- `GET /api/reports/detailed` - Detaylı rapor

### Lisans Sistemi
- `POST /api/users/register` - Kullanıcı kayıt
- `POST /api/licenses/activate` - Lisans aktivasyon
- `GET /api/licenses/status` - Lisans durumu

## 🔒 Güvenlik

- Donanım ID tabanlı lisans doğrulama
- Admin paneli giriş sistemi
- Resim dosya türü kontrolü
- Dosya boyutu sınırlaması

## 📊 Veri Modelleri

### FormData
```typescript
interface FormData {
  id?: number;
  seriNo: number;
  urunKodu: string;
  teklifTarihi: string;
  maliyetler: { [key: string]: MaliyetItem };
  genelToplam: number;
  paraBirimiToplam: { TL: number; USD: number; EUR: number; GBP: number };
  siparisDurumu: string | null;
  resimler?: { maliyetKalipResmi?: string; urunResmi1?: string; urunResmi2?: string };
}
```

## 🐛 Bilinen Sorunlar

- Backend port çakışması (EADDRINUSE) - manuel restart gerekli
- Bazı eski formlarda paraBirimiToplam undefined olabilir

## 🔮 Gelecek Planları

- PDF export özelliği
- Excel export
- Email bildirimleri
- Gelişmiş filtreleme
- Dashboard grafikleri
- Mobil uygulama

## 📞 İletişim

- **Geliştirici**: [Adınız]
- **Email**: [email@example.com]
- **GitHub**: [GitHub Profiliniz]

## 📄 Lisans

Bu proje özel kullanım için geliştirilmiştir.

---

**Son Güncelleme**: v1.2 - 15 Haziran 2025 