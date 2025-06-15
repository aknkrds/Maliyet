# Maliyet Hesaplama Uygulaması

Bu uygulama, tekstil ve üretim sektörü için maliyet hesaplama ve takip sistemi olarak geliştirilmiştir. Kullanıcıların ürün maliyetlerini detaylı bir şekilde hesaplayabilmelerini, sipariş durumlarını takip edebilmelerini, resim yükleyebilmelerini ve lisans sistemi ile kullanım kısıtlamalarını yönetebilmelerini sağlar.

## 🚀 Özellikler

- 🌙 Koyu/Açık tema desteği
- 📱 Responsive tasarım (Mobil, tablet ve masaüstü uyumlu)
- 🖨️ Profesyonel yazdırma formatı
- 💾 Otomatik veri kaydetme
- 📊 Detaylı maliyet analizi
- 🔄 Sipariş durumu takip sistemi
- 💱 Çoklu para birimi desteği (TL, USD, EUR, GBP)
- 🔍 Form arama ve filtreleme
- 📋 Form şablonları
- 🎯 Gerçek zamanlı hesaplama
- 📈 KDV dahil toplam hesaplama
- 🖼️ **Resim Yönetimi**: Maliyet kalıp ve ürün resimleri yükleme
- 🔐 **Lisans Sistemi**: Donanım bazlı lisans doğrulama
- 👨‍💼 **Admin Paneli**: Lisans ve kullanıcı yönetimi
- 📋 **İş Akışları**: Gelişmiş form listesi ve durum takibi
- 🎨 **Resim Popup**: Büyük resim görüntüleme
- 🗑️ **Resim Silme**: Yüklenen resimleri silme
- 🔒 **Güvenlik**: Hardware ID tabanlı koruma

## 🛠️ Teknoloji Stack

### Frontend
- **React 19.1.0** - Modern UI framework
- **TypeScript** - Type-safe development
- **Material-UI (MUI) v7.1.1** - UI component library
- **React Router DOM** - Client-side routing
- **Day.js** - Date handling
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe development
- **Multer** - File upload middleware
- **JSON File Storage** - Data persistence
- **CORS** - Cross-origin resource sharing

## 📋 Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- Modern web browser

## 🚀 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/aknkrds/Maliyet.git
cd Maliyet
```

### 2. Backend Kurulumu

```bash
# Backend klasörüne gidin
cd backend

# Bağımlılıkları yükleyin
npm install

# Uploads klasörünü oluşturun (resim yükleme için)
mkdir uploads

# Geliştirme sunucusunu başlatın
npm run dev
```

Backend sunucusu `http://localhost:3002` adresinde çalışacaktır.

### 3. Frontend Kurulumu

```bash
# Yeni bir terminal açın ve frontend klasörüne gidin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm start
```

Frontend uygulaması `http://localhost:3000` adresinde çalışacaktır.

## 📖 Kullanım

### Maliyet Formu
1. **Yeni Form Oluşturma**: Ana sayfada yeni form oluşturun
2. **Maliyet Kalemleri**: Kumaş, aksesuar, kesim, dikim vb. maliyetleri girin
3. **Para Birimi**: Her kalem için para birimi seçin
4. **Otomatik Hesaplama**: Toplam ve KDV dahil genel toplam otomatik hesaplanır
5. **Resim Yükleme**: Maliyet kalıp ve ürün resimleri yükleyin
6. **Kaydetme**: Formu kaydedin ve durumunu takip edin

### Resim Yönetimi
- **Resim Yükleme**: Maliyet kalıp resmi, ürün resmi 1, ürün resmi 2
- **Resim Görüntüleme**: Resme tıklayarak popup'ta büyük görüntüleme
- **Resim Silme**: Çöp kutusu ikonuna tıklayarak silme
- **Desteklenen Formatlar**: JPEG, PNG, GIF, WebP, BMP
- **Dosya Boyutu**: Maksimum 5MB

### Lisans Sistemi
- **Ücretsiz Kullanım**: 50 kayıt limiti
- **Lisans Türleri**: 
  - Aylık: 99.99 TL
  - Yıllık: 1000 TL
- **Hardware ID**: Donanım bazlı lisans doğrulama
- **Online Doğrulama**: Sunucu üzerinden lisans kontrolü
- **Grace Period**: 2 günlük çevrimdışı kullanım süresi

