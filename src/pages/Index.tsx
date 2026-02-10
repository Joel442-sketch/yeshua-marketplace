import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, CreditCard, Headphones } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import ProductCard from "@/components/product/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/hero-banner.jpg";

const features = [
  { icon: Truck, title: "Fast Delivery", desc: "Same-day in Addis Ababa" },
  { icon: Shield, title: "Secure Shopping", desc: "100% secure payment" },
  { icon: CreditCard, title: "Easy Payment", desc: "Mobile money & card" },
  { icon: Headphones, title: "24/7 Support", desc: "Always here to help" },
];

const Index = () => {
  const featuredProducts = products.filter((p) => p.featured);
  const dealProducts = products.filter((p) => p.deal);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartDrawer />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={heroBanner} alt="YESHUA Shopping" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
          </div>
          <div className="container relative py-16 md:py-28">
            <div className="max-w-lg">
              <h1 className="font-display text-3xl md:text-5xl font-bold text-background leading-tight">
                Shop the Best of
                <span className="block text-secondary">Ethiopia Online</span>
              </h1>
              <p className="mt-4 text-background/80 text-sm md:text-base leading-relaxed">
                Discover thousands of products from trusted Ethiopian sellers. From electronics to traditional crafts — delivered to your door.
              </p>
              <div className="flex gap-3 mt-6">
                <Link to="/products">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                    Shop Now <ArrowRight size={16} className="ml-1" />
                  </Button>
                </Link>
                <Link to="/seller">
                  <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10">
                    Start Selling
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container -mt-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {features.map((f) => (
              <div key={f.title} className="bg-card rounded-xl p-4 flex items-center gap-3 shadow-sm border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <f.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{f.title}</p>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="container mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">Shop by Category</h2>
            <Link to="/products" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-card border border-border hover:border-primary hover:shadow-md transition-all group"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <span className="text-xs font-medium text-center leading-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="container mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              See More <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Deal Banner */}
        <section className="container mt-12">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-primary-foreground">
            <div className="max-w-md">
              <span className="text-secondary font-bold text-sm uppercase tracking-wider">Limited Time Offer</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold mt-2">Up to 40% Off Electronics</h2>
              <p className="mt-2 text-primary-foreground/80 text-sm">Get the best deals on smartphones, laptops, and accessories. Free delivery on all orders.</p>
              <Link to="/products?category=electronics">
                <Button className="mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                  Shop Deals <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Deals */}
        <section className="container mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold">🔥 Today's Deals</h2>
            <Link to="/deals" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              All Deals <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
