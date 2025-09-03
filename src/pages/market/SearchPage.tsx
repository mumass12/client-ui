import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, Filter, X } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { ProductCard } from "../../components/marketplace/ProductCard";
import { products, categories } from "../../data/products";
import { Cart } from "../../components/marketplace/Cart";

const SearchPage: React.FC = () => {
  const { user } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const isAuthenticated = !!user;
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);

  const searchResults = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Sort results
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Mock newest sort
        filtered.sort(() => Math.random() - 0.5);
        break;
      default:
        // Relevance - mock relevance scoring
        if (searchQuery.trim()) {
          filtered.sort((a, b) => {
            const aScore = a.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 1;
            const bScore = b.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 2 : 1;
            return bScore - aScore;
          });
        }
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery);
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    setSearchParams(params);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSearchParams({});
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
          <span className="text-primary-900 font-medium">Search Results</span>
        </nav>

        {/* Search Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8 mb-8">
          <h1 className="text-4xl font-bold text-primary-900 mb-6">Search Products</h1>
          
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, or categories..."
                  className="w-full pl-12 pr-4 py-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-6 py-4 border border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Search
              </button>
            </div>
          </form>

          {/* Active Filters */}
          {(searchQuery || selectedCategory !== "all") && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="inline-flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                  Category: {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="ml-2 text-primary-600 hover:text-primary-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={clearSearch}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-primary-900">
              {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
            </h2>
            <p className="text-primary-600 mt-1">
              {searchResults.length} product{searchResults.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 border border-primary-300 text-primary-600 rounded-lg hover:bg-primary-50 transition-all duration-300 md:hidden"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-primary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="relevance">Most Relevant</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Newest First</option>
            </select>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <Search className="w-16 h-16 text-primary-400" />
            </div>
            <h3 className="text-2xl font-bold text-primary-900 mb-4">No results found</h3>
            <p className="text-lg text-primary-600 max-w-md mx-auto leading-relaxed mb-8">
              {searchQuery 
                ? `We couldn't find any products matching "${searchQuery}". Try different keywords or browse our categories.`
                : "No products match your current filters. Try adjusting your search criteria."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={clearSearch}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
              >
                Clear Search
              </button>
              <Link
                to="/categories"
                className="border border-primary-300 text-primary-600 px-6 py-3 rounded-xl hover:bg-primary-50 transition-colors font-semibold text-center"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Search Suggestions */}
        {searchQuery && searchResults.length > 0 && searchResults.length < 5 && (
          <div className="mt-12 bg-primary-50 rounded-2xl p-8 border border-primary-200">
            <h3 className="text-xl font-bold text-primary-900 mb-4">Didn't find what you're looking for?</h3>
            <p className="text-primary-600 mb-6">
              Try these suggestions to find more products:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-primary-800 mb-2">Search Tips:</h4>
                <ul className="text-sm text-primary-600 space-y-1">
                  <li>• Try different keywords</li>
                  <li>• Check your spelling</li>
                  <li>• Use more general terms</li>
                  <li>• Browse by category instead</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-primary-800 mb-2">Popular Categories:</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 4).map((category) => (
                    <Link
                      key={category.id}
                      to={`/search?category=${category.name}`}
                      className="bg-white text-primary-600 px-3 py-1 rounded-full text-sm hover:bg-primary-100 transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <Cart />
      <FooterSection />
    </div>
  );
};

export default SearchPage;