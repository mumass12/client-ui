import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu } from "lucide-react";
import { useApp } from "../../context/MarketContext";

export function Header() {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const cartItemCount = state.cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const wishlistCount = state.wishlist.length;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-medium hover:shadow-green-glow transition-all duration-500 hover:scale-110 animate-float">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent hover:from-primary-500 hover:to-primary-700 transition-all duration-300">
              Market
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/catalog"
              className={`text-sm font-medium transition-all duration-300 hover:text-primary-600 relative group py-2 ${
                isActive("/catalog") ? "text-primary-600" : "text-gray-700"
              }`}
            >
              Shop
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 group-hover:w-full ${isActive("/catalog") ? "w-full" : ""}`}
              ></span>
            </Link>
            <Link
              to="/categories"
              className={`text-sm font-medium transition-all duration-300 hover:text-primary-600 relative group py-2 ${
                isActive("/categories") ? "text-primary-600" : "text-gray-700"
              }`}
            >
              Categories
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300 group-hover:w-full ${isActive("/categories") ? "w-full" : ""}`}
              ></span>
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-all duration-300 group-hover:text-primary-500" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-gray-50/50 hover:bg-white focus:bg-white transition-all duration-300 placeholder-gray-500 hover:shadow-medium focus:shadow-green-glow group"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button className="p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-medium">
              <User className="w-5 h-5" />
            </button>

            <Link
              to="/wishlist"
              className="p-3 text-gray-600 hover:text-accent-600 hover:bg-accent-50 rounded-xl transition-all duration-300 relative group hover:scale-105 hover:shadow-red-glow"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent-500 to-accent-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-gentle shadow-red-glow">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => dispatch({ type: "TOGGLE_CART" })}
              className="p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 relative group hover:scale-105 hover:shadow-green-glow"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-500 to-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce-gentle shadow-green-glow">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button className="md:hidden p-3 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all duration-300 hover:scale-105">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
