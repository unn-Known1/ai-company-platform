import express from 'express';
import { runQuery } from '../utils/database.js';

const router = express.Router();

// Get cost transactions
router.get('/', async (req, res, next) => {
  try {
    const companyId = req.query.companyId || 1;
    const costs = await runQuery(
      `SELECT c.*, a.name as agent_name 
       FROM cost_transactions c 
       LEFT JOIN agents a ON c.agent_id = a.id 
       WHERE c.company_id = ? 
       ORDER BY c.transaction_date DESC`,
      [companyId]
    );
    res.json(costs);
  } catch (error) {
    next(error);
  }
});

// Create cost transaction
router.post('/', async (req, res, next) => {
  try {
    const { agentId, companyId, amount, tokensUsed, costIncurred, description } = req.body;
    const result = await runQuery(
      'INSERT INTO cost_transactions (agent_id, company_id, amount, tokens_used, cost_incurred, description) VALUES (?, ?, ?, ?, ?, ?)',
      [agentId, companyId || 1, amount, tokensUsed || 0, costIncurred || 0, description || null]
    );
    const costs = await runQuery('SELECT * FROM cost_transactions WHERE id = ?', [result.id]);
    res.status(201).json(costs[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
