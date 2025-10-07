import axios from 'axios';
import { Property } from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // from .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch all mock properties
export const fetchProperties = async (): Promise<Property[]> => {
  const response = await api.get<Property[]>('/api/properties/mock');
  return response.data;
};

// Health check
export const fetchHealthStatus = async (): Promise<string> => {
  const response = await api.get<string>('/health');
  return response.data;
};
