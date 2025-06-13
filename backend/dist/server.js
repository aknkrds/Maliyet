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
const body_parser_1 = __importDefault(require("body-parser"));
const database_1 = require("./database");
const app = (0, express_1.default)();
const port = 3002;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Initialize database
(0, database_1.initializeDatabase)().then(() => {
    console.log('Database initialized');
}).catch(err => {
    console.error('Database initialization error:', err);
});
// Get latest form
app.get('/api/forms/latest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDatabase)();
        const form = yield db.get('SELECT * FROM forms ORDER BY id DESC LIMIT 1');
        res.json(form || null);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get next serial number
app.get('/api/forms/nextSerialNumber', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDatabase)();
        const result = yield db.get('SELECT MAX(seriNo) as maxSeriNo FROM forms');
        const nextSerialNumber = ((result === null || result === void 0 ? void 0 : result.maxSeriNo) || 0) + 1;
        res.json({ nextSerialNumber });
    }
    catch (error) {
        console.error('Seri no alınırken hata:', error);
        res.status(500).json({
            error: 'Seri numarası alınamadı',
            details: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
    }
}));
// Create new form
app.post('/api/forms', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    try {
        const db = (0, database_1.getDatabase)();
        console.log('Yeni form oluşturma isteği alındı');
        console.log('Gelen veri:', req.body);
        // Önce yeni seri numarasını al
        const result = yield db.get('SELECT MAX(seriNo) as maxSeriNo FROM forms');
        const nextSerialNumber = ((result === null || result === void 0 ? void 0 : result.maxSeriNo) || 0) + 1;
        console.log('Yeni seri numarası:', nextSerialNumber);
        // Form verilerini hazırla
        const formData = {
            seriNo: nextSerialNumber,
            urunKodu: req.body.urunKodu || '',
            teklifTarihi: req.body.teklifTarihi || new Date().toISOString().split('T')[0],
            terminTarihi: req.body.terminTarihi || '',
            kumasTipi: JSON.stringify(((_a = req.body.maliyetler) === null || _a === void 0 ? void 0 : _a.kumasTipi) || {}),
            aksesuar1: JSON.stringify(((_b = req.body.maliyetler) === null || _b === void 0 ? void 0 : _b.aksesuar1) || {}),
            aksesuar2: JSON.stringify(((_c = req.body.maliyetler) === null || _c === void 0 ? void 0 : _c.aksesuar2) || {}),
            aksesuar3: JSON.stringify(((_d = req.body.maliyetler) === null || _d === void 0 ? void 0 : _d.aksesuar3) || {}),
            kesimYeri: JSON.stringify(((_e = req.body.maliyetler) === null || _e === void 0 ? void 0 : _e.kesimYeri) || {}),
            dikimYeri: JSON.stringify(((_f = req.body.maliyetler) === null || _f === void 0 ? void 0 : _f.dikimYeri) || {}),
            utuPaket: JSON.stringify(((_g = req.body.maliyetler) === null || _g === void 0 ? void 0 : _g.utuPaket) || {}),
            yikamaYeri: JSON.stringify(((_h = req.body.maliyetler) === null || _h === void 0 ? void 0 : _h.yikamaYeri) || {}),
            ekMaliyet1: JSON.stringify(((_j = req.body.maliyetler) === null || _j === void 0 ? void 0 : _j.ekMaliyet1) || {}),
            ekMaliyet2: JSON.stringify(((_k = req.body.maliyetler) === null || _k === void 0 ? void 0 : _k.ekMaliyet2) || {}),
            isletmeGiderleri: JSON.stringify(((_l = req.body.maliyetler) === null || _l === void 0 ? void 0 : _l.isletmeGiderleri) || {}),
            kar: JSON.stringify(((_m = req.body.maliyetler) === null || _m === void 0 ? void 0 : _m.kar) || {}),
            sevkiyat: JSON.stringify(((_o = req.body.maliyetler) === null || _o === void 0 ? void 0 : _o.sevkiyat) || {}),
            notlar: req.body.notlar || '',
            toplam: req.body.toplam || 0,
            kdvOrani: req.body.kdvOrani || 0,
            genelToplam: req.body.genelToplam || 0,
            iptalDurumu: req.body.iptalDurumu || 0,
            ekstraNotlar: req.body.ekstraNotlar || '',
            siparisDurumu: req.body.siparisDurumu || null,
            durum_tarihleri: JSON.stringify(req.body.durum_tarihleri || {})
        };
        console.log('Kaydedilecek form verisi:', formData);
        // Formu kaydet
        const insertResult = yield db.run(`
            INSERT INTO forms (
                seriNo, urunKodu, teklifTarihi, terminTarihi,
                kumasTipi, aksesuar1, aksesuar2, aksesuar3,
                kesimYeri, dikimYeri, utuPaket, yikamaYeri,
                ekMaliyet1, ekMaliyet2, isletmeGiderleri,
                kar, sevkiyat, notlar, toplam, kdvOrani,
                genelToplam, iptalDurumu, ekstraNotlar,
                siparisDurumu, durum_tarihleri
            ) VALUES (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        `, [
            formData.seriNo,
            formData.urunKodu,
            formData.teklifTarihi,
            formData.terminTarihi,
            formData.kumasTipi,
            formData.aksesuar1,
            formData.aksesuar2,
            formData.aksesuar3,
            formData.kesimYeri,
            formData.dikimYeri,
            formData.utuPaket,
            formData.yikamaYeri,
            formData.ekMaliyet1,
            formData.ekMaliyet2,
            formData.isletmeGiderleri,
            formData.kar,
            formData.sevkiyat,
            formData.notlar,
            formData.toplam,
            formData.kdvOrani,
            formData.genelToplam,
            formData.iptalDurumu,
            formData.ekstraNotlar,
            formData.siparisDurumu,
            formData.durum_tarihleri
        ]);
        // Kaydedilen formu geri al
        const savedForm = yield db.get('SELECT * FROM forms WHERE id = ?', insertResult.lastID);
        // Maliyetler objelerini parse et
        const responseForm = Object.assign(Object.assign({}, savedForm), { maliyetler: {
                kumasTipi: JSON.parse(savedForm.kumasTipi || '{}'),
                aksesuar1: JSON.parse(savedForm.aksesuar1 || '{}'),
                aksesuar2: JSON.parse(savedForm.aksesuar2 || '{}'),
                aksesuar3: JSON.parse(savedForm.aksesuar3 || '{}'),
                kesimYeri: JSON.parse(savedForm.kesimYeri || '{}'),
                dikimYeri: JSON.parse(savedForm.dikimYeri || '{}'),
                utuPaket: JSON.parse(savedForm.utuPaket || '{}'),
                yikamaYeri: JSON.parse(savedForm.yikamaYeri || '{}'),
                ekMaliyet1: JSON.parse(savedForm.ekMaliyet1 || '{}'),
                ekMaliyet2: JSON.parse(savedForm.ekMaliyet2 || '{}'),
                isletmeGiderleri: JSON.parse(savedForm.isletmeGiderleri || '{}'),
                kar: JSON.parse(savedForm.kar || '{}'),
                sevkiyat: JSON.parse(savedForm.sevkiyat || '{}')
            }, durum_tarihleri: JSON.parse(savedForm.durum_tarihleri || '{}') });
        console.log('Form başarıyla kaydedildi:', responseForm);
        res.json(responseForm);
    }
    catch (error) {
        console.error('Form kaydedilirken hata:', error);
        res.status(500).json({
            error: 'Form kaydedilirken bir hata oluştu',
            details: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
    }
}));
// Search forms
app.get('/api/forms/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query } = req.query;
        const db = (0, database_1.getDatabase)();
        const forms = yield db.all(`
            SELECT * FROM forms 
            WHERE seriNo LIKE ? OR urunKodu LIKE ?
            ORDER BY id DESC
        `, [`%${query}%`, `%${query}%`]);
        res.json(forms);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Get all forms
app.get('/api/forms', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDatabase)();
        const forms = yield db.all('SELECT * FROM forms ORDER BY id DESC');
        res.json(forms);
    }
    catch (error) {
        console.error('Formları getirirken hata:', error);
        res.status(500).json({
            error: 'Formlar getirilirken bir hata oluştu',
            details: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
    }
}));
// Get single form
app.get('/api/forms/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDatabase)();
        const form = yield db.get('SELECT * FROM forms WHERE id = ?', req.params.id);
        if (!form) {
            return res.status(404).json({ error: 'Form bulunamadı' });
        }
        res.json(form);
    }
    catch (error) {
        console.error('Form getirirken hata:', error);
        res.status(500).json({
            error: 'Form getirilirken bir hata oluştu',
            details: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
    }
}));
// Update form
app.put('/api/forms/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDatabase)();
        yield db.run(`
            UPDATE forms SET
                urunKodu = ?, teklifTarihi = ?, terminTarihi = ?, kumasTipi = ?,
                aksesuar1 = ?, aksesuar2 = ?, aksesuar3 = ?, kesimYeri = ?,
                dikimYeri = ?, utuPaket = ?, yikamaYeri = ?, ekMaliyet1 = ?,
                ekMaliyet2 = ?, isletmeGiderleri = ?, kar = ?, sevkiyat = ?,
                notlar = ?, toplam = ?, kdvOrani = ?, genelToplam = ?,
                iptalDurumu = ?, ekstraNotlar = ?
            WHERE id = ?
        `, [...Object.values(req.body), req.params.id]);
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Cancel form
app.put('/api/forms/:id/cancel', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDatabase)();
        yield db.run('UPDATE forms SET iptalDurumu = 1 WHERE id = ?', req.params.id);
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
