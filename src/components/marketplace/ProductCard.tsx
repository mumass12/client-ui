import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Eye, Star } from "lucide-react";
import { Product } from "../../types";
import { useApp } from "../../context/MarketContext";

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

export function ProductCard({
  product,
  showQuickView = true,
}: ProductCardProps) {
  const { state, dispatch } = useApp();
  const isInWishlist = state.wishlist.some((item) => item.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity: 1 },
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 hover:scale-105 hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
          />
          {product.discount && (
            <div className="absolute top-4 left-4 bg-gradient-to-r from-secondary-light to-secondary-dark text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-secondary animate-pulse-gentle">
              -{product.discount}%
            </div>
          )}

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 group-hover:from-black/30 to-transparent transition-all duration-500 flex items-center justify-center">
            <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
              <button
                onClick={handleToggleWishlist}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-sm ${
                  isInWishlist
                    ? "bg-gradient-to-r from-secondary-light to-secondary-dark text-white shadow-secondary"
                    : "bg-white/90 text-gray-700 hover:bg-secondary-light hover:text-secondary hover:shadow-secondary"
                }`}
              >
                <Heart
                  className="w-5 h-5"
                  fill={isInWishlist ? "currentColor" : "none"}
                />
              </button>

              {showQuickView && (
                <button className="p-3 bg-white/90 text-gray-700 rounded-full hover:bg-gray-50 transition-all duration-300 hover:scale-110 backdrop-blur-sm hover:shadow-medium">
                  <Eye className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={handleAddToCart}
                className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full hover:from-primary-600 hover:to-primary-700 transition-all duration-300 hover:scale-110 shadow-green-glow hover:shadow-strong backdrop-blur-sm"
              >
                <ShoppingCart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex items-center">
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
            <span className="text-sm text-gray-500 font-medium">
              ({product.reviews})
            </span>
          </div>

          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300 text-lg">
            {product.name}
          </h3>

          <p className="text-sm text-gray-500 mb-3 font-medium">
            {product.brand}
          </p>

          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-base text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