### Admin Paneli
- **Giriş**: `/admin` adresinden admin girişi
- **Kullanıcı Bilgileri**: aknkrds / DorukNaz2010**
- **Lisans Yönetimi**: Lisans oluşturma ve yönetimi
- **Kullanıcı Yönetimi**: Kullanıcı listesi ve yönetimi
- **Fiyat Yönetimi**: Lisans fiyatlarını güncelleme

### Sipariş Durumu Takibi
- **Teklif Verildi**: İlk durum
- **Onaylandı**: Müşteri onayı
- **Red Edildi**: Müşteri reddi
- **Üretimde**: Üretim süreci
- **Teslim Edildi**: Tamamlanan sipariş

### İş Akışları (Eski Raporlar)
- Tüm formları listeleme
- Tarih ve durum bazında filtreleme
- Form detaylarını görüntüleme
- Form seçerek düzenleme
- Yazdırma özelliği

### Raporlar
- Gelecekte eklenecek raporlama özellikleri
- Gelişmiş analitik ve grafikler

## 🔧 Geliştirme

### Scripts

#### Backend
```bash
npm run dev      # Development mode (nodemon)
npm run build    # TypeScript derleme
npm start        # Production mode
```

#### Frontend
```bash
npm start        # Development server
npm run build    # Production build
npm test         # Test çalıştırma
```

### Proje Yapısı

```
Maliyet/
├── frontend/              # React uygulaması
│   ├── src/
│   │   ├── components/    # React bileşenleri
│   │   │   ├── MaliyetForm.tsx
│   │   │   ├── MaliyetRapor.tsx
│   │   │   ├── FormSablonlari.tsx
│   │   │   ├── LisansAyarlar.tsx
│   │   │   ├── AdminLogin.tsx
│   │   │   └── AdminPanel.tsx
│   │   ├── services/      # API servisleri
│   │   └── assets/        # Statik dosyalar
│   └── public/            # Public dosyalar
├── backend/               # Express.js API
│   ├── src/               # TypeScript kaynak kodları
│   ├── data/              # JSON veri dosyaları
│   │   ├── forms.json
│   │   ├── users.json
│   │   ├── licenses.json
│   │   ├── pricing.json
│   │   └── templates.json
│   ├── uploads/           # Yüklenen resimler
│   └── dist/              # Derlenmiş JavaScript
├── BACKEND_DOCUMENTATION.md
├── FRONTEND_DOCUMENTATION.md
├── PROJECT_OVERVIEW.md
└── README.md
```

## 📚 Dokümantasyon

Proje hakkında detaylı bilgi için aşağıdaki dokümantasyon dosyalarına bakın:

- **[PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md)** - Proje genel bakış ve mimari
- **[BACKEND_DOCUMENTATION.md](BACKEND_DOCUMENTATION.md)** - Backend API dokümantasyonu
- **[FRONTEND_DOCUMENTATION.md](FRONTEND_DOCUMENTATION.md)** - Frontend bileşen dokümantasyonu

## 🔒 Güvenlik

- CORS yapılandırması
- Input validation
- File upload security (dosya türü ve boyut kontrolü)
- Hardware ID tabanlı lisans koruması
- Admin authentication
- Error handling

## 🚀 Deployment

### Production Build

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
```

### Hosting Önerileri
- **Frontend**: Netlify, Vercel, AWS S3
- **Backend**: Heroku, DigitalOcean, AWS EC2
- **File Storage**: AWS S3, Cloudinary (resim depolama için)
- **Database**: PostgreSQL, MongoDB (JSON dosyası yerine)

## 🔧 Yapılandırma

### Environment Variables

#### Backend
```bash
PORT=3002
NODE_ENV=production
```

#### Frontend
```bash
REACT_APP_API_URL=http://localhost:3002
REACT_APP_ENVIRONMENT=development
```

### Admin Paneli
- **URL**: `http://localhost:3000/admin`
- **Kullanıcı Adı**: aknkrds
- **Şifre**: DorukNaz2010**

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

**Akın Karadaş**

- 📧 **Email**: aknkrds@hotmail.com
- 🏢 **İş Email**: akin@symi.com.tr
- 🏢 **İş Email**: info@symi.com.tr
- 📱 **Telefon**: +90 533 732 8983
- 💰 **Yardım için EVM Cüzdan Adresi**: `0xba1AFeca48bCD40eD67F7074658e780c082720Fc`

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın! 