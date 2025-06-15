import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Home from './components/Home';
import Auth from './components/Auth';
import Survey from './components/Survey';
import Recommendations from './components/Recommendations';
import DestinationDetail from './components/DestinationDetail';
import Map from './components/Map';
import Trending from './components/Trending';
import Itinerary from './components/Itinerary';
import Profile from './components/Profile';
import { Destination } from './data/destinations';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [userPreferences, setUserPreferences] = useState<any>(null);

  useEffect(() => {
    if (!user && currentSection !== 'home' && currentSection !== 'auth') {
      setCurrentSection('auth');
    }
  }, [user, currentSection]);

  const handleSectionChange = (section: string) => {
    if (!user && section !== 'home' && section !== 'auth') {
      setCurrentSection('auth');
      return;
    }
    setCurrentSection(section);
    setSelectedDestination(null);
  };

  const handleAuthSuccess = () => {
    setCurrentSection('survey');
  };

  const handleSurveyComplete = (preferences: any) => {
    setUserPreferences(preferences);
    setCurrentSection('recommendations');
  };

  const handleDestinationSelect = (destination: Destination) => {
    setSelectedDestination(destination);
    setCurrentSection('destination-detail');
  };

  const handleAddToItinerary = (destination: Destination) => {
    setSelectedDestination(destination);
    setCurrentSection('itinerary');
  };

  const handleBackFromDetail = () => {
    setSelectedDestination(null);
    setCurrentSection('recommendations');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (currentSection === 'destination-detail' && selectedDestination) {
      return (
        <DestinationDetail
          destination={selectedDestination}
          onBack={handleBackFromDetail}
          onAddToItinerary={handleAddToItinerary}
        />
      );
    }

    switch (currentSection) {
      case 'home':
        return <Home onGetStarted={() => user ? setCurrentSection('survey') : setCurrentSection('auth')} />;
      case 'auth':
        return <Auth onSuccess={handleAuthSuccess} />;
      case 'survey':
        return <Survey onComplete={handleSurveyComplete} />;
      case 'recommendations':
        return (
          <Recommendations
            preferences={userPreferences}
            onDestinationSelect={handleDestinationSelect}
          />
        );
      case 'map':
        return <Map onDestinationSelect={handleDestinationSelect} />;
      case 'trending':
        return <Trending onDestinationSelect={handleDestinationSelect} />;
      case 'itinerary':
        return <Itinerary selectedDestination={selectedDestination} />;
      case 'profile':
        return <Profile />;
      default:
        return <Home onGetStarted={() => user ? setCurrentSection('survey') : setCurrentSection('auth')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentSection !== 'home' && currentSection !== 'auth' && currentSection !== 'destination-detail' && (
        <Header currentSection={currentSection} onSectionChange={handleSectionChange} />
      )}
      {renderContent()}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;