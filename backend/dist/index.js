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
const app = (0, express_1.default)();
const port = 3001;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Data dosyasının yolu
const dataPath = path_1.default.join(__dirname, '../data/forms.json');
// Veri dosyasını oluştur veya oku
const initializeDataFile = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.access(dataPath);
    }
    catch (_a) {
        yield fs_1.promises.mkdir(path_1.default.dirname(dataPath), { recursive: true });
        yield fs_1.promises.writeFile(dataPath, '[]');
    }
});
// Formları oku
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
// Formları kaydet
const saveForms = (forms) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield fs_1.promises.writeFile(dataPath, JSON.stringify(forms, null, 2));
    }
    catch (error) {
        console.error('Formlar kaydedilirken hata:', error);
        throw error;
    }
});
// Routes
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
        const form = forms.find(f => f.id === parseInt(req.params.id));
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
        const forms = yield readForms();
        const newForm = Object.assign(Object.assign({}, req.body), { id: Date.now(), createdAt: new Date().toISOString() });
        forms.push(newForm);
        yield saveForms(forms);
        res.status(201).json(newForm);
    }
    catch (error) {
        res.status(500).json({ error: 'Form kaydedilirken bir hata oluştu' });
    }
}));
app.put('/api/forms/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        const index = forms.findIndex(f => f.id === parseInt(req.params.id));
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
        res.status(500).json({ error: 'Form güncellenirken bir hata oluştu' });
    }
}));
app.get('/api/forms/nextSerialNumber', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const forms = yield readForms();
        const lastForm = forms[forms.length - 1];
        const nextSerialNumber = lastForm ? lastForm.seriNo + 1 : 1;
        res.json({ nextSerialNumber });
    }
    catch (error) {
        res.status(500).json({ error: 'Seri numarası alınırken bir hata oluştu' });
    }
}));
// Server'ı başlat
initializeDataFile().then(() => {
    app.listen(port, () => {
        console.log(`Server http://localhost:${port} adresinde çalışıyor`);
    });
});
