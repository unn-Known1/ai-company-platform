import express from 'express';
import { runQuery } from '../utils/database.js';

const router = express.Router();

// Get all missions
router.get('/', async (req, res, next) => {
  try {
    const companyId = req.query.companyId || 1;
    const missions = await runQuery(
      'SELECT * FROM missions WHERE company_id = ? ORDER BY created_at DESC',
      [companyId]
    );
    res.json(missions);
  } catch (error) {
    next(error);
  }
});

// Get mission by ID
router.get('/:id', async (req, res, next) => {
  try {
    const missions = await runQuery('SELECT * FROM missions WHERE id = ?', [req.params.id]);
    if (missions.length === 0) {
      return res.status(404).json({ error: 'Mission not found' });
    }
    res.json(missions[0]);
  } catch (error) {
    next(error);
  }
});

// Create mission
router.post('/', async (req, res, next) => {
  try {
    const { companyId, title, description } = req.body;
    const result = await runQuery(
      'INSERT INTO missions (company_id, title, description) VALUES (?, ?, ?)',
      [companyId || 1, title, description || '']
    );
    const missions = await runQuery('SELECT * FROM missions WHERE id = ?', [result.id]);
    res.status(201).json(missions[0]);
  } catch (error) {
    next(error);
  }
});

// Update mission
router.put('/:id', async (req, res, next) => {
  try {
    const { title, description, progress, completed } = req.body;
    await runQuery(
      `UPDATE missions SET 
        title = COALESCE(?, title), 
        description = COALESCE(?, description), 
        progress = COALESCE(?, progress),
        completed = COALESCE(?, completed),
        updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [title, description, progress, completed ? 1 : 0, req.params.id]
    );
    const missions = await runQuery('SELECT * FROM missions WHERE id = ?', [req.params.id]);
    res.json(missions[0]);
  } catch (error) {
    next(error);
  }
});

// Delete mission
router.delete('/:id', async (req, res, next) => {
  try {
    await runQuery('DELETE FROM missions WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
