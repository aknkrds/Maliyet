# Maliyet Hesaplama Uygulaması - Proje Genel Bakış

## Proje Tanımı
Bu uygulama, tekstil ve üretim sektörü için maliyet hesaplama ve takip sistemi olarak geliştirilmiştir. Kullanıcıların ürün maliyetlerini detaylı bir şekilde hesaplayabilmelerini, sipariş durumlarını takip edebilmelerini ve raporlar oluşturabilmelerini sağlar.

## Mimari Yapı

### Monorepo Yapısı
```
Maliyet/
├── frontend/              # React tabanlı kullanıcı arayüzü
├── backend/               # Express.js tabanlı API sunucusu
├── BACKEND_DOCUMENTATION.md
├── FRONTEND_DOCUMENTATION.md
├── PROJECT_OVERVIEW.md
└── README.md
```

### Teknoloji Stack
- **Frontend**: React + TypeScript + Material-UI
- **Backend**: Node.js + Express.js + TypeScript
- **Veri Saklama**: JSON dosyası (development) / SQLite (opsiyonel)
- **Build Tools**: Create React App (frontend) / TypeScript Compiler (backend)
- **Development**: Nodemon (backend) / React Scripts (frontend)

## Uygulama Özellikleri

### 1. Maliyet Hesaplama
- **Maliyet Kalemleri**: Kumaş, aksesuar, kesim, dikim, ütü, paket, yıkama, işletme giderleri, kar, sevkiyat
- **Para Birimi Desteği**: TL, USD, EUR, GBP
- **Otomatik Hesaplama**: Toplam ve KDV dahil genel toplam
- **Gerçek Zamanlı Güncelleme**: Form değişikliklerinde anlık hesaplama

### 2. Form Yönetimi
- **Yeni Form Oluşturma**: Otomatik seri numarası atama
- **Form Düzenleme**: Mevcut formları güncelleme
- **Form Kopyalama**: Mevcut formu yeni form olarak kopyalama
- **Form İptal Etme**: Formları iptal durumuna alma
- **Form Arama**: Seri no veya ürün kodu ile arama

### 3. Sipariş Durumu Takibi
- **Durumlar**: Teklif Verildi, Onaylandı, Red Edildi, Üretimde, Teslim Edildi
- **Durum Geçmişi**: Her durum değişikliğinin tarih/saat bilgisi
- **Görsel Göstergeler**: Durum bazında renk kodlaması
- **Otomatik Tarihleme**: Durum değişikliklerinde otomatik tarih atama

### 4. Raporlama
- **Form Listesi**: Tüm formları tablo halinde görüntüleme
- **Filtreleme**: Tarih ve durum bazında filtreleme
- **Detay Görüntüleme**: Form detaylarını görüntüleme
- **Yazdırma**: Form yazdırma özelliği

### 5. Para Birimi Dönüşümü
- **Exchange Rate API**: Gerçek zamanlı döviz kurları
- **Cache Sistemi**: localStorage ile kur cache'leme
- **Fallback Değerler**: API hatası durumunda varsayılan kurlar
- **Çoklu Para Birimi Toplamları**: Her para birimi için ayrı toplam

## Veri Akışı

### 1. Form Oluşturma
```
Kullanıcı → Frontend Form → API POST → Backend → JSON Dosyası
```

### 2. Form Güncelleme
```
Kullanıcı → Frontend Form → API PUT → Backend → JSON Dosyası
```

### 3. Form Listeleme
```
Frontend → API GET → Backend → JSON Dosyası → Frontend Tablo
```

### 4. Durum Güncelleme
```
Kullanıcı → Durum Butonu → Frontend State → API PUT → Backend → JSON Dosyası
```

## Güvenlik ve Performans

### Güvenlik
- **CORS**: Cross-Origin Resource Sharing yapılandırması
- **Input Validation**: Client-side form validasyonu
- **Error Handling**: Kapsamlı hata yönetimi
- **Data Sanitization**: Veri temizleme (geliştirilebilir)

### Performans
- **React Optimizations**: useCallback, useMemo, React.memo
- **API Caching**: Exchange rate cache'leme
- **Bundle Optimization**: Code splitting ve tree shaking
- **Lazy Loading**: Bileşen lazy loading (gelecek)

