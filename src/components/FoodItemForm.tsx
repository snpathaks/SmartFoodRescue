import React, { useState } from 'react';
import { Plus, Calendar, Package } from 'lucide-react';
import { FoodItem, FoodCategory, Language } from '../types';
import { getTranslation } from '../utils/translations';

interface FoodItemFormProps {
  language: Language;
  onAddFood: (food: Omit<FoodItem, 'id' | 'safetyStatus'>) => void;
}

export const FoodItemForm: React.FC<FoodItemFormProps> = ({ language, onAddFood }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'vegetables' as FoodCategory,
    quantity: 1,
    unit: 'kg',
    expiryDate: '',
    description: ''
  });

  const categories: FoodCategory[] = [
    'vegetables', 'fruits', 'grains', 'dairy', 'meat', 'prepared', 'bakery', 'beverages'
  ];

  const units = ['kg', 'pieces', 'liters', 'portions'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.expiryDate) {
      onAddFood({
        ...formData,
        expiryDate: new Date(formData.expiryDate)
      });
      setFormData({
        name: '',
        category: 'vegetables',
        quantity: 1,
        unit: 'kg',
        expiryDate: '',
        description: ''
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Package className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">
          {getTranslation(language, 'addFood')}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslation(language, 'foodName')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslation(language, 'category')}
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as FoodCategory })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {getTranslation(language, category)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslation(language, 'quantity')}
            </label>
            <input
              type="number"
              min="1"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslation(language, 'unit')}
            </label>
            <select
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {getTranslation(language, unit)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslation(language, 'expiryDate')}
            </label>
            <div className="relative">
              <input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {getTranslation(language, 'description')}
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={getTranslation(language, 'description')}
            />
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          {getTranslation(language, 'addItem')}
        </button>
      </form>
    </div>
  );
};