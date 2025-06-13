# Frontend Dokümantasyonu - Maliyet Hesaplama Uygulaması

## Genel Bakış
Bu frontend uygulaması, tekstil/üretim maliyeti hesaplama uygulamasının kullanıcı arayüzünü oluşturur. React tabanlı bir SPA (Single Page Application) olarak geliştirilmiştir ve Material-UI kullanarak modern bir tasarım sunar.

## Teknoloji Stack
- **Framework**: React 19.1.0
- **Dil**: TypeScript
- **UI Library**: Material-UI (MUI) v7.1.1
- **Routing**: React Router DOM v6.30.1
- **State Management**: React Hooks (useState, useEffect)
- **HTTP Client**: Fetch API
- **Date Handling**: Day.js
- **Notifications**: React Hot Toast
- **Build Tool**: Create React App
- **Development**: React Scripts

## Proje Yapısı
```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── MaliyetForm.tsx        # Ana form bileşeni
│   │   ├── MaliyetRapor.tsx       # Rapor görüntüleme
│   │   ├── FormList.tsx           # Form listesi
│   │   ├── FormSablonlari.tsx     # Form şablonları
│   │   └── ParaBirimiToplam.tsx   # Para birimi toplamları
│   ├── services/
│   │   └── exchangeService.ts     # Döviz kuru servisi
│   ├── assets/
│   │   ├── symi.png              # Logo (dark mode)
│   │   └── symi1.png             # Logo (light mode)
│   ├── App.tsx                   # Ana uygulama bileşeni
│   ├── index.tsx                 # Uygulama giriş noktası
│   └── App.css                   # Ana stil dosyası
├── package.json
└── tsconfig.json
```

## Ana Bileşenler

### 1. App.tsx
Ana uygulama bileşeni, tab yapısı ile farklı sayfaları yönetir:
- **Maliyet Formu**: Ana form sayfası
- **Raporlar**: Form listesi ve rapor görüntüleme
- **Form Şablonları**: Önceden tanımlanmış şablonlar

### 2. MaliyetForm.tsx
Ana form bileşeni, maliyet hesaplama formunu içerir:
- **Form Alanları**: Ürün kodu, tarihler, maliyet kalemleri
- **Hesaplamalar**: Otomatik toplam ve KDV hesaplama
- **Durum Yönetimi**: Sipariş durumu takibi
- **Para Birimi Dönüşümü**: Çoklu para birimi desteği
- **Yazdırma**: Form yazdırma özelliği

### 3. MaliyetRapor.tsx
Rapor görüntüleme ve form listesi:
- **Form Listesi**: Tüm formları tablo halinde gösterir
- **Filtreleme**: Tarih ve durum bazında filtreleme
- **Detay Görüntüleme**: Form detaylarını görüntüleme

### 4. FormSablonlari.tsx
Form şablonları yönetimi:
- **Şablon Listesi**: Önceden tanımlanmış şablonlar
- **Şablon Kullanma**: Şablonu yeni forma uygulama

## Veri Modeli

### FormData Interface
```typescript
interface FormData {
  id?: number;
  seriNo: number;
  urunKodu: string;
  teklifTarihi: string;
  terminTarihi: string;
  maliyetler: {
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
  notlar: string;
  toplam: number;
  kdvOrani: number;
  genelToplam: number;
  iptalDurumu: boolean;
  ekstraNotlar: string;
  paraBirimiToplam: {
    TL: number;
    USD: number;
    EUR: number;
    GBP: number;
  };
  siparisDurumu: SiparisDurumu;
  durum_tarihleri: {
    teklif_tarihi?: string;
    onay_tarihi?: string;
    red_tarihi?: string;
    uretim_tarihi?: string;
    teslim_tarihi?: string;
  };
}
```

### MaliyetItem Interface
```typescript
interface MaliyetItem {
  aciklama: string;
  birim?: string;
  birimTipi?: string;
  fiyat: number;
  paraBirimi: string;
}
```

### SiparisDurumu Type
```typescript
type SiparisDurumu = 'TEKLIF_VERILDI' | 'ONAYLANDI' | 'RED_EDILDI' | 'URETIMDE' | 'TESLIM_EDILDI' | null;
```

## API Entegrasyonu

### Base URL
- **Development**: `http://localhost:3002`
- **Production**: Değişken (environment variable ile)

### Endpoints
- `GET /api/forms` - Tüm formları getir
- `GET /api/forms/latest` - Son formu getir
- `GET /api/forms/:id` - Belirli formu getir
- `POST /api/forms` - Yeni form oluştur
- `PUT /api/forms/:id` - Form güncelle
- `GET /api/forms/nextSerialNumber` - Sonraki seri numarası

### Error Handling
- Toast notifications ile kullanıcı bilgilendirme
- Console.log ile debug bilgileri
- Try-catch blokları ile hata yakalama

## State Management

