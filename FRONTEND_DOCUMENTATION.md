# Frontend Dokümantasyonu - Maliyet Hesaplama Uygulaması

## Genel Bakış
Bu frontend uygulaması, tekstil/üretim maliyeti hesaplama uygulamasının kullanıcı arayüzünü oluşturur. React tabanlı bir SPA (Single Page Application) olarak geliştirilmiştir ve Material-UI kullanarak modern bir tasarım sunar. Resim yükleme, lisans sistemi, admin paneli gibi gelişmiş özellikler içerir.

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
│   │   ├── MaliyetRapor.tsx       # İş akışları görüntüleme
│   │   ├── FormList.tsx           # Form listesi
│   │   ├── FormSablonlari.tsx     # Form şablonları
│   │   ├── ParaBirimiToplam.tsx   # Para birimi toplamları
│   │   ├── LisansAyarlar.tsx      # Lisans ve ayarlar
│   │   ├── AdminLogin.tsx         # Admin girişi
│   │   └── AdminPanel.tsx         # Admin paneli
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
- **İş Akışları**: Form listesi ve durum takibi (eski "Raporlar")
- **Form Şablonları**: Önceden tanımlanmış şablonlar
- **Raporlar**: Gelecekte eklenecek raporlama özellikleri
- **Lisans ve Ayarlar**: Lisans yönetimi ve kullanıcı ayarları

### 2. MaliyetForm.tsx
Ana form bileşeni, maliyet hesaplama formunu içerir:
- **Form Alanları**: Ürün kodu, tarihler, maliyet kalemleri
- **Hesaplamalar**: Otomatik toplam ve KDV hesaplama
- **Durum Yönetimi**: Sipariş durumu takibi
- **Para Birimi Dönüşümü**: Çoklu para birimi desteği
- **Resim Yönetimi**: Resim yükleme, görüntüleme ve silme
- **Yazdırma**: Form yazdırma özelliği

### 3. MaliyetRapor.tsx (İş Akışları)
Form listesi ve durum takibi:
- **Form Listesi**: Tüm formları tablo halinde gösterir
- **Filtreleme**: Tarih ve durum bazında filtreleme
- **Detay Görüntüleme**: Form detaylarını görüntüleme
- **Form Seçimi**: Listeden form seçerek düzenleme

### 4. FormSablonlari.tsx
Form şablonları yönetimi:
- **Şablon Listesi**: Önceden tanımlanmış şablonlar
- **Şablon Kullanma**: Şablonu yeni forma uygulama
- **Şablon Yönetimi**: Şablon ekleme, düzenleme, silme

### 5. LisansAyarlar.tsx
Lisans sistemi ve kullanıcı yönetimi:
- **Lisans Durumu**: Mevcut lisans bilgileri
- **Kullanıcı Kaydı**: Yeni kullanıcı kaydı
- **Lisans Aktivasyonu**: Lisans anahtarı ile aktivasyon
- **Fiyat Bilgileri**: Lisans fiyatları
- **Hardware ID**: Donanım kimliği

### 6. AdminLogin.tsx
Admin paneli girişi:
- **Giriş Formu**: Kullanıcı adı ve şifre
- **Doğrulama**: Admin kimlik doğrulama
- **Token Yönetimi**: Oturum token'ı

