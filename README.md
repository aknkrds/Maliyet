# Maliyet Hesaplama Uygulaması

Bu uygulama, üretim maliyetlerini hesaplamak ve takip etmek için geliştirilmiş modern bir web uygulamasıdır.

## Özellikler

- 🌙 Koyu/Açık tema desteği
- 📱 Responsive tasarım (Mobil, tablet ve masaüstü uyumlu)
- 🖨️ Profesyonel PDF çıktı formatı
- 💾 Otomatik veri kaydetme
- 📊 Detaylı maliyet analizi
- 🔄 Durum takip sistemi
- 🌐 Cross-platform destek (Windows, macOS, Linux)

## Gereksinimler

- Node.js (v18 veya üzeri)
- npm veya yarn
- MongoDB (v6.0 veya üzeri)

## Kurulum

### Backend

```bash
# Projeyi klonlayın
git clone https://github.com/yourusername/Maliyet.git
cd Maliyet

# Backend bağımlılıklarını yükleyin
cd backend
npm install

# .env dosyasını oluşturun
cp .env.example .env

# .env dosyasını düzenleyin ve MongoDB bağlantı bilgilerinizi ekleyin
# Windows için notepad .env
# Linux/macOS için nano .env veya vim .env
```

### Frontend

```bash
# Frontend klasörüne gidin
cd ../frontend

# Bağımlılıkları yükleyin
npm install

# .env dosyasını oluşturun
cp .env.example .env

# Geliştirme sunucusunu başlatın
npm run dev
```

## Platform Spesifik Kurulum Notları

### Windows

1. MongoDB kurulumu:
   - MongoDB Community Server'ı [resmi siteden](https://www.mongodb.com/try/download/community) indirin
   - Kurulum sihirbazını takip edin
   - MongoDB Compass'ı kurmayı unutmayın (veritabanı yönetimi için)

2. Node.js kurulumu:
   - Node.js'i [resmi siteden](https://nodejs.org/) indirin
   - Kurulum sırasında "Automatically install necessary tools" seçeneğini işaretleyin

### Linux (Ubuntu/Debian)

```bash
# Node.js kurulumu
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# MongoDB kurulumu
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### macOS

```bash
# Homebrew ile kurulum
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js kurulumu
brew install node

# MongoDB kurulumu
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

## Uygulama Başlatma

### Development Modunda

```bash
# Backend başlatma
cd backend
npm run dev

# Frontend başlatma (yeni terminal)
cd frontend
npm run dev
```

### Production Modunda

```bash
# Backend build ve başlatma
cd backend
npm run build
npm start

# Frontend build ve başlatma
cd frontend
npm run build
npm run start
```

## Veritabanı Yedekleme

```bash
# MongoDB yedekleme
mongodump --db maliyet --out ./backup

# MongoDB geri yükleme
mongorestore --db maliyet ./backup/maliyet
```

## Güvenlik Notları

1. `.env` dosyalarını asla git repository'sine eklemeyin
2. Production ortamında güçlü şifreler kullanın
3. MongoDB authentication'ı aktif edin
4. Güvenlik duvarı kurallarını düzenleyin

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## İletişim

- Website: [your-website.com](https://your-website.com)
- Email: your-email@example.com
- GitHub: [@yourusername](https://github.com/yourusername) 