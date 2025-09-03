import { HeroSlider } from "../../components/marketplace/HeroSlider";
import { CategoryGrid } from "../../components/marketplace/CategoryGrid";
import { ProductGrid } from "../../components/marketplace/ProductGrid";
import { PromoBanner } from "../../components/marketplace/PromoBanner";
import { featuredProducts, trendingProducts } from "../../data/products";

export function MarketPage() {
  return (
    <div className="min-h-screen">
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
