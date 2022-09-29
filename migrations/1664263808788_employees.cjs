/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('employees', {
    id: 'id',
    name: { type: 'string' },
    email: { type: 'string' },
    hourly_rate: { type: 'integer' }
    
  })
};

exports.down = pgm => {
  pgm.dropTable('employees')
};
