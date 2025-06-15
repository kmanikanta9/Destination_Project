import React from 'react';
import { TrendingUp, Star, MapPin, Clock, Users, Siren as Fire } from 'lucide-react';
import { trendingDestinations, Destination } from '../data/destinations';

interface TrendingProps {
  onDestinationSelect: (destination: Destination) => void;
}

const Trending: React.FC<TrendingProps> = ({ onDestinationSelect }) => {
  const seasonalRecommendations = [
    {
      season: 'Winter Escapes',
      description: 'Warm destinations perfect for escaping the cold',
      destinations: trendingDestinations.filter(d => ['Dubai', 'Bali'].includes(d.name))
    },
    {
      season: 'Spring Adventures',
      description: 'Beautiful spring blooms and perfect weather',
      destinations: trendingDestinations.filter(d => ['Kyoto', 'Paris'].includes(d.name))
    }
  ];

  const popularActivities = [
    { name: 'Beach & Relaxation', count: '2.1k bookings', trend: '+15%' },
    { name: 'Cultural Tours', count: '1.8k bookings', trend: '+23%' },
    { name: 'Adventure Sports', count: '1.5k bookings', trend: '+31%' },
    { name: 'Photography Tours', count: '967 bookings', trend: '+18%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Fire className="h-8 w-8 text-orange-500" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              Trending Destinations
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what's hot right now - destinations that travelers are falling in love with
          </p>
        </div>

        {/* Trending Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800 mb-1">+47%</div>
            <div className="text-sm text-gray-600">Bookings This Month</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800 mb-1">12.5k</div>
            <div className="text-sm text-gray-600">Active Travelers</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <Star className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800 mb-1">4.8</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-800 mb-1">50+</div>
            <div className="text-sm text-gray-600">Hot Destinations</div>
          </div>
        </div>

        {/* Featured Trending Destinations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🔥 Most Popular Right Now
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {trendingDestinations.slice(0, 2).map((destination, index) => (
              <div
                key={destination.id}
                className="relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Trending Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                    <Fire className="h-4 w-4" />
                    <span>#{index + 1} Trending</span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-64">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{destination.name}</h3>
                      <p className="text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {destination.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-semibold text-gray-800">{destination.averageRating}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {destination.reviewCount} reviews
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2">{destination.description}</p>

                  {/* Trending Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <div className="text-green-600 font-bold">+{Math.floor(Math.random() * 30 + 20)}%</div>
                      <div className="text-xs text-gray-600">Bookings ↑</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <div className="text-blue-600 font-bold">{Math.floor(Math.random() * 500 + 200)}</div>
                      <div className="text-xs text-gray-600">This Week</div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {destination.category.slice(0, 3).map((cat) => (
                      <span
                        key={cat}
                        className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full capitalize font-medium"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onDestinationSelect(destination)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>Explore Now</span>
                    <TrendingUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonal Recommendations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🌟 Seasonal Highlights
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {seasonalRecommendations.map((season, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{season.season}</h3>
                  <p className="text-blue-100">{season.description}</p>
                </div>
                
                <div className="p-6">
                  <div className="space-y-4">
                    {season.destinations.map((destination) => (
                      <button
                        key={destination.id}
                        onClick={() => onDestinationSelect(destination)}
                        className="w-full flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                      >
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 text-left">
                          <h4 className="font-semibold text-gray-800">{destination.name}</h4>
                          <p className="text-sm text-gray-600">{destination.country}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{destination.averageRating}</span>
                            <span className="text-sm text-gray-600">•</span>
                            <Clock className="h-4 w-4 text-gray-600" />
                            <span className="text-sm text-gray-600">{destination.estimatedDays}d</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            📈 Trending Activities
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularActivities.map((activity, index) => (
              <div key={index} className="text-center p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">{activity.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{activity.count}</p>
                <div className="flex items-center justify-center space-x-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">{activity.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trending;