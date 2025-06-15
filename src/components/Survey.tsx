import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, DollarSign, Calendar, Users, Heart, Mountain, Waves, Building, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SurveyProps {
  onComplete: (preferences: any) => void;
}

const Survey: React.FC<SurveyProps> = ({ onComplete }) => {
  const { updateUserProfile } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    interests: [] as string[],
    budget: '',
    travelStyle: [] as string[],
    activities: [] as string[],
    duration: '',
    season: '',
    groupSize: ''
  });

  const steps = [
    {
      title: 'What interests you most?',
      subtitle: 'Select all that apply',
      type: 'interests',
      options: [
        { id: 'culture', label: 'Culture & History', icon: <Building className="h-6 w-6" /> },
        { id: 'adventure', label: 'Adventure & Sports', icon: <Mountain className="h-6 w-6" /> },
        { id: 'relaxation', label: 'Relaxation & Wellness', icon: <Waves className="h-6 w-6" /> },
        { id: 'nature', label: 'Nature & Wildlife', icon: <MapPin className="h-6 w-6" /> },
        { id: 'food', label: 'Food & Cuisine', icon: <Heart className="h-6 w-6" /> },
        { id: 'photography', label: 'Photography', icon: <Camera className="h-6 w-6" /> }
      ]
    },
    {
      title: 'What\'s your budget range?',
      subtitle: 'Per person for the entire trip',
      type: 'budget',
      options: [
        { id: 'low', label: 'Budget-friendly', description: 'Under $1,000' },
        { id: 'medium', label: 'Moderate', description: '$1,000 - $3,000' },
        { id: 'high', label: 'Luxury', description: '$3,000+' }
      ]
    },
    {
      title: 'How do you prefer to travel?',
      subtitle: 'Select your travel style',
      type: 'travelStyle',
      options: [
        { id: 'solo', label: 'Solo Adventure' },
        { id: 'couples', label: 'Romantic Getaway' },
        { id: 'family', label: 'Family Trip' },
        { id: 'friends', label: 'With Friends' },
        { id: 'luxury', label: 'Luxury Experience' },
        { id: 'backpacking', label: 'Backpacking' }
      ]
    },
    {
      title: 'What activities excite you?',
      subtitle: 'Choose your favorite activities',
      type: 'activities',
      options: [
        { id: 'hiking', label: 'Hiking & Trekking' },
        { id: 'beaches', label: 'Beach Activities' },
        { id: 'museums', label: 'Museums & Galleries' },
        { id: 'nightlife', label: 'Nightlife & Entertainment' },
        { id: 'shopping', label: 'Shopping' },
        { id: 'spa', label: 'Spa & Wellness' },
        { id: 'festivals', label: 'Festivals & Events' },
        { id: 'wildlife', label: 'Wildlife Watching' }
      ]
    },
    {
      title: 'How long do you prefer to travel?',
      subtitle: 'Choose your ideal trip duration',
      type: 'duration',
      options: [
        { id: 'weekend', label: '2-3 days' },
        { id: 'short', label: '4-7 days' },
        { id: 'medium', label: '1-2 weeks' },
        { id: 'long', label: '3+ weeks' }
      ]
    }
  ];

  const handleOptionSelect = (type: string, optionId: string) => {
    if (type === 'interests' || type === 'travelStyle' || type === 'activities') {
      const currentArray = preferences[type as keyof typeof preferences] as string[];
      const newArray = currentArray.includes(optionId)
        ? currentArray.filter(id => id !== optionId)
        : [...currentArray, optionId];
      
      setPreferences(prev => ({
        ...prev,
        [type]: newArray
      }));
    } else {
      setPreferences(prev => ({
        ...prev,
        [type]: optionId
      }));
    }
  };

  const isOptionSelected = (type: string, optionId: string) => {
    if (type === 'interests' || type === 'travelStyle' || type === 'activities') {
      return (preferences[type as keyof typeof preferences] as string[]).includes(optionId);
    }
    return preferences[type as keyof typeof preferences] === optionId;
  };

  const canProceed = () => {
    const currentStepType = steps[currentStep].type;
    if (currentStepType === 'interests' || currentStepType === 'travelStyle' || currentStepType === 'activities') {
      return (preferences[currentStepType as keyof typeof preferences] as string[]).length > 0;
    }
    return preferences[currentStepType as keyof typeof preferences] !== '';
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      await updateUserProfile({ preferences });
      onComplete(preferences);
    } catch (error) {
      console.error('Error saving preferences:', error);
      onComplete(preferences);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm text-gray-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Survey Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {currentStepData.title}
            </h2>
            <p className="text-lg text-gray-600">{currentStepData.subtitle}</p>
          </div>

          {/* Options */}
          <div className="grid gap-4 md:gap-6 mb-8">
            {currentStepData.type === 'budget' ? (
              <div className="grid gap-4">
                {currentStepData.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(currentStepData.type, option.id)}
                    className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                      isOptionSelected(currentStepData.type, option.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{option.label}</h3>
                        <p className="text-gray-600 mt-1">{option.description}</p>
                      </div>
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className={`grid gap-4 ${
                currentStepData.type === 'interests' ? 'grid-cols-1 md:grid-cols-2' : 
                currentStepData.type === 'activities' ? 'grid-cols-2 md:grid-cols-4' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {currentStepData.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(currentStepData.type, option.id)}
                    className={`p-4 md:p-6 rounded-xl border-2 transition-all duration-200 ${
                      isOptionSelected(currentStepData.type, option.id)
                        ? 'border-blue-500 bg-blue-50 transform scale-105'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      {option.icon && <div className="text-blue-600">{option.icon}</div>}
                      <span className="font-medium text-gray-800">{option.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 px-6 py-3 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;