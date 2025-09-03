import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { categories } from "../../data/products";

export function CategoryGrid() {
  return (
    <section className="py-20 bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary-900 mb-6 animate-slide-up">
            Shop by Category
          </h2>
          <p className="text-lg text-primary-600 max-w-2xl mx-auto animate-slide-up">
            Explore our diverse collection of products across different
            categories, each carefully curated to meet your lifestyle needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/catalog?category=${category.name}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-primary-100"
            >
              <div className="aspect-square overflow-hidden relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-primary-900/60 transition-all duration-500" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-300 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-sm text-primary-200 mb-4 group-hover:text-primary-100 transition-colors duration-300">
                  {category.productCount} products
                </p>
                <div className="flex items-center text-sm font-semibold group-hover:text-primary-200 transition-all duration-300">
                  Shop Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
