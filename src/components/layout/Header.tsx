import { Link } from "react-router-dom";
import { Search, ShoppingCart, Heart, User, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { categories } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between py-1.5 text-xs md:text-sm">
          <span>🇪🇹 Free delivery in Addis Ababa on orders over ETB 2,000</span>
          <div className="hidden md:flex items-center gap-4">
            <Link to="/seller" className="hover:underline">Sell on YESHUA</Link>
            <span>|</span>
            <span>Help</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex items-center gap-4 py-3">
        <button className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-lg">
            Y
          </div>
          <span className="font-display font-bold text-xl hidden sm:block">
            YESHUA
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products, brands, and categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-12 py-2.5 rounded-lg border border-border bg-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          <Link to="/wishlist" className="p-2 rounded-lg hover:bg-muted transition-colors hidden sm:block">
            <Heart size={22} className="text-foreground" />
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors relative"
          >
            <ShoppingCart size={22} className="text-foreground" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent text-accent-foreground border-0">
                {totalItems}
              </Badge>
            )}
          </button>
          <Link to="/account" className="p-2 rounded-lg hover:bg-muted transition-colors hidden sm:block">
            <User size={22} className="text-foreground" />
          </Link>
        </div>
      </div>

      {/* Category nav */}
      <nav className="hidden lg:block border-t border-border">
        <div className="container flex items-center gap-6 py-2 text-sm">
          <button className="flex items-center gap-1 font-semibold text-primary">
            <Menu size={16} /> All Categories <ChevronDown size={14} />
          </button>
          {categories.slice(0, 7).map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="text-muted-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
          <Link to="/deals" className="text-accent font-semibold whitespace-nowrap">
            🔥 Deals
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card animate-slide-in">
          <div className="container py-4 space-y-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-2 text-foreground hover:text-primary transition-colors"
              >
                <span className="text-xl">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
            <div className="border-t border-border pt-3 space-y-2">
              <Link to="/account" className="flex items-center gap-3 py-2" onClick={() => setMobileOpen(false)}>
                <User size={18} /> My Account
              </Link>
              <Link to="/wishlist" className="flex items-center gap-3 py-2" onClick={() => setMobileOpen(false)}>
                <Heart size={18} /> Wishlist
              </Link>
              <Link to="/seller" className="flex items-center gap-3 py-2 text-primary font-semibold" onClick={() => setMobileOpen(false)}>
                Sell on YESHUA
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
