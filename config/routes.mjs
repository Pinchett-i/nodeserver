import homeRouter from "../routers/home.mjs";
import sessionsRouter from "../routers/sessions.mjs";
import registrationsRouter from "../routers/registrations.mjs";
import companiesRouter from "../routers/companies.mjs";
import projectsRouter from "../routers/projects.mjs";

export const mountRoutes = app => {
  app.use('/', homeRouter);
  app.use('/sessions', sessionsRouter);
  app.use('/registrations', registrationsRouter);
  app.use('/companies', companiesRouter);
  app.use('/projects', projectsRouter);
}
