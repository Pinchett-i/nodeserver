import Project from "../models/project.mjs";
import Company from "../models/company.mjs";
import ApplicationController from "./application_controller.mjs";
import authorize from "../policies/authorize.mjs";
import TimeManagerService from "../services/timemanager_service.mjs";

class ProjectsController extends ApplicationController {

  static async hours(request, response) {
    try {
      let authorized = await authorize('projects', 'render_invoice', request.session.current_user_id)
      if (!authorized) {
        this.handle_unauthorized(request, response);
        return;
      }
      let id = request.params.id
      let project = await Project.find(
        {
          id: id
        })
      let hours = await TimeManagerService.hours_for_project(project)

      response.render('projects/hours', { project: project, hours: hours })
    } catch (e) {
      if (e == 'NoMatchFound') {
        request.flash("error", "Project doesn't exist")
        response.redirect('/projects')
      } else {
        console.error(e)
      }
    }
  }

  static async index(request, response) {
    let authorized = await authorize('projects', 'index', request.session.current_user_id)
    if (!authorized) {
      this.handle_unauthorized(request, response);
      return;
    }
    let projects = await Project.all() //TODO policy scope
    await Promise.all(projects.map(async project => {
      project.company = await project.company()
    }))
    response.render('projects/index', { title: 'Projects', layout: './layouts/application', projects: projects });
  }

  static async newAction(request, response) {
    let authorized = await authorize('projects', 'new', request.session.current_user_id)
    if (!authorized) {
      this.handle_unauthorized(request, response);
      return;
    }
    let companies = await Company.all()
    response.render('projects/new', { title: 'New Project', layout: './layouts/application', companies: companies });
  }

  static async create(request, response) {
    try {
      let authorized = await authorize('projects', 'create', request.session.current_user_id)
      if (!authorized) {
        this.handle_unauthorized(request, response);
        return;
      }
      let project_name = request.body.project_name;
      let company_id = request.body.company_id
      let project = await Project.create(
        {
          name: project_name,
          company_id: company_id
        }
      )
      request.flash("success", `${project.name} successfully created`)
      response.redirect('/projects');
    }
    catch (e) {
      if (e === 'CreateFailed') {
        request.flash("error", "Could not create project")
        response.redirect('/projects')
      }
    }
  }

  static async edit(request, response) {
    try {
      let authorized = await authorize('projects', 'edit', request.session.current_user_id)
      if (!authorized) {
        this.handle_unauthorized(request, response);
        return;
      }
      let companies = await Company.all()
      let id = request.params.id
      let project = await Project.find(
        {
          id: id
        })
      let current_company = await project.company()
      response.render('projects/edit', { title: `Edit ${project.name}`, layout: './layouts/application', project: project, companies: companies, current_company: current_company });

    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Project not found")
        response.redirect('/projects')
      }
    }
  }

  static async update(request, response) {
    let id = request.params.id
    try {
      let authorized = await authorize('projects', 'update', request.session.current_user_id)
      if (!authorized) {
        this.handle_unauthorized(request, response);
        return;
      }
      let project = await Project.find(
        {
          id: id
        })

      await project.update(
        {
          name: request.body.project_name,
          company_id: request.body.company_id
        }
      )
      request.flash("success", "Project successfully updated")
      response.redirect('/projects')
    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Project not Found")
        response.redirect('/projects')
      } else if (e === 'UpdateFailed') {
        request.flash("error", "Error trying to update Project")
        response.redirect(`/projects/${id}/edit`)
      }
    }
  }

  static async destroy(request, response) {
    try {
      let authorized = await authorize('projects', 'destroy', request.session.current_user_id)
      if (!authorized) {
        this.handle_unauthorized(request, response);
        return;
      }
      let id = request.params.id
      let project = await Project.find(
        {
          id: id
        })

      let destroyed_company = await project.destroy()
      request.flash("success", `${destroyed_company.name} successfully deleted`)
      response.redirect('/projects')
    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Project not Found")
        response.redirect('/projects')
      } else if (e === 'DestroyFailed') {
        request.flash("error", "Error trying to destroy Project")
        response.redirect(`/projects`)
      }
    }
  }

  static async show(request, response) {
    try {
      let authorized = await authorize('projects', 'show', request.session.current_user_id)
      if (!authorized) {
        this.handle_unauthorized(request, response);
        return;
      }
      let id = request.params.id
      let project = await Project.find(
        {
          id: id
        })
      project.company = await project.company()

      response.render('projects/show', { title: `${project.name}`, layout: './layouts/application', project: project });
    } catch (e) {
      if (e == 'NoMatchFound') {
        request.flash("error", "Project doesn't exist")
        response.redirect('/projects')
      } else {
        console.error(e)
      }
    }
  }
}


export default ProjectsController
