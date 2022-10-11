class ApplicationController {
  static async handle_unauthorized(request, response) {
    request.flash("error", "Unauthorized")
    response.redirect('/')
  }
}

export default ApplicationController
