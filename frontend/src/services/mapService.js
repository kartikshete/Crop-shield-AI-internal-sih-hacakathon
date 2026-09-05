import api from './api';
import { mockDistricts } from '../data/mockDistricts';

export const mapService = {
  async getDistrictRisks() {
    await new Promise((r) => setTimeout(r, 400));
    return mockDistricts;
  },

  async getHotspots(cropFilter = null) {
    await new Promise((r) => setTimeout(r, 300));
    let allHotspots = [];
    mockDistricts.forEach((d) => {
      if (!cropFilter || cropFilter === 'ALL' || d.dominantCrop.toLowerCase().includes(cropFilter.toLowerCase())) {
        if (d.hotspots) {
          allHotspots = allHotspots.concat(d.hotspots.map(h => ({ ...h, district: d.name })));
        }
      }
    });
    return allHotspots;
  }
};
