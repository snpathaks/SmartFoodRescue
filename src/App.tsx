import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, CheckCircle } from 'lucide-react';
import { Language, FoodItem, Charity, ChatState } from './types';
import { getTranslation } from './utils/translations';
import { mockCharities } from './utils/mockData';
import { useFoodSafety } from './hooks/useFoodSafety';
import { LanguageSelector } from './components/LanguageSelector';
import { FoodItemForm } from './components/FoodItemForm';
import { FoodItemList } from './components/FoodItemList';
import { CharityMatching } from './components/CharityMatching';
import { SafetyGuidelines } from './components/SafetyGuidelines';
import { DonationConfirmation } from './components/DonationConfirmation';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [chatState, setChatState] = useState<ChatState>({
    currentStep: 'welcome',
    foodItems: [],
    selectedCharity: null,
    businessInfo: { name: '', address: '', phone: '' }
  });
  const [rawFoodItems, setRawFoodItems] = useState<Omit<FoodItem, 'id' | 'safetyStatus'>[]>([]);
  const [matchingLoading, setMatchingLoading] = useState(false);
  const [availableCharities, setAvailableCharities] = useState<Charity[]>([]);

  // Process food items with safety analysis
  const processedFoodItems = useFoodSafety(rawFoodItems);

  // Update chat state when food items change
  useEffect(() => {
    setChatState(prev => ({ ...prev, foodItems: processedFoodItems }));
  }, [processedFoodItems]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleAddFood = (food: Omit<FoodItem, 'id' | 'safetyStatus'>) => {
    setRawFoodItems(prev => [...prev, food]);
    if (chatState.currentStep === 'welcome') {
      setChatState(prev => ({ ...prev, currentStep: 'logging' }));
    }
  };

  const handleFindCharities = async () => {
    setChatState(prev => ({ ...prev, currentStep: 'matching' }));
    setMatchingLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter charities based on food items (mock logic)
      const filteredCharities = mockCharities
        .map(charity => ({
          ...charity,
          matchScore: Math.max(60, charity.matchScore - Math.random() * 20)
        }))
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 4);
      
      setAvailableCharities(filteredCharities);
      setMatchingLoading(false);
    }, 2000);
  };

  const handleSelectCharity = (charity: Charity) => {
    setChatState(prev => ({ 
      ...prev, 
      selectedCharity: charity, 
      currentStep: 'confirmation' 
    }));
  };

  const handleConfirmDonation = (businessInfo: { name: string; address: string; phone: string }) => {
    setChatState(prev => ({ 
      ...prev, 
      businessInfo, 
      currentStep: 'completed' 
    }));
  };

  const handleStartOver = () => {
    setRawFoodItems([]);
    setAvailableCharities([]);
    setChatState({
      currentStep: 'welcome',
      foodItems: [],
      selectedCharity: null,
      businessInfo: { name: '', address: '', phone: '' }
    });
  };

  const renderCurrentStep = () => {
    switch (chatState.currentStep) {
      case 'welcome':
      case 'logging':
        return (
          <div>
            <SafetyGuidelines language={language} />
            <FoodItemForm language={language} onAddFood={handleAddFood} />
            <FoodItemList language={language} items={chatState.foodItems} />
            
            {chatState.foodItems.length > 0 && (
              <div className="text-center mt-8">
                <button
                  onClick={handleFindCharities}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  {getTranslation(language, 'donate')} ({chatState.foodItems.length} items)
                </button>
              </div>
            )}
          </div>
        );

      case 'matching':
        return (
          <div>
            <CharityMatching
              language={language}
              charities={availableCharities}
              onSelectCharity={handleSelectCharity}
              loading={matchingLoading}
            />
            
            {!matchingLoading && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setChatState(prev => ({ ...prev, currentStep: 'logging' }))}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {getTranslation(language, 'back')}
                </button>
              </div>
            )}
          </div>
        );

      case 'confirmation':
        return (
          <DonationConfirmation
            language={language}
            charity={chatState.selectedCharity!}
            foodItems={chatState.foodItems}
            onConfirm={handleConfirmDonation}
            onBack={() => setChatState(prev => ({ ...prev, currentStep: 'matching' }))}
          />
        );

      case 'completed':
        return (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {getTranslation(language, 'donationSuccess')}
            </h3>
            <p className="text-gray-600 mb-6">
              {getTranslation(language, 'thankYou')}
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h4 className="font-medium text-gray-900 mb-3">Donation Details:</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Organization:</span> {chatState.selectedCharity?.name}</p>
                <p><span className="font-medium">Items:</span> {chatState.foodItems.length} food items</p>
                <p><span className="font-medium">Business:</span> {chatState.businessInfo.name}</p>
                <p><span className="font-medium">Contact:</span> {chatState.businessInfo.phone}</p>
              </div>
            </div>
            
            <button
              onClick={handleStartOver}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {getTranslation(language, 'startOver')}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg mr-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {getTranslation(language, 'title')}
                </h1>
                <p className="text-sm text-gray-600">
                  {getTranslation(language, 'subtitle')}
                </p>
              </div>
            </div>
            
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message */}
        {chatState.currentStep === 'welcome' && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8 text-center">
            <MessageCircle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {getTranslation(language, 'welcome')}
            </h2>
            <p className="text-gray-600">
              {getTranslation(language, 'getStarted')}
            </p>
          </div>
        )}

        {/* Current Step Content */}
        {renderCurrentStep()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>FoodShare AI - Reducing food waste, supporting communities</p>
            <p className="mt-1">
              <strong>Disclaimer:</strong> Food safety guidelines are being researched and updated. 
              Please follow local regulations and use your best judgment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;