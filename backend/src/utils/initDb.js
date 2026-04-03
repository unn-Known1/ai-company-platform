import { initDatabase } from './database.js';

export const initDb = async () => {
  try {
    await initDatabase();
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
};
