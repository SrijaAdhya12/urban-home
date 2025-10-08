import axios from 'axios';
import { Property } from '../types';
import { mockProperties } from '../data/mockData';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await api.get<Property[]>('/api/properties/mock');
    return response.data;
  } catch {
    console.warn('⚠️ Falling back to mock data');
    return mockProperties;
  }
};

export const fetchPropertyById = async (id: string): Promise<Property> => {
  try {
    const response = await api.get<Property>(`/api/properties/mock/${id}`);
    return response.data;
  } catch {
    console.warn(`⚠️ Property ${id} not found, falling back to mock data`);
    const mock = mockProperties.find((p) => p.id === id);
    if (!mock) throw new Error('Property not found');
    return mock;
  }
};

export const fetchHealthStatus = async (): Promise<string> => {
  const response = await api.get<string>('/health');
  return response.data;
};
