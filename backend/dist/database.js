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
        // Ensure data directory exists
        const dataDir = path_1.default.join(__dirname, '../data');
        if (!fs_1.default.existsSync(dataDir)) {
            fs_1.default.mkdirSync(dataDir, { recursive: true });
        }
        db = yield (0, sqlite_1.open)({
            filename: path_1.default.join(dataDir, 'maliyet.db'),
            driver: sqlite3_1.default.Database
        });
        yield db.exec(`
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
    });
}
function getDatabase() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
}
