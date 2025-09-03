import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Package } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { products } from "../../data/products";
import { Cart } from "../../components/marketplace/Cart";

const BrandsPage: React.FC = () => {
  const { user } = useUser();
  const isAuthenticated = !!user;
  const [searchTerm, setSearchTerm] = useState("");

  // Get unique brands with product counts
  const brands = React.useMemo(() => {
    const brandMap = new Map();
    
    products.forEach(product => {
      if (brandMap.has(product.brand)) {
        brandMap.set(product.brand, {
          ...brandMap.get(product.brand),
          productCount: brandMap.get(product.brand).productCount + 1,
          products: [...brandMap.get(product.brand).products, product]
        });
      } else {
        brandMap.set(product.brand, {
          name: product.brand,
          productCount: 1,
          products: [product],
          description: `Discover amazing products from ${product.brand}`,
          image: product.image
        });
      }
    });

    return Array.from(brandMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const filteredBrands = React.useMemo(() => {
    if (!searchTerm.trim()) return brands;
    
    return brands.filter(brand =>
      brand.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brands, searchTerm]);

  const featuredBrands = brands.filter(brand => brand.productCount >= 2);

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
          <span className="text-primary-900 font-medium">Brands</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary-900 mb-6">
            Shop by Brand
          </h1>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto leading-relaxed">
            Explore products from your favorite brands. From established names to emerging innovators, 
            find quality products that match your style and needs.
          </p>
        </div>

        {/* Search Brands */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search brands..."
              className="w-full pl-12 pr-4 py-4 border-2 border-primary-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg bg-white shadow-sm"
            />
          </div>
          {searchTerm && (
            <p className="text-center text-primary-600 mt-4">
              {filteredBrands.length} brand{filteredBrands.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* Featured Brands */}
        {!searchTerm && featuredBrands.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">Featured Brands</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredBrands.slice(0, 6).map((brand) => (
                <Link
                  key={brand.name}
                  to={`/catalog?brand=${brand.name}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-primary-100"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-primary-900/60 transition-all duration-500" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-primary-800 px-3 py-1 rounded-full text-sm font-bold">
                        Featured
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary-900 mb-2 group-hover:text-primary-600 transition-colors duration-300">
                      {brand.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{brand.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-primary-500">
                        <Package className="w-4 h-4" />
                        <span className="text-sm font-medium">{brand.productCount} products</span>
                      </div>
                      <span className="text-primary-600 group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* All Brands */}
        <section>
          <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">
            {searchTerm ? "Search Results" : "All Brands"}
          </h2>
          
          {filteredBrands.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-16 h-16 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-primary-900 mb-4">No brands found</h3>
              <p className="text-lg text-primary-600 max-w-md mx-auto leading-relaxed mb-8">
                No brands match your search. Try different keywords or browse all brands.
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold"
              >
                Show All Brands
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBrands.map((brand) => (
                <Link
                  key={brand.name}
                  to={`/catalog?brand=${brand.name}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border border-primary-100"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={brand.image}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-primary-900 mb-1 group-hover:text-primary-600 transition-colors duration-300">
                      {brand.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-primary-500">
                        <Package className="w-3 h-3" />
                        <span className="text-xs font-medium">{brand.productCount} products</span>
                      </div>
                      <span className="text-primary-600 group-hover:translate-x-1 transition-transform duration-300 text-sm">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Brand Statistics */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Brand Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary-200 mb-2">{brands.length}</div>
              <div className="text-primary-200">Total Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-200 mb-2">{featuredBrands.length}</div>
              <div className="text-primary-200">Featured Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-200 mb-2">{products.length}</div>
              <div className="text-primary-200">Total Products</div>
            </div>
          </div>
        </div>
      </div>
      
      <Cart />
      <FooterSection />
    </div>
  );
};

export default BrandsPage;