### Local State
- `formData`: Mevcut form verisi
- `isFormLocked`: Form kilitleme durumu
- `darkMode`: Tema modu
- `tabValue`: Aktif tab indeksi
- `selectedFormId`: Seçili form ID'si

### State Updates
- Form değişiklikleri: `setFormData`
- Tema değişiklikleri: `setDarkMode`
- Tab değişiklikleri: `setTabValue`

## Özellikler

### 1. Maliyet Hesaplama
- Otomatik toplam hesaplama
- KDV hesaplama
- Para birimi bazında toplamlar
- Gerçek zamanlı güncelleme

### 2. Para Birimi Dönüşümü
- USD, EUR, GBP, TL desteği
- Exchange rate API entegrasyonu
- Cache mekanizması (localStorage)
- Fallback değerler

### 3. Form Yönetimi
- Yeni form oluşturma
- Mevcut form düzenleme
- Form kopyalama
- Form iptal etme
- Form arama

### 4. Durum Takibi
- Sipariş durumu güncelleme
- Durum değişiklik tarihleri
- Görsel durum göstergeleri
- Durum geçmişi

### 5. Yazdırma
- Özel yazdırma layout'u
- CSS print media queries
- Yazdırma optimizasyonu

### 6. Tema Desteği
- Dark/Light mode
- Material-UI tema sistemi
- Dinamik tema değişimi
- Logo değişimi

## Styling

### Material-UI Kullanımı
- **ThemeProvider**: Merkezi tema yönetimi
- **CssBaseline**: CSS reset
- **Container**: Responsive layout
- **Grid**: Grid sistemi
- **Paper**: Kart bileşenleri
- **TextField**: Form alanları
- **Button**: Butonlar
- **Typography**: Metin stilleri

### Custom Styling
- **Inline Styles**: React style objeleri
- **CSS Classes**: App.css dosyası
- **Print Styles**: Yazdırma için özel CSS

## Form Validasyonu

### Client-side Validation
- Zorunlu alan kontrolü
- Sayısal değer kontrolü
- Tarih format kontrolü
- Para birimi kontrolü

### Error Handling
- Form hata mesajları
- API hata mesajları
- Network hata mesajları
- Kullanıcı dostu hata gösterimi

## Performance Optimizations

### React Optimizations
- **useCallback**: Fonksiyon memoization
- **useMemo**: Hesaplama memoization
- **React.memo**: Bileşen memoization
- **Lazy Loading**: Bileşen lazy loading

### Bundle Optimizations
- **Code Splitting**: Route bazında splitting
- **Tree Shaking**: Kullanılmayan kod temizleme
- **Minification**: Production build

## Development

### Kurulum
```bash
cd frontend
npm install
```

### Çalıştırma
```bash
# Development mode
npm start

# Production build
npm run build

# Test
npm test
```

### Environment Variables
- `REACT_APP_API_URL`: API base URL
- `REACT_APP_EXCHANGE_API_KEY`: Döviz kuru API anahtarı

## Mevcut Sorunlar ve Eksiklikler

### 1. API Entegrasyonu
- Search endpoint'i eksik
- Cancel endpoint'i eksik
- Error handling geliştirilebilir

### 2. State Management
- Global state yönetimi yok
- Form state persistence yok
- Optimistic updates yok

### 3. Performance
- Büyük form listelerinde performans sorunu
- Gereksiz re-render'lar
- Bundle size optimizasyonu gerekli

### 4. UX/UI
- Loading states eksik
- Error boundaries eksik
- Responsive design iyileştirmeleri
- Accessibility eksiklikleri

### 5. Testing
- Unit testler eksik
- Integration testler eksik
- E2E testler eksik

## Gelecek Geliştirmeler

### 1. State Management
- Redux Toolkit veya Zustand entegrasyonu
- Form state persistence
- Optimistic updates

### 2. Performance
- Virtual scrolling (büyük listeler için)
- React.memo optimizasyonları
- Code splitting iyileştirmeleri

### 3. Features
- Offline support
- PWA capabilities
- Real-time updates
- Advanced filtering
- Export functionality (PDF, Excel)

### 4. Testing
- Jest unit testler
- React Testing Library
- Cypress E2E testler

### 5. Monitoring
- Error tracking (Sentry)
- Performance monitoring
- Analytics integration

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

### Core Dependencies
- `react`: ^19.1.0
- `react-dom`: ^19.1.0
- `react-router-dom`: ^6.30.1
- `@mui/material`: ^7.1.1
- `@mui/icons-material`: ^7.1.1
- `@mui/x-date-pickers`: ^8.5.0
- `dayjs`: ^1.11.13
- `react-hot-toast`: ^2.5.2

### Development Dependencies
- `typescript`: ^4.9.5
- `@types/react`: ^19.1.6
- `@types/react-dom`: ^19.1.5
- `react-scripts`: 5.0.1 