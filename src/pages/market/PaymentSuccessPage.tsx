import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Package, ArrowRight, Download, Share2 } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { useApp } from "../../context/MarketContext";

const PaymentSuccessPage: React.FC = () => {
  const { user } = useUser();
  const { dispatch } = useApp();
  const [searchParams] = useSearchParams();
  const isAuthenticated = !!user;
  
  const orderId = searchParams.get("orderId") || "ORD-000001";
  const amount = searchParams.get("amount") || "448500";

  // Clear cart on successful payment
  useEffect(() => {
    // Clear cart items
    dispatch({ type: "TOGGLE_CART", payload: false });
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <div className="pt-16">
        <Header />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            {/* Success Message */}
            <h1 className="text-4xl font-bold text-primary-900 mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-xl text-primary-600 mb-8 max-w-2xl mx-auto">
              Thank you for your purchase! Your order has been confirmed and will be processed shortly.
            </p>

            {/* Order Details Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-primary-100 p-8 mb-8 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Order Number</h3>
                  <p className="text-gray-600 font-mono">{orderId}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Amount Paid</h3>
                  <p className="text-2xl font-bold text-green-600">₦{parseInt(amount).toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Payment Method</h3>
                  <p className="text-gray-600">Credit Card ending in 1234</p>
                </div>
                <div>
                  <h3 className="font-semibold text-primary-900 mb-2">Estimated Delivery</h3>
                  <p className="text-gray-600">3-5 business days</p>
                </div>
              </div>
            </div>

            {/* What's Next */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white mb-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">What happens next?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <Package className="w-8 h-8 mx-auto mb-3 text-primary-200" />
                  <h3 className="font-semibold mb-2">Order Processing</h3>
                  <p className="text-sm text-primary-200">We'll prepare your items for shipment</p>
                </div>
                <div>
                  <Truck className="w-8 h-8 mx-auto mb-3 text-primary-200" />
                  <h3 className="font-semibold mb-2">Shipping</h3>
                  <p className="text-sm text-primary-200">Your order will be shipped within 24 hours</p>
                </div>
                <div>
                  <CheckCircle className="w-8 h-8 mx-auto mb-3 text-primary-200" />
                  <h3 className="font-semibold mb-2">Delivery</h3>
                  <p className="text-sm text-primary-200">Enjoy your new products!</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Link
                to={`/order/${orderId}`}
                className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Package className="w-5 h-5" />
                <span>Track Order</span>
              </Link>
              
              <button className="flex items-center justify-center space-x-2 border border-primary-300 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300">
                <Download className="w-5 h-5" />
                <span>Download Receipt</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 border border-primary-300 text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-all duration-300">
                <Share2 className="w-5 h-5" />
                <span>Share</span>
              </button>
            </div>

            {/* Continue Shopping */}
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Want to continue shopping?</p>
              <Link
                to="/catalog"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold group"
              >
                <span>Browse More Products</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Email Confirmation Notice */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-blue-900 mb-1">Confirmation Email Sent</h3>
                  <p className="text-sm text-blue-700">
                    We've sent a confirmation email to <span className="font-medium">{user?.email}</span> with your order details and tracking information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
};

export default PaymentSuccessPage;