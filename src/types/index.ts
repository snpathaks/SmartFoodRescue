export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  language: Language;
}

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  quantity: number;
  unit: string;
  expiryDate: Date;
  safetyStatus: 'safe' | 'expiring' | 'urgent';
  description?: string;
}

export interface Charity {
  id: string;
  name: string;
  type: string;
  location: string;
  capacity: number;
  specializations: string[];
  distance: number;
  contactPhone: string;
  matchScore: number;
}

export type Language = 'en' | 'hi' | 'ta';

export type FoodCategory = 
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'dairy'
  | 'meat'
  | 'prepared'
  | 'bakery'
  | 'beverages';

export interface ChatState {
  currentStep: 'welcome' | 'logging' | 'matching' | 'confirmation' | 'completed';
  foodItems: FoodItem[];
  selectedCharity: Charity | null;
  businessInfo: {
    name: string;
    address: string;
    phone: string;
  };
}