import React, { useState } from 'react';
import { User, MapPin, Heart, Calendar, Star, Edit3, Save, X, Settings, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { destinations } from '../data/destinations';

const Profile: React.FC = () => {
  const { user, userProfile, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    displayName: userProfile?.displayName || '',
    bio: '',
    favoriteDestination: '',
    travelGoal: ''
  });

  const savedDestinations = userProfile?.savedDestinations || [];
  const travelHistory = userProfile?.travelHistory || [];
  
  const savedDestinationData = destinations.filter(dest => 
    savedDestinations.includes(dest.id)
  );

  const handleSaveProfile = async () => {
    try {
      await updateUserProfile(editedProfile);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const stats = {
    destinationsVisited: travelHistory.length,
    savedDestinations: savedDestinations.length,
    totalDays: travelHistory.reduce((total, trip) => {
      const start = new Date(trip.startDate);
      const end = new Date(trip.endDate);
      const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return total + days;
    }, 0),
    averageRating: 4.7 // Mock data
  };

  const achievements = [
    { name: 'Explorer', description: 'Visited 5+ destinations', earned: stats.destinationsVisited >= 5 },
    { name: 'Planner', description: 'Saved 10+ destinations', earned: stats.savedDestinations >= 10 },
    { name: 'Adventurer', description: 'Traveled 30+ days', earned: stats.totalDays >= 30 },
    { name: 'Reviewer', description: 'Left 5+ reviews', earned: false } // Mock data
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32"></div>
          
          <div className="relative px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Profile Picture */}
              <div className="relative -mt-16 mb-4 md:mb-0">
                <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                    <User className="h-16 w-16 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editedProfile.displayName}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, displayName: e.target.value }))}
                      className="text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-blue-300 focus:border-blue-500 outline-none"
                      placeholder="Your Name"
                    />
                    <input
                      type="text"
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                      className="text-gray-600 bg-transparent border-b border-gray-300 focus:border-gray-500 outline-none w-full"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {userProfile?.displayName || user?.email}
                    </h1>
                    <p className="text-gray-600 mb-2">{user?.email}</p>
                    <p className="text-gray-700">{editedProfile.bio || 'Travel enthusiast exploring the world!'}</p>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <div className="flex space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveProfile}
                      className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-blue-600" />
                Travel Stats
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <span className="text-gray-700">Destinations Visited</span>
                  </div>
                  <span className="font-bold text-gray-800">{stats.destinationsVisited}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-red-600" />
                    <span className="text-gray-700">Saved Places</span>
                  </div>
                  <span className="font-bold text-gray-800">{stats.savedDestinations}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-700">Total Travel Days</span>
                  </div>
                  <span className="font-bold text-gray-800">{stats.totalDays}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-600" />
                    <span className="text-gray-700">Average Rating</span>
                  </div>
                  <span className="font-bold text-gray-800">{stats.averageRating}</span>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-orange-600" />
                Achievements
              </h2>
              
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border-2 ${
                      achievement.earned
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-green-500 text-white' : 'bg-gray-400 text-white'
                      }`}>
                        <Award className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className={`font-semibold ${
                          achievement.earned ? 'text-green-800' : 'text-gray-600'
                        }`}>
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Saved Destinations */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Heart className="h-5 w-5 mr-2 text-red-600" />
                Saved Destinations ({savedDestinations.length})
              </h2>
              
              {savedDestinationData.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {savedDestinationData.map((destination) => (
                    <div key={destination.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-3">
                        <img
                          src={destination.image}
                          alt={destination.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">{destination.name}</h3>
                          <p className="text-gray-600 text-sm">{destination.country}</p>
                          <div className="flex items-center space-x-1 mt-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{destination.averageRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No saved destinations yet</p>
                  <p className="text-sm text-gray-500">Start exploring and save places you'd like to visit!</p>
                </div>
              )}
            </div>

            {/* Travel History */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Travel History ({travelHistory.length})
              </h2>
              
              {travelHistory.length > 0 ? (
                <div className="space-y-4">
                  {travelHistory.map((trip) => (
                    <div key={trip.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={trip.destination.image}
                          alt={trip.destination.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{trip.destination.name}</h3>
                          <p className="text-gray-600 text-sm">{trip.destination.country}</p>
                          <p className="text-gray-500 text-sm">
                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {trip.notes && (
                        <p className="text-gray-700 text-sm mt-3 pl-20">{trip.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No trips recorded yet</p>
                  <p className="text-sm text-gray-500">Your travel adventures will appear here!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;