import React, { useState } from 'react';
import { MapPin, Star, Clock, DollarSign, Heart, Share2, ArrowLeft, Calendar, Users, Camera, Mountain } from 'lucide-react';
import { Destination } from '../data/destinations';
import { useAuth } from '../contexts/AuthContext';

interface DestinationDetailProps {
  destination: Destination;
  onBack: () => void;
  onAddToItinerary: (destination: Destination) => void;
}

const DestinationDetail: React.FC<DestinationDetailProps> = ({ 
  destination, 
  onBack, 
  onAddToItinerary 
}) => {
  const { userProfile, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'activities' | 'reviews'>('overview');

  const handleSaveDestination = async () => {
    if (!userProfile) return;
    
    const savedDestinations = userProfile.savedDestinations || [];
    const isAlreadySaved = savedDestinations.includes(destination.id);
    
    const updatedSaved = isAlreadySaved
      ? savedDestinations.filter(id => id !== destination.id)
      : [...savedDestinations, destination.id];
    
    await updateUserProfile({ savedDestinations: updatedSaved });
  };

  const isSaved = userProfile?.savedDestinations?.includes(destination.id) || false;

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

  const mockReviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2024-01-15',
      comment: 'Absolutely breathtaking! The sunsets were incredible and the local culture was so welcoming.',
      helpful: 24
    },
    {
      id: 2,
      author: 'John D.',
      rating: 4,
      date: '2024-01-10',
      comment: 'Great destination for couples. A bit pricey but worth every penny for the experience.',
      helpful: 18
    },
    {
      id: 3,
      author: 'Maria L.',
      rating: 5,
      date: '2024-01-05',
      comment: 'Perfect for photography enthusiasts. Every corner is Instagram-worthy!',
      helpful: 31
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px]">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        
        {/* Header Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 bg-white/90 text-gray-800 px-4 py-2 rounded-lg hover:bg-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={handleSaveDestination}
              className={`p-3 rounded-lg transition-colors ${
                isSaved
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-800 hover:bg-white'
              }`}
            >
              <Heart className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button className="p-3 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-colors">
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Destination Info Overlay */}
        <div className="absolute bottom-8 left-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {destination.name}
                </h1>
                <p className="text-gray-600 flex items-center mb-2">
                  <MapPin className="h-5 w-5 mr-2" />
                  {destination.country}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                    <span className="font-semibold">{destination.averageRating}</span>
                    <span className="text-gray-600">({destination.reviewCount} reviews)</span>
                  </div>
                  <span className={`font-semibold ${getBudgetColor(destination.budget)}`}>
                    {getBudgetIcon(destination.budget)}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onAddToItinerary(destination)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Add to Itinerary
                </button>
                <button className="border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Duration</p>
            <p className="font-semibold">{destination.estimatedDays} days</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Best Time</p>
            <p className="font-semibold text-sm">{destination.bestTimeToVisit}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Travel Style</p>
            <p className="font-semibold text-sm capitalize">{destination.travelStyle[0]}</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <Mountain className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Category</p>
            <p className="font-semibold text-sm capitalize">{destination.category[0]}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'activities', label: 'Activities' },
                { id: 'reviews', label: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">About {destination.name}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">{destination.description}</p>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Highlights</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    {destination.highlights.map((highlight, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-3">
                          <Camera className="h-6 w-6 text-blue-600" />
                          <span className="font-medium text-gray-800">{highlight}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">Travel Categories</h4>
                  <div className="flex flex-wrap gap-3">
                    {destination.category.map((category) => (
                      <span
                        key={category}
                        className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full capitalize font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Things to Do</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {destination.activities.map((activity, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-bold">{index + 1}</span>
                        </div>
                        <h4 className="font-semibold text-gray-800 capitalize">{activity}</h4>
                      </div>
                      <p className="text-gray-600 text-sm">
                        Experience the best of {activity.toLowerCase()} that {destination.name} has to offer.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-800">Reviews</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Write Review
                  </button>
                </div>

                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold">
                              {review.author.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{review.author}</p>
                            <p className="text-sm text-gray-600">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      <div className="flex items-center justify-between">
                        <button className="text-sm text-blue-600 hover:text-blue-700">
                          Helpful ({review.helpful})
                        </button>
                        <button className="text-sm text-gray-600 hover:text-gray-700">
                          Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetail;