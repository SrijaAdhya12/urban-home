export interface PropertyCardType {
  id: string;
  title: string;
  type: 'PG' | 'Flat' | 'Apartment' | 'House';
  rating: number;
  rentAmount: number;
  rentType?: 'monthly' | 'yearly';
  thumbnail: string;
  city: string;
  state: string;
  locality: string;
  dateAdded: string;
  features?: string[];
}

export interface PropertyDetailsType extends PropertyCardType {
  landmark: string;
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
  media: string[];
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  restrictions?: string[];
}

export type Property = PropertyDetailsType;

export interface Filters {
  location: string;
  priceMin: number;
  priceMax: number;
  type: string;
  rating: number;
  dateFrom: string;
  dateTo: string;
}