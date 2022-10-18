import time_registrations from '../fixtures/time_registration.json' assert { type: "json" }
import config from "config";
import https from 'https';

class TimeManagerService {
  static async hours_for_project(project) {
    let sum = 0;
    let times = await this.time_registrations_for_project(project)
    times.forEach(time_registration => {
      sum += time_registration.billable_hours
    })
    return sum
  }

  static async time_registrations_for_project(project) {
    return time_registrations // Fixture for now
  }
}



export default TimeManagerService
