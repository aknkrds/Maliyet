# Backend Dokümantasyonu - Maliyet Hesaplama Uygulaması

## Genel Bakış
Bu backend uygulaması, tekstil/üretim maliyeti hesaplama uygulamasının API katmanını oluşturur. Express.js tabanlı bir REST API sunar, JSON dosyası tabanlı veri saklama kullanır ve resim yükleme, lisans sistemi, admin paneli gibi gelişmiş özellikler içerir.

## Teknoloji Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Dil**: TypeScript
- **Veri Saklama**: JSON dosyası (`data/forms.json`, `data/users.json`, `data/licenses.json`)
- **Resim Yükleme**: Multer middleware
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
│   ├── users.json        # Kullanıcı verileri
│   ├── licenses.json     # Lisans verileri
│   ├── pricing.json      # Fiyat bilgileri
│   └── templates.json    # Form şablonları
├── uploads/              # Yüklenen resimler
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
  resimler?: {                    // Form resimleri
    maliyetKalipResmi?: string;
    urunResmi1?: string;
    urunResmi2?: string;
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

### User Interface (Lisans Sistemi)
```typescript
interface User {
  id: string;                     // Benzersiz kullanıcı ID'si
  name: string;                   // Kullanıcı adı
  company: string;                // Şirket adı
  email: string;                  // E-posta adresi
  phone?: string;                 // Telefon numarası
  taxOffice?: string;             // Vergi dairesi
  taxNumber?: string;             // Vergi numarası
  registeredAt: string;           // Kayıt tarihi
  hardwareId?: string;            // Donanım ID'si
  licenseKey?: string;            // Lisans anahtarı
}
```

### License Interface
```typescript
interface License {
  key: string;                    // Lisans anahtarı
  type: 'monthly' | 'yearly' | 'lifetime'; // Lisans türü
  hardwareId: string;             // Donanım ID'si
  userId: string;                 // Kullanıcı ID'si
  activatedAt: string;            // Aktivasyon tarihi
  expiresAt?: string;             // Bitiş tarihi
  isActive: boolean;              // Aktif durumu
  lastValidation: string;         // Son doğrulama tarihi
  isUsed: boolean;                // Kullanım durumu
}
```

### FormTemplate Interface
```typescript
interface FormTemplate {
  id: number;                     // Şablon ID'si
  name: string;                   // Şablon adı
  description: string;            // Şablon açıklaması
  template: Partial<FormData>;    // Şablon verisi
  createdAt: string;              // Oluşturulma tarihi
  usageCount: number;             // Kullanım sayısı
}
```

## API Endpoints

### Form Yönetimi

#### 1. Tüm Formları Getir
- **URL**: `GET /api/forms`
- **Açıklama**: Sistemdeki tüm formları listeler
- **Response**: FormData[] array

#### 2. Son Formu Getir
- **URL**: `GET /api/forms/latest`
- **Açıklama**: En son oluşturulan formu getirir
- **Response**: FormData object veya null

#### 3. Belirli Formu Getir
- **URL**: `GET /api/forms/:id`
- **Açıklama**: ID'ye göre belirli bir formu getirir
- **Response**: FormData object veya 404 error

#### 4. Yeni Form Oluştur
- **URL**: `POST /api/forms`
- **Açıklama**: Yeni bir form oluşturur
- **Request Body**: FormData (id hariç)
- **Response**: Oluşturulan FormData object

#### 5. Form Güncelle
- **URL**: `PUT /api/forms/:id`
- **Açıklama**: Mevcut bir formu günceller
- **Request Body**: Güncellenecek FormData alanları
- **Response**: Güncellenmiş FormData object

#### 6. Sonraki Seri Numarası
- **URL**: `GET /api/forms/nextSerialNumber`
- **Açıklama**: Yeni form için kullanılacak seri numarasını döner
- **Response**: `{ nextSerialNumber: number }`

#### 7. Form Arama
- **URL**: `GET /api/forms/search?query=string`
- **Açıklama**: Seri no veya ürün kodu ile form arama
- **Response**: FormData[] array

#### 8. Form İptal Et
- **URL**: `GET /api/forms/:id/cancel`
- **Açıklama**: Formu iptal durumuna alır
- **Response**: Güncellenmiş FormData object

#### 9. Form Açıklama Önerileri
- **URL**: `GET /api/forms/descriptions`
- **Açıklama**: Maliyet kalemleri için autocomplete önerileri
- **Response**: `{ [key: string]: string[] }`

### Resim Yönetimi

#### 10. Resim Yükle
- **URL**: `POST /api/forms/:id/images`
- **Açıklama**: Forma resim yükler
- **Content-Type**: `multipart/form-data`
- **Fields**: `maliyetKalipResmi`, `urunResmi1`, `urunResmi2`
- **Response**: Güncellenmiş FormData object

#### 11. Resim Sil
- **URL**: `DELETE /api/forms/:id/images/:imageType`
- **Açıklama**: Belirli bir resmi siler
- **Response**: Güncellenmiş FormData object

### Lisans Sistemi

#### 12. Lisans Durumu
- **URL**: `GET /api/license/status`
- **Açıklama**: Mevcut lisans durumunu getirir
- **Headers**: `hardware-id` header gerekli
- **Response**: LicenseStatus object

#### 13. Lisans Aktivasyonu
- **URL**: `POST /api/license/activate`
- **Açıklama**: Lisans anahtarını aktifleştirir
- **Request Body**: `{ licenseKey: string, hardwareId: string }`
- **Response**: `{ success: boolean, message: string }`

#### 14. Lisans Doğrulama
- **URL**: `POST /api/license/validate`
- **Açıklama**: Lisans geçerliliğini doğrular
- **Request Body**: `{ hardwareId: string }`
- **Response**: `{ isValid: boolean, message: string }`

### Kullanıcı Yönetimi

#### 15. Kullanıcı Kaydı
- **URL**: `POST /api/users/register`
- **Açıklama**: Yeni kullanıcı kaydı
- **Request Body**: User object (id hariç)
- **Response**: Oluşturulan User object

#### 16. Kullanıcı Girişi
- **URL**: `POST /api/users/login`
- **Açıklama**: Kullanıcı girişi
- **Request Body**: `{ email: string, hardwareId: string }`
- **Response**: `{ success: boolean, user: User }`

#### 17. Kullanıcı Profili
- **URL**: `GET /api/users/profile`
- **Açıklama**: Kullanıcı profil bilgileri
- **Headers**: `hardware-id` header gerekli
- **Response**: User object

### Admin Paneli

#### 18. Admin Girişi
- **URL**: `POST /api/admin/login`
- **Açıklama**: Admin paneli girişi
- **Request Body**: `{ username: string, password: string }`
- **Response**: `{ success: boolean, token: string }`

#### 19. Lisans Oluştur
- **URL**: `POST /api/admin/generate-license`
- **Açıklama**: Yeni lisans anahtarı oluşturur
- **Request Body**: `{ type: string, hardwareId: string, userId: string }`
- **Response**: `{ licenseKey: string, license: License }`

#### 20. Lisansları Listele
- **URL**: `GET /api/admin/licenses`
- **Açıklama**: Tüm lisansları listeler
- **Response**: License[] array (kullanıcı bilgileri ile)

#### 21. Kullanıcıları Listele
- **URL**: `GET /api/admin/users`
- **Açıklama**: Tüm kullanıcıları listeler
- **Response**: User[] array

#### 22. Fiyat Bilgilerini Getir
- **URL**: `GET /api/admin/pricing`
- **Açıklama**: Lisans fiyat bilgilerini getirir
- **Response**: Pricing object

#### 23. Fiyat Bilgilerini Güncelle
- **URL**: `PUT /api/admin/pricing`
- **Açıklama**: Lisans fiyat bilgilerini günceller
- **Request Body**: `{ monthly: number, yearly: number, freeLimit: number }`
- **Response**: Pricing object

### Form Şablonları

#### 24. Şablonları Listele
- **URL**: `GET /api/templates`
- **Açıklama**: Tüm form şablonlarını listeler
- **Response**: FormTemplate[] array

#### 25. Şablon Oluştur
- **URL**: `POST /api/templates`
- **Açıklama**: Yeni form şablonu oluşturur
- **Request Body**: FormTemplate (id hariç)
- **Response**: Oluşturulan FormTemplate object

#### 26. Şablon Güncelle
- **URL**: `PUT /api/templates/:id`
- **Açıklama**: Mevcut şablonu günceller
- **Request Body**: Güncellenecek FormTemplate alanları
- **Response**: Güncellenmiş FormTemplate object

#### 27. Şablon Sil
- **URL**: `DELETE /api/templates/:id`
- **Açıklama**: Şablonu siler
- **Response**: `{ success: boolean }`

## Resim Yükleme Sistemi

### Multer Konfigürasyonu
```typescript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Sadece resim dosyaları yüklenebilir'));
    }
  }
});
```

### Desteklenen Resim Formatları
- JPEG (.jpg, .jpeg)
- PNG (.png)
- GIF (.gif)
- WebP (.webp)
- BMP (.bmp)

### Dosya Boyutu Limiti
- Maksimum: 5MB
- Minimum: Yok

## Lisans Sistemi

### Hardware ID Oluşturma
```typescript
const generateHardwareId = (): string => {
  const userAgent = navigator.userAgent;
  const screenRes = `${window.screen.width}x${window.screen.height}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const combined = `${userAgent}-${screenRes}-${timeZone}`;
  
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash).toString(16).padStart(16, '0');
};
```

### Lisans Türleri
- **Ücretsiz**: 50 kayıt limiti
- **Aylık**: 99.99 TL, sınırsız kayıt
- **Yıllık**: 1000 TL, sınırsız kayıt

### Lisans Doğrulama Süreci
1. Uygulama başlatılır
2. Hardware ID oluşturulur
3. Sunucuya lisans durumu sorgulanır
4. Lisans geçerliyse uygulama çalışır
5. Geçersizse kısıtlı mod aktif olur

## Veri Saklama
- **Forms**: `data/forms.json`
- **Users**: `data/users.json`
- **Licenses**: `data/licenses.json`
- **Pricing**: `data/pricing.json`
- **Templates**: `data/templates.json`
- **Images**: `uploads/` klasörü
- **Format**: JSON array/object
- **Otomatik Yedekleme**: Yok (manuel yedekleme gerekli)
- **Concurrent Access**: Basit dosya okuma/yazma (production için uygun değil)

## Hata Yönetimi
- **HTTP Status Codes**: 200, 201, 400, 404, 500
- **Error Response Format**: `{ error: string }`
- **Logging**: Console.log ile basit loglama
- **File Upload Errors**: Multer error handling

## Güvenlik
- **CORS**: Tüm originlere açık (development için)
- **Input Validation**: Minimal (frontend'e bağımlı)
- **File Upload Security**: Dosya türü ve boyut kontrolü
- **Rate Limiting**: Yok
- **Authentication**: Admin paneli için basit username/password
- **Hardware ID**: Donanım bazlı lisans koruması

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
- Admin Credentials: aknkrds / DorukNaz2010**

## Production Considerations
1. **Veritabanı**: JSON dosyası yerine PostgreSQL/MongoDB kullanılmalı
2. **Authentication**: JWT veya session-based auth eklenmeli
3. **Validation**: Input validation middleware eklenmeli
4. **Logging**: Winston veya benzeri logging kütüphanesi
5. **Rate Limiting**: Express-rate-limit eklenmeli
6. **CORS**: Spesifik originler belirlenmeli
7. **Error Handling**: Global error handler middleware
8. **Backup**: Otomatik veri yedekleme sistemi
9. **File Storage**: AWS S3 veya Cloudinary entegrasyonu
10. **Security**: Hardware ID bypass koruması
11. **Email System**: Lisans bildirimleri için email sistemi

## Mevcut Sorunlar ve Eksiklikler
1. **Validation**: Request body validation yok
2. **Error Handling**: Detaylı error handling yok
3. **Concurrency**: Aynı anda birden fazla yazma işlemi sorunlu olabilir
4. **File Storage**: Local dosya sistemi production için uygun değil
5. **Security**: Hardware ID sistemi bypass edilebilir
6. **Email**: Lisans bildirimleri için email sistemi yok

## Gelecek Geliştirmeler
1. Input validation middleware
2. Database migration sistemi
3. API documentation (Swagger)
4. Unit testler
5. Integration testler
6. Cloud storage entegrasyonu
7. Email notification sistemi
8. Advanced security measures
9. Backup automation
10. Monitoring ve logging sistemi 