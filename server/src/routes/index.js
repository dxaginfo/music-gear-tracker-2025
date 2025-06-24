const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const equipmentRoutes = require('./equipment.routes');
const categoryRoutes = require('./category.routes');
const locationRoutes = require('./location.routes');
const maintenanceRoutes = require('./maintenance.routes');
const organizationRoutes = require('./organization.routes');
const setlistRoutes = require('./setlist.routes');
const songRoutes = require('./song.routes');
const mediaRoutes = require('./media.routes');
const searchRoutes = require('./search.routes');
const reportRoutes = require('./report.routes');

// Mount routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/categories', categoryRoutes);
router.use('/locations', locationRoutes);
router.use('/maintenance', maintenanceRoutes);
router.use('/organizations', organizationRoutes);
router.use('/setlists', setlistRoutes);
router.use('/songs', songRoutes);
router.use('/media', mediaRoutes);
router.use('/search', searchRoutes);
router.use('/reports', reportRoutes);

// Default route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Musician Gear Tracker API',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

module.exports = router;