import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeDatabase, getDatabase } from './database';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Initialize database
initializeDatabase().then(() => {
    console.log('Database initialized');
}).catch(err => {
    console.error('Database initialization error:', err);
});

// Get latest form
app.get('/api/forms/latest', async (req, res) => {
    try {
        const db = getDatabase();
        const form = await db.get('SELECT * FROM forms ORDER BY id DESC LIMIT 1');
        res.json(form || null);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get next serial number
app.get('/api/forms/nextSerialNumber', async (req, res) => {
    try {
        const db = getDatabase();
        const result = await db.get('SELECT MAX(seriNo) as maxSeriNo FROM forms');
        const nextSerialNumber = (result?.maxSeriNo || 0) + 1;
        res.json({ nextSerialNumber });
    } catch (error) {
        console.error('Seri no alınırken hata:', error);
        res.status(500).json({ 
            error: 'Seri numarası alınamadı', 
            details: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
    }
});

// Create new form
app.post('/api/forms', async (req, res) => {
    try {
        const db = getDatabase();
        console.log('Yeni form oluşturma isteği alındı');
        console.log('Gelen veri:', req.body);

        // Önce yeni seri numarasını al
        const result = await db.get('SELECT MAX(seriNo) as maxSeriNo FROM forms');
        const nextSerialNumber = (result?.maxSeriNo || 0) + 1;
        console.log('Yeni seri numarası:', nextSerialNumber);

        // Form verilerini hazırla
        const formData = {
            seriNo: nextSerialNumber,
            urunKodu: req.body.urunKodu || '',
            teklifTarihi: req.body.teklifTarihi || new Date().toISOString().split('T')[0],
            terminTarihi: req.body.terminTarihi || '',
            kumasTipi: JSON.stringify(req.body.maliyetler?.kumasTipi || {}),
            aksesuar1: JSON.stringify(req.body.maliyetler?.aksesuar1 || {}),
            aksesuar2: JSON.stringify(req.body.maliyetler?.aksesuar2 || {}),
            aksesuar3: JSON.stringify(req.body.maliyetler?.aksesuar3 || {}),
            kesimYeri: JSON.stringify(req.body.maliyetler?.kesimYeri || {}),
            dikimYeri: JSON.stringify(req.body.maliyetler?.dikimYeri || {}),
            utuPaket: JSON.stringify(req.body.maliyetler?.utuPaket || {}),
            yikamaYeri: JSON.stringify(req.body.maliyetler?.yikamaYeri || {}),
            ekMaliyet1: JSON.stringify(req.body.maliyetler?.ekMaliyet1 || {}),
            ekMaliyet2: JSON.stringify(req.body.maliyetler?.ekMaliyet2 || {}),
            isletmeGiderleri: JSON.stringify(req.body.maliyetler?.isletmeGiderleri || {}),
            kar: JSON.stringify(req.body.maliyetler?.kar || {}),
            sevkiyat: JSON.stringify(req.body.maliyetler?.sevkiyat || {}),
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
        const insertResult = await db.run(`
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
        const savedForm = await db.get('SELECT * FROM forms WHERE id = ?', insertResult.lastID);
        
        // Maliyetler objelerini parse et
        const responseForm = {
            ...savedForm,
            maliyetler: {
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
            },
            durum_tarihleri: JSON.parse(savedForm.durum_tarihleri || '{}')
        };

        console.log('Form başarıyla kaydedildi:', responseForm);
        res.json(responseForm);
    } catch (error) {
        console.error('Form kaydedilirken hata:', error);
        res.status(500).json({ 
            error: 'Form kaydedilirken bir hata oluştu', 
            details: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
    }
});

// Search forms
app.get('/api/forms/search', async (req, res) => {
    try {
        const { query } = req.query;
        const db = getDatabase();
        const forms = await db.all(`
            SELECT * FROM forms 
            WHERE seriNo LIKE ? OR urunKodu LIKE ?
            ORDER BY id DESC
        `, [`%${query}%`, `%${query}%`]);
        res.json(forms);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all forms
app.get('/api/forms', async (req, res) => {
    try {
        const db = getDatabase();
        const forms = await db.all('SELECT * FROM forms ORDER BY id DESC');
        res.json(forms);
    } catch (error) {
        console.error('Formları getirirken hata:', error);
        res.status(500).json({ 
            error: 'Formlar getirilirken bir hata oluştu', 
            details: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
    }
});

// Get single form
app.get('/api/forms/:id', async (req, res) => {
    try {
        const db = getDatabase();
        const form = await db.get('SELECT * FROM forms WHERE id = ?', req.params.id);
        
        if (!form) {
            return res.status(404).json({ error: 'Form bulunamadı' });
        }

        res.json(form);
    } catch (error) {
        console.error('Form getirirken hata:', error);
        res.status(500).json({ 
            error: 'Form getirilirken bir hata oluştu', 
            details: error instanceof Error ? error.message : 'Bilinmeyen hata'
        });
    }
});

// Update form
app.put('/api/forms/:id', async (req, res) => {
    try {
        const db = getDatabase();
        await db.run(`
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
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Cancel form
app.put('/api/forms/:id/cancel', async (req, res) => {
    try {
        const db = getDatabase();
        await db.run('UPDATE forms SET iptalDurumu = 1 WHERE id = ?', req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 