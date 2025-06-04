import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import path from 'path';
import fs from 'fs';

let db: Database;

export async function initializeDatabase() {
    console.log('Veritabanı başlatılıyor...');
    
    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
        console.log('Data dizini oluşturuluyor:', dataDir);
        fs.mkdirSync(dataDir, { recursive: true });
    }

    const dbPath = path.join(dataDir, 'maliyet.db');
    console.log('Veritabanı dosya yolu:', dbPath);

    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    console.log('Veritabanı bağlantısı kuruldu');

    // Tabloyu oluştur
    await createTables(db);

    // Test sorgusu çalıştır
    const testQuery = await db.get('SELECT COUNT(*) as count FROM forms');
    console.log('Mevcut form sayısı:', testQuery.count);

    return db;
}

const createTables = async (db: Database) => {
    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS forms (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                seriNo INTEGER UNIQUE NOT NULL,
                urunKodu TEXT,
                teklifTarihi TEXT,
                terminTarihi TEXT,
                kumasTipi TEXT,
                aksesuar1 TEXT,
                aksesuar2 TEXT,
                aksesuar3 TEXT,
                kesimYeri TEXT,
                dikimYeri TEXT,
                utuPaket TEXT,
                yikamaYeri TEXT,
                ekMaliyet1 TEXT,
                ekMaliyet2 TEXT,
                isletmeGiderleri TEXT,
                kar TEXT,
                sevkiyat TEXT,
                notlar TEXT,
                toplam REAL,
                kdvOrani REAL,
                genelToplam REAL,
                iptalDurumu INTEGER DEFAULT 0,
                ekstraNotlar TEXT,
                siparisDurumu TEXT,
                durum_tarihleri TEXT,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Veritabanı tabloları başarıyla oluşturuldu');
    } catch (error) {
        console.error('Tablo oluşturma hatası:', error);
        throw error;
    }
};

export function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
} 