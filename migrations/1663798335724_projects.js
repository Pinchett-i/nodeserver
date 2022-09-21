/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('projects', {
    id: 'id',
    name: { type: 'string' },
    company_id: { type: 'integer' }
  })
};

exports.down = pgm => {
  pgm.dropTable('projects')
};
