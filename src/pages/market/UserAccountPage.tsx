import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Settings, Package, Heart, MapPin, CreditCard, Bell, Shield, LogOut } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { Cart } from "../../components/marketplace/Cart";

const UserAccountPage: React.FC = () => {
  const { user } = useUser();
  const isAuthenticated = !!user;
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileTab />;
      case "orders":
        return <OrdersTab />;
      case "wishlist":
        return <WishlistTab />;
      case "addresses":
        return <AddressesTab />;
      case "payment":
        return <PaymentTab />;
      case "notifications":
        return <NotificationsTab />;
      case "security":
        return <SecurityTab />;
      default:
        return <ProfileTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <div className="pt-16">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden">
                <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {user?.firstName} {user?.lastName}
                      </h3>
                      <p className="text-primary-200 text-sm">{user?.email}</p>
                    </div>
                  </div>
                </div>
                
                <nav className="p-2">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 mb-1 ${
                          activeTab === item.id
                            ? "bg-primary-50 text-primary-700 border-r-4 border-primary-600"
                            : "text-gray-600 hover:bg-primary-50 hover:text-primary-600"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                  
                  <div className="border-t border-gray-200 mt-4 pt-4">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-300 text-red-600 hover:bg-red-50">
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
        
        <Cart />
      </div>
      <FooterSection />
    </div>
  );
};

// Tab Components
const ProfileTab: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-primary-900 mb-6">Profile Information</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter first name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter last name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter email"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Enter phone number"
        />
      </div>
    </div>
    
    <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
      Save Changes
    </button>
  </div>
);

const OrdersTab: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-primary-900 mb-6">Order History</h2>
    
    <div className="space-y-4">
      {[1, 2, 3].map((order) => (
        <div key={order} className="border border-primary-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-primary-900">Order #ORD-{order.toString().padStart(6, '0')}</h3>
              <p className="text-sm text-gray-600">Placed on December {order + 10}, 2024</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Delivered
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <img
              src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Product"
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Premium Wireless Headphones</h4>
              <p className="text-sm text-gray-600">Quantity: 1</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary-600">₦448,500</p>
              <Link to={`/order/${order}`} className="text-sm text-primary-600 hover:text-primary-700">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const WishlistTab: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-primary-900 mb-6">My Wishlist</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="bg-primary-50 rounded-lg p-4 border border-primary-200">
          <img
            src="https://images.pexels.com/photos/794063/pexels-photo-794063.jpeg?auto=compress&cs=tinysrgb&w=300"
            alt="Wishlist item"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="font-semibold text-primary-900 mb-2">Elegant Summer Dress</h3>
          <p className="text-primary-600 font-bold mb-3">₦133,500</p>
          <div className="flex space-x-2">
            <button className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors">
              Add to Cart
            </button>
            <button className="p-2 border border-primary-300 rounded-lg hover:bg-primary-50 transition-colors">
              <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AddressesTab: React.FC = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-primary-900">Saved Addresses</h2>
      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
        Add New Address
      </button>
    </div>
    
    <div className="space-y-4">
      {[1, 2].map((address) => (
        <div key={address} className="border border-primary-200 rounded-lg p-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-primary-900 mb-2">
                {address === 1 ? "Home" : "Office"}
                {address === 1 && (
                  <span className="ml-2 bg-primary-100 text-primary-800 px-2 py-1 rounded-full text-xs">
                    Default
                  </span>
                )}
              </h3>
              <p className="text-gray-600">
                123 Main Street, Apt 4B<br />
                Lagos, Nigeria 100001<br />
                +234 801 234 5678
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="text-primary-600 hover:text-primary-700 text-sm">Edit</button>
              <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PaymentTab: React.FC = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-primary-900">Payment Methods</h2>
      <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
        Add Payment Method
      </button>
    </div>
    
    <div className="space-y-4">
      <div className="border border-primary-200 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
            <div>
              <p className="font-semibold text-primary-900">**** **** **** 1234</p>
              <p className="text-sm text-gray-600">Expires 12/26</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="text-primary-600 hover:text-primary-700 text-sm">Edit</button>
            <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const NotificationsTab: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-primary-900 mb-6">Notification Preferences</h2>
    
    <div className="space-y-4">
      {[
        { label: "Order Updates", description: "Get notified about order status changes" },
        { label: "Promotions", description: "Receive updates about sales and special offers" },
        { label: "New Products", description: "Be the first to know about new arrivals" },
        { label: "Price Drops", description: "Get alerts when items in your wishlist go on sale" },
      ].map((item, index) => (
        <div key={index} className="flex justify-between items-center p-4 border border-primary-200 rounded-lg">
          <div>
            <h3 className="font-semibold text-primary-900">{item.label}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked={index < 2} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
          </label>
        </div>
      ))}
    </div>
  </div>
);

const SecurityTab: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-primary-900 mb-6">Security Settings</h2>
    
    <div className="space-y-6">
      <div className="border border-primary-200 rounded-lg p-6">
        <h3 className="font-semibold text-primary-900 mb-4">Change Password</h3>
        <div className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Update Password
          </button>
        </div>
      </div>
      
      <div className="border border-primary-200 rounded-lg p-6">
        <h3 className="font-semibold text-primary-900 mb-4">Two-Factor Authentication</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Add an extra layer of security to your account</p>
          </div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default UserAccountPage;