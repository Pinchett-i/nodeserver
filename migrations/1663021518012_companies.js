/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('companies', {
    id: 'id',
    name: { type: 'string'},
})
};

exports.down = pgm => {
  pgm.dropTable('companies')
};
