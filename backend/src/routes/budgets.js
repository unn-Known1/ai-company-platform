import express from 'express';
import { runQuery } from '../utils/database.js';

const router = express.Router();

// Get all budgets
router.get('/', async (req, res, next) => {
  try {
    const companyId = req.query.companyId || 1;
    const budgets = await runQuery(
      `SELECT b.*, a.name as agent_name 
       FROM budgets b 
       LEFT JOIN agents a ON b.agent_id = a.id 
       WHERE b.company_id = ? 
       ORDER BY b.month_year DESC`,
      [companyId]
    );
    res.json(budgets);
  } catch (error) {
    next(error);
  }
});

// Create or update budget
router.post('/', async (req, res, next) => {
  try {
    const { agentId, companyId, monthYear, totalBudget, spentAmount } = req.body;
    
    // Check if budget exists
    const existing = await runQuery(
      'SELECT id FROM budgets WHERE agent_id = ? AND month_year = ?',
      [agentId, monthYear]
    );
    
    if (existing.length > 0) {
      await runQuery(
        'UPDATE budgets SET total_budget = ?, spent_amount = ? WHERE id = ?',
        [totalBudget, spentAmount || 0, existing[0].id]
      );
      const budgets = await runQuery('SELECT * FROM budgets WHERE id = ?', [existing[0].id]);
      return res.json(budgets[0]);
    }
    
    const result = await runQuery(
      'INSERT INTO budgets (agent_id, company_id, month_year, total_budget, spent_amount) VALUES (?, ?, ?, ?, ?)',
      [agentId, companyId || 1, monthYear, totalBudget, spentAmount || 0]
    );
    const budgets = await runQuery('SELECT * FROM budgets WHERE id = ?', [result.id]);
    res.status(201).json(budgets[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