### 7. AdminPanel.tsx
Admin paneli yönetimi:
- **Lisans Yönetimi**: Lisans oluşturma ve yönetimi
- **Kullanıcı Yönetimi**: Kullanıcı listesi ve yönetimi
- **Fiyat Yönetimi**: Lisans fiyatlarını güncelleme
- **İstatistikler**: Sistem kullanım istatistikleri

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
  resimler?: {
    maliyetKalipResmi?: string;
    urunResmi1?: string;
    urunResmi2?: string;
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

### User Interface (Lisans Sistemi)
```typescript
interface User {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  taxOffice?: string;
  taxNumber?: string;
  registeredAt: string;
  hardwareId?: string;
  licenseKey?: string;
}
```

### License Interface
```typescript
interface License {
  key: string;
  type: 'monthly' | 'yearly' | 'lifetime';
  hardwareId: string;
  userId: string;
  activatedAt: string;
  expiresAt?: string;
  isActive: boolean;
  lastValidation: string;
  isUsed: boolean;
}
```

### LicenseStatus Interface
```typescript
interface LicenseStatus {
  isActive: boolean;
  type: 'free' | 'monthly' | 'yearly' | 'lifetime';
  remainingDays?: number;
  totalRecords: number;
  maxRecords: number;
  lastValidation: string;
  expiresAt?: string;
}
```

## API Entegrasyonu

### Base URL
- **Development**: `http://localhost:3002`
- **Production**: Değişken (environment variable ile)

### Form Endpoints
- `GET /api/forms` - Tüm formları getir
- `GET /api/forms/latest` - Son formu getir
- `GET /api/forms/:id` - Belirli formu getir
- `POST /api/forms` - Yeni form oluştur
- `PUT /api/forms/:id` - Form güncelle
- `GET /api/forms/nextSerialNumber` - Sonraki seri numarası
- `GET /api/forms/search?query=string` - Form arama
- `GET /api/forms/:id/cancel` - Form iptal et
- `GET /api/forms/descriptions` - Açıklama önerileri

### Resim Endpoints
- `POST /api/forms/:id/images` - Resim yükle
- `DELETE /api/forms/:id/images/:imageType` - Resim sil

### Lisans Endpoints
- `GET /api/license/status` - Lisans durumu
- `POST /api/license/activate` - Lisans aktivasyonu
- `POST /api/license/validate` - Lisans doğrulama

### Kullanıcı Endpoints
- `POST /api/users/register` - Kullanıcı kaydı
- `POST /api/users/login` - Kullanıcı girişi
- `GET /api/users/profile` - Kullanıcı profili

### Admin Endpoints
- `POST /api/admin/login` - Admin girişi
- `POST /api/admin/generate-license` - Lisans oluştur
- `GET /api/admin/licenses` - Lisansları listele
- `GET /api/admin/users` - Kullanıcıları listele
- `GET /api/admin/pricing` - Fiyat bilgilerini getir
- `PUT /api/admin/pricing` - Fiyat bilgilerini güncelle

### Şablon Endpoints
- `GET /api/templates` - Şablonları listele
- `POST /api/templates` - Şablon oluştur
- `PUT /api/templates/:id` - Şablon güncelle
- `DELETE /api/templates/:id` - Şablon sil

### Error Handling
- Toast notifications ile kullanıcı bilgilendirme
- Console.log ile debug bilgileri
- Try-catch blokları ile hata yakalama
- ParaBirimiToplam component'inde null/undefined kontrolü

## State Management

### Local State
- `formData`: Mevcut form verisi
- `isFormLocked`: Form kilitleme durumu
- `darkMode`: Tema modu
- `tabValue`: Aktif tab indeksi
- `selectedFormId`: Seçili form ID'si
- `imageDialogOpen`: Resim popup durumu
- `selectedImage`: Seçili resim URL'i
- `uploadingImages`: Resim yükleme durumları
- `isAdminLoggedIn`: Admin giriş durumu

### State Updates
- Form değişiklikleri: `setFormData`
- Tema değişiklikleri: `setDarkMode`
- Tab değişiklikleri: `setTabValue`
- Resim işlemleri: `setImageDialogOpen`, `setSelectedImage`
- Admin durumu: `setIsAdminLoggedIn`

## Özellikler

### 1. Maliyet Hesaplama
- Otomatik toplam hesaplama
- KDV hesaplama
- Para birimi bazında toplamlar
- Gerçek zamanlı güncelleme

### 2. Resim Yönetimi
- **Resim Yükleme**: Maliyet kalıp resmi, ürün resmi 1, ürün resmi 2
- **Resim Görüntüleme**: Popup ile büyük resim görüntüleme
- **Resim Silme**: Yüklenen resimleri silme
- **Dosya Validasyonu**: Sadece resim dosyaları
- **Yükleme Durumu**: Progress göstergeleri
- **Responsive Design**: Mobil uyumlu resim kartları

### 3. Lisans Sistemi
- **Ücretsiz Kullanım**: 50 kayıt limiti
- **Lisans Türleri**: Aylık (99.99 TL), Yıllık (1000 TL)
- **Hardware ID**: Donanım bazlı lisans doğrulama
- **Online Doğrulama**: Sunucu üzerinden lisans kontrolü
- **Grace Period**: 2 günlük çevrimdışı kullanım süresi
- **Kullanıcı Kaydı**: Form tabanlı kullanıcı kaydı
- **Lisans Aktivasyonu**: Lisans anahtarı ile aktivasyon

### 4. Admin Paneli
- **Admin Girişi**: Güvenli giriş sistemi
- **Lisans Yönetimi**: Lisans oluşturma ve yönetimi
- **Kullanıcı Yönetimi**: Kullanıcı listesi ve yönetimi
- **Fiyat Yönetimi**: Lisans fiyatlarını güncelleme
- **İstatistikler**: Sistem kullanım istatistikleri

### 5. Para Birimi Dönüşümü
- USD, EUR, GBP, TL desteği
- Exchange rate API entegrasyonu
- Cache mekanizması (localStorage)
- Fallback değerler

### 6. Form Yönetimi
- Yeni form oluşturma
- Mevcut form düzenleme
- Form kopyalama
- Form iptal etme
- Form arama
- Form şablonları

### 7. Durum Takibi
- Sipariş durumu güncelleme
- Durum değişiklik tarihleri
- Görsel durum göstergeleri
- Durum geçmişi

### 8. Yazdırma
- Özel yazdırma layout'u
- CSS print media queries
- Yazdırma optimizasyonu

### 9. Tema Desteği
- Dark/Light mode toggle
- Material-UI tema sistemi
- Responsive design
- Accessibility desteği

## Resim Yükleme Sistemi

### Resim Yükleme Bileşeni
```typescript
const renderImageSection = () => {
  if (!formData.id) return null;

  const imageTypes = [
    { key: 'maliyetKalipResmi', label: 'Maliyet Kalıp Resmi' },
    { key: 'urunResmi1', label: 'Ürün Resmi 1' },
    { key: 'urunResmi2', label: 'Ürün Resmi 2' }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Resimler
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 2 }}>
        {imageTypes.map(({ key, label }) => {
          const imageUrl = formData.resimler?.[key as keyof typeof formData.resimler];
          const isUploading = uploadingImages[key];

          return (
            <Card key={key} sx={{ height: 200, position: 'relative' }}>
              {imageUrl ? (
                <>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:3002${imageUrl}`}
                    alt={label}
                    sx={{ cursor: 'pointer', objectFit: 'cover' }}
                    onClick={() => handleImageClick(`http://localhost:3002${imageUrl}`)}
                  />
                  <CardActions sx={{ justifyContent: 'space-between', p: 1 }}>
                    <Typography variant="caption" color="text.secondary">
                      {label}
                    </Typography>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleImageDelete(key)}
                      disabled={isFormLocked}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </>
              ) : (
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  p: 2
                }}>
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id={`image-upload-${key}`}
                    type="file"
                    onChange={(e) => handleImageUpload(e, key)}
                    disabled={isFormLocked || isUploading}
                  />
                  <label htmlFor={`image-upload-${key}`}>
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={isUploading ? null : <AddPhotoAlternateIcon />}
                      disabled={isFormLocked || isUploading}
                      sx={{ mb: 1 }}
                    >
                      {isUploading ? 'Yükleniyor...' : 'Resim Ekle'}
                    </Button>
                  </label>
                  <Typography variant="caption" color="text.secondary" textAlign="center">
                    {label}
                  </Typography>
                </Box>
              )}
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};
```

### Resim Popup Dialog
```typescript
<Dialog
  open={imageDialogOpen}
  onClose={handleCloseImageDialog}
  maxWidth="lg"
  fullWidth
