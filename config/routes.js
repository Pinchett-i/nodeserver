const homeRouter = require('../routers/home');
const sessionsRouter = require('../routers/sessions');
const registrationsRouter = require('../routers/registrations');
const companiesRouter = require('../routers/companies');
const projectsRouter = require('../routers/projects');


module.exports = app => {
  app.use('/', homeRouter);
  app.use('/sessions', sessionsRouter);
  app.use('/registrations', registrationsRouter);
  app.use('/companies', companiesRouter);
  app.use('/projects', projectsRouter);
}
