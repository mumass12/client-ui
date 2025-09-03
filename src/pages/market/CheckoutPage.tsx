import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { useApp } from "../../context/MarketContext";

const CheckoutPage: React.FC = () => {
  const { user } = useUser();
  const { state } = useApp();
  const isAuthenticated = !!user;
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const subtotal = state.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = shippingMethod === "express" ? 15 : 5;
  const tax = subtotal * 0.075; // 7.5% VAT
  const total = subtotal + shipping + tax;

  const steps = [
    { id: 1, title: "Shipping", icon: Truck },
    { id: 2, title: "Payment", icon: CreditCard },
    { id: 3, title: "Review", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <div className="pt-16">
        <Header />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link to="/catalog" className="hover:text-primary-600 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Continue Shopping
            </Link>
            <span>/</span>
            <span className="text-primary-900 font-medium">Checkout</span>
          </nav>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {steps.map((stepItem) => {
                const IconComponent = stepItem.icon;
                return (
                  <div
                    key={stepItem.id}
                    className={`flex items-center space-x-2 ${
                      step >= stepItem.id ? "text-primary-600" : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step >= stepItem.id
                          ? "bg-primary-600 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="font-medium">{stepItem.title}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8">
                {step === 1 && <ShippingStep onNext={() => setStep(2)} />}
                {step === 2 && (
                  <PaymentStep
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                  />
                )}
                {step === 3 && (
                  <ReviewStep
                    shippingMethod={shippingMethod}
                    paymentMethod={paymentMethod}
                    onBack={() => setStep(2)}
                  />
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6 sticky top-32">
                <h3 className="text-lg font-bold text-primary-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  {state.cart.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{item.product.name}</h4>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-primary-600">
                        ₦{(item.product.price * item.quantity * 1500).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-primary-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₦{(subtotal * 1500).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>₦{(shipping * 1500).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (7.5%)</span>
                    <span>₦{(tax * 1500).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary-900 border-t border-primary-200 pt-2">
                    <span>Total</span>
                    <span>₦{(total * 1500).toLocaleString()}</span>
                  </div>
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

// Step Components
const ShippingStep: React.FC<{ onNext: () => void }> = ({ onNext }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-primary-900 mb-6">Shipping Information</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input
        type="text"
        placeholder="First Name"
        className="px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
      <input
        type="text"
        placeholder="Last Name"
        className="px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
      <input
        type="text"
        placeholder="Address"
        className="md:col-span-2 px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
      <input
        type="text"
        placeholder="City"
        className="px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
      <input
        type="text"
        placeholder="Postal Code"
        className="px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
      />
    </div>
    
    <div className="space-y-4">
      <h3 className="font-semibold text-primary-900">Shipping Method</h3>
      <div className="space-y-3">
        <label className="flex items-center space-x-3 p-4 border border-primary-200 rounded-lg cursor-pointer hover:bg-primary-50">
          <input type="radio" name="shipping" value="standard" defaultChecked className="text-primary-600" />
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-medium">Standard Delivery</span>
              <span className="font-semibold">₦7,500</span>
            </div>
            <p className="text-sm text-gray-600">5-7 business days</p>
          </div>
        </label>
        <label className="flex items-center space-x-3 p-4 border border-primary-200 rounded-lg cursor-pointer hover:bg-primary-50">
          <input type="radio" name="shipping" value="express" className="text-primary-600" />
          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-medium">Express Delivery</span>
              <span className="font-semibold">₦22,500</span>
            </div>
            <p className="text-sm text-gray-600">2-3 business days</p>
          </div>
        </label>
      </div>
    </div>
    
    <button
      onClick={onNext}
      className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
    >
      Continue to Payment
    </button>
  </div>
);

const PaymentStep: React.FC<{
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  onNext: () => void;
  onBack: () => void;
}> = ({ paymentMethod, setPaymentMethod, onNext, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-primary-900 mb-6">Payment Information</h2>
    
    <div className="space-y-4">
      <h3 className="font-semibold text-primary-900">Payment Method</h3>
      <div className="space-y-3">
        <label className="flex items-center space-x-3 p-4 border border-primary-200 rounded-lg cursor-pointer hover:bg-primary-50">
          <input
            type="radio"
            name="payment"
            value="card"
            checked={paymentMethod === "card"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="text-primary-600"
          />
          <CreditCard className="w-5 h-5 text-primary-600" />
          <span className="font-medium">Credit/Debit Card</span>
        </label>
        <label className="flex items-center space-x-3 p-4 border border-primary-200 rounded-lg cursor-pointer hover:bg-primary-50">
          <input
            type="radio"
            name="payment"
            value="paystack"
            checked={paymentMethod === "paystack"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="text-primary-600"
          />
          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white text-xs font-bold">P</span>
          </div>
          <span className="font-medium">Paystack</span>
        </label>
      </div>
    </div>
    
    {paymentMethod === "card" && (
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Card Number"
          className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="MM/YY"
            className="px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <input
            type="text"
            placeholder="CVV"
            className="px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <input
          type="text"
          placeholder="Cardholder Name"
          className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
    )}
    
    <div className="flex space-x-4">
      <button
        onClick={onBack}
        className="flex-1 border border-primary-300 text-primary-600 py-4 rounded-xl font-bold hover:bg-primary-50 transition-all duration-300"
      >
        Back to Shipping
      </button>
      <button
        onClick={onNext}
        className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
      >
        Review Order
      </button>
    </div>
  </div>
);

const ReviewStep: React.FC<{
  shippingMethod: string;
  paymentMethod: string;
  onBack: () => void;
}> = ({ shippingMethod, paymentMethod, onBack }) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-primary-900 mb-6">Review Your Order</h2>
    
    <div className="space-y-6">
      <div className="border border-primary-200 rounded-lg p-6">
        <h3 className="font-semibold text-primary-900 mb-4">Shipping Address</h3>
        <p className="text-gray-600">
          John Doe<br />
          123 Main Street, Apt 4B<br />
          Lagos, Nigeria 100001<br />
          +234 801 234 5678
        </p>
      </div>
      
      <div className="border border-primary-200 rounded-lg p-6">
        <h3 className="font-semibold text-primary-900 mb-4">Payment Method</h3>
        <div className="flex items-center space-x-3">
          <CreditCard className="w-5 h-5 text-primary-600" />
          <span className="capitalize">{paymentMethod} Payment</span>
          {paymentMethod === "card" && <span className="text-gray-600">**** 1234</span>}
        </div>
      </div>
      
      <div className="border border-primary-200 rounded-lg p-6">
        <h3 className="font-semibold text-primary-900 mb-4">Shipping Method</h3>
        <p className="text-gray-600 capitalize">
          {shippingMethod} Delivery - {shippingMethod === "express" ? "2-3" : "5-7"} business days
        </p>
      </div>
    </div>
    
    <div className="bg-primary-50 rounded-lg p-6 border border-primary-200">
      <div className="flex items-center space-x-3 mb-4">
        <Shield className="w-6 h-6 text-primary-600" />
        <h3 className="font-semibold text-primary-900">Secure Checkout</h3>
      </div>
      <p className="text-sm text-gray-600">
        Your payment information is encrypted and secure. We never store your card details.
      </p>
    </div>
    
    <div className="flex space-x-4">
      <button
        onClick={onBack}
        className="flex-1 border border-primary-300 text-primary-600 py-4 rounded-xl font-bold hover:bg-primary-50 transition-all duration-300"
      >
        Back to Payment
      </button>
      <button className="flex-1 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg">
        Place Order
      </button>
    </div>
  </div>
);

export default CheckoutPage;