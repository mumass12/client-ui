import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { HeroSlider } from "../../components/marketplace/HeroSlider";
import { CategoryGrid } from "../../components/marketplace/CategoryGrid";
import { ProductGrid } from "../../components/marketplace/ProductGrid";
import { PromoBanner } from "../../components/marketplace/PromoBanner";
import { featuredProducts, trendingProducts } from "../../data/products";
import { Cart } from "../../components/marketplace/Cart";

export function MarketPage() {
  const { user } = useUser();
  const isAuthenticated = !!user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <div className="pt-16">
        <Header />
        <HeroWithSidebar />
        <CategoryGrid />
        <ProductGrid
          products={featuredProducts}
          title="Featured Products"
          subtitle="Discover our hand-picked selection of premium products that define quality and style."
        />
        <PromoBanner />
        <ProductGrid
          products={trendingProducts}
          title="Trending Now"
          subtitle="Stay ahead of the curve with these popular items that everyone is talking about."
        />
        <Cart />
      </div>
      <FooterSection />
    </div>
  );
}

function HeroWithSidebar() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1">
          <CategorySidebar />
        </div>
        
        {/* Hero Slider */}
        <div className="lg:col-span-3">
          <HeroSlider />
        </div>
      </div>
    </div>
  );
}

function CategorySidebar() {
  const categories = [
    { name: "Fashion", icon: "👗", count: 156 },
    { name: "Electronics", icon: "📱", count: 89 },
    { name: "Home & Garden", icon: "🏠", count: 234 },
    { name: "Sports", icon: "⚽", count: 67 },
    { name: "Beauty", icon: "💄", count: 123 },
    { name: "Books", icon: "📚", count: 45 },
    { name: "Toys", icon: "🧸", count: 78 },
    { name: "Automotive", icon: "🚗", count: 34 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-4">
        <h3 className="text-lg font-bold text-white flex items-center">
          <span className="mr-2">🏷️</span>
          Shop by Category
        </h3>
      </div>
      
      <div className="p-2">
        {categories.map((category, index) => (
          <a
            key={index}
            href={`/catalog?category=${category.name}`}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-primary-50 transition-all duration-300 group border-b border-gray-50 last:border-b-0"
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </span>
              <span className="font-medium text-gray-700 group-hover:text-primary-600 transition-colors duration-300">
                {category.name}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full group-hover:bg-primary-100 group-hover:text-primary-600 transition-all duration-300">
                {category.count}
              </span>
              <svg 
                className="w-4 h-4 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>
      
      <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 border-t border-red-200">
        <div className="text-center">
          <p className="text-sm font-medium text-red-800 mb-2">🔥 Special Offers</p>
          <p className="text-xs text-red-600">Up to 50% off on selected items</p>
        </div>
      </div>
    </div>
  );
}
      <HeroSlider />
      <CategoryGrid />
      <ProductGrid
        products={featuredProducts}
        title="Featured Products"
        subtitle="Discover our hand-picked selection of premium products that define quality and style."
      />
      <PromoBanner />
      <ProductGrid
        products={trendingProducts}
        title="Trending Now"
        subtitle="Stay ahead of the curve with these popular items that everyone is talking about."
      />
    </div>
  );
}
