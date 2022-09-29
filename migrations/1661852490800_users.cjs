/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    email: { type: 'string', notNull: true, unique: true },
    first_name: { type: 'string'},
    last_name: { type: 'string'},
    password: { type: 'string'}

})
};

exports.down = pgm => {
  pgm.dropTable('users')
};
