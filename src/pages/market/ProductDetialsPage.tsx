import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { products } from "../../data/products";
import { useApp } from "../../context/MarketContext";
import { ProductGrid } from "../../components/marketplace/ProductGrid";
import { Cart } from "../../components/marketplace/Cart";

export function ProductDetailPage() {
  const { user } = useUser();
  const isAuthenticated = !!user;
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
        <NavigationHeader isAuthenticated={isAuthenticated} />
        <div className="pt-16">
          <Header />
        <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-900 mb-4">
            Product not found
          </h1>
          <Link
            to="/catalog"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Return to catalog
          </Link>
        </div>
        </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  const isInWishlist = state.wishlist.some((item) => item.id === product.id);
  const images = product.images || [product.image];
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product,
        quantity,
        selectedSize: selectedSize || undefined,
        selectedColor: selectedColor || undefined,
      },
    });
    dispatch({ type: "TOGGLE_CART", payload: true });
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <div className="pt-16">
        <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-primary-600">
            Shop
          </Link>
          <span>/</span>
          <Link
            to={`/catalog?category=${product.category}`}
            className="hover:text-primary-600"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-primary-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? "border-emerald-600"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-primary-600 font-medium mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl font-bold text-primary-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-2 mb-4">
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
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-primary-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Save ${product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Options */}
            {product.colors && (
              <div>
                <h3 className="text-sm font-medium text-primary-900 mb-3">
                  Color
                </h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes && (
              <div>
                <h3 className="text-sm font-medium text-primary-900 mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 border rounded-md text-sm font-medium transition-colors ${
                        selectedSize === size
                          ? "border-primary-600 bg-primary-50 text-primary-700"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-primary-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`w-full border-2 py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 ${
                  isInWishlist
                    ? "border-red-300 bg-red-50 text-red-700 shadow-md"
                    : "border-primary-300 text-primary-700 hover:border-red-400 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${isInWishlist ? "fill-current" : ""}`}
                />
                <span>
                  {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </span>
              </button>
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Truck className="w-4 h-4" />
                <span>Free shipping on orders over ₦50,000</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <Shield className="w-4 h-4" />
                <span>2 year warranty included</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <RotateCcw className="w-4 h-4" />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-4 border-b-2 font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-gray-500 hover:text-primary-600"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="prose prose-gray max-w-none">
            {activeTab === "description" && (
              <div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-2 border-b border-gray-100"
                  >
                    <span className="font-medium text-primary-900">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl font-bold text-primary-900">
                    {product.rating}
                  </div>
                  <div>
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">
                      Based on {product.reviews} reviews
                    </p>
                  </div>
                </div>

                <div className="text-gray-600">
                  <p>
                    Customer reviews will be displayed here. This is a demo
                    implementation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductGrid
            products={relatedProducts}
            title="Related Products"
            subtitle="You might also like these products from the same category"
          />
        )}
      </div>
        <Cart />
      </div>
      <FooterSection />
    </div>
  );
}