>
  <DialogContent sx={{ p: 0, position: 'relative' }}>
    <IconButton
      onClick={handleCloseImageDialog}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: 'white',
        bgcolor: 'rgba(0, 0, 0, 0.5)',
        '&:hover': {
          bgcolor: 'rgba(0, 0, 0, 0.7)',
        },
        zIndex: 1,
      }}
    >
      <CloseIcon />
    </IconButton>
    <img
      src={selectedImage}
      alt="Büyük Resim"
      style={{
        width: '100%',
        height: 'auto',
        maxHeight: '80vh',
        objectFit: 'contain',
      }}
    />
  </DialogContent>
</Dialog>
```

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

### Lisans Durumu Kontrolü
```typescript
const checkLicenseStatus = async () => {
  try {
    const response = await fetch('http://localhost:3002/api/license/status', {
      headers: {
        'hardware-id': hardwareId
      }
    });
    
    if (response.ok) {
      const status = await response.json();
      setLicenseStatus(status);
      
      if (!status.isActive && status.totalRecords >= status.maxRecords) {
        setFormLocked(true);
        toast.error('Lisans süreniz dolmuş veya kayıt limitiniz aşılmış!');
      }
    }
  } catch (error) {
    console.error('Lisans durumu kontrol edilirken hata:', error);
  }
};
```

## Güvenlik

### Lisans Koruması
- Hardware ID tabanlı lisans doğrulama
- Online doğrulama sistemi
- Grace period ile çevrimdışı kullanım
- Kayıt limiti kontrolü

### Dosya Güvenliği
- Sadece resim dosyaları kabul edilir
- Dosya boyutu limiti (5MB)
- Benzersiz dosya adlandırma
- Güvenli dosya yükleme

### Admin Güvenliği
- Güvenli giriş sistemi
- Token tabanlı oturum yönetimi
- Admin yetki kontrolü

## Performance Optimizations

### Resim Optimizasyonu
- Lazy loading (gelecek)
- Image compression (gelecek)
- Thumbnail generation (gelecek)

### State Optimizations
- useCallback ile fonksiyon memoization
- useMemo ile hesaplama memoization
- React.memo ile component memoization

### Bundle Optimization
- Code splitting (gelecek)
- Tree shaking
- Dynamic imports (gelecek)

## Accessibility

### ARIA Labels
- Form alanları için aria-label
- Butonlar için aria-label
- Dialog'lar için aria-labelledby

### Keyboard Navigation
- Tab navigation
- Enter/Space key support
- Escape key support

### Screen Reader Support
- Semantic HTML
- Alt text for images
- Proper heading structure

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

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
```

