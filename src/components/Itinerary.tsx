import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Star, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Destination } from '../data/destinations';

interface ItineraryItem {
  id: string;
  destination: Destination;
  startDate: string;
  endDate: string;
  notes: string;
}

interface ItineraryProps {
  selectedDestination?: Destination;
}

const Itinerary: React.FC<ItineraryProps> = ({ selectedDestination }) => {
  const { userProfile, updateUserProfile } = useAuth();
  const [itinerary, setItinerary] = useState<ItineraryItem[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    startDate: '',
    endDate: '',
    notes: ''
  });

  useEffect(() => {
    if (userProfile?.travelHistory) {
      setItinerary(userProfile.travelHistory);
    }
  }, [userProfile]);

  useEffect(() => {
    if (selectedDestination) {
      setShowAddForm(true);
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      const endDate = new Date(today.getTime() + (selectedDestination.estimatedDays + 7) * 24 * 60 * 60 * 1000);
      
      setNewItem({
        startDate: nextWeek.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        notes: `Exciting trip to ${selectedDestination.name}!`
      });
    }
  }, [selectedDestination]);

  const addToItinerary = async () => {
    if (!selectedDestination || !newItem.startDate || !newItem.endDate) return;

    const newItineraryItem: ItineraryItem = {
      id: Date.now().toString(),
      destination: selectedDestination,
      startDate: newItem.startDate,
      endDate: newItem.endDate,
      notes: newItem.notes
    };

    const updatedItinerary = [...itinerary, newItineraryItem];
    setItinerary(updatedItinerary);
    
    try {
      await updateUserProfile({ travelHistory: updatedItinerary });
    } catch (error) {
      console.error('Error updating itinerary:', error);
    }

    setShowAddForm(false);
    setNewItem({ startDate: '', endDate: '', notes: '' });
  };

  const removeFromItinerary = async (itemId: string) => {
    const updatedItinerary = itinerary.filter(item => item.id !== itemId);
    setItinerary(updatedItinerary);
    
    try {
      await updateUserProfile({ travelHistory: updatedItinerary });
    } catch (error) {
      console.error('Error updating itinerary:', error);
    }
  };

  const updateItineraryItem = async (itemId: string, updates: Partial<ItineraryItem>) => {
    const updatedItinerary = itinerary.map(item =>
      item.id === itemId ? { ...item, ...updates } : item
    );
    setItinerary(updatedItinerary);
    
    try {
      await updateUserProfile({ travelHistory: updatedItinerary });
    } catch (error) {
      console.error('Error updating itinerary:', error);
    }
    
    setEditingItem(null);
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const upcomingTrips = itinerary.filter(item => new Date(item.startDate) >= new Date());
  const pastTrips = itinerary.filter(item => new Date(item.startDate) < new Date());

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            My Travel Itinerary
          </h1>
          <p className="text-xl text-gray-600">
            Plan and manage your upcoming adventures
          </p>
        </div>

        {/* Add New Trip Form */}
        {showAddForm && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add New Trip</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {selectedDestination && (
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{selectedDestination.name}</h3>
                  <p className="text-gray-600">{selectedDestination.country}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm">{selectedDestination.averageRating}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={newItem.startDate}
                  onChange={(e) => setNewItem(prev => ({ ...prev, startDate: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={newItem.endDate}
                  onChange={(e) => setNewItem(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={newItem.notes}
                onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add any notes about your trip..."
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={addToItinerary}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
              >
                Add to Itinerary
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Add Trip Button */}
        {!showAddForm && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              <span>Plan New Trip</span>
            </button>
          </div>
        )}

        {/* Upcoming Trips */}
        {upcomingTrips.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <Calendar className="h-6 w-6 mr-2 text-blue-600" />
              Upcoming Trips ({upcomingTrips.length})
            </h2>
            
            <div className="space-y-6">
              {upcomingTrips.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <img
                          src={item.destination.image}
                          alt={item.destination.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">
                            {item.destination.name}
                          </h3>
                          <p className="text-gray-600 flex items-center mb-2">
                            <MapPin className="h-4 w-4 mr-1" />
                            {item.destination.country}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>{formatDate(item.startDate)} - {formatDate(item.endDate)}</span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {calculateDuration(item.startDate, item.endDate)} days
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setEditingItem(item.id)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromItinerary(item.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {item.notes && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="text-gray-700">{item.notes}</p>
                      </div>
                    )}

                    {/* Countdown */}
                    <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {Math.ceil((new Date(item.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                        </div>
                        <div className="text-sm text-gray-600">until your trip!</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Trips */}
        {pastTrips.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Past Adventures ({pastTrips.length})
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {pastTrips.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden opacity-75">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={item.destination.image}
                        alt={item.destination.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-bold text-gray-800">{item.destination.name}</h3>
                        <p className="text-gray-600">{item.destination.country}</p>
                        <p className="text-sm text-gray-500">
                          {formatDate(item.startDate)} - {formatDate(item.endDate)}
                        </p>
                      </div>
                    </div>
                    
                    {item.notes && (
                      <p className="text-gray-600 text-sm">{item.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {itinerary.length === 0 && !showAddForm && (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No trips planned yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first destination to your itinerary!</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Plan Your First Trip
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;