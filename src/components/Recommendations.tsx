import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, DollarSign, Heart, Share2, Eye, Calendar } from 'lucide-react';
import { destinations, Destination } from '../data/destinations';
import { useAuth } from '../contexts/AuthContext';

interface RecommendationsProps {
  preferences?: any;
  onDestinationSelect: (destination: Destination) => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({ preferences, onDestinationSelect }) => {
  const { userProfile, updateUserProfile } = useAuth();
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [sortBy, setSortBy] = useState<'rating' | 'budget' | 'relevance'>('relevance');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    let filtered = [...destinations];

    // Filter by user preferences
    if (preferences || userProfile?.preferences) {
      const userPrefs = preferences || userProfile?.preferences;
      
      filtered = filtered.filter(destination => {
        let score = 0;
        
        // Match interests
        if (userPrefs.interests) {
          const matchingInterests = destination.category.filter(cat => 
            userPrefs.interests.includes(cat)
          );
          score += matchingInterests.length * 2;
        }
        
        // Match budget
        if (userPrefs.budget && destination.budget === userPrefs.budget) {
          score += 3;
        }
        
        // Match travel style
        if (userPrefs.travelStyle) {
          const matchingStyles = destination.travelStyle.filter(style => 
            userPrefs.travelStyle.includes(style)
          );
          score += matchingStyles.length;
        }
        
        return score > 0;
      });
      
      // Sort by relevance score
      if (sortBy === 'relevance') {
        filtered.sort((a, b) => {
          let scoreA = 0, scoreB = 0;
          const userPrefs = preferences || userProfile?.preferences;
          
          // Calculate scores for sorting
          if (userPrefs.interests) {
            scoreA += a.category.filter(cat => userPrefs.interests.includes(cat)).length * 2;
            scoreB += b.category.filter(cat => userPrefs.interests.includes(cat)).length * 2;
          }
          
          return scoreB - scoreA;
        });
      }
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(dest => dest.category.includes(selectedCategory));
    }

    // Sort
    if (sortBy === 'rating') {
      filtered.sort((a, b) => b.averageRating - a.averageRating);
    } else if (sortBy === 'budget') {
      const budgetOrder = { 'low': 1, 'medium': 2, 'high': 3 };
      filtered.sort((a, b) => budgetOrder[a.budget] - budgetOrder[b.budget]);
    }

    setFilteredDestinations(filtered.length > 0 ? filtered : destinations);
  }, [preferences, userProfile, sortBy, selectedCategory]);

  const handleSaveDestination = async (destinationId: string) => {
    if (!userProfile) return;
    
    const savedDestinations = userProfile.savedDestinations || [];
    const isAlreadySaved = savedDestinations.includes(destinationId);
    
    const updatedSaved = isAlreadySaved
      ? savedDestinations.filter(id => id !== destinationId)
      : [...savedDestinations, destinationId];
    
    await updateUserProfile({ savedDestinations: updatedSaved });
  };

  const isSaved = (destinationId: string) => {
    return userProfile?.savedDestinations?.includes(destinationId) || false;
  };

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'romantic', label: 'Romantic' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'culture', label: 'Culture' },
    { id: 'relaxation', label: 'Relaxation' },
    { id: 'nature', label: 'Nature' }
  ];

  const getBudgetIcon = (budget: string) => {
    switch (budget) {
      case 'low': return '$';
      case 'medium': return '$$';
      case 'high': return '$$$';
      default: return '$';
    }
  };

  const getBudgetColor = (budget: string) => {
    switch (budget) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Your Perfect Destinations
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your preferences, we've curated these amazing destinations just for you.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="rating">Rating</option>
                <option value="budget">Budget</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-64">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getBudgetColor(destination.budget)} bg-white`}>
                    {getBudgetIcon(destination.budget)}
                  </span>
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => handleSaveDestination(destination.id)}
                    className={`p-2 rounded-full transition-colors ${
                      isSaved(destination.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isSaved(destination.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 bg-white/80 text-gray-700 rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{destination.name}</h3>
                    <p className="text-gray-600 flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {destination.country}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold text-gray-800">
                      {destination.averageRating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {destination.description}
                </p>

                {/* Details */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{destination.estimatedDays} days</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{destination.bestTimeToVisit}</span>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {destination.category.slice(0, 3).map((cat) => (
                    <span
                      key={cat}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full capitalize"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => onDestinationSelect(destination)}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    <Eye className="h-4 w-4 inline mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No destinations found</h3>
            <p className="text-gray-500">Try adjusting your filters or preferences.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recommendations;