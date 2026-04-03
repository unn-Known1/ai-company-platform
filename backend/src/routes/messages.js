import express from 'express';
import { runQuery } from '../utils/database.js';

const router = express.Router();

// Get messages for a conversation
router.get('/:conversationId', async (req, res, next) => {
  try {
    const messages = await runQuery(
      'SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC',
      [req.params.conversationId]
    );
    res.json(messages);
  } catch (error) {
    next(error);
  }
});

// Create message
router.post('/', async (req, res, next) => {
  try {
    const { conversationId, senderAgentId, content, messageType } = req.body;
    const result = await runQuery(
      'INSERT INTO messages (conversation_id, sender_agent_id, content, message_type) VALUES (?, ?, ?, ?)',
      [conversationId, senderAgentId || null, content, messageType || 'text']
    );
    const messages = await runQuery('SELECT * FROM messages WHERE id = ?', [result.id]);
    res.status(201).json(messages[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
