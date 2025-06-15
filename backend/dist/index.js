"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
const port = 3002;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Resim yükleme için multer konfigürasyonu
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Sadece resim dosyaları yüklenebilir'));
        }
    }
});
// Uploads klasörünü statik olarak serve et
app.use('/uploads', express_1.default.static('uploads'));
// Data dosyalarının yolları
const dataPath = path_1.default.join(__dirname, '../data/forms.json');
const usersPath = path_1.default.join(__dirname, '../data/users.json');
const licensesPath = path_1.default.join(__dirname, '../data/licenses.json');
const pricingPath = path_1.default.join(__dirname, '../data/pricing.json');
// Veri dosyalarını oluştur veya oku
const initializeDataFiles = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.access(dataPath);
    }
    catch (_a) {
        yield fs_1.promises.mkdir(path_1.default.dirname(dataPath), { recursive: true });
        yield fs_1.promises.writeFile(dataPath, '[]');
    }
    try {
        yield fs_1.promises.access(usersPath);
    }
    catch (_b) {
        yield fs_1.promises.mkdir(path_1.default.dirname(usersPath), { recursive: true });
        yield fs_1.promises.writeFile(usersPath, '[]');
    }
    try {
        yield fs_1.promises.access(licensesPath);
    }
    catch (_c) {
        yield fs_1.promises.mkdir(path_1.default.dirname(licensesPath), { recursive: true });
        yield fs_1.promises.writeFile(licensesPath, '[]');
    }
    try {
        yield fs_1.promises.access(pricingPath);
    }
    catch (_d) {
        yield fs_1.promises.mkdir(path_1.default.dirname(pricingPath), { recursive: true });
        const defaultPricing = {
            monthly: 99.99,
            yearly: 1000,
            freeLimit: 50
        };
        yield fs_1.promises.writeFile(pricingPath, JSON.stringify(defaultPricing, null, 2));
    }
});
// Veri okuma fonksiyonları
const readForms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.promises.readFile(dataPath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Formlar okunurken hata:', error);
        return [];
    }
});
const readUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.promises.readFile(usersPath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Kullanıcılar okunurken hata:', error);
        return [];
    }
});
const readLicenses = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.promises.readFile(licensesPath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Lisanslar okunurken hata:', error);
        return [];
    }
});
const readPricing = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.promises.readFile(pricingPath, 'utf-8');
        return JSON.parse(data);
    }
    catch (error) {
        console.error('Fiyat bilgileri okunurken hata:', error);
        return {
            monthly: 99.99,
            yearly: 1000,
            freeLimit: 50
        };
    }
});
const readTemplates = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.promises.readFile('data/templates.json', 'utf8');
        return JSON.parse(data);
    }
    catch (error) {
        return [];
    }
});
// Veri kaydetme fonksiyonları
const saveForms = (forms) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.writeFile(dataPath, JSON.stringify(forms, null, 2));
    }
    catch (error) {
        console.error('Formlar kaydedilirken hata:', error);
        throw error;
    }
});
const saveUsers = (users) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.writeFile(usersPath, JSON.stringify(users, null, 2));
    }
    catch (error) {
        console.error('Kullanıcılar kaydedilirken hata:', error);
        throw error;
    }
});
const saveLicenses = (licenses) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.writeFile(licensesPath, JSON.stringify(licenses, null, 2));
    }
    catch (error) {
        console.error('Lisanslar kaydedilirken hata:', error);
        throw error;
    }
});
const savePricing = (pricing) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.writeFile(pricingPath, JSON.stringify(pricing, null, 2));
    }
    catch (error) {
        console.error('Fiyat bilgileri kaydedilirken hata:', error);
        throw error;
    }
});
const saveTemplates = (templates) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_1.promises.writeFile('data/templates.json', JSON.stringify(templates, null, 2));
});
// Hardware ID oluşturma (basit implementasyon)
const generateHardwareId = () => {
    return crypto_1.default.randomBytes(16).toString('hex');
};
// Lisans anahtarı oluşturma
const generateLicenseKey = () => {
    const part1 = crypto_1.default.randomBytes(2).toString('hex').toUpperCase();
    const part2 = crypto_1.default.randomBytes(2).toString('hex').toUpperCase();
    const part3 = crypto_1.default.randomBytes(2).toString('hex').toUpperCase();
    const part4 = crypto_1.default.randomBytes(2).toString('hex').toUpperCase();
    return `${part1}-${part2}-${part3}-${part4}`;
};
// Lisans durumu hesaplama
const calculateLicenseStatus = (hardwareId) => __awaiter(void 0, void 0, void 0, function* () {
    const forms = yield readForms();
    const licenses = yield readLicenses();
    const users = yield readUsers();
    const user = users.find(u => u.hardwareId === hardwareId);
    const license = licenses.find(l => l.hardwareId === hardwareId && l.isActive);
    const totalRecords = forms.length;
    const maxRecords = 50; // Ücretsiz limit
    if (!license) {
        return {
            isActive: false,
            type: 'free',
            totalRecords,
            maxRecords,
            lastValidation: new Date().toISOString(),
        };
    }
    const now = new Date();
    const expiresAt = license.expiresAt ? new Date(license.expiresAt) : null;
    const remainingDays = expiresAt ? Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : undefined;
    return {
        isActive: license.isActive && (!expiresAt || expiresAt > now),
        type: license.type,
        remainingDays,
        totalRecords,
        maxRecords: Infinity, // Lisanslı kullanımda sınırsız
        lastValidation: license.lastValidation,
        expiresAt: license.expiresAt,
    };
});
// Mevcut form API'leri
app.get('/api/forms', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        res.json(forms);
    }
    catch (error) {
        res.status(500).json({ error: 'Formlar alınırken bir hata oluştu' });
    }
}));
app.get('/api/forms/latest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        const latestForm = forms[forms.length - 1] || null;
        res.json(latestForm);
    }
    catch (error) {
        res.status(500).json({ error: 'Son form alınırken bir hata oluştu' });
    }
}));
app.get('/api/forms/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        const form = forms.find((f) => f.id === parseInt(req.params.id));
        if (form) {
            res.json(form);
        }
        else {
            res.status(404).json({ error: 'Form bulunamadı' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Form alınırken bir hata oluştu' });
    }
}));
app.post('/api/forms', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hardwareId = req.headers['x-hardware-id'];
        if (!hardwareId) {
            return res.status(400).json({ error: 'Hardware ID gerekli' });
        }
        const licenseStatus = yield calculateLicenseStatus(hardwareId);
        // Ücretsiz kullanımda kayıt limiti kontrolü
        if (licenseStatus.type === 'free' && licenseStatus.totalRecords >= licenseStatus.maxRecords) {
            return res.status(403).json({ error: 'Ücretsiz kayıt limiti doldu. Lisans satın alın.' });
        }
        const forms = yield readForms();
        const newForm = Object.assign(Object.assign({}, req.body), { id: Date.now(), createdAt: new Date().toISOString() });
        forms.push(newForm);
        yield saveForms(forms);
        res.status(201).json(newForm);
    }
    catch (error) {
        console.error('Form kaydedilirken hata:', error);
        res.status(500).json({ error: 'Form kaydedilirken bir hata oluştu' });
    }
}));
app.put('/api/forms/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        const index = forms.findIndex((f) => f.id === parseInt(req.params.id));
        if (index !== -1) {
            forms[index] = Object.assign(Object.assign(Object.assign({}, forms[index]), req.body), { updatedAt: new Date().toISOString() });
            yield saveForms(forms);
            res.json(forms[index]);
        }
        else {
            res.status(404).json({ error: 'Form bulunamadı' });
        }
    }
    catch (error) {
        console.error('Form güncellenirken hata:', error);
        res.status(500).json({ error: 'Form güncellenirken bir hata oluştu' });
    }
}));
app.get('/api/forms/nextSerialNumber', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        const lastSerialNumber = forms.reduce((max, form) => {
            return form.seriNo > max ? form.seriNo : max;
        }, 0);
        const nextSerialNumber = lastSerialNumber + 1;
        res.json({ nextSerialNumber });
    }
    catch (error) {
        res.status(500).json({ error: 'Seri numarası alınırken bir hata oluştu' });
    }
}));
// Lisans sistemi API'leri
app.get('/api/license/status', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hardwareId = req.headers['x-hardware-id'];
        if (!hardwareId) {
            return res.status(400).json({ error: 'Hardware ID gerekli' });
        }
        const licenseStatus = yield calculateLicenseStatus(hardwareId);
        res.json(licenseStatus);
    }
    catch (error) {
        res.status(500).json({ error: 'Lisans durumu alınırken bir hata oluştu' });
    }
}));
app.post('/api/license/activate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { licenseKey, hardwareId } = req.body;
        if (!licenseKey || !hardwareId) {
            return res.status(400).json({ error: 'Lisans anahtarı ve Hardware ID gerekli' });
        }
        const licenses = yield readLicenses();
        const license = licenses.find(l => l.key === licenseKey && !l.isUsed);
        if (!license) {
            return res.status(404).json({ error: 'Geçersiz veya kullanılmış lisans anahtarı' });
        }
        // Lisansı aktifleştir
        license.isUsed = true;
        license.hardwareId = hardwareId;
        license.activatedAt = new Date().toISOString();
        license.isActive = true;
        license.lastValidation = new Date().toISOString();
        // Bitiş tarihini hesapla
        const now = new Date();
        if (license.type === 'monthly') {
            license.expiresAt = new Date(now.getTime() + 32 * 24 * 60 * 60 * 1000).toISOString();
        }
        else if (license.type === 'yearly') {
            license.expiresAt = new Date(now.getTime() + 370 * 24 * 60 * 60 * 1000).toISOString();
        }
        // lifetime için expiresAt null kalır
        yield saveLicenses(licenses);
        res.json({ success: true, license });
    }
    catch (error) {
        console.error('Lisans aktivasyonu hatası:', error);
        res.status(500).json({ error: 'Lisans aktivasyonu başarısız' });
    }
}));
app.post('/api/license/validate', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { hardwareId } = req.body;
        if (!hardwareId) {
            return res.status(400).json({ error: 'Hardware ID gerekli' });
        }
        const licenses = yield readLicenses();
        const license = licenses.find(l => l.hardwareId === hardwareId && l.isActive);
        if (!license) {
            return res.json({ isValid: false, message: 'Aktif lisans bulunamadı' });
        }
        // Son doğrulama tarihini güncelle
        license.lastValidation = new Date().toISOString();
        yield saveLicenses(licenses);
        // Süre kontrolü
        const now = new Date();
        const expiresAt = license.expiresAt ? new Date(license.expiresAt) : null;
        if (expiresAt && expiresAt <= now) {
            license.isActive = false;
            yield saveLicenses(licenses);
            return res.json({ isValid: false, message: 'Lisans süresi dolmuş' });
        }
        res.json({ isValid: true, license });
    }
    catch (error) {
        console.error('Lisans doğrulama hatası:', error);
        res.status(500).json({ error: 'Lisans doğrulama başarısız' });
    }
}));
// Kullanıcı API'leri
app.post('/api/users/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, company, email, phone, taxOffice, taxNumber, hardwareId } = req.body;
        if (!name || !company || !email || !hardwareId) {
            return res.status(400).json({ error: 'Ad, firma, email ve Hardware ID zorunludur' });
        }
        const users = yield readUsers();
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'Bu email adresi zaten kayıtlı' });
        }
        const newUser = {
            id: crypto_1.default.randomUUID(),
            name,
            company,
            email,
            phone,
            taxOffice,
            taxNumber,
            registeredAt: new Date().toISOString(),
            hardwareId,
        };
        users.push(newUser);
        yield saveUsers(users);
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error('Kullanıcı kaydı hatası:', error);
        res.status(500).json({ error: 'Kullanıcı kaydı başarısız' });
    }
}));
app.post('/api/users/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, hardwareId } = req.body;
        if (!email || !hardwareId) {
            return res.status(400).json({ error: 'Email ve Hardware ID gerekli' });
        }
        const users = yield readUsers();
        const user = users.find(u => u.email === email && u.hardwareId === hardwareId);
        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Kullanıcı girişi hatası:', error);
        res.status(500).json({ error: 'Kullanıcı girişi başarısız' });
    }
}));
app.get('/api/users/profile', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hardwareId = req.headers['x-hardware-id'];
        if (!hardwareId) {
            return res.status(400).json({ error: 'Hardware ID gerekli' });
        }
        const users = yield readUsers();
        const user = users.find(u => u.hardwareId === hardwareId);
        if (!user) {
            return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        }
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Kullanıcı bilgileri alınırken bir hata oluştu' });
    }
}));
// Admin API'leri
app.post('/api/admin/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (username === 'aknkrds' && password === 'DorukNaz2010**') {
            res.json({ success: true, token: 'admin-token' });
        }
        else {
            res.status(401).json({ error: 'Geçersiz kullanıcı adı veya şifre' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Giriş başarısız' });
    }
}));
app.post('/api/admin/generate-license', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.body;
        if (!['monthly', 'yearly', 'lifetime'].includes(type)) {
            return res.status(400).json({ error: 'Geçersiz lisans türü' });
        }
        const licenses = yield readLicenses();
        const newLicense = {
            key: generateLicenseKey(),
            type,
            hardwareId: '',
            userId: '',
            activatedAt: '',
            isActive: false,
            lastValidation: '',
            isUsed: false,
        };
        licenses.push(newLicense);
        yield saveLicenses(licenses);
        res.json(newLicense);
    }
    catch (error) {
        console.error('Lisans oluşturma hatası:', error);
        res.status(500).json({ error: 'Lisans oluşturma başarısız' });
    }
}));
app.get('/api/admin/licenses', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const licenses = yield readLicenses();
        const users = yield readUsers();
        const licensesWithUsers = licenses.map(license => (Object.assign(Object.assign({}, license), { user: users.find(u => u.id === license.userId) || null })));
        res.json(licensesWithUsers);
    }
    catch (error) {
        res.status(500).json({ error: 'Lisanslar alınırken bir hata oluştu' });
    }
}));
app.get('/api/admin/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield readUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Kullanıcılar alınırken bir hata oluştu' });
    }
}));
app.get('/api/forms/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: 'Arama terimi gerekli' });
        }
        const forms = yield readForms();
        const searchTerm = query.toString().toLowerCase();
        const filteredForms = forms.filter((form) => {
            return (form.seriNo.toString().includes(searchTerm) ||
                form.urunKodu.toLowerCase().includes(searchTerm));
        });
        res.json(filteredForms);
    }
    catch (error) {
        res.status(500).json({ error: 'Arama yapılırken bir hata oluştu' });
    }
}));
// Form açıklama değerlerini getir (autocomplete için)
app.get('/api/forms/descriptions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        const descriptions = {};
        // Tüm maliyet kalemlerini topla
        const maliyetKeys = [
            'kumasTipi', 'aksesuar1', 'aksesuar2', 'aksesuar3',
            'kesimYeri', 'dikimYeri', 'utuPaket', 'yikamaYeri',
            'ekMaliyet1', 'ekMaliyet2', 'isletmeGiderleri', 'kar', 'sevkiyat'
        ];
        // Her maliyet kalemi için açıklama değerlerini topla
        maliyetKeys.forEach(key => {
            const values = new Set();
            forms.forEach(form => {
                if (form.maliyetler && form.maliyetler[key] && form.maliyetler[key].aciklama) {
                    const aciklama = form.maliyetler[key].aciklama.trim();
                    if (aciklama && aciklama.length > 0) {
                        values.add(aciklama);
                    }
                }
            });
            descriptions[key] = Array.from(values).sort();
        });
        res.json(descriptions);
    }
    catch (error) {
        console.error('Açıklama değerleri alınırken hata:', error);
        res.status(500).json({ error: 'Açıklama değerleri alınırken bir hata oluştu' });
    }
}));
app.get('/api/forms/:id/cancel', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        const index = forms.findIndex((f) => f.id === parseInt(req.params.id));
        if (index !== -1) {
            forms[index].iptalDurumu = true;
            forms[index].updatedAt = new Date().toISOString();
            yield saveForms(forms);
            res.json(forms[index]);
        }
        else {
            res.status(404).json({ error: 'Form bulunamadı' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Form iptal edilirken bir hata oluştu' });
    }
}));
app.get('/api/admin/pricing', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pricing = yield readPricing();
        res.json(pricing);
    }
    catch (error) {
        res.status(500).json({ error: 'Fiyat bilgileri alınırken bir hata oluştu' });
    }
}));
app.put('/api/admin/pricing', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { monthly, yearly, freeLimit } = req.body;
        if (typeof monthly !== 'number' || typeof yearly !== 'number' || typeof freeLimit !== 'number') {
            return res.status(400).json({ error: 'Geçersiz fiyat bilgileri' });
        }
        const pricing = { monthly, yearly, freeLimit };
        yield savePricing(pricing);
        res.json(pricing);
    }
    catch (error) {
        console.error('Fiyat güncelleme hatası:', error);
        res.status(500).json({ error: 'Fiyat güncellenirken bir hata oluştu' });
    }
}));
// Form şablonları API'leri
app.get('/api/templates', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templates = yield readTemplates();
        res.json(templates);
    }
    catch (error) {
        res.status(500).json({ error: 'Şablonlar alınırken bir hata oluştu' });
    }
}));
app.post('/api/templates', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templates = yield readTemplates();
        const newTemplate = Object.assign(Object.assign({}, req.body), { id: Date.now(), createdAt: new Date().toISOString(), usageCount: 0 });
        templates.push(newTemplate);
        yield saveTemplates(templates);
        res.status(201).json(newTemplate);
    }
    catch (error) {
        res.status(500).json({ error: 'Şablon kaydedilirken bir hata oluştu' });
    }
}));
app.put('/api/templates/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templates = yield readTemplates();
        const index = templates.findIndex(t => t.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ error: 'Şablon bulunamadı' });
        }
        templates[index] = Object.assign(Object.assign(Object.assign({}, templates[index]), req.body), { id: parseInt(req.params.id) });
        yield saveTemplates(templates);
        res.json(templates[index]);
    }
    catch (error) {
        res.status(500).json({ error: 'Şablon güncellenirken bir hata oluştu' });
    }
}));
app.delete('/api/templates/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templates = yield readTemplates();
        const filteredTemplates = templates.filter(t => t.id !== parseInt(req.params.id));
        if (filteredTemplates.length === templates.length) {
            return res.status(404).json({ error: 'Şablon bulunamadı' });
        }
        yield saveTemplates(filteredTemplates);
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Şablon silinirken bir hata oluştu' });
    }
}));
// Resim yükleme endpoint'leri
app.post('/api/forms/:id/images', upload.fields([
    { name: 'maliyetKalipResmi', maxCount: 1 },
    { name: 'urunResmi1', maxCount: 1 },
    { name: 'urunResmi2', maxCount: 1 }
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formId = parseInt(req.params.id);
        const forms = yield readForms();
        const formIndex = forms.findIndex(f => f.id === formId);
        if (formIndex === -1) {
            return res.status(404).json({ error: 'Form bulunamadı' });
        }
        const files = req.files;
        const uploadedImages = {};
        // Yüklenen resimleri işle
        if (files.maliyetKalipResmi) {
            uploadedImages.maliyetKalipResmi = `/uploads/${files.maliyetKalipResmi[0].filename}`;
        }
        if (files.urunResmi1) {
            uploadedImages.urunResmi1 = `/uploads/${files.urunResmi1[0].filename}`;
        }
        if (files.urunResmi2) {
            uploadedImages.urunResmi2 = `/uploads/${files.urunResmi2[0].filename}`;
        }
        // Form'a resimleri ekle (mevcut form verisini koruyarak)
        const currentForm = forms[formIndex];
        const updatedForm = Object.assign(Object.assign({}, currentForm), { resimler: Object.assign(Object.assign({}, currentForm.resimler), uploadedImages), updatedAt: new Date().toISOString() });
        forms[formIndex] = updatedForm;
        yield saveForms(forms);
        res.json(updatedForm);
    }
    catch (error) {
        console.error('Resim yükleme hatası:', error);
        res.status(500).json({ error: 'Resim yüklenirken bir hata oluştu' });
    }
}));
// Resim silme endpoint'i
app.delete('/api/forms/:id/images/:imageType', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formId = parseInt(req.params.id);
        const imageType = req.params.imageType;
        const forms = yield readForms();
        const formIndex = forms.findIndex(f => f.id === formId);
        if (formIndex === -1) {
            return res.status(404).json({ error: 'Form bulunamadı' });
        }
        if (!forms[formIndex].resimler || !(imageType in forms[formIndex].resimler)) {
            return res.status(404).json({ error: 'Resim bulunamadı' });
        }
        // Eski resim dosyasını sil
        const oldImagePath = forms[formIndex].resimler[imageType];
        if (oldImagePath) {
            try {
                const fullPath = path_1.default.join(__dirname, '..', oldImagePath);
                yield fs_1.promises.unlink(fullPath);
            }
            catch (error) {
                console.warn('Eski resim dosyası silinemedi:', error);
            }
        }
        // Resmi form'dan kaldır (mevcut form verisini koruyarak)
        const currentForm = forms[formIndex];
        const updatedResimler = Object.assign({}, currentForm.resimler);
        delete updatedResimler[imageType];
        const updatedForm = Object.assign(Object.assign({}, currentForm), { resimler: updatedResimler, updatedAt: new Date().toISOString() });
        forms[formIndex] = updatedForm;
        yield saveForms(forms);
        res.json(updatedForm);
    }
    catch (error) {
        console.error('Resim silme hatası:', error);
        res.status(500).json({ error: 'Resim silinirken bir hata oluştu' });
    }
}));
// Rapor endpoint'leri
app.get('/api/reports/summary', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        // Tüm formlar
        const totalForms = forms.length;
        const totalAmount = forms.reduce((sum, form) => sum + form.genelToplam, 0);
        // Durum bazında gruplama
        const statusGroups = forms.reduce((acc, form) => {
            const status = form.siparisDurumu || 'BELİRTİLMEDİ';
            if (!acc[status]) {
                acc[status] = { count: 0, total: 0, forms: [] };
            }
            acc[status].count++;
            acc[status].total += form.genelToplam;
            acc[status].forms.push(form);
            return acc;
        }, {});
        // Para birimi bazında toplamlar
        const currencyTotals = forms.reduce((acc, form) => {
            acc.TL += form.paraBirimiToplam.TL;
            acc.USD += form.paraBirimiToplam.USD;
            acc.EUR += form.paraBirimiToplam.EUR;
            acc.GBP += form.paraBirimiToplam.GBP;
            return acc;
        }, { TL: 0, USD: 0, EUR: 0, GBP: 0 });
        // Aylık istatistikler (son 12 ay)
        const monthlyStats = [];
        const now = new Date();
        for (let i = 11; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthStart = date.toISOString().split('T')[0];
            const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString().split('T')[0];
            const monthForms = forms.filter(form => {
                const formDate = form.teklifTarihi;
                return formDate >= monthStart && formDate <= monthEnd;
            });
            monthlyStats.push({
                month: date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' }),
                count: monthForms.length,
                total: monthForms.reduce((sum, form) => sum + form.genelToplam, 0),
                year: date.getFullYear(),
                monthNumber: date.getMonth() + 1
            });
        }
        // En çok kullanılan ürün kodları
        const productCodeStats = forms.reduce((acc, form) => {
            const code = form.urunKodu;
            if (!acc[code]) {
                acc[code] = { count: 0, total: 0 };
            }
            acc[code].count++;
            acc[code].total += form.genelToplam;
            return acc;
        }, {});
        const topProductCodes = Object.entries(productCodeStats)
            .sort(([, a], [, b]) => b.count - a.count)
            .slice(0, 10)
            .map(([code, stats]) => (Object.assign({ code }, stats)));
        const report = {
            summary: {
                totalForms,
                totalAmount,
                currencyTotals
            },
            statusBreakdown: statusGroups,
            monthlyStats,
            topProductCodes,
            generatedAt: new Date().toISOString()
        };
        res.json(report);
    }
    catch (error) {
        console.error('Rapor oluşturma hatası:', error);
        res.status(500).json({ error: 'Rapor oluşturulurken bir hata oluştu' });
    }
}));
app.get('/api/reports/detailed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        const { startDate, endDate, status } = req.query;
        let filteredForms = forms;
        // Tarih filtresi
        if (startDate && endDate) {
            filteredForms = filteredForms.filter(form => {
                const formDate = form.teklifTarihi;
                return formDate >= startDate && formDate <= endDate;
            });
        }
        // Durum filtresi
        if (status && status !== 'TÜMÜ') {
            filteredForms = filteredForms.filter(form => form.siparisDurumu === status);
        }
        // Detaylı rapor
        const detailedReport = {
            filters: { startDate, endDate, status },
            totalCount: filteredForms.length,
            totalAmount: filteredForms.reduce((sum, form) => sum + form.genelToplam, 0),
            forms: filteredForms.map(form => ({
                id: form.id,
                seriNo: form.seriNo,
                urunKodu: form.urunKodu,
                teklifTarihi: form.teklifTarihi,
                siparisDurumu: form.siparisDurumu,
                genelToplam: form.genelToplam,
                paraBirimiToplam: form.paraBirimiToplam,
                iptalDurumu: form.iptalDurumu,
                createdAt: form.createdAt
            })),
            generatedAt: new Date().toISOString()
        };
        res.json(detailedReport);
    }
    catch (error) {
        console.error('Detaylı rapor oluşturma hatası:', error);
        res.status(500).json({ error: 'Detaylı rapor oluşturulurken bir hata oluştu' });
    }
}));
// Server'ı başlat
initializeDataFiles().then(() => {
    app.listen(port, () => {
        console.log(`Server http://localhost:${port} adresinde çalışıyor`);
    });
});
