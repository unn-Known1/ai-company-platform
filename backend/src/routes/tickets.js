import express from 'express';
import { runQuery } from '../utils/database.js';

const router = express.Router();

// Get all tickets
router.get('/', async (req, res, next) => {
  try {
    const companyId = req.query.companyId || 1;
    const status = req.query.status;
    
    let query = 'SELECT * FROM tickets WHERE company_id = ?';
    const params = [companyId];
    
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY created_at DESC';
    const tickets = await runQuery(query, params);
    res.json(tickets);
  } catch (error) {
    next(error);
  }
});

// Get ticket by ID
router.get('/:id', async (req, res, next) => {
  try {
    const tickets = await runQuery('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
    if (tickets.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(tickets[0]);
  } catch (error) {
    next(error);
  }
});

// Create ticket
router.post('/', async (req, res, next) => {
  try {
    const { companyId, title, description, priority, category, assigneeAgentId } = req.body;
    const result = await runQuery(
      `INSERT INTO tickets (company_id, title, description, priority, category, assignee_agent_id, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [companyId || 1, title, description || '', priority || 'medium', category || null, 
       assigneeAgentId || null, assigneeAgentId ? 'assigned' : 'open']
    );
    const tickets = await runQuery('SELECT * FROM tickets WHERE id = ?', [result.id]);
    res.status(201).json(tickets[0]);
  } catch (error) {
    next(error);
  }
});

// Update ticket
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, status, priority, category, assigneeAgentId } = req.body;
    
    await runQuery(
      `UPDATE tickets SET 
        title = COALESCE(?, title), 
        description = COALESCE(?, description),
        status = COALESCE(?, status),
        priority = COALESCE(?, priority),
        category = COALESCE(?, category),
        assignee_agent_id = COALESCE(?, assignee_agent_id),
        updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [title, description, status, priority, category, assigneeAgentId, req.params.id]
    );
    
    const tickets = await runQuery('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
    res.json(tickets[0]);
  } catch (error) {
    next(error);
  }
});

// Delete ticket
router.delete('/:id', async (req, res, next) => {
  try {
    await runQuery('DELETE FROM tickets WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
