import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Flame, Zap, Gift } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { ProductCard } from "../../components/marketplace/ProductCard";
import { products } from "../../data/products";
import { Cart } from "../../components/marketplace/Cart";

const DealsPage: React.FC = () => {
  const { user } = useUser();
  const isAuthenticated = !!user;
  const [activeTab, setActiveTab] = useState("all");

  // Mock deal data - in real app this would come from backend
  const deals = useMemo(() => {
    return products.filter(product => product.discount && product.discount > 0).map(product => ({
      ...product,
      dealType: product.discount! >= 30 ? "flash" : product.discount! >= 20 ? "daily" : "clearance",
      timeLeft: Math.floor(Math.random() * 24) + 1, // Hours left
      originalStock: 100,
      soldCount: Math.floor(Math.random() * 60) + 20
    }));
  }, []);

  const filteredDeals = useMemo(() => {
    if (activeTab === "all") return deals;
    return deals.filter(deal => deal.dealType === activeTab);
  }, [deals, activeTab]);

  const dealTabs = [
    { id: "all", label: "All Deals", icon: Gift, count: deals.length },
    { id: "flash", label: "Flash Sales", icon: Zap, count: deals.filter(d => d.dealType === "flash").length },
    { id: "daily", label: "Daily Deals", icon: Clock, count: deals.filter(d => d.dealType === "daily").length },
    { id: "clearance", label: "Clearance", icon: Flame, count: deals.filter(d => d.dealType === "clearance").length }
  ];

  const getDealBadgeColor = (dealType: string) => {
    switch (dealType) {
      case "flash":
        return "bg-red-500 text-white";
      case "daily":
        return "bg-orange-500 text-white";
      case "clearance":
        return "bg-purple-500 text-white";
      default:
        return "bg-primary-500 text-white";
    }
  };

  const getDealLabel = (dealType: string) => {
    switch (dealType) {
      case "flash":
        return "⚡ Flash Sale";
      case "daily":
        return "🌅 Daily Deal";
      case "clearance":
        return "🔥 Clearance";
      default:
        return "💰 Deal";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white pt-16">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/catalog" className="hover:text-primary-600 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Catalog
          </Link>
          <span>/</span>
          <span className="text-primary-900 font-medium">Deals & Offers</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary-900 mb-6">
            🔥 Amazing Deals & Offers
          </h1>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
            Don't miss out on incredible savings! Limited time offers, flash sales, and exclusive deals 
            on your favorite products.
          </p>
        </div>

        {/* Deal Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {dealTabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-xl"
                    : "bg-white text-primary-600 hover:bg-primary-50 border border-primary-200"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{tab.label}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  activeTab === tab.id ? "bg-white/20" : "bg-primary-100 text-primary-700"
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Deals Grid */}
        {filteredDeals.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Gift className="w-16 h-16 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-primary-900 mb-4">No deals available</h3>
            <p className="text-lg text-primary-600 max-w-md mx-auto leading-relaxed mb-8">
              Check back soon for amazing deals and offers on your favorite products.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredDeals.map((deal) => (
              <div key={deal.id} className="relative">
                {/* Deal Badge */}
                <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold ${getDealBadgeColor(deal.dealType)} shadow-lg`}>
                  {getDealLabel(deal.dealType)}
                </div>
                
                {/* Time Left Badge */}
                <div className="absolute top-4 right-4 z-10 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {deal.timeLeft}h left
                </div>
                
                <ProductCard product={deal} />
                
                {/* Deal Progress */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 border border-primary-200">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>Sold: {deal.soldCount}</span>
                    <span>Stock: {deal.originalStock - deal.soldCount}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(deal.soldCount / deal.originalStock) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-center text-primary-600 mt-2 font-medium">
                    {Math.round((deal.soldCount / deal.originalStock) * 100)}% claimed
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-xl text-primary-200 mb-6">
            Subscribe to our newsletter and be the first to know about exclusive offers and flash sales
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      
      <Cart />
      <FooterSection />
    </div>
  );
};

export default DealsPage;