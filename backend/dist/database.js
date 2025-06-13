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
exports.initializeDatabase = initializeDatabase;
exports.getDatabase = getDatabase;
const sqlite3_1 = __importDefault(require("sqlite3"));
const sqlite_1 = require("sqlite");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let db;
function initializeDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Veritabanı başlatılıyor...');
        // Ensure data directory exists
        const dataDir = path_1.default.join(__dirname, '../data');
        if (!fs_1.default.existsSync(dataDir)) {
            console.log('Data dizini oluşturuluyor:', dataDir);
            fs_1.default.mkdirSync(dataDir, { recursive: true });
        }
        const dbPath = path_1.default.join(dataDir, 'maliyet.db');
        console.log('Veritabanı dosya yolu:', dbPath);
        db = yield (0, sqlite_1.open)({
            filename: dbPath,
            driver: sqlite3_1.default.Database
        });
        console.log('Veritabanı bağlantısı kuruldu');
        // Tabloyu oluştur
        yield createTables(db);
        // Test sorgusu çalıştır
        const testQuery = yield db.get('SELECT COUNT(*) as count FROM forms');
        console.log('Mevcut form sayısı:', testQuery.count);
        return db;
    });
}
const createTables = (db) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.exec(`
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
    }
    catch (error) {
        console.error('Tablo oluşturma hatası:', error);
        throw error;
    }
});
function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
}
