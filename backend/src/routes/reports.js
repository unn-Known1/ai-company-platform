import express from 'express';
const router = express.Router();

// Get agent reports (mock)
router.get('/', (req, res) => {
  res.json([]);
});

export default router;
