'use strict';

module.exports = (sequelize, DataTypes) => {
  const Equipment = sequelize.define('Equipment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    make: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    currentValue: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    condition: {
      type: DataTypes.ENUM('Excellent', 'Good', 'Fair', 'Poor', 'Unusable'),
      allowNull: true,
      defaultValue: 'Good',
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Maintenance', 'Lost', 'Sold', 'Retired'),
      allowNull: false,
      defaultValue: 'Active',
    },
    lastServiced: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nextServiceDue: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
      comment: 'Weight in kilograms',
    },
    dimensions: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: 'Format: length x width x height in cm',
    },
    insuranceInfo: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    warrantyExpiration: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'equipment',
    timestamps: true,
    paranoid: true, // Soft deletes
    indexes: [
      {
        name: 'equipment_serial_number_idx',
        fields: ['serialNumber'],
      },
      {
        name: 'equipment_status_idx',
        fields: ['status'],
      },
    ],
  });

  Equipment.associate = (models) => {
    // Equipment belongs to a User or Organization
    Equipment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner',
      constraints: false,
    });
    
    Equipment.belongsTo(models.Organization, {
      foreignKey: 'organizationId',
      as: 'organizationOwner',
      constraints: false,
    });

    // Equipment belongs to a Category
    Equipment.belongsTo(models.EquipmentCategory, {
      foreignKey: 'categoryId',
      as: 'category',
    });

    // Equipment has many Media items
    Equipment.hasMany(models.EquipmentMedia, {
      foreignKey: 'equipmentId',
      as: 'media',
    });

    // Equipment has many Maintenance Records
    Equipment.hasMany(models.MaintenanceRecord, {
      foreignKey: 'equipmentId',
      as: 'maintenanceRecords',
    });

    // Equipment has many Maintenance Schedules
    Equipment.hasMany(models.MaintenanceSchedule, {
      foreignKey: 'equipmentId',
      as: 'maintenanceSchedules',
    });

    // Equipment has many Tracking Logs
    Equipment.hasMany(models.EquipmentTrackingLog, {
      foreignKey: 'equipmentId',
      as: 'trackingLogs',
    });

    // Equipment has many Location entries
    Equipment.belongsToMany(models.Location, {
      through: models.EquipmentLocation,
      foreignKey: 'equipmentId',
      as: 'locations',
    });

    // Equipment is used in many Songs
    Equipment.belongsToMany(models.Song, {
      through: models.SongEquipment,
      foreignKey: 'equipmentId',
      as: 'songs',
    });
  };

  // Hook: Before create
  Equipment.beforeCreate(async (equipment) => {
    // Any logic needed before creating equipment
  });

  // Instance methods
  Equipment.prototype.getCurrentLocation = async function() {
    // Get the latest location
    const EquipmentLocation = sequelize.models.EquipmentLocation;
    const Location = sequelize.models.Location;
    
    const latestLocation = await EquipmentLocation.findOne({
      where: { equipmentId: this.id },
      include: [{
        model: Location,
        as: 'location',
      }],
      order: [['timestamp', 'DESC']],
    });
    
    return latestLocation ? latestLocation.location : null;
  };

  Equipment.prototype.getMaintenanceStatus = function() {
    const now = new Date();
    if (!this.nextServiceDue) {
      return 'No Service Scheduled';
    }
    
    const daysUntilService = Math.floor((this.nextServiceDue - now) / (1000 * 60 * 60 * 24));
    
    if (daysUntilService < 0) {
      return 'Overdue';
    } else if (daysUntilService <= 7) {
      return 'Due Soon';
    } else {
      return 'Up To Date';
    }
  };

  return Equipment;
};