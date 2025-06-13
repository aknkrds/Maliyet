# Maliyet Hesaplama Uygulaması

Bu uygulama, tekstil ve üretim sektörü için maliyet hesaplama ve takip sistemi olarak geliştirilmiştir. Kullanıcıların ürün maliyetlerini detaylı bir şekilde hesaplayabilmelerini, sipariş durumlarını takip edebilmelerini ve raporlar oluşturabilmelerini sağlar.

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
5. **Kaydetme**: Formu kaydedin ve durumunu takip edin

### Sipariş Durumu Takibi
- **Teklif Verildi**: İlk durum
- **Onaylandı**: Müşteri onayı
- **Red Edildi**: Müşteri reddi
- **Üretimde**: Üretim süreci
- **Teslim Edildi**: Tamamlanan sipariş

### Raporlar
- Tüm formları listeleme
- Tarih ve durum bazında filtreleme
- Form detaylarını görüntüleme
- Yazdırma özelliği

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
│   │   ├── services/      # API servisleri
│   │   └── assets/        # Statik dosyalar
│   └── public/            # Public dosyalar
├── backend/               # Express.js API
│   ├── src/               # TypeScript kaynak kodları
│   ├── data/              # JSON veri dosyaları
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
- Error handling
- Secure data storage

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
- **Database**: PostgreSQL, MongoDB (JSON dosyası yerine)

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