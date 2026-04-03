import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = process.env.DB_PATH || path.join(__dirname, '../../database/ai_company.db');

// Ensure database directory exists
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

let db;

export const initDatabase = async () => {
  db = new Database(dbPath);
  db.pragma('journal_mode = WAL');
  
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      company_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      industry TEXT,
      employee_count INTEGER,
      website TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS providers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      api_base_url TEXT,
      default_model TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS agents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      provider_id INTEGER,
      provider_model TEXT,
      api_key_encrypted TEXT,
      system_prompt TEXT,
      temperature REAL DEFAULT 0.7,
      max_tokens INTEGER DEFAULT 2000,
      cost_per_token REAL DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      capabilities_json TEXT DEFAULT '[]',
      metadata_json TEXT DEFAULT '{}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS missions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      progress INTEGER DEFAULT 0,
      completed INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS tickets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'open',
      priority TEXT DEFAULT 'medium',
      category TEXT,
      assignee_agent_id INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS budgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id INTEGER NOT NULL,
      company_id INTEGER NOT NULL,
      month_year TEXT NOT NULL,
      total_budget REAL NOT NULL,
      spent_amount REAL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS cost_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id INTEGER NOT NULL,
      company_id INTEGER NOT NULL,
      amount REAL NOT NULL,
      tokens_used INTEGER DEFAULT 0,
      cost_incurred REAL DEFAULT 0,
      transaction_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      description TEXT
    );
    
    CREATE TABLE IF NOT EXISTS org_nodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL,
      parent_id INTEGER,
      position INTEGER DEFAULT 0,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      email TEXT,
      department TEXT,
      metadata_json TEXT DEFAULT '{}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      participants_json TEXT DEFAULT '[]',
      metadata_json TEXT DEFAULT '{}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id INTEGER NOT NULL,
      sender_agent_id INTEGER,
      content TEXT NOT NULL,
      message_type TEXT DEFAULT 'text',
      tool_call_id TEXT,
      tool_name TEXT,
      parameters_json TEXT,
      result_json TEXT,
      metadata_json TEXT DEFAULT '{}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS agent_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id INTEGER NOT NULL,
      company_id INTEGER NOT NULL,
      ticket_id INTEGER,
      action TEXT NOT NULL,
      details_json TEXT DEFAULT '{}',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE IF NOT EXISTS tool_calls (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_id INTEGER NOT NULL,
      ticket_id INTEGER,
      tool_name TEXT NOT NULL,
      input_json TEXT DEFAULT '{}',
      result_json TEXT,
      status TEXT DEFAULT 'pending',
      error TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
  
  // Seed default data
  const companyCount = db.prepare('SELECT COUNT(*) as count FROM companies').get();
  if (companyCount.count === 0) {
    db.prepare('INSERT INTO companies (name, industry) VALUES (?, ?)').run('Demo Company', 'Technology');
    db.prepare('INSERT INTO companies (name, industry) VALUES (?, ?)').run('Acme Corp', 'Finance');
  }
  
  const providerCount = db.prepare('SELECT COUNT(*) as count FROM providers').get();
  if (providerCount.count === 0) {
    db.prepare('INSERT INTO providers (name, api_base_url, default_model) VALUES (?, ?, ?)').run('Claude', 'https://api.anthropic.com/v1', 'claude-3-opus-20240229');
    db.prepare('INSERT INTO providers (name, api_base_url, default_model) VALUES (?, ?, ?)').run('OpenAI', 'https://api.openai.com/v1', 'gpt-4-turbo-preview');
    db.prepare('INSERT INTO providers (name, api_base_url, default_model) VALUES (?, ?, ?)').run('Custom', '', '');
  }
  
  console.log('Database initialized successfully');
  return db;
};

export const runQuery = (sql, params = []) => {
  try {
    const stmt = db.prepare(sql);
    if (sql.trim().toUpperCase().startsWith('SELECT')) {
      return params.length > 0 ? stmt.all(...params) : stmt.all();
    } else {
      const result = stmt.run(...params);
      return { id: result.lastInsertRowid, affectedRows: result.changes };
    }
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};
