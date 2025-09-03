import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, X, Star, Check, Minus } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { products } from "../../data/products";
import { useApp } from "../../context/MarketContext";
import { Cart } from "../../components/marketplace/Cart";

const ComparisonPage: React.FC = () => {
  const { user } = useUser();
  const { dispatch } = useApp();
  const [searchParams] = useSearchParams();
  const isAuthenticated = !!user;
  
  // Get product IDs from URL params
  const productIds = searchParams.get("products")?.split(",") || [];
  const comparisonProducts = products.filter(p => productIds.includes(p.id));
  
  const [selectedProducts, setSelectedProducts] = useState(comparisonProducts);

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const addToCart = (product: any) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: 1 },
    });
    dispatch({ type: "TOGGLE_CART", payload: true });
  };

  const comparisonFeatures = [
    "Price",
    "Brand", 
    "Rating",
    "Reviews",
    "Category",
    "In Stock",
    "Sizes Available",
    "Colors Available",
    "Warranty",
    "Material",
    "Weight",
    "Dimensions"
  ];

  const getFeatureValue = (product: any, feature: string) => {
    switch (feature) {
      case "Price":
        return `₦${(product.price * 1500).toLocaleString()}`;
      case "Brand":
        return product.brand;
      case "Rating":
        return (
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        );
      case "Reviews":
        return `${product.reviews} reviews`;
      case "Category":
        return product.category;
      case "In Stock":
        return product.inStock ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <X className="w-5 h-5 text-red-600" />
        );
      case "Sizes Available":
        return product.sizes ? product.sizes.join(", ") : <Minus className="w-4 h-4 text-gray-400" />;
      case "Colors Available":
        return product.colors ? product.colors.join(", ") : <Minus className="w-4 h-4 text-gray-400" />;
      case "Warranty":
        return product.specifications?.Warranty || <Minus className="w-4 h-4 text-gray-400" />;
      case "Material":
        return product.specifications?.Material || <Minus className="w-4 h-4 text-gray-400" />;
      case "Weight":
        return product.specifications?.Weight || <Minus className="w-4 h-4 text-gray-400" />;
      case "Dimensions":
        return product.specifications?.Dimensions || <Minus className="w-4 h-4 text-gray-400" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
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
          <span className="text-primary-900 font-medium">Product Comparison</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">Compare Products</h1>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto">
            Compare features, prices, and specifications side by side to make the best choice
          </p>
        </div>

        {selectedProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="text-4xl">⚖️</div>
            </div>
            <h3 className="text-2xl font-bold text-primary-900 mb-4">No products to compare</h3>
            <p className="text-lg text-primary-600 max-w-md mx-auto leading-relaxed mb-8">
              Add products to your comparison from the catalog to see them here
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Product Headers */}
              <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: `200px repeat(${selectedProducts.length}, 1fr)` }}>
                <div></div>
                {selectedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => removeProduct(product.id)}
                        className="absolute top-2 right-2 p-1 bg-white/90 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {product.discount && (
                        <div className="absolute top-2 left-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                          -{product.discount}% OFF
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-primary-900 mb-2 text-lg">{product.name}</h3>
                      <p className="text-primary-600 font-medium mb-4">{product.brand}</p>
                      
                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-2xl font-bold text-primary-900">
                          ₦{(product.price * 1500).toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ₦{(product.originalPrice * 1500).toLocaleString()}
                          </span>
                        )}
                      </div>
                      
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Table */}
              <div className="bg-white rounded-2xl shadow-lg border border-primary-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <tbody>
                      {comparisonFeatures.map((feature, index) => (
                        <tr key={feature} className={index % 2 === 0 ? "bg-primary-50/30" : "bg-white"}>
                          <td className="px-6 py-4 font-semibold text-primary-900 border-r border-primary-200 w-48">
                            {feature}
                          </td>
                          {selectedProducts.map((product) => (
                            <td key={product.id} className="px-6 py-4 text-center border-r border-primary-100 last:border-r-0">
                              {getFeatureValue(product, feature)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/catalog"
                  className="bg-primary-600 text-white px-8 py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold text-center"
                >
                  Add More Products
                </Link>
                <button
                  onClick={() => {
                    selectedProducts.forEach(product => addToCart(product));
                  }}
                  className="border border-primary-300 text-primary-600 px-8 py-3 rounded-xl hover:bg-primary-50 transition-colors font-semibold"
                >
                  Add All to Cart
                </button>
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

export default ComparisonPage;