import express from 'express';
const router = express.Router();

// Get available tools
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'Web Search', description: 'Search the web for information' },
    { id: 2, name: 'Calculator', description: 'Perform mathematical calculations' },
    { id: 3, name: 'File Reader', description: 'Read files from the filesystem' },
    { id: 4, name: 'Code Executor', description: 'Execute code snippets' }
  ]);
});

export default router;
