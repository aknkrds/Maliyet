# Backend Dokümantasyonu - Maliyet Hesaplama Uygulaması

## Genel Bakış
Bu backend uygulaması, tekstil/üretim maliyeti hesaplama uygulamasının API katmanını oluşturur. Express.js tabanlı bir REST API sunar ve JSON dosyası tabanlı veri saklama kullanır.

## Teknoloji Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Dil**: TypeScript
- **Veri Saklama**: JSON dosyası (`data/forms.json`)
- **CORS**: Cross-Origin Resource Sharing desteği
- **Development**: Nodemon (hot reload)

## Proje Yapısı
```
backend/
├── src/
│   ├── index.ts          # Ana uygulama dosyası
│   ├── server.ts         # Server konfigürasyonu
│   └── database.ts       # Veritabanı işlemleri
├── data/
│   ├── forms.json        # Form verileri
│   └── maliyet.db        # SQLite veritabanı (opsiyonel)
├── dist/                 # TypeScript derleme çıktısı
├── package.json
└── tsconfig.json
```

## Veri Modeli

### FormData Interface
```typescript
interface FormData {
  id?: number;                    // Benzersiz form ID'si
  seriNo: number;                 // Seri numarası
  urunKodu: string;               // Ürün kodu
  teklifTarihi: string;           // Teklif tarihi (YYYY-MM-DD)
  terminTarihi: string;           // Termin tarihi
  maliyetler: {                   // Maliyet kalemleri
    kumasTipi: MaliyetItem;
    aksesuar1: MaliyetItem;
    aksesuar2: MaliyetItem;
    aksesuar3: MaliyetItem;
    kesimYeri: MaliyetItem;
    dikimYeri: MaliyetItem;
    utuPaket: MaliyetItem;
    yikamaYeri: MaliyetItem;
    ekMaliyet1: MaliyetItem;
    ekMaliyet2: MaliyetItem;
    isletmeGiderleri: MaliyetItem;
    kar: MaliyetItem;
    sevkiyat: MaliyetItem;
  };
  notlar: string;                 // Genel notlar
  toplam: number;                 // Toplam maliyet
  kdvOrani: number;               // KDV oranı (%)
  genelToplam: number;            // KDV dahil toplam
  iptalDurumu: boolean;           // İptal durumu
  ekstraNotlar: string;           // Ekstra notlar
  paraBirimiToplam: {             // Para birimi bazında toplamlar
    TL: number;
    USD: number;
    EUR: number;
    GBP: number;
  };
  siparisDurumu: string | null;   // Sipariş durumu
  durum_tarihleri: {              // Durum değişiklik tarihleri
    teklif_tarihi?: string;
    onay_tarihi?: string;
    red_tarihi?: string;
    uretim_tarihi?: string;
    teslim_tarihi?: string;
  };
  createdAt?: string;             // Oluşturulma tarihi
  updatedAt?: string;             // Güncellenme tarihi
}
```

### MaliyetItem Interface
```typescript
interface MaliyetItem {
  aciklama: string;               // Açıklama
  birim?: string;                 // Birim
  birimTipi?: string;             // Birim tipi (Adet, Kilo, Metre, Top)
  fiyat: number;                  // Fiyat
  paraBirimi: string;             // Para birimi (TL, USD, EUR, GBP)
}
```

## API Endpoints

### 1. Tüm Formları Getir
- **URL**: `GET /api/forms`
- **Açıklama**: Sistemdeki tüm formları listeler
- **Response**: FormData[] array

### 2. Son Formu Getir
- **URL**: `GET /api/forms/latest`
- **Açıklama**: En son oluşturulan formu getirir
- **Response**: FormData object veya null

### 3. Belirli Formu Getir
- **URL**: `GET /api/forms/:id`
- **Açıklama**: ID'ye göre belirli bir formu getirir
- **Response**: FormData object veya 404 error

### 4. Yeni Form Oluştur
- **URL**: `POST /api/forms`
- **Açıklama**: Yeni bir form oluşturur
- **Request Body**: FormData (id hariç)
- **Response**: Oluşturulan FormData object

### 5. Form Güncelle
- **URL**: `PUT /api/forms/:id`
- **Açıklama**: Mevcut bir formu günceller
- **Request Body**: Güncellenecek FormData alanları
- **Response**: Güncellenmiş FormData object

### 6. Sonraki Seri Numarası
- **URL**: `GET /api/forms/nextSerialNumber`
- **Açıklama**: Yeni form için kullanılacak seri numarasını döner
- **Response**: `{ nextSerialNumber: number }`

## Veri Saklama
- **Dosya**: `data/forms.json`
- **Format**: JSON array
- **Otomatik Yedekleme**: Yok (manuel yedekleme gerekli)
- **Concurrent Access**: Basit dosya okuma/yazma (production için uygun değil)

## Hata Yönetimi
- **HTTP Status Codes**: 200, 201, 404, 500
- **Error Response Format**: `{ error: string }`
- **Logging**: Console.log ile basit loglama

## Güvenlik
- **CORS**: Tüm originlere açık (development için)
- **Input Validation**: Minimal (frontend'e bağımlı)
- **Rate Limiting**: Yok
- **Authentication**: Yok

## Development

### Kurulum
```bash
cd backend
npm install
```

### Çalıştırma
```bash
# Development mode (nodemon ile)
npm run dev

# Production build
npm run build
npm start
```

### Environment Variables
- Port: 3002 (varsayılan)
- CORS: Tüm originler kabul ediliyor

## Production Considerations
1. **Veritabanı**: JSON dosyası yerine PostgreSQL/MongoDB kullanılmalı
2. **Authentication**: JWT veya session-based auth eklenmeli
3. **Validation**: Input validation middleware eklenmeli
4. **Logging**: Winston veya benzeri logging kütüphanesi
5. **Rate Limiting**: Express-rate-limit eklenmeli
6. **CORS**: Spesifik originler belirlenmeli
7. **Error Handling**: Global error handler middleware
8. **Backup**: Otomatik veri yedekleme sistemi

## Mevcut Sorunlar ve Eksiklikler
1. **Search Endpoint**: `/api/forms/search` endpoint'i eksik
2. **Cancel Endpoint**: `/api/forms/:id/cancel` endpoint'i eksik
3. **Validation**: Request body validation yok
4. **Error Handling**: Detaylı error handling yok
5. **Concurrency**: Aynı anda birden fazla yazma işlemi sorunlu olabilir

## Gelecek Geliştirmeler
1. Search endpoint'i eklenmeli
2. Cancel endpoint'i eklenmeli
3. Input validation middleware
4. Database migration sistemi
5. API documentation (Swagger)
6. Unit testler
7. Integration testler 