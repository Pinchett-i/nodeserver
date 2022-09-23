var Company = require('../models/company')
var Project = require('../models/project')
var ApplicationController = require('./application_controller')

class CompaniesController extends ApplicationController {

  static async index(request, response) {
    let companies = await Company.all()
    let projects =  await Project.all()

    
    let z = await Promise.all(projects.map(async project => {
       project['bla'] = await project.company()
    }))
    z
    console.log("🚀 ~ file: companies_controller.js ~ line 15 ~ CompaniesController ~ z ~ z", z)

    

    let  x = await projects[0].company()
    console.log("🚀 ~ file: companies_controller.js ~ line 16 ~ CompaniesController ~ index ~ x", x)
    projects[0].company().then((results) => {
      console.log("🚀 ~ file: companies_controller.js ~ line 18 ~ CompaniesController ~ y ~ results", results)
    } )
    // console.log("🚀 ~ file: companies_controller.js ~ line 14 ~ CompaniesController ~ index ~ projects", projects)
    // console.log("🚀 ~ file: companies_controller.js ~ line 12 ~ CompaniesController ~ index ~ project.company 2nd", await project.company())
    
    response.render('companies/index', { title: 'Companies', layout: './layouts/application', companies: companies, projects: projects });
  }

  async populateProjects(projects) {
    let promises = []
    projects.forEach(async project => {
      project['bla'] = await project.company()
    });
  }

  static newAction(request, response) {
    response.render('companies/new', { title: 'New Company', layout: './layouts/application' });
  }

  static async create(request, response) {
    try {
      let name = request.body.company_name;
      let company = await Company.create(
        {
          name: name
        }
      )
      request.flash("success", `${company.name} successfully created`)
      response.redirect('/companies');
    }
    catch (e) {
      if (e === 'CreateFailed') {
        request.flash("error", "Could not create company")
        response.redirect('/companies')
      }
    }
  }

  static async edit(request, response) {
    try {
      let id = request.params.id
      let company = await Company.find(
        {
          id: id
        })

      response.render('companies/edit', { title: `Edit ${company.name}`, layout: './layouts/application', company: company });

    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Company not found")
        response.redirect('/companies')
      }
    }
  }

  static async update(request, response) {
    let id = request.params.id
    try {

      let company = await Company.find(
        {
          id: id
        })

      await company.update(
        {
          name: request.body.company_name
        }
      )
      request.flash("success", "Company successfully updated")
      response.redirect('/companies')
    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Company not Found")
        response.redirect('/companies')
      } else if (e === 'UpdateFailed') {
        request.flash("error", "Error trying to update Company")
        response.redirect(`/companies/${id}/edit`)
      }
    }
  }

  static async destroy(request, response) {
    try {
      let id = request.params.id
      let company = await Company.find(
        {
          id: id
        })

      let destroyed_company = await company.destroy()
      request.flash("success", `${destroyed_company.name} successfully deleted`)
      response.redirect('/companies')
    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Company not Found")
        response.redirect('/companies')
      } else if (e === 'DestroyFailed') {
        request.flash("error", "Error trying to destroy Company")
        response.redirect(`/companies`)
      }
    }
  }

  static async show(request, response) {
    try {
      let id = request.params.id
      let company = await Company.find(
        {
          id: id
        })

      response.render('companies/show', { title: `${company.name}`, layout: './layouts/application', company: company });
    } catch (e) {
      if (e == 'NoMatchFound') {
        request.flash("error", "Company doesn't exist")
        response.redirect('/companies')
      }
    }
  }
}


module.exports = CompaniesController
