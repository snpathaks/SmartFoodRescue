import React from 'react';
import { MapPin, Phone, Star, Users } from 'lucide-react';
import { Charity, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface CharityMatchingProps {
  language: Language;
  charities: Charity[];
  onSelectCharity: (charity: Charity) => void;
  loading?: boolean;
}

export const CharityMatching: React.FC<CharityMatchingProps> = ({ 
  language, 
  charities, 
  onSelectCharity,
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">
            {getTranslation(language, 'findingCharities')}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {getTranslation(language, 'matchedCharities')}
      </h3>
      
      <div className="space-y-4">
        {charities.map((charity) => (
          <div
            key={charity.id}
            className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{charity.name}</h4>
                <p className="text-sm text-gray-600">{charity.type}</p>
              </div>
              
              <div className="flex items-center text-sm">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="font-medium">{charity.matchScore}%</span>
                <span className="text-gray-500 ml-1">
                  {getTranslation(language, 'matchScore')}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{charity.distance}km {getTranslation(language, 'distance')}</span>
              </div>
              
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>{charity.capacity} {getTranslation(language, 'capacity')}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>{charity.contactPhone}</span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Specializations:</span>{' '}
                {charity.specializations.join(', ')}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Location:</span> {charity.location}
              </p>
            </div>
            
            <button
              onClick={() => onSelectCharity(charity)}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {getTranslation(language, 'selectCharity')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};