# Maliyet Hesaplama Projesi - Geliştirme Notları

## Proje Yapısı

Proje, full-stack bir web uygulaması olarak tasarlanmıştır ve iki ana bölümden oluşmaktadır:

### Frontend (`/frontend`)

React ve TypeScript tabanlı modern web uygulaması.

Klasör Yapısı:
```
frontend/
├── src/
│   ├── components/     # React bileşenleri
│   ├── services/      # API çağrıları ve servisler
│   ├── assets/        # Statik dosyalar
│   ├── App.tsx        # Ana uygulama bileşeni
│   └── index.tsx      # Uygulama giriş noktası
├── public/            # Statik dosyalar
├── package.json       # Bağımlılıklar ve scripts
└── tsconfig.json      # TypeScript yapılandırması
```

### Backend (`/backend`)

Node.js ve TypeScript tabanlı API sunucusu.

Klasör Yapısı:
```
backend/
├── src/
│   ├── index.ts       # Ana uygulama mantığı ve route'lar
│   ├── server.ts      # Sunucu yapılandırması
│   └── database.ts    # Veritabanı işlemleri
├── data/             # Veri dosyaları
└── package.json      # Bağımlılıklar ve scripts
```

## Deployment

- Proje PM2 kullanılarak deploy edilmektedir (ecosystem.config.js)
- TypeScript kaynak kodları derlenerek dist/ klasörüne çıktı alınmaktadır

## Teknoloji Stack'i

Frontend:
- React
- TypeScript
- Modern web arayüzü bileşenleri

Backend:
- Node.js
- TypeScript
- Express.js (API sunucusu)

## Geliştirme Notları

1. Proje maliyet hesaplama işlemleri için tasarlanmıştır
2. Frontend'de kullanıcı dostu bir arayüz sunulmaktadır
3. Backend'de hesaplama işlemleri ve veri yönetimi yapılmaktadır

## Yapılacaklar ve İleriki Geliştirmeler

[Bu bölüm, gelecekteki geliştirmeler için güncellenecektir]

## Uygulamayı Çalıştırma

### Backend'i Çalıştırma

1. Backend klasörüne gidin:
   ```bash
   cd backend
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme modunda çalıştırın:
   ```bash
   npm run dev
   ```
   veya
   ```bash
   npm start
   ```

### Frontend'i Çalıştırma

1. Yeni bir terminal açın ve frontend klasörüne gidin:
   ```bash
   cd frontend
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm start
   ```

Frontend uygulaması otomatik olarak tarayıcınızda açılacaktır (genellikle http://localhost:3000 adresinde).
Backend API'si http://localhost:5000 adresinde çalışacaktır.

### PM2 ile Çalıştırma (Production)

Production ortamında çalıştırmak için:

```bash
npm run build  # Her iki klasörde de build almak için
pm2 start ecosystem.config.js
```

---

Son Güncelleme: [Tarih] 