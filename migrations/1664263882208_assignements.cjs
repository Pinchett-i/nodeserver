/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('assignements', {
    id: 'id',
    employee_id: { type: 'integer'},
    project_id: { type: 'integer'},
    start_date: { type: 'timestamp' },
    end_date: { type: 'timestamp' },
    hourly_rate: { type: 'integer' },
    hours_worked: {type: 'integer' },
    hours_booked: { type: 'integer' }
  })
};

exports.down = pgm => {
  pgm.dropTable('assignements')
};
