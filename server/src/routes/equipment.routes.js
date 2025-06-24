const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const equipmentController = require('../controllers/equipment.controller');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');

// GET /api/equipment - Get all equipment (with pagination and filters)
router.get('/', auth.protect, equipmentController.getAllEquipment);

// GET /api/equipment/:id - Get equipment by ID
router.get('/:id', auth.protect, equipmentController.getEquipmentById);

// POST /api/equipment - Create new equipment
router.post(
  '/',
  auth.protect,
  [
    body('name').notEmpty().withMessage('Equipment name is required'),
    body('categoryId').optional().isUUID().withMessage('Invalid category ID'),
    body('make').optional(),
    body('model').optional(),
    body('serialNumber').optional(),
    body('purchaseDate').optional().isISO8601().withMessage('Invalid purchase date format'),
    body('purchasePrice').optional().isNumeric().withMessage('Purchase price must be a number'),
    body('currentValue').optional().isNumeric().withMessage('Current value must be a number'),
    body('condition').optional().isIn(['Excellent', 'Good', 'Fair', 'Poor', 'Unusable']).withMessage('Invalid condition value'),
    body('status').optional().isIn(['Active', 'Maintenance', 'Lost', 'Sold', 'Retired']).withMessage('Invalid status'),
    body('notes').optional(),
  ],
  validate,
  equipmentController.createEquipment
);

// PUT /api/equipment/:id - Update equipment
router.put(
  '/:id',
  auth.protect,
  [
    body('name').optional().notEmpty().withMessage('Equipment name cannot be empty'),
    body('categoryId').optional().isUUID().withMessage('Invalid category ID'),
    body('make').optional(),
    body('model').optional(),
    body('serialNumber').optional(),
    body('purchaseDate').optional().isISO8601().withMessage('Invalid purchase date format'),
    body('purchasePrice').optional().isNumeric().withMessage('Purchase price must be a number'),
    body('currentValue').optional().isNumeric().withMessage('Current value must be a number'),
    body('condition').optional().isIn(['Excellent', 'Good', 'Fair', 'Poor', 'Unusable']).withMessage('Invalid condition value'),
    body('status').optional().isIn(['Active', 'Maintenance', 'Lost', 'Sold', 'Retired']).withMessage('Invalid status'),
    body('notes').optional(),
  ],
  validate,
  equipmentController.updateEquipment
);

// DELETE /api/equipment/:id - Delete equipment (soft delete)
router.delete('/:id', auth.protect, equipmentController.deleteEquipment);

// POST /api/equipment/:id/media - Add media to equipment
router.post(
  '/:id/media',
  auth.protect,
  equipmentController.addEquipmentMedia
);

// GET /api/equipment/:id/media - Get all media for equipment
router.get('/:id/media', auth.protect, equipmentController.getEquipmentMedia);

// DELETE /api/equipment/:id/media/:mediaId - Delete equipment media
router.delete('/:id/media/:mediaId', auth.protect, equipmentController.deleteEquipmentMedia);

// POST /api/equipment/:id/location - Update equipment location
router.post(
  '/:id/location',
  auth.protect,
  [
    body('locationId').isUUID().withMessage('Invalid location ID'),
    body('status').isIn(['checked_in', 'checked_out', 'in_transit']).withMessage('Invalid status'),
    body('assignedToUserId').optional().isUUID().withMessage('Invalid user ID'),
    body('notes').optional(),
  ],
  validate,
  equipmentController.updateEquipmentLocation
);

// GET /api/equipment/:id/location - Get equipment location history
router.get('/:id/location', auth.protect, equipmentController.getEquipmentLocationHistory);

// GET /api/equipment/:id/maintenance - Get equipment maintenance history
router.get('/:id/maintenance', auth.protect, equipmentController.getEquipmentMaintenanceHistory);

// POST /api/equipment/:id/maintenance - Add maintenance record
router.post(
  '/:id/maintenance',
  auth.protect,
  [
    body('maintenanceType').notEmpty().withMessage('Maintenance type is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('serviceDate').isISO8601().withMessage('Invalid service date format'),
    body('completedByUserId').optional().isUUID().withMessage('Invalid user ID'),
    body('serviceProvider').optional(),
    body('cost').optional().isNumeric().withMessage('Cost must be a number'),
    body('notes').optional(),
  ],
  validate,
  equipmentController.addMaintenanceRecord
);

// GET /api/equipment/search - Search equipment
router.get('/search', auth.protect, equipmentController.searchEquipment);

// GET /api/equipment/stats - Get equipment statistics
router.get('/stats', auth.protect, equipmentController.getEquipmentStats);

module.exports = router;