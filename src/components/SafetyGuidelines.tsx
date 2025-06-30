import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../utils/translations';

interface SafetyGuidelinesProps {
  language: Language;
}

export const SafetyGuidelines: React.FC<SafetyGuidelinesProps> = ({ language }) => {
  const guidelines = getTranslation(language, 'safetyGuidelines') as string[];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <Shield className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-blue-900">
          {getTranslation(language, 'safetyTitle')}
        </h3>
      </div>
      
      <div className="space-y-2">
        {Array.isArray(guidelines) ? guidelines.map((guideline, index) => (
          <div key={index} className="flex items-start">
            <AlertTriangle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-blue-800">{guideline}</span>
          </div>
        )) : (
          <div className="flex items-start">
            <AlertTriangle className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-sm text-blue-800">Food safety guidelines</span>
          </div>
        )}
      </div>
    </div>
  );
};