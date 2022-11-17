class ApplicationController {
  static async handle_unauthorized(request, response) {
    request.flash("error", "Unauthorized")
    response.redirect('/')
  }

  static async handle_no_match_found(request, response) {
    request.flash("error", "Record not found")
    response.redirect('/')
  }
}

export default ApplicationController
