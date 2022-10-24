import config from "config";
import https from 'https';
import http from 'http';

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
      let req = this.request_protocol().get(this.request_options(project), response => {
        let output = '';
        response.on('data', (chunk) => {
          output += chunk;
        }).on('end', () => {
          return resolve(this.parse_response(output))
        });
        req.on('error', (err) => {
          reject(err);
        });
        req.end();
      })

    })
  }

  static request_options(project) {
    return {
      ...config.get('timemanager'),
      path: `/api/v1/projects/${project.id}/timeregistrations`,
      body: {
        project: project
      }
    }
  }

  static parse_response(response) {
    return JSON.parse(response)["timeregistrations"]
  }

  static request_protocol() {
    switch (config.get('timemanager.protocol')) {
      case 'http:':
        return http
      case 'https:':
        return https
    }
  }
}



export default TimeManagerService
