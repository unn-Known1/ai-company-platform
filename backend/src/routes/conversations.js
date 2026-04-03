import express from 'express';
import { runQuery } from '../utils/database.js';

const router = express.Router();

// Get conversations
router.get('/', async (req, res, next) => {
  try {
    const companyId = req.query.companyId || 1;
    const conversations = await runQuery(
      'SELECT * FROM conversations WHERE company_id = ? ORDER BY created_at DESC',
      [companyId]
    );
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

// Create conversation
router.post('/', async (req, res, next) => {
  try {
    const { companyId, title, participants } = req.body;
    const result = await runQuery(
      'INSERT INTO conversations (company_id, title, participants_json) VALUES (?, ?, ?)',
      [companyId || 1, title, JSON.stringify(participants || [])]
    );
    const conversations = await runQuery('SELECT * FROM conversations WHERE id = ?', [result.id]);
    res.status(201).json(conversations[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
