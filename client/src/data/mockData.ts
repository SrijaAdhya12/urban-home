import { Property, User } from '../types';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxury 2BHK Apartment in Bandra',
    description: 'Beautiful fully furnished apartment with modern amenities, gym, swimming pool, and 24/7 security. Located in the heart of Bandra with easy access to restaurants, malls, and metro.',
    location: {
      city: 'Mumbai',
      state: 'Maharashtra',
      landmark: 'Bandra West',
      coordinates: { lat: 19.0596, lng: 72.8295 }
    },
    price: {
      amount: 45000,
      type: 'rent',
      frequency: 'monthly',
      brokerage: 22500,
      maintenance: 3000,
      gst: 2700
    },
    rating: 4.5,
    type: 'Apartment',
    features: ['Furnished', 'Gym', 'Swimming Pool', 'Parking', 'Security'],
    media: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    owner: {
      name: 'Rahul Sharma',
      phone: '+91 9876543210',
      email: 'rahul@example.com'
    },
    dateAdded: '2024-01-15',
    restrictions: ['No pets', 'No smoking']
  },
  {
    id: '2',
    title: 'Cozy PG for Working Professionals',
    description: 'Comfortable paying guest accommodation with all meals included. Wi-Fi, laundry service, and housekeeping provided.',
    location: {
      city: 'Bangalore',
      state: 'Karnataka',
      landmark: 'Koramangala',
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    price: {
      amount: 12000,
      type: 'rent',
      frequency: 'monthly',
      brokerage: 6000,
      maintenance: 0,
      gst: 720
    },
    rating: 4.2,
    type: 'PG',
    features: ['Meals Included', 'Wi-Fi', 'Laundry', 'AC'],
    media: [
      'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg'
    ],
    owner: {
      name: 'Priya Reddy',
      phone: '+91 9876543211',
      email: 'priya@example.com'
    },
    dateAdded: '2024-01-20'
  },
  {
    id: '3',
    title: 'Modern 3BHK Villa for Sale',
    description: 'Spacious villa with garden, private parking, and modern interiors. Perfect for families looking for a peaceful environment.',
    location: {
      city: 'Pune',
      state: 'Maharashtra',
      landmark: 'Hinjewadi',
      coordinates: { lat: 18.5908, lng: 73.7390 }
    },
    price: {
      amount: 8500000,
      type: 'buy',
      brokerage: 170000,
      maintenance: 5000,
      gst: 510000
    },
    rating: 4.8,
    type: 'House',
    features: ['Garden', 'Parking', 'Modern Kitchen', 'Spacious'],
    media: [
      'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg'
    ],
    owner: {
      name: 'Amit Patel',
      phone: '+91 9876543212',
      email: 'amit@example.com'
    },
    dateAdded: '2024-01-10'
  }
];

// Generate more properties for pagination
for (let i = 4; i <= 100; i++) {
  const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'];
  const states = ['Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Maharashtra', 'West Bengal'];
  const types: ('PG' | 'Flat' | 'Apartment' | 'House')[] = ['PG', 'Flat', 'Apartment', 'House'];
  const randomCity = cities[Math.floor(Math.random() * cities.length)];
  const randomState = states[cities.indexOf(randomCity)];
  const randomType = types[Math.floor(Math.random() * types.length)];
  
  mockProperties.push({
    id: i.toString(),
    title: `${randomType} in ${randomCity}`,
    description: `Beautiful ${randomType.toLowerCase()} with modern amenities and great location.`,
    location: {
      city: randomCity,
      state: randomState,
      coordinates: { lat: 19.0596 + (Math.random() - 0.5) * 10, lng: 72.8295 + (Math.random() - 0.5) * 10 }
    },
    price: {
      amount: Math.floor(Math.random() * 50000) + 10000,
      type: Math.random() > 0.3 ? 'rent' : 'buy',
      frequency: 'monthly',
      brokerage: Math.floor(Math.random() * 10000),
      maintenance: Math.floor(Math.random() * 5000),
      gst: Math.floor(Math.random() * 3000)
    },
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    type: randomType,
    features: ['Furnished', 'Parking', 'Security'].slice(0, Math.floor(Math.random() * 3) + 1),
    media: [
      'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    owner: {
      name: `Owner ${i}`,
      phone: `+91 987654${i.toString().padStart(4, '0')}`,
      email: `owner${i}@example.com`
    },
    dateAdded: `2024-01-${Math.floor(Math.random() * 30) + 1}`.padStart(10, '0')
  });
}

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+91 9876543210',
  address: '123 Main St, Mumbai',
  profilePicture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  dateJoined: '2024-01-01'
};