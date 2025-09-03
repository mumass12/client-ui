import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { Cart } from "../../components/marketplace/Cart";

const OrderPage: React.FC = () => {
  const { user } = useUser();
  const { orderId } = useParams<{ orderId: string }>();
  const isAuthenticated = !!user;

  // Mock order data
  const order = {
    id: orderId || "ORD-000001",
    status: "delivered",
    orderDate: "December 15, 2024",
    deliveryDate: "December 18, 2024",
    total: 448500,
    items: [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        brand: "AudioTech",
        price: 448500,
        quantity: 1,
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300"
      }
    ],
    shipping: {
      method: "Express Delivery",
      cost: 22500,
      address: {
        name: "John Doe",
        street: "123 Main Street, Apt 4B",
        city: "Lagos",
        state: "Lagos State",
        country: "Nigeria",
        postalCode: "100001",
        phone: "+234 801 234 5678"
      }
    },
    payment: {
      method: "Credit Card",
      last4: "1234",
      transactionId: "TXN-789012345"
    },
    tracking: {
      steps: [
        { status: "Order Placed", date: "Dec 15, 2024 10:30 AM", completed: true },
        { status: "Payment Confirmed", date: "Dec 15, 2024 10:32 AM", completed: true },
        { status: "Processing", date: "Dec 15, 2024 2:15 PM", completed: true },
        { status: "Shipped", date: "Dec 16, 2024 9:00 AM", completed: true },
        { status: "Out for Delivery", date: "Dec 18, 2024 8:30 AM", completed: true },
        { status: "Delivered", date: "Dec 18, 2024 2:45 PM", completed: true }
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
      case "out for delivery":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "shipped":
      case "out for delivery":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "processing":
        return <Package className="w-5 h-5 text-yellow-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <div className="pt-16">
        <Header />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <Link to="/account" className="hover:text-primary-600 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Account
            </Link>
            <span>/</span>
            <span className="text-primary-900 font-medium">Order Details</span>
          </nav>

          {/* Order Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-primary-900 mb-2">Order {order.id}</h1>
                <p className="text-gray-600">Placed on {order.orderDate}</p>
              </div>
              <div className="flex items-center space-x-3 mt-4 md:mt-0">
                {getStatusIcon(order.status)}
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <h3 className="font-semibold text-primary-900 mb-2">Order Total</h3>
                <p className="text-2xl font-bold text-primary-600">₦{order.total.toLocaleString()}</p>
              </div>
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <h3 className="font-semibold text-primary-900 mb-2">Payment Method</h3>
                <p className="text-gray-700">{order.payment.method} ending in {order.payment.last4}</p>
              </div>
              <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
                <h3 className="font-semibold text-primary-900 mb-2">Delivery Method</h3>
                <p className="text-gray-700">{order.shipping.method}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8">
              <h2 className="text-xl font-bold text-primary-900 mb-6">Order Items</h2>
              
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-primary-200 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-primary-500 mb-2">{item.brand}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary-600">₦{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-primary-200 mt-6 pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₦{(order.total - order.shipping.cost).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>₦{order.shipping.cost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-primary-900 border-t border-primary-200 pt-2">
                    <span>Total</span>
                    <span>₦{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping & Tracking */}
            <div className="space-y-8">
              {/* Shipping Address */}
              <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8">
                <h2 className="text-xl font-bold text-primary-900 mb-6">Shipping Address</h2>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-semibold text-primary-900">{order.shipping.address.name}</p>
                      <p className="text-gray-600">{order.shipping.address.street}</p>
                      <p className="text-gray-600">
                        {order.shipping.address.city}, {order.shipping.address.state} {order.shipping.address.postalCode}
                      </p>
                      <p className="text-gray-600">{order.shipping.address.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-600" />
                    <span className="text-gray-600">{order.shipping.address.phone}</span>
                  </div>
                </div>
              </div>

              {/* Order Tracking */}
              <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8">
                <h2 className="text-xl font-bold text-primary-900 mb-6">Order Tracking</h2>
                
                <div className="space-y-4">
                  {order.tracking.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? "bg-primary-600" : "bg-gray-200"
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          step.completed ? "text-primary-900" : "text-gray-500"
                        }`}>
                          {step.status}
                        </h3>
                        <p className={`text-sm ${
                          step.completed ? "text-gray-600" : "text-gray-400"
                        }`}>
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
              Download Invoice
            </button>
            <button className="border border-primary-300 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors font-semibold">
              Contact Support
            </button>
            <Link
              to="/catalog"
              className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
        
        <Cart />
      </div>
      <FooterSection />
    </div>
  );
};

export default OrderPage;