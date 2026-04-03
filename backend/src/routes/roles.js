import express from 'express';
const router = express.Router();

// Get roles (mock)
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Admin', permissions: ['all'] },
    { id: 2, name: 'Manager', permissions: ['read', 'write'] },
    { id: 3, name: 'Agent', permissions: ['read'] }
  ]);
});

export default router;
