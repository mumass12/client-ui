import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { Cart } from "../../components/marketplace/Cart";

const TrackingPage: React.FC = () => {
  const { user } = useUser();
  const { trackingId } = useParams<{ trackingId: string }>();
  const isAuthenticated = !!user;
  const [trackingNumber, setTrackingNumber] = useState(trackingId || "");

  // Mock tracking data
  const trackingData = {
    trackingNumber: trackingNumber || "TRK123456789",
    orderId: "ORD-000001",
    status: "in_transit",
    estimatedDelivery: "December 20, 2024",
    carrier: "DHL Express",
    currentLocation: "Lagos Distribution Center",
    timeline: [
      {
        status: "Order Placed",
        description: "Your order has been placed successfully",
        date: "Dec 15, 2024",
        time: "10:30 AM",
        completed: true,
        location: "Online"
      },
      {
        status: "Payment Confirmed",
        description: "Payment has been processed successfully",
        date: "Dec 15, 2024",
        time: "10:32 AM",
        completed: true,
        location: "Payment Gateway"
      },
      {
        status: "Order Processing",
        description: "Your order is being prepared for shipment",
        date: "Dec 15, 2024",
        time: "2:15 PM",
        completed: true,
        location: "Warehouse - Lagos"
      },
      {
        status: "Shipped",
        description: "Your package has been shipped",
        date: "Dec 16, 2024",
        time: "9:00 AM",
        completed: true,
        location: "Lagos Fulfillment Center"
      },
      {
        status: "In Transit",
        description: "Package is on its way to destination",
        date: "Dec 17, 2024",
        time: "8:30 AM",
        completed: true,
        location: "Lagos Distribution Center",
        current: true
      },
      {
        status: "Out for Delivery",
        description: "Package is out for delivery",
        date: "Dec 20, 2024",
        time: "Expected",
        completed: false,
        location: "Local Delivery Hub"
      },
      {
        status: "Delivered",
        description: "Package has been delivered",
        date: "Dec 20, 2024",
        time: "Expected",
        completed: false,
        location: "Delivery Address"
      }
    ]
  };

  const getStatusIcon = (status: string, completed: boolean, current?: boolean) => {
    if (current) {
      return <Truck className="w-6 h-6 text-blue-600" />;
    }
    if (completed) {
      return <CheckCircle className="w-6 h-6 text-green-600" />;
    }
    return <Clock className="w-6 h-6 text-gray-400" />;
  };

  const getStatusColor = (completed: boolean, current?: boolean) => {
    if (current) return "border-blue-500 bg-blue-50";
    if (completed) return "border-green-500 bg-green-50";
    return "border-gray-300 bg-gray-50";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white pt-16">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/account" className="hover:text-primary-600 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Account
          </Link>
          <span>/</span>
          <span className="text-primary-900 font-medium">Order Tracking</span>
        </nav>

        {/* Tracking Input */}
        <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8 mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-6">Track Your Order</h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="w-full px-4 py-3 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
              />
            </div>
            <button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
              Track Package
            </button>
          </div>
        </div>

        {trackingNumber && (
          <>
            {/* Tracking Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Package className="w-12 h-12 text-primary-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-primary-900 mb-1">Tracking Number</h3>
                  <p className="text-gray-600 font-mono">{trackingData.trackingNumber}</p>
                </div>
                <div className="text-center">
                  <Truck className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-primary-900 mb-1">Current Status</h3>
                  <p className="text-blue-600 font-semibold capitalize">{trackingData.status.replace('_', ' ')}</p>
                </div>
                <div className="text-center">
                  <Clock className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-primary-900 mb-1">Estimated Delivery</h3>
                  <p className="text-green-600 font-semibold">{trackingData.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            {/* Current Location */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 mb-8 border border-blue-200">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-1">Package Location</h3>
                  <p className="text-blue-700 text-lg">{trackingData.currentLocation}</p>
                  <p className="text-blue-600">Carrier: {trackingData.carrier}</p>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-8">
              <h2 className="text-2xl font-bold text-primary-900 mb-8">Tracking Timeline</h2>
              
              <div className="space-y-6">
                {trackingData.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusColor(event.completed, event.current)}`}>
                      {getStatusIcon(event.status, event.completed, event.current)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className={`font-semibold ${
                            event.current ? "text-blue-900" : 
                            event.completed ? "text-green-900" : "text-gray-500"
                          }`}>
                            {event.status}
                          </h3>
                          <p className={`text-sm ${
                            event.current ? "text-blue-700" : 
                            event.completed ? "text-gray-600" : "text-gray-400"
                          }`}>
                            {event.description}
                          </p>
                          <p className={`text-xs ${
                            event.current ? "text-blue-600" : 
                            event.completed ? "text-gray-500" : "text-gray-400"
                          }`}>
                            📍 {event.location}
                          </p>
                        </div>
                        <div className={`text-right mt-2 md:mt-0 ${
                          event.current ? "text-blue-600" : 
                          event.completed ? "text-gray-600" : "text-gray-400"
                        }`}>
                          <p className="text-sm font-medium">{event.date}</p>
                          <p className="text-xs">{event.time}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="mt-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-4">Need Help?</h2>
              <p className="text-primary-200 mb-6">
                If you have any questions about your shipment, our support team is here to help
              </p>
              <div className="flex flex-col sm 