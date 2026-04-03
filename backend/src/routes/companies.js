import express from 'express';
import { runQuery } from '../utils/database.js';

const router = express.Router();

// Get all companies
router.get('/', async (req, res, next) => {
  try {
    const companies = await runQuery('SELECT * FROM companies ORDER BY name');
    res.json(companies);
  } catch (error) {
    next(error);
  }
});

// Get company by ID
router.get('/:id', async (req, res, next) => {
  try {
    const companies = await runQuery('SELECT * FROM companies WHERE id = ?', [req.params.id]);
    if (companies.length === 0) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(companies[0]);
  } catch (error) {
    next(error);
  }
});

// Create company
router.post('/', async (req, res, next) => {
  try {
    const { name, industry, employeeCount, website } = req.body;
    const result = await runQuery(
      'INSERT INTO companies (name, industry, employee_count, website) VALUES (?, ?, ?, ?)',
      [name, industry || null, employeeCount || null, website || null]
    );
    const companies = await runQuery('SELECT * FROM companies WHERE id = ?', [result.id]);
    res.status(201).json(companies[0]);
  } catch (error) {
    next(error);
  }
});

// Update company
router.put('/:id', async (req, res, next) => {
  try {
    const { name, industry, employeeCount, website } = req.body;
    await runQuery(
      'UPDATE companies SET name = ?, industry = ?, employee_count = ?, website = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name, industry, employeeCount, website, req.params.id]
    );
    const companies = await runQuery('SELECT * FROM companies WHERE id = ?', [req.params.id]);
    res.json(companies[0]);
  } catch (error) {
    next(error);
  }
});

// Delete company
router.delete('/:id', async (req, res, next) => {
  try {
    await runQuery('DELETE FROM companies WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
