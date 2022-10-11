import Project from "../models/project.mjs";
import ApplicationController from "./application_controller.mjs";

class ProjectsController extends ApplicationController {

  static async index(request, response) {
    let projects = await Project.all()
    await Promise.all(projects.map(async project => {
      project.company = await project.company()
    }))
    response.render('projects/index', { title: 'Projects', layout: './layouts/application', projects: projects });
  }

  static newAction(request, response) {
    response.render('projects/new', { title: 'New Project', layout: './layouts/application' });
  }

  static async create(request, response) {
    try {
      let name = request.body.name;
      let project = await Project.create(
        {
          name: name
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
      let id = request.params.id
      let project = await Project.find(
        {
          id: id
        })

      response.render('projects/edit', { title: `Edit ${project.name}`, layout: './layouts/application', project: project });

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

      let project = await Project.find(
        {
          id: id
        })

      await project.update(
        {
          name: request.body.company_name
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
