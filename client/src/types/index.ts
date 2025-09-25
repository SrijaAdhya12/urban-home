export interface Property {
  id: string;
  title: string;
  description: string;
  location: {
    city: string;
    state: string;
    landmark?: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: {
    amount: number;
    type: 'rent' | 'buy';
    frequency?: 'monthly' | 'yearly';
    brokerage?: number;
    maintenance?: number;
    gst?: number;
  };
  rating: number;
  type: 'PG' | 'Flat' | 'Apartment' | 'House';
  features: string[];
  media: string[];
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  dateAdded: string;
  restrictions?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  profilePicture?: string;
  dateJoined: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, phone: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface Filters {
  location: string;
  priceMin: number;
  priceMax: number;
  type: string;
  rating: number;
  dateFrom: string;
  dateTo: string;
}