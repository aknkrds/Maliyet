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
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create new form
app.post('/api/forms', async (req, res) => {
    try {
        const db = getDatabase();
        const result = await db.run(`
            INSERT INTO forms (
                seriNo, urunKodu, teklifTarihi, terminTarihi, kumasTipi,
                aksesuar1, aksesuar2, aksesuar3, kesimYeri, dikimYeri,
                utuPaket, yikamaYeri, ekMaliyet1, ekMaliyet2,
                isletmeGiderleri, kar, sevkiyat, notlar, toplam,
                kdvOrani, genelToplam, iptalDurumu, ekstraNotlar
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, Object.values(req.body));
        
        res.json({ id: result.lastID });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
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

// Get form by ID
app.get('/api/forms/:id', async (req, res) => {
    try {
        const db = getDatabase();
        const form = await db.get('SELECT * FROM forms WHERE id = ?', req.params.id);
        if (form) {
            res.json(form);
        } else {
            res.status(404).json({ error: 'Form not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
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