const Course = require('../models/Course');
const Member = require('../models/Member');

const sequelize = require('../../config/database');

const tableName = 'enrollment';

const Enrollment = sequelize.define('Enrollment', {
}, { tableName });

Enrollment.belongsTo(Course, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE',
});

Enrollment.belongsTo(Member);

module.exports = Enrollment;