## Deployment ve Hosting

### Development Environment
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:3002`
- **Hot Reload**: Nodemon (backend) + React Scripts (frontend)

### Production Considerations
- **Frontend**: Static file hosting (Netlify, Vercel, AWS S3)
- **Backend**: Node.js hosting (Heroku, DigitalOcean, AWS EC2)
- **Database**: PostgreSQL veya MongoDB (JSON dosyası yerine)
- **Environment Variables**: API URL'leri ve API anahtarları
- **SSL/HTTPS**: Güvenli bağlantı
- **CDN**: Static asset delivery

## Mevcut Sorunlar ve Çözümler

### 1. Veri Saklama
**Sorun**: JSON dosyası tabanlı veri saklama production için uygun değil
**Çözüm**: PostgreSQL veya MongoDB entegrasyonu

### 2. API Endpoints
**Sorun**: Search ve cancel endpoint'leri eksik
**Çözüm**: Backend'e eksik endpoint'leri eklemek

### 3. State Management
**Sorun**: Global state yönetimi yok
**Çözüm**: Redux Toolkit veya Zustand entegrasyonu

### 4. Error Handling
**Sorun**: Kapsamlı error handling eksik
**Çözüm**: Global error boundaries ve API error handling

### 5. Testing
**Sorun**: Test coverage eksik
**Çözüm**: Jest, React Testing Library, Cypress entegrasyonu

## Gelecek Geliştirmeler

### Kısa Vadeli (1-2 ay)
1. **Search ve Cancel Endpoint'leri**: Backend'e eksik API'leri eklemek
2. **Input Validation**: Kapsamlı form validasyonu
3. **Error Boundaries**: React error boundaries
4. **Loading States**: API çağrıları için loading göstergeleri
5. **Responsive Design**: Mobile uyumluluk iyileştirmeleri

### Orta Vadeli (3-6 ay)
1. **Database Migration**: PostgreSQL entegrasyonu
2. **Authentication**: JWT tabanlı kullanıcı sistemi
3. **User Management**: Kullanıcı rolleri ve yetkilendirme
4. **Advanced Filtering**: Gelişmiş arama ve filtreleme
5. **Export Features**: PDF ve Excel export
6. **Real-time Updates**: WebSocket entegrasyonu

### Uzun Vadeli (6+ ay)
1. **PWA Features**: Offline support ve push notifications
2. **Multi-tenant**: Çoklu şirket desteği
3. **Analytics**: Kullanım analitikleri
4. **API Documentation**: Swagger entegrasyonu
5. **Microservices**: Servis mimarisine geçiş
6. **CI/CD**: Otomatik deployment pipeline

## Teknik Borç

### Code Quality
- **ESLint Warnings**: Kullanılmayan import'lar ve değişkenler
- **TypeScript Strict Mode**: Strict type checking
- **Code Comments**: Daha detaylı kod açıklamaları
- **Code Splitting**: Route bazında lazy loading

### Architecture
- **Separation of Concerns**: Daha iyi bileşen ayrımı
- **Custom Hooks**: Ortak logic için custom hook'lar
- **Service Layer**: API çağrıları için service katmanı
- **Constants**: Magic number'lar için constants

### Performance
- **Bundle Size**: Bundle analizi ve optimizasyon
- **Memory Leaks**: useEffect cleanup'ları
- **Re-render Optimization**: Gereksiz re-render'ları önleme
- **Image Optimization**: Logo ve asset optimizasyonu

## Katkıda Bulunma

### Development Workflow
1. **Fork**: Projeyi fork edin
2. **Branch**: Feature branch oluşturun
3. **Develop**: Özelliği geliştirin
4. **Test**: Testleri çalıştırın
5. **Commit**: Anlamlı commit mesajları yazın
6. **Push**: Branch'i push edin
7. **Pull Request**: PR oluşturun

### Code Standards
- **TypeScript**: Strict mode kullanımı
- **ESLint**: Linting kurallarına uyum
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message formatı
- **JSDoc**: Fonksiyon dokümantasyonu

## Lisans
Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim
Proje ile ilgili sorularınız için issue açabilir veya pull request gönderebilirsiniz. 