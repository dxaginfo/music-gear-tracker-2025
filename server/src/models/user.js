'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userType: {
      type: DataTypes.ENUM('musician', 'band_manager', 'technician', 'venue_manager', 'admin'),
      allowNull: false,
      defaultValue: 'musician',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    emailVerificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {
    tableName: 'users',
    timestamps: true,
    paranoid: true, // Soft deletes
    indexes: [
      {
        name: 'users_email_idx',
        unique: true,
        fields: ['email'],
      },
    ],
    defaultScope: {
      attributes: { exclude: ['password', 'resetPasswordToken', 'resetPasswordExpires', 'emailVerificationToken'] },
    },
    scopes: {
      withPassword: {
        attributes: { include: ['password'] },
      },
    },
  });

  User.associate = (models) => {
    // User owns many Equipment items
    User.hasMany(models.Equipment, {
      foreignKey: 'userId',
      as: 'equipment',
    });

    // User belongs to many Organizations
    User.belongsToMany(models.Organization, {
      through: models.UserOrganization,
      foreignKey: 'userId',
      as: 'organizations',
    });

    // User has many Maintenance Records (as completed by)
    User.hasMany(models.MaintenanceRecord, {
      foreignKey: 'completedByUserId',
      as: 'completedMaintenances',
    });

    // User is assigned to many Equipment Locations
    User.hasMany(models.EquipmentLocation, {
      foreignKey: 'assignedToUserId',
      as: 'assignedEquipment',
    });

    // User creates many Equipment Locations
    User.hasMany(models.EquipmentLocation, {
      foreignKey: 'createdByUserId',
      as: 'createdEquipmentLocations',
    });

    // User has many Equipment Tracking Logs
    User.hasMany(models.EquipmentTrackingLog, {
      foreignKey: 'loggedByUserId',
      as: 'trackingLogs',
    });

    // User owns many Setlists
    User.hasMany(models.Setlist, {
      foreignKey: 'userId',
      as: 'setlists',
      constraints: false,
      scope: {
        ownerType: 'user',
      },
    });

    // User owns many Songs
    User.hasMany(models.Song, {
      foreignKey: 'userId',
      as: 'songs',
      constraints: false,
      scope: {
        ownerType: 'user',
      },
    });
  };

  // Hooks
  User.beforeCreate(async (user) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  });

  // Instance Methods
  User.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`;
  };

  return User;
};