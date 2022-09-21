var Project = require('../models/project')
var Company = require('../models/company')
var ApplicationController = require('./application_controller')

class ProjectsController extends ApplicationController {
  static async index(request, response) {
    let projects = await Project.all()
    response.render('projects/index', { title: 'Projects', layout: './layouts/application', projects: projects });
  }

  static async newAction(request, response) {
    let companies = await Company.all()
    response.render('projects/new', { title: 'New Project', layout: './layouts/application', companies: companies });
  }

  static async create(request, response) {
    try {
      let name = request.body.name;
      let company_id = request.body.company_id;
      let project = await Project.create(
        {
          name: name,
          company_id: company_id
        }
      )
      request.flash("success", `${project.name} successfully created`)
      response.redirect('/projects');
    }
    catch (e) {
      request.flash("error", "Could not create project")
      response.redirect('/projects')

    }
  }

  static async edit(request, response) {
    try {
      let id = request.params.id
      let project = await Project.find(
        {
          id: id
        })

      let companies = await Company.all()
      response.render('projects/edit', { title: `Edit ${project.name}`, layout: './layouts/application', project: project, companies: companies });

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
          name: request.body.name
        }
      )
      request.flash("success", "Project successfully updated")
      response.redirect('/projects')
    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Project not Found")
        response.redirect('/projects')
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

      let destroyed_project = await project.destroy()
      request.flash("success", `${destroyed_project.name} successfully deleted`)
      response.redirect('/projects')
    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Project not Found")
        response.redirect('/projects')
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

      response.render('projects/show', { title: `${project.name}`, layout: './layouts/application', project: project });
    } catch (e) {
      if (e == 'NoMatchFound') {
        request.flash("error", "Project doesn't exist")
        response.redirect('/projects')
      }
    }
  }
}

module.exports = ProjectsController
