import express from 'express';
import { runQuery } from '../utils/database.js';

const router = express.Router();

// Get all agents for a company
router.get('/', async (req, res, next) => {
  try {
    const companyId = req.query.companyId || 1;
    const agents = await runQuery(
      `SELECT a.*, p.name as provider_name 
       FROM agents a 
       LEFT JOIN providers p ON a.provider_id = p.id 
       WHERE a.company_id = ? 
       ORDER BY a.name`,
      [companyId]
    );
    res.json(agents);
  } catch (error) {
    next(error);
  }
});

// Get agent by ID
router.get('/:id', async (req, res, next) => {
  try {
    const agents = await runQuery(
      `SELECT a.*, p.name as provider_name 
       FROM agents a 
       LEFT JOIN providers p ON a.provider_id = p.id 
       WHERE a.id = ?`,
      [req.params.id]
    );
    if (agents.length === 0) {
      return res.status(404).json({ error: 'Agent not found' });
    }
    res.json(agents[0]);
  } catch (error) {
    next(error);
  }
});

// Create agent
router.post('/', async (req, res, next) => {
  try {
    const {
      companyId, name, description, providerId, providerModel,
      apiKeyEncrypted, systemPrompt, temperature, maxTokens
    } = req.body;
    
    const result = await runQuery(
      `INSERT INTO agents (company_id, name, description, provider_id, provider_model, 
        api_key_encrypted, system_prompt, temperature, max_tokens) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [companyId || 1, name, description || '', providerId || null, providerModel || '',
       apiKeyEncrypted || '', systemPrompt || '', temperature || 0.7, maxTokens || 2000]
    );
    
    const agents = await runQuery('SELECT * FROM agents WHERE id = ?', [result.id]);
    res.status(201).json(agents[0]);
  } catch (error) {
    next(error);
  }
});

// Update agent
router.put('/:id', async (req, res, next) => {
  try {
    const { name, description, providerId, providerModel, isActive } = req.body;
    
    await runQuery(
      `UPDATE agents SET 
        name = COALESCE(?, name), 
        description = COALESCE(?, description), 
        provider_id = COALESCE(?, provider_id),
        provider_model = COALESCE(?, provider_model),
        is_active = COALESCE(?, is_active),
        updated_at = CURRENT_TIMESTAMP 
       WHERE id = ?`,
      [name, description, providerId, providerModel, isActive ? 1 : 0, req.params.id]
    );
    
    const agents = await runQuery('SELECT * FROM agents WHERE id = ?', [req.params.id]);
    res.json(agents[0]);
  } catch (error) {
    next(error);
  }
});

// Delete agent
router.delete('/:id', async (req, res, next) => {
  try {
    await runQuery('DELETE FROM agents WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
