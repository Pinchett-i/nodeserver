import config from "config";
import https from 'https';

class TimeManagerService {
  static async hours_for_project(project) {
    let times = await this.time_registrations_for_project(project)
    let sum = times.reduce((current_sum, time_registration) => {
      return current_sum + time_registration.billable_hours
    }, 0)
    return sum
  }

  static async time_registrations_for_project(project) {
    return await this.fetch_project_time_registration_from_timemanager(project)
  }

  static async fetch_project_time_registration_from_timemanager(project) {
    return new Promise((resolve, reject) => {
      let req = https.get(this.request_options(project), response => {
        resolve(this.parse_response(response));
        req.on('error', (err) => {
          reject(err);
        });
        req.end();
      })

    })
  }

  static request_options(project) {
    return {
      host: config.get('timemanager.host'),
      path: `/projects/${project.id}/timeregistrations`,
      headers: {
        'HTTP_AUTHORIZATION': config.get('timemanager.api_key')
      },
      body: {
        project: project,
      }
    }
  }
  static parse_response(response) {
    return response
  }
}



export default TimeManagerService
