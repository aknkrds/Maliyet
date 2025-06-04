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
const port = 3001;
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
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// Create new form
app.post('/api/forms', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDatabase)();
        const result = yield db.run(`
            INSERT INTO forms (
                seriNo, urunKodu, teklifTarihi, terminTarihi, kumasTipi,
                aksesuar1, aksesuar2, aksesuar3, kesimYeri, dikimYeri,
                utuPaket, yikamaYeri, ekMaliyet1, ekMaliyet2,
                isletmeGiderleri, kar, sevkiyat, notlar, toplam,
                kdvOrani, genelToplam, iptalDurumu, ekstraNotlar
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, Object.values(req.body));
        res.json({ id: result.lastID });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
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
// Get form by ID
app.get('/api/forms/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = (0, database_1.getDatabase)();
        const form = yield db.get('SELECT * FROM forms WHERE id = ?', req.params.id);
        if (form) {
            res.json(form);
        }
        else {
            res.status(404).json({ error: 'Form not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
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