### Environment Variables
- `REACT_APP_API_URL`: Backend API URL'i
- `REACT_APP_ENVIRONMENT`: Environment (development/production)

## Production Considerations
1. **Environment Variables**: API URL'leri için environment variables
2. **Error Boundaries**: Global error handling
3. **Loading States**: API çağrıları için loading göstergeleri
4. **Offline Support**: Service worker ile offline desteği
5. **PWA Features**: Progressive Web App özellikleri
6. **Analytics**: Kullanım analitikleri
7. **Monitoring**: Error monitoring ve performance tracking
8. **SEO**: Meta tags ve structured data
9. **Security**: CSP headers ve security best practices
10. **Performance**: Bundle optimization ve lazy loading

## Mevcut Sorunlar ve Eksiklikler
1. **Error Boundaries**: Global error handling eksik
2. **Loading States**: API çağrıları için loading göstergeleri eksik
3. **Validation**: Form validation eksik
4. **Testing**: Unit ve integration testler eksik
5. **Offline Support**: Service worker eksik
6. **PWA**: Progressive Web App özellikleri eksik
7. **Analytics**: Kullanım analitikleri eksik
8. **Monitoring**: Error monitoring eksik

## Gelecek Geliştirmeler
1. Error boundaries eklenmeli
2. Loading states eklenmeli
3. Form validation eklenmeli
4. Unit testler yazılmalı
5. Integration testler yazılmalı
6. Service worker eklenmeli
7. PWA features eklenmeli
8. Analytics entegrasyonu
9. Error monitoring sistemi
10. Performance optimization
11. Accessibility improvements
12. Mobile app (React Native) 