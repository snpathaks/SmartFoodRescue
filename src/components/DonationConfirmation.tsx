import React, { useState } from 'react';
import { Building, MapPin, Phone, Calendar } from 'lucide-react';
import { Charity, FoodItem, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface DonationConfirmationProps {
  language: Language;
  charity: Charity;
  foodItems: FoodItem[];
  onConfirm: (businessInfo: { name: string; address: string; phone: string }) => void;
  onBack: () => void;
}

export const DonationConfirmation: React.FC<DonationConfirmationProps> = ({
  language,
  charity,
  foodItems,
  onConfirm,
  onBack
}) => {
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    address: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(businessInfo);
  };

  const scheduledTime = new Date();
  scheduledTime.setHours(scheduledTime.getHours() + 2);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">
        {getTranslation(language, 'confirmDonation')}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Details Form */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">
            {getTranslation(language, 'businessDetails')}
          </h4>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation(language, 'businessName')}
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={businessInfo.name}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation(language, 'address')}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  value={businessInfo.address}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                  rows={3}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {getTranslation(language, 'phone')}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  value={businessInfo.phone}
                  onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                {getTranslation(language, 'back')}
              </button>
              <button
                type="submit"
                className="flex-1 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {getTranslation(language, 'confirm')}
              </button>
            </div>
          </form>
        </div>

        {/* Donation Summary */}
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Donation Summary</h4>
          
          {/* Selected Charity */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h5 className="font-medium text-gray-800 mb-2">Selected Organization</h5>
            <p className="text-sm text-gray-600">{charity.name}</p>
            <p className="text-sm text-gray-600">{charity.location}</p>
            <p className="text-sm text-gray-600">{charity.contactPhone}</p>
          </div>

          {/* Food Items */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h5 className="font-medium text-gray-800 mb-2">Food Items ({foodItems.length})</h5>
            <div className="space-y-2">
              {foodItems.map((item) => (
                <div key={item.id} className="text-sm text-gray-600">
                  <span className="font-medium">{item.name}</span> - {item.quantity} {getTranslation(language, item.unit)}
                </div>
              ))}
            </div>
          </div>

          {/* Pickup Schedule */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 text-green-600 mr-2" />
              <h5 className="font-medium text-green-800">
                {getTranslation(language, 'scheduledFor')}
              </h5>
            </div>
            <p className="text-sm text-green-700">
              {scheduledTime.toLocaleDateString()} at {scheduledTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};