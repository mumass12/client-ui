import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal } from "lucide-react";
import NavigationHeader from "../../components/navigation/NavigationHeader";
import FooterSection from "../../components/layouts/FooterSection";
import { Header } from "../../components/marketplace/Header";
import { useUser } from "../../context/UserContext";
import { ProductCard } from "../../components/marketplace/ProductCard";
import { products, categories } from "../../data/products";
import { FilterOptions } from "../../types";
import { Cart } from "../../components/marketplace/Cart";

const sortOptions = [
  { value: "relevance", label: "Relevance" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest First" },
];

export function CatalogPage() {
  const { user } = useUser();
  const isAuthenticated = !!user;
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState<FilterOptions>({
    categories: searchParams.get("category")
      ? [searchParams.get("category")!]
      : [],
    brands: [],
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    inStock: false,
  });

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    if (filters.brands.length > 0) {
      filtered = filtered.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    if (filters.inStock) {
      filtered = filtered.filter((product) => product.inStock);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [filters, sortBy]);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleCategory = (category: string) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    updateFilter("categories", updated);
  };

  const brands = Array.from(new Set(products.map((p) => p.brand)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <NavigationHeader isAuthenticated={isAuthenticated} />
      <div className="pt-16">
        <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary-900 mb-3 animate-slide-up">
              Product Catalog
            </h1>
            <p className="text-lg text-primary-700 animate-slide-up">
              Showing {filteredProducts.length} products
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-xl hover:bg-primary-50 transition-all duration-300 lg:hidden hover:scale-105 font-semibold"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-6 py-3 border-2 border-primary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300 hover:border-primary-600 font-semibold"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-primary-100">
              {/* Categories */}
              <div>
                <h3 className="font-bold text-primary-900 mb-4 text-lg">
                  Categories
                </h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-5 h-5"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-primary-600 transition-colors duration-300 font-medium">
                        {category.name}
                      </span>
                      <span className="ml-auto text-sm text-primary-500 font-medium">
                        ({category.productCount})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-bold text-primary-900 mb-4 text-lg">
                  Price Range
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      updateFilter("priceRange", [0, parseInt(e.target.value)])
                    }
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                  />
                  <div className="flex justify-between text-sm text-gray-600 font-semibold">
                    <span>$0</span>
                    <span className="text-primary-600">
                      ${filters.priceRange[1]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h3 className="font-bold text-primary-900 mb-4 text-lg">Brands</h3>
                <div className="space-y-3">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={(e) => {
                          const updated = e.target.checked
                            ? [...filters.brands, brand]
                            : filters.brands.filter((b) => b !== brand);
                          updateFilter("brands", updated);
                        }}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-5 h-5"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-primary-600 transition-colors duration-300 font-medium">
                        {brand}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock */}
              <div>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => updateFilter("inStock", e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 w-5 h-5"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-primary-600 transition-colors duration-300 font-medium">
                    In stock only
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-8 animate-float">
                  <Filter className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-primary-900 mb-4">
                  No products found
                </h3>
                <p className="text-lg text-primary-600 max-w-md mx-auto leading-relaxed">
                  Try adjusting your filters or search terms to discover amazing
                  products
                </p>
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
}
