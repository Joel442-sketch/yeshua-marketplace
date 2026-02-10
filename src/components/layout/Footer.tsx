import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const Footer = () => (
  <footer className="bg-foreground text-background/80 mt-16">
    <div className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
              Y
            </div>
            <span className="font-display font-bold text-lg text-background">YESHUA</span>
          </div>
          <p className="text-sm text-background/60 leading-relaxed">
            Ethiopia's trusted online shopping & delivery platform. Quality products, fast delivery, great prices.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-background mb-3">Shop</h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 5).map((cat) => (
              <li key={cat.id}>
                <Link to={`/products?category=${cat.id}`} className="hover:text-primary transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-background mb-3">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
            <li><Link to="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
            <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Info</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-background mb-3">Sell on YESHUA</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/seller" className="hover:text-primary transition-colors">Become a Seller</Link></li>
            <li><Link to="/seller/guide" className="hover:text-primary transition-colors">Seller Guide</Link></li>
            <li><Link to="/seller/policies" className="hover:text-primary transition-colors">Seller Policies</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-background/40">
        <span>© 2026 YESHUA Online Shopping & Delivery. All rights reserved.</span>
        <div className="flex gap-4 mt-2 md:mt-0">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Cookies</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
