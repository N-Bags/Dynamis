import axios from 'axios';
import config from '../config/environment';
import { logError } from '../utils/monitoring';

interface HealthStatus {
  status: 'healthy' | 'degraded' | 'down';
  services: {
    api: boolean;
    database: boolean;
    cache: boolean;
  };
}

export const checkHealth = async (): Promise<HealthStatus> => {
  try {
    const response = await axios.get(`${config.apiUrl}/health`);
    return response.data;
  } catch (error) {
    logError(error as Error, { service: 'health-check' });
    return {
      status: 'down',
      services: {
        api: false,
        database: false,
        cache: false,
      },
    };
  }
}; 