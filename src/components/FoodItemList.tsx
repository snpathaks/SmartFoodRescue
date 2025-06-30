import React from 'react';
import { Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { FoodItem, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface FoodItemListProps {
  language: Language;
  items: FoodItem[];
}

export const FoodItemList: React.FC<FoodItemListProps> = ({ language, items }) => {
  const getSafetyIcon = (status: FoodItem['safetyStatus']) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'expiring':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'urgent':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getSafetyColor = (status: FoodItem['safetyStatus']) => {
    switch (status) {
      case 'safe':
        return 'border-l-green-500 bg-green-50';
      case 'expiring':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'urgent':
        return 'border-l-red-500 bg-red-50';
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Your Food Items ({items.length})
      </h3>
      
      {items.map((item) => (
        <div
          key={item.id}
          className={`border-l-4 rounded-lg p-4 ${getSafetyColor(item.safetyStatus)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center mb-2">
                {getSafetyIcon(item.safetyStatus)}
                <h4 className="font-medium text-gray-900 ml-2">{item.name}</h4>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">{getTranslation(language, 'category')}:</span>{' '}
                  {getTranslation(language, item.category)}
                </p>
                <p>
                  <span className="font-medium">{getTranslation(language, 'quantity')}:</span>{' '}
                  {item.quantity} {getTranslation(language, item.unit)}
                </p>
                <p>
                  <span className="font-medium">{getTranslation(language, 'expiryDate')}:</span>{' '}
                  {item.expiryDate.toLocaleDateString()}
                </p>
                {item.description && (
                  <p>
                    <span className="font-medium">{getTranslation(language, 'description')}:</span>{' '}
                    {item.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="text-sm font-medium">
              <span className={
                item.safetyStatus === 'safe' ? 'text-green-700' :
                item.safetyStatus === 'expiring' ? 'text-yellow-700' :
                'text-red-700'
              }>
                {getTranslation(language, item.safetyStatus)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};