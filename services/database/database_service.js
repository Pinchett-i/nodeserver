const PostgresConnection = require('./postgres/connection.js');
var config = require('config');

function create_connection() {
    let management_system = config.get('db.system')
    switch (management_system) {
      case 'postgres':
        return new PostgresConnection(config)
    }
  }

module.exports = {
  dbConnection: create_connection()
}
