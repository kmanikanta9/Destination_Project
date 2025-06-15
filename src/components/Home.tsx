import React from 'react';
import { MapPin, Users, Star, TrendingUp, Compass, Heart, ArrowRight, Globe, Camera, Calendar, Award, Sparkles } from 'lucide-react';

interface HomeProps {
  onGetStarted: () => void;
}

const Home: React.FC<HomeProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: <Compass className="h-8 w-8 text-blue-600" />,
      title: 'AI-Powered Recommendations',
      description: 'Get tailored destination suggestions based on your unique preferences and travel style.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Globe className="h-8 w-8 text-emerald-600" />,
      title: 'Interactive World Map',
      description: 'Explore destinations visually and discover hidden gems around the globe.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Community Reviews',
      description: 'Read authentic reviews from fellow travelers and share your own experiences.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Heart className="h-8 w-8 text-rose-600" />,
      title: 'Smart Itinerary Planner',
      description: 'Create personalized itineraries and save your favorite destinations for later.',
      color: 'from-rose-500 to-orange-500'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Destinations', icon: <MapPin className="h-6 w-6" /> },
    { number: '50K+', label: 'Happy Travelers', icon: <Users className="h-6 w-6" /> },
    { number: '100K+', label: 'Reviews', icon: <Star className="h-6 w-6" /> },
    { number: '4.9★', label: 'Average Rating', icon: <Award className="h-6 w-6" /> }
  ];

  const discoverSections = [
    {
      title: 'Trending Now',
      subtitle: 'Most popular destinations this month',
      icon: <TrendingUp className="h-6 w-6" />,
      image: 'https://images.pexels.com/photos/161901/santorini-oia-greece-island-161901.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Hidden Gems',
      subtitle: 'Discover off-the-beaten-path locations',
      icon: <Sparkles className="h-6 w-6" />,
      image: 'https://images.pexels.com/photos/2070033/pexels-photo-2070033.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Photography Spots',
      subtitle: 'Perfect locations for your next shot',
      icon: <Camera className="h-6 w-6" />,
      image: 'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Seasonal Picks',
      subtitle: 'Best destinations for this season',
      icon: <Calendar className="h-6 w-6" />,
      image: 'https://images.pexels.com/photos/259967/pexels-photo-259967.jpeg?auto=compress&cs=tinysrgb&w=400',
      gradient: 'from-blue-500 to-cyan-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      text: 'TravelMind helped me discover the most amazing hidden gems in Southeast Asia. The recommendations were spot-on!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Marco Rodriguez',
      location: 'Barcelona, Spain',
      text: 'The personalized itinerary feature saved me hours of planning. My trip to Japan was absolutely perfect!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      name: 'Emily Chen',
      location: 'Toronto, Canada',
      text: 'I love how the platform considers my budget and travel style. Every recommendation feels tailored just for me.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TravelMind
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#discover" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Discover</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Reviews</a>
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">AI-Powered Travel Recommendations</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              Discover Your
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block">
                Dream Destination
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
              Let our AI-powered platform guide you to extraordinary destinations tailored to your unique travel style, preferences, and budget.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={onGetStarted}
              className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center space-x-2"
            >
              <span>Start Your Journey</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="text-blue-600 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Section */}
      <section id="discover" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Discover Amazing Places
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore curated collections of destinations that match your interests and travel dreams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {discoverSections.map((section, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${section.gradient} opacity-60`} />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      {section.icon}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{section.subtitle}</p>
                  <div className="flex items-center text-blue-600 font-medium group-hover:text-purple-600 transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose TravelMind?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI technology with human insights to create the perfect travel planning experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className="relative">
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              What Travelers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied travelers who have discovered their perfect destinations with TravelMind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Explore the World?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join thousands of travelers who have discovered their dream destinations with TravelMind. Your next adventure is just a click away.
          </p>
          <button
            onClick={onGetStarted}
            className="group bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center space-x-2 mx-auto"
          >
            <span>Get Started Now</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold">TravelMind</span>
          </div>
          <p className="text-gray-400 mb-6">
            Discover your perfect destination with AI-powered recommendations.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;