import { useMemo } from 'react';
import { FoodItem } from '../types';

export const useFoodSafety = (foodItems: Omit<FoodItem, 'id' | 'safetyStatus'>[]): FoodItem[] => {
  return useMemo(() => {
    return foodItems.map((item, index) => {
      const now = new Date();
      const expiryDate = new Date(item.expiryDate);
      const hoursUntilExpiry = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60);
      
      let safetyStatus: FoodItem['safetyStatus'];
      
      if (hoursUntilExpiry <= 12) {
        safetyStatus = 'urgent';
      } else if (hoursUntilExpiry <= 48) {
        safetyStatus = 'expiring';
      } else {
        safetyStatus = 'safe';
      }

      return {
        ...item,
        id: `food-${index}-${Date.now()}`,
        safetyStatus
      };
    });
  }, [foodItems]);
};