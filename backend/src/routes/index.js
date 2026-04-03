import express from 'express';
import authRoutes from './auth.js';
import companiesRoutes from './companies.js';
import agentsRoutes from './agents.js';
import missionsRoutes from './missions.js';
import ticketsRoutes from './tickets.js';
import budgetsRoutes from './budgets.js';
import orgRoutes from './org.js';
import rolesRoutes from './roles.js';
import costsRoutes from './costs.js';
import conversationsRoutes from './conversations.js';
import messagesRoutes from './messages.js';
import toolsRoutes from './tools.js';
import reportsRoutes from './reports.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/companies', companiesRoutes);
router.use('/agents', agentsRoutes);
router.use('/missions', missionsRoutes);
router.use('/tickets', ticketsRoutes);
router.use('/budgets', budgetsRoutes);
router.use('/org', orgRoutes);
router.use('/roles', rolesRoutes);
router.use('/costs', costsRoutes);
router.use('/conversations', conversationsRoutes);
router.use('/messages', messagesRoutes);
router.use('/tools', toolsRoutes);
router.use('/reports', reportsRoutes);

export default router;
