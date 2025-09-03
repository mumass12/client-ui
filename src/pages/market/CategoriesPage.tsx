import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Package } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { categories } from "../../data/products";
import { Cart } from "../../components/marketplace/Cart";

const CategoriesPage: React.FC = () => {
  const { user } = useUser();
  const isAuthenticated = !!user;

  const featuredCategories = [
    {
      id: "featured-1",
      name: "Best Sellers",
      description: "Most popular items across all categories",
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
      productCount: 45,
      badge: "🔥 Hot",
      color: "from-red-500 to-red-600"
    },
    {
      id: "featured-2", 
      name: "New Arrivals",
      description: "Latest products just added to our store",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800",
      productCount: 32,
      badge: "✨ New",
      color: "from-blue-500 to-blue-600"
    },
    {
      id: "featured-3",
      name: "Sale Items",
      description: "Great deals and discounted products",
      image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800",
      productCount: 67,
      badge: "💰 Sale",
      color: "from-green-500 to-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <div className="pt-16">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-primary-900 mb-6">
              Shop by Category
            </h1>
            <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
              Discover amazing products across all our carefully curated categories. 
              From fashion to electronics, we have everything you need.
            </p>
          </div>

          {/* Featured Categories */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">Featured Collections</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/catalog?featured=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color}/70 via-black/20 to-transparent`} />
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-bold">
                      {category.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-200 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 mb-4 group-hover:text-primary-100 transition-colors duration-300">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {category.productCount} products
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* All Categories */}
          <section>
            <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">All Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/catalog?category=${category.name}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-1 border border-primary-100"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-primary-900/60 transition-all duration-500" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-primary-500">
                        <Package className="w-4 h-4" />
                        <span className="text-sm font-medium">{category.productCount} products</span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
              <p className="text-xl text-primary-200 mb-6">
                Use our search feature or contact our support team for assistance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/catalog"
                  className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Browse All Products
                </Link>
                <Link
                  to="/contact"
                  className="border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Contact Support
                </Link>
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

export default CategoriesPage;