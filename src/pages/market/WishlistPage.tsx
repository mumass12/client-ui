import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, X, ArrowLeft } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { useApp } from "../../context/MarketContext";
import { Cart } from "../../components/marketplace/Cart";

const WishlistPage: React.FC = () => {
  const { user } = useUser();
  const { state, dispatch } = useApp();
  const isAuthenticated = !!user;

  const handleAddToCart = (product: any) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: 1 },
    });
    dispatch({ type: "TOGGLE_CART", payload: true });
  };

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: productId });
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
              Continue Shopping
            </Link>
            <span>/</span>
            <span className="text-primary-900 font-medium">Wishlist</span>
          </nav>

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary-900 mb-4">My Wishlist</h1>
            <p className="text-lg text-primary-600 max-w-2xl mx-auto">
              Save your favorite items and never lose track of what you love
            </p>
          </div>

          {state.wishlist.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-16 h-16 text-primary-400" />
              </div>
              <h3 className="text-2xl font-bold text-primary-900 mb-4">Your wishlist is empty</h3>
              <p className="text-lg text-primary-600 max-w-md mx-auto leading-relaxed mb-8">
                Start adding products you love to keep track of them easily
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Start Shopping
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary-900">
                  {state.wishlist.length} item{state.wishlist.length !== 1 ? 's' : ''} in your wishlist
                </h2>
                <button
                  onClick={() => {
                    state.wishlist.forEach(product => {
                      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
                    });
                  }}
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {state.wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-primary-100"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      {/* Remove from wishlist button */}
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 hover:scale-110 shadow-md"
                      >
                        <X className="w-4 h-4" />
                      </button>

                      {product.discount && (
                        <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          -{product.discount}% OFF
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center space-x-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-gray-500 font-medium">
                          ({product.reviews})
                        </span>
                      </div>

                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-semibold text-primary-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors duration-300 text-lg">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-sm text-primary-500 mb-3 font-medium">
                        {product.brand}
                      </p>

                      <div className="flex items-center space-x-3 mb-4">
                        <span className="text-xl font-bold text-primary-900">
                          ₦{(product.price * 1500).toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-base text-gray-500 line-through">
                            ₦{(product.originalPrice * 1500).toLocaleString()}
                          </span>
                        )}
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        
        <Cart />
      </div>
      <FooterSection />
    </div>
  );
};

export default WishlistPage;