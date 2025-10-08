import axios from 'axios'
import { PropertyDetailsType } from '../types'
import { mockProperties } from '../data/mockData'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchProperties = async (): Promise<PropertyDetailsType[]> => {
  try {
    const response = await api.get<PropertyDetailsType[]>('/api/properties/mock')
    return response.data
  } catch {
    console.warn('⚠️ Falling back to mock data')
    return mockProperties as PropertyDetailsType[]
  }
}

export const fetchPropertyById = async (id: string): Promise<PropertyDetailsType> => {
  try {
    const response = await api.get<PropertyDetailsType>(`/api/properties/mock/${id}`)
    return response.data
  } catch {
    console.warn(`⚠️ Property ${id} not found, falling back to mock data`)
    const mock = mockProperties.find((p) => p.id.toString() === id)
    if (!mock) throw new Error('Property not found')
    return mock as PropertyDetailsType
  }
}

export const fetchHealthStatus = async (): Promise<string> => {
  const response = await api.get<string>('/health')
  return response.data
}
