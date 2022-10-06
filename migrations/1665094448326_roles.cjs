/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('roles', {
    id: 'id',
    name: { type: 'string' },
  })
};

exports.down = pgm => {
  pgm.dropTable('roles')
};
