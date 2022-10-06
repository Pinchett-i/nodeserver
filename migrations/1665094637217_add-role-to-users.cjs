exports.up = (pgm) => {
  pgm.addColumns('users', {
    role_id: { type: 'integer', notNull: true },
  })
}
