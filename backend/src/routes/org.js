import express from 'express';
import { runQuery } from '../utils/database.js';

const router = express.Router();

// Get org chart
router.get('/', async (req, res, next) => {
  try {
    const companyId = req.query.companyId || 1;
    const nodes = await runQuery(
      'SELECT * FROM org_nodes WHERE company_id = ? ORDER BY position',
      [companyId]
    );
    res.json(nodes);
  } catch (error) {
    next(error);
  }
});

// Create org node
router.post('/', async (req, res, next) => {
  try {
    const { companyId, parentId, name, title, email, department } = req.body;
    const result = await runQuery(
      'INSERT INTO org_nodes (company_id, parent_id, name, title, email, department) VALUES (?, ?, ?, ?, ?, ?)',
      [companyId || 1, parentId || null, name, title, email || null, department || null]
    );
    const nodes = await runQuery('SELECT * FROM org_nodes WHERE id = ?', [result.id]);
    res.status(201).json(nodes[0]);
  } catch (error) {
    next(error);
  }
});

export default router;
