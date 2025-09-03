import React, { useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Star, ThumbsUp, ThumbsDown, Filter, Camera, Shield } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { products } from "../../data/products";
import { Cart } from "../../components/marketplace/Cart";

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
  notHelpful: number;
  images?: string[];
}

const ReviewsPage: React.FC = () => {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const isAuthenticated = !!user;
  
  const product = products.find(p => p.id === id);
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState("all");

  // Mock reviews data
  const reviews: Review[] = [
    {
      id: "1",
      userId: "user1",
      userName: "John D.",
      rating: 5,
      title: "Excellent quality!",
      comment: "This product exceeded my expectations. The build quality is fantastic and it works perfectly. Highly recommended!",
      date: "2024-12-10",
      verified: true,
      helpful: 12,
      notHelpful: 1,
      images: ["https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300"]
    },
    {
      id: "2",
      userId: "user2",
      userName: "Sarah M.",
      rating: 4,
      title: "Good value for money",
      comment: "Overall satisfied with the purchase. Good quality and fast delivery. Only minor issue was the packaging could be better.",
      date: "2024-12-08",
      verified: true,
      helpful: 8,
      notHelpful: 0
    },
    {
      id: "3",
      userId: "user3",
      userName: "Mike R.",
      rating: 5,
      title: "Perfect!",
      comment: "Exactly what I was looking for. Great design, excellent functionality. Will definitely buy from this brand again.",
      date: "2024-12-05",
      verified: false,
      helpful: 15,
      notHelpful: 2
    },
    {
      id: "4",
      userId: "user4",
      userName: "Lisa K.",
      rating: 3,
      title: "Average product",
      comment: "It's okay, does what it's supposed to do but nothing special. Expected a bit more for the price.",
      date: "2024-12-03",
      verified: true,
      helpful: 5,
      notHelpful: 3
    }
  ];

  const filteredReviews = useMemo(() => {
    let filtered = [...reviews];

    // Filter by rating
    if (filterRating !== "all") {
      const rating = parseInt(filterRating);
      filtered = filtered.filter(review => review.rating === rating);
    }

    // Sort reviews
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "highest":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "lowest":
        filtered.sort((a, b) => a.rating - b.rating);
        break;
      case "helpful":
        filtered.sort((a, b) => b.helpful - a.helpful);
        break;
    }

    return filtered;
  }, [reviews, sortBy, filterRating]);

  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  }, [reviews]);

  const averageRating = useMemo(() => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return reviews.length > 0 ? (total / reviews.length).toFixed(1) : "0";
  }, [reviews]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white pt-16">
        <NavigationHeader isAuthenticated={isAuthenticated} />
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary-900 mb-4">Product not found</h1>
            <Link to="/catalog" className="text-primary-600 hover:text-primary-700 font-medium">
              Return to catalog
            </Link>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white pt-16">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/catalog" className="hover:text-primary-600 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Product
          </Link>
          <span>/</span>
          <Link to={`/product/${product.id}`} className="hover:text-primary-600">
            {product.name}
          </Link>
          <span>/</span>
          <span className="text-primary-900 font-medium">Reviews</span>
        </nav>

        {/* Product Header */}
        <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8 mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-24 h-24 object-cover rounded-xl"
            />
            <div>
              <h1 className="text-3xl font-bold text-primary-900 mb-2">{product.name}</h1>
              <p className="text-primary-600 font-medium mb-2">{product.brand}</p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
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
                  <span className="text-lg font-bold text-primary-900">{averageRating}</span>
                  <span className="text-gray-600">({reviews.length} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6 sticky top-32">
              <h3 className="text-lg font-bold text-primary-900 mb-6 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter Reviews
              </h3>

              {/* Rating Distribution */}
              <div className="mb-6">
                <h4 className="font-semibold text-primary-900 mb-4">Rating</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => setFilterRating("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      filterRating === "all" ? "bg-primary-50 text-primary-700" : "hover:bg-gray-50"
                    }`}
                  >
                    All Ratings ({reviews.length})
                  </button>
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFilterRating(rating.toString())}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        filterRating === rating.toString() ? "bg-primary-50 text-primary-700" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm">{rating} stars</span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({ratingDistribution[rating as keyof typeof ratingDistribution]})
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h4 className="font-semibold text-primary-900 mb-4">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="highest">Highest Rating</option>
                  <option value="lowest">Lowest Rating</option>
                  <option value="helpful">Most Helpful</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-primary-900">
                  Customer Reviews ({filteredReviews.length})
                </h2>
                <button className="bg-primary-600 text-white px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors font-semibold">
                  Write a Review
                </button>
              </div>

              {/* Rating Summary */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 mb-8 border border-primary-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-900 mb-2">{averageRating}</div>
                    <div className="flex items-center justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-6 h-6 ${
                            i < Math.floor(parseFloat(averageRating))
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">Based on {reviews.length} reviews</p>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-8">{rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${(ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100}%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 w-8">
                          {ratingDistribution[rating as keyof typeof ratingDistribution]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reviews */}
              <div className="space-y-6">
                {filteredReviews.map((review) => (
                  <div key={review.id} className="border border-primary-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">
                            {review.userName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold text-primary-900">{review.userName}</h4>
                            {review.verified && (
                              <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                <Shield className="w-3 h-3" />
                                <span>Verified Purchase</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-semibold text-primary-900 mb-2">{review.title}</h5>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>

                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="mb-4">
                        <div className="flex space-x-2">
                          {review.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              alt={`Review image ${index + 1}`}
                              className="w-20 h-20 object-cover rounded-lg border border-primary-200"
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Helpful Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                          <ThumbsUp className="w-4 h-4" />
                          <span className="text-sm">Helpful ({review.helpful})</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                          <ThumbsDown className="w-4 h-4" />
                          <span className="text-sm">Not Helpful ({review.notHelpful})</span>
                        </button>
                      </div>
                      <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                        Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Write Review Section */}
              {isAuthenticated && (
                <div className="mt-12 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8 border border-primary-200">
                  <h3 className="text-xl font-bold text-primary-900 mb-6">Write Your Review</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-primary-900 mb-2">Rating</label>
                      <div className="flex items-center space-x-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className="p-1 hover:scale-110 transition-transform"
                          >
                            <Star className="w-8 h-8 text-gray-300 hover:text-yellow-400" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-900 mb-2">Review Title</label>
                      <input
                        type="text"
                        placeholder="Summarize your experience"
                        className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-900 mb-2">Your Review</label>
                      <textarea
                        rows={4}
                        placeholder="Tell others about your experience with this product"
                        className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-primary-900 mb-2">Add Photos (Optional)</label>
                      <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                        <Camera className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload photos</p>
                      </div>
                    </div>

                    <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                      Submit Review
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Cart />
      </div>
      <FooterSection />
    </div>
  );
};

export default ReviewsPage;