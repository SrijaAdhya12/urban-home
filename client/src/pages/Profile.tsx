import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Home, Heart, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockProperties } from '../data/mockData';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  // Mock user listings and bookings for demo
  const userListings = mockProperties.slice(0, 2);
  const userBookings = mockProperties.slice(2, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-blue-600" />
                )}
              </div>
              <div className="text-white">
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-blue-100 mb-2">Member since {new Date(user.dateJoined).toLocaleDateString('en-IN')}</p>
                <div className="flex items-center text-blue-100">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Joined {new Date(user.dateJoined).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* User Info */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                    {user.address && (
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">{user.address}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <button className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Edit Profile
                  </button>
                </div>

                {/* Stats */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Statistics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <Home className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                      <p className="text-2xl font-bold text-gray-900">{userListings.length}</p>
                      <p className="text-sm text-gray-600">Listings</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <ShoppingBag className="w-6 h-6 text-green-600 mx-auto mb-1" />
                      <p className="text-2xl font-bold text-gray-900">{userBookings.length}</p>
                      <p className="text-sm text-gray-600">Bookings</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Listings and Bookings */}
              <div className="lg:col-span-2">
                {/* User Listings */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Your Listings</h2>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userListings.map((property) => (
                      <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <img
                          src={property.media[0]}
                          alt={property.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                            {property.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {property.location.city}, {property.location.state}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-600 font-semibold">
                              ₹{property.price.amount.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* User Bookings */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">Your Bookings</h2>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">View All</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userBookings.map((property) => (
                      <div key={property.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <img
                          src={property.media[0]}
                          alt={property.title}
                          className="w-full h-40 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                            {property.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2">
                            {property.location.city}, {property.location.state}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-600 font-semibold">
                              ₹{property.price.amount.toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              Booked
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;