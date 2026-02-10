import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, List, ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const filtered = useMemo(() => {
    let result = [...products];
    if (categoryFilter) result = result.filter((p) => p.category === categoryFilter);
    if (ratingFilter) result = result.filter((p) => p.rating >= ratingFilter);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return result;
  }, [categoryFilter, sortBy, priceRange, ratingFilter]);

  const activeCategory = categories.find((c) => c.id === categoryFilter);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="container py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4">
          <span className="hover:text-primary cursor-pointer">Home</span>
          <span className="mx-2">/</span>
          <span className="text-foreground font-medium">{activeCategory?.name || "All Products"}</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold">{activeCategory?.name || "All Products"}</h1>
          <span className="text-sm text-muted-foreground">{filtered.length} products</span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm hover:bg-muted transition-colors"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  categoryFilter === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-border hover:bg-muted"
                }`}
              >
                {cat.icon} {cat.name}
              </a>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border text-sm bg-card focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mb-6 p-4 bg-card rounded-xl border border-border animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Price Range (ETB)</label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                  placeholder="Min"
                />
                <span className="text-muted-foreground">–</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className="w-full px-3 py-2 rounded-lg border border-border text-sm"
                  placeholder="Max"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Min Rating</label>
              <div className="flex gap-1">
                {[0, 3, 3.5, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRatingFilter(r)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      ratingFilter === r ? "bg-primary text-primary-foreground" : "border border-border hover:bg-muted"
                    }`}
                  >
                    {r === 0 ? "All" : `${r}★+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-lg">No products found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;
