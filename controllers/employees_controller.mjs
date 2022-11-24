import ApplicationController from "./application_controller.mjs";
import authorize from "../policies/authorize.mjs";
import Employee from "../models/employee.mjs";
import Assignement from "../models/assignement.mjs";

class EmployeesController extends ApplicationController {

  static async index(request, response) {
    let authorized = await authorize('employees', 'index', request.session.current_user_id)
    if (!authorized) {
      this.handle_unauthorized(request, response);
      return;
    }
    let employees = await Employee.all()
    await Promise.all(employees.map(async employee => {
      employee.projects = await employee.projects()
    }))

    response.render('employees/index', { title: 'Employees', layout: './layouts/application', employees: employees });
  }

  static async newAction(request, response) {
    let authorized = await authorize('employees', 'new', request.session.current_user_id)
    if (!authorized) {
      this.handle_unauthorized(request, response);
      return;
    }
    response.render('employees/new', { title: 'New Employee', layout: './layouts/application' });
  }
  static async create(request, response) {
    try {
      let authorized = await authorize('employees', 'create', request.session.current_user_id)
      if (!authorized) {
        this.handle_unauthorized(request, response);
        return;
      }
      let name = request.body.employee_name;
      let employee = await Employee.create(
        {
          name: name
        }
      )
      request.flash("success", `${employee.name} successfully created`)
      response.redirect('/employees');
    }
    catch (e) {
      if (e === 'CreateFailed') {
        request.flash("error", "Could not create employee")
        response.redirect('/employees')
      }
    }
  }

  static async edit(request, response) {
    try {
      let authorized = await authorize('employees', 'edit', request.session.current_user_id)
      if (!authorized) {
        this.handle_unauthorized(request, response);
        return;
      }
      let id = request.params.id
      let employee = await Employee.find(
        {
          id: id
        })

      response.render('employees/edit', { title: `Edit ${employee.name}`, layout: './layouts/application', employee: employee });

    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Employee not found")
        response.redirect('/employees')
      }
    }
  }

  static async update(request, response) {
    let id = request.params.id
    try {
      let authorized = await authorize('employees', 'update', request.session.current_user_id)
    if (!authorized) {
      this.handle_unauthorized(request, response);
      return;
    }
      let employee = await Employee.find(
        {
          id: id
        })

      await employee.update(
        {
          name: request.body.employee_name
        }
      )
      request.flash("success", "Employee successfully updated")
      response.redirect('/employees')
    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Employee not Found")
        response.redirect('/employees')
      } else if (e === 'UpdateFailed') {
        request.flash("error", "Error trying to update Employee")
        response.redirect(`/employees/${id}/edit`)
      }
    }
  }

  static async destroy(request, response) {
    try {
      let authorized = await authorize('employees', 'destroy', request.session.current_user_id)
    if (!authorized) {
      this.handle_unauthorized(request, response);
      return;
    }
      let id = request.params.id
      let employee = await Employee.find(
        {
          id: id
        })

      let destroyed_employee = await employee.destroy()
      request.flash("success", `${destroyed_employee.name} successfully deleted`)
      response.redirect('/employees')
    }
    catch (e) {
      if (e === 'NoMatchFound') {
        request.flash("error", "Employee not Found")
        response.redirect('/employees')
      } else if (e === 'DestroyFailed') {
        request.flash("error", "Error trying to destroy Employee")
        response.redirect(`/employees`)
      }
    }
  }

  static async show(request, response) {
    try {
      let authorized = await authorize('employees', 'show', request.session.current_user_id)
    if (!authorized) {
      this.handle_unauthorized(request, response);
      return;
    }
      let id = request.params.id
      let employee = await Employee.find(
        {
          id: id
        })
      employee.projects = await employee.projects()

      response.render('employees/show', { title: `${employee.name}`, layout: './layouts/application', employee: employee });
    } catch (e) {
      if (e == 'NoMatchFound') {
        request.flash("error", "Employee doesn't exist")
        response.redirect('/employees')
      } else {
        console.error(e)
      }
    }
  }
}



export default EmployeesController
