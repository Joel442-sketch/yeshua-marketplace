import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingCart, Minus, Plus, Truck, Shield, RotateCcw, Share2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/data/products";
import { formatPrice, getDiscount } from "@/lib/format";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<"description" | "reviews">("description");

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <Link to="/products" className="text-primary hover:underline mt-2 block">Back to products</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = getDiscount(product.price, product.originalPrice);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main className="container py-6">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="space-y-3">
            <div className="relative bg-card rounded-2xl overflow-hidden border border-border">
              <img src={product.images[0]} alt={product.name} className="w-full aspect-square object-cover" />
              {discount && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-0 text-sm font-bold px-3 py-1">
                  -{discount}% OFF
                </Badge>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold leading-tight">{product.name}</h1>

            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-border"} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
              <span className="text-sm text-primary">| {product.seller.name} ✓</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            {/* Variants */}
            {product.variants?.map((variant) => (
              <div key={variant.type} className="mt-5">
                <label className="text-sm font-semibold block mb-2">{variant.type}</label>
                <div className="flex gap-2 flex-wrap">
                  {variant.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedVariants((p) => ({ ...p, [variant.type]: opt }))}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                        selectedVariants[variant.type] === opt
                          ? "border-primary bg-primary/5 text-primary font-medium"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mt-5">
              <label className="text-sm font-semibold block mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors">
                  <Minus size={16} />
                </button>
                <span className="w-10 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors">
                  <Plus size={16} />
                </button>
                <span className="text-sm text-muted-foreground">{product.stockCount} available</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <Button size="lg" className="flex-1" onClick={() => addItem(product, quantity, selectedVariants)}>
                <ShoppingCart size={18} className="mr-2" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="px-4">
                <Heart size={18} />
              </Button>
              <Button size="lg" variant="outline" className="px-4">
                <Share2 size={18} />
              </Button>
            </div>

            {/* Info */}
            <div className="mt-6 space-y-3">
              {[
                { icon: Truck, text: "Free delivery in Addis Ababa" },
                { icon: Shield, text: "Buyer protection guarantee" },
                { icon: RotateCcw, text: "7-day return policy" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Icon size={16} className="text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="flex gap-6 border-b border-border">
            {(["description", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                  activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "reviews" ? `Reviews (${product.reviewCount})` : tab}
              </button>
            ))}
          </div>
          <div className="py-6">
            {activeTab === "description" ? (
              <p className="text-muted-foreground leading-relaxed max-w-2xl">{product.description}</p>
            ) : (
              <p className="text-muted-foreground">Reviews will be loaded from the database once backend is connected.</p>
            )}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
