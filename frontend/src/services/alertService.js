import api from './api';
import { mockAlerts } from '../data/mockAlerts';

export const alertService = {
  async getAlerts(district = null) {
    await new Promise((r) => setTimeout(r, 300));
    if (!district || district === 'ALL') return mockAlerts;
    return mockAlerts.filter(
      (a) => a.district.toLowerCase() === district.toLowerCase()
    );
  }
};
