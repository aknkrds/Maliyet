# 🧪 Test Ortamı Kullanım Kılavuzu

## 🚀 Sistem Başlatma

### Backend (Port 3002)
```bash
cd backend
npm run dev
```

### Frontend (Port 3000)
```bash
cd frontend
npm start
```

## 📋 Test Senaryoları

### 1. Ücretsiz Kullanım Testi
1. **Ana Sayfa**: `http://localhost:3000`
2. **Lisans ve Ayarlar** tab'ına tıklayın
3. **Kayıt Ol** butonuna tıklayın
4. Formu doldurun ve kaydedin
5. Lisans durumunu kontrol edin (Ücretsiz - 50 kayıt limiti)

### 2. Lisans Aktivasyonu Testi
1. **Admin Paneli**: `http://localhost:3000/admin`
2. **Giriş Bilgileri**:
   - Kullanıcı Adı: `aknkrds`
   - Şifre: `DorukNaz2010**`
3. **Lisanslar** tab'ına gidin
4. **Yeni Lisans Oluştur** butonuna tıklayın
5. Lisans türünü seçin (Aylık/Yıllık/Ömür Boyu)
6. Oluşturulan lisans anahtarını kopyalayın

### 3. Lisans Aktivasyonu (Kullanıcı Tarafı)
1. Ana sayfaya dönün
2. **Lisans ve Ayarlar** tab'ına gidin
3. **Lisans Anahtarı Gir** butonuna tıklayın
4. Admin panelinden aldığınız anahtarı girin
5. **Aktifleştir** butonuna tıklayın
6. Lisans durumunu kontrol edin

### 4. Kayıt Limiti Testi
1. Ücretsiz kullanıcı olarak 50'den fazla form oluşturmaya çalışın
2. Sistem 50. kayıttan sonra uyarı vermelidir
3. Lisanslı kullanıcılar sınırsız kayıt oluşturabilir

## 🔧 API Endpoint'leri

### Lisans Sistemi
- `GET /api/license/status` - Lisans durumu
- `POST /api/license/activate` - Lisans aktivasyonu
- `POST /api/license/validate` - Lisans doğrulama

### Kullanıcı Yönetimi
- `POST /api/users/register` - Kullanıcı kaydı
- `GET /api/users/profile` - Kullanıcı profili

### Admin Paneli
- `POST /api/admin/login` - Admin girişi
- `POST /api/admin/generate-license` - Lisans oluşturma
- `GET /api/admin/licenses` - Lisans listesi
- `GET /api/admin/users` - Kullanıcı listesi

## 📊 Veri Dosyaları

Backend'de aşağıdaki JSON dosyaları otomatik oluşturulur:
- `backend/data/forms.json` - Form verileri
- `backend/data/users.json` - Kullanıcı verileri
- `backend/data/licenses.json` - Lisans verileri

## 🎯 Test Kontrol Listesi

### ✅ Temel Fonksiyonlar
- [ ] Kullanıcı kaydı çalışıyor
- [ ] Hardware ID oluşturuluyor
- [ ] Ücretsiz limit (50 kayıt) çalışıyor
- [ ] Lisans anahtarı oluşturma çalışıyor
- [ ] Lisans aktivasyonu çalışıyor
- [ ] Lisans durumu doğru gösteriliyor
- [ ] Admin paneli erişimi çalışıyor

### ✅ Güvenlik
- [ ] Hardware ID benzersiz oluşturuluyor
- [ ] Lisans anahtarları benzersiz
- [ ] Admin girişi güvenli
- [ ] Lisans doğrulama çalışıyor

### ✅ Kullanıcı Deneyimi
- [ ] Hata mesajları Türkçe
- [ ] Başarı mesajları gösteriliyor
- [ ] Loading durumları var
- [ ] Responsive tasarım

## 🐛 Bilinen Sorunlar

1. **Hardware ID**: Şu anda basit bir hash kullanılıyor, gerçek uygulamada daha karmaşık olmalı
2. **Offline Mod**: Şu anda sadece online doğrulama var
3. **Email Bildirimi**: Henüz implement edilmedi

## 🔄 Sonraki Adımlar

1. **Email Bildirimi**: Lisans süresi dolmadan önce uyarı
2. **Gelişmiş Hardware ID**: Daha güvenli donanım tanımlama
3. **Offline Mod**: İnternet olmadan da çalışma
4. **Lisans Yenileme**: Otomatik yenileme sistemi
5. **Fiyat Yönetimi**: Admin panelinden fiyat değiştirme

## 📞 Destek

Test sırasında sorun yaşarsanız:
- Console loglarını kontrol edin
- Network tab'ını inceleyin
- Veri dosyalarını kontrol edin 