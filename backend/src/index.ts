import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
const port = 3002;

// Middleware
app.use(cors());
app.use(express.json());

// Form tipi tanımı
interface FormData {
  id?: number;
  seriNo: number;
  urunKodu: string;
  teklifTarihi: string;
  terminTarihi: string;
  maliyetler: {
    [key: string]: {
      aciklama: string;
      birim?: string;
      birimTipi?: string;
      fiyat: number;
      paraBirimi: string;
    };
  };
  notlar: string;
  toplam: number;
  kdvOrani: number;
  genelToplam: number;
  iptalDurumu: boolean;
  ekstraNotlar: string;
  paraBirimiToplam: {
    TL: number;
    USD: number;
    EUR: number;
    GBP: number;
  };
  siparisDurumu: string | null;
  durum_tarihleri: {
    teklif_tarihi?: string;
    onay_tarihi?: string;
    red_tarihi?: string;
    uretim_tarihi?: string;
    teslim_tarihi?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Data dosyasının yolu
const dataPath = path.join(__dirname, '../data/forms.json');

// Veri dosyasını oluştur veya oku
const initializeDataFile = async () => {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, '[]');
  }
};

// Formları oku
const readForms = async (): Promise<FormData[]> => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Formlar okunurken hata:', error);
    return [];
  }
};

// Formları kaydet
const saveForms = async (forms: FormData[]): Promise<void> => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(forms, null, 2));
  } catch (error) {
    console.error('Formlar kaydedilirken hata:', error);
    throw error;
  }
};

// Routes
app.get('/api/forms', async (req, res) => {
  try {
    const forms = await readForms();
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: 'Formlar alınırken bir hata oluştu' });
  }
});

app.get('/api/forms/latest', async (req, res) => {
  try {
    const forms = await readForms();
    const latestForm = forms[forms.length - 1] || null;
    res.json(latestForm);
  } catch (error) {
    res.status(500).json({ error: 'Son form alınırken bir hata oluştu' });
  }
});

app.get('/api/forms/:id', async (req, res) => {
  try {
    const forms = await readForms();
    const form = forms.find((f: FormData) => f.id === parseInt(req.params.id));
    if (form) {
      res.json(form);
    } else {
      res.status(404).json({ error: 'Form bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Form alınırken bir hata oluştu' });
  }
});

app.post('/api/forms', async (req, res) => {
  try {
    const forms = await readForms();
    const newForm: FormData = {
      ...req.body,
      id: Date.now(),
      createdAt: new Date().toISOString()
    };
    forms.push(newForm);
    await saveForms(forms);
    res.status(201).json(newForm);
  } catch (error) {
    console.error('Form kaydedilirken hata:', error);
    res.status(500).json({ error: 'Form kaydedilirken bir hata oluştu' });
  }
});

app.put('/api/forms/:id', async (req, res) => {
  try {
    const forms = await readForms();
    const index = forms.findIndex((f: FormData) => f.id === parseInt(req.params.id));
    if (index !== -1) {
      forms[index] = {
        ...forms[index],
        ...req.body,
        updatedAt: new Date().toISOString()
      };
      await saveForms(forms);
      res.json(forms[index]);
    } else {
      res.status(404).json({ error: 'Form bulunamadı' });
    }
  } catch (error) {
    console.error('Form güncellenirken hata:', error);
    res.status(500).json({ error: 'Form güncellenirken bir hata oluştu' });
  }
});

app.get('/api/forms/nextSerialNumber', async (req, res) => {
  try {
    const forms = await readForms();
    // En son seri numarasını bul
    const lastSerialNumber = forms.reduce((max, form) => {
      return form.seriNo > max ? form.seriNo : max;
    }, 0);
    const nextSerialNumber = lastSerialNumber + 1;
    res.json({ nextSerialNumber });
  } catch (error) {
    res.status(500).json({ error: 'Seri numarası alınırken bir hata oluştu' });
  }
});

// Server'ı başlat
initializeDataFile().then(() => {
  app.listen(port, () => {
    console.log(`Server http://localhost:${port} adresinde çalışıyor`);
  });
}); 