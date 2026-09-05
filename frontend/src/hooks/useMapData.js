import { useState, useEffect } from 'react';
import { mapService } from '../services/mapService';

export const useMapData = (selectedCrop = 'ALL') => {
  const [districts, setDistricts] = useState([]);
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [distData, hotData] = await Promise.all([
          mapService.getDistrictRisks(),
          mapService.getHotspots(selectedCrop)
        ]);
        if (isMounted) {
          setDistricts(distData);
          setHotspots(hotData);
          if (!selectedDistrict && distData.length > 0) {
            setSelectedDistrict(distData[0]); // Default to Akola
          }
        }
      } catch (err) {
        console.error('Failed to fetch map data:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [selectedCrop]);

  return {
    districts,
    hotspots,
    loading,
    selectedDistrict,
    setSelectedDistrict
  };
};
