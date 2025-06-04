import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import path from 'path';
import fs from 'fs';

let db: Database;

export async function initializeDatabase() {
    // Ensure data directory exists
    const dataDir = path.join(__dirname, '../data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    db = await open({
        filename: path.join(dataDir, 'maliyet.db'),
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS forms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            seriNo INTEGER UNIQUE,
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
            iptalDurumu BOOLEAN DEFAULT 0,
            ekstraNotlar TEXT,
            createdAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    return db;
}

export function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
} 