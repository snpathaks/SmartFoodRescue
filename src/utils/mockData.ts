import { Charity } from '../types';

export const mockCharities: Charity[] = [
  {
    id: 'charity-1',
    name: 'City Food Bank',
    type: 'Food Bank',
    location: 'Downtown, 2.3 km away',
    capacity: 500,
    specializations: ['Fresh produce', 'Prepared meals', 'Dairy products'],
    distance: 2.3,
    contactPhone: '+91-9876543210',
    matchScore: 95
  },
  {
    id: 'charity-2',
    name: 'Hope Shelter Foundation',
    type: 'Homeless Shelter',
    location: 'Central District, 3.1 km away',
    capacity: 200,
    specializations: ['Prepared meals', 'Bakery items', 'Beverages'],
    distance: 3.1,
    contactPhone: '+91-9876543211',
    matchScore: 88
  },
  {
    id: 'charity-3',
    name: 'Community Kitchen',
    type: 'Soup Kitchen',
    location: 'East Side, 4.2 km away',
    capacity: 300,
    specializations: ['Vegetables', 'Grains', 'Prepared meals'],
    distance: 4.2,
    contactPhone: '+91-9876543212',
    matchScore: 82
  },
  {
    id: 'charity-4',
    name: 'Elder Care Center',
    type: 'Senior Center',
    location: 'North District, 5.1 km away',
    capacity: 150,
    specializations: ['Soft foods', 'Dairy products', 'Fruits'],
    distance: 5.1,
    contactPhone: '+91-9876543213',
    matchScore: 76
  },
  {
    id: 'charity-5',
    name: 'Children\'s Aid Society',
    type: 'Youth Center',
    location: 'West End, 6.3 km away',
    capacity: 250,
    specializations: ['Healthy snacks', 'Fruits', 'Dairy products'],
    distance: 6.3,
    contactPhone: '+91-9876543214',
    matchScore: 71
  }
];