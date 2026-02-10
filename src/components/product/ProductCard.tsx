import { Star, StarHalf, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { formatPrice, getDiscount } from "@/lib/format";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { addItem } = useCart();
  const discount = getDiscount(product.price, product.originalPrice);

  return (
    <div className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>
        {discount && (
          <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground border-0 text-xs font-bold">
            -{discount}%
          </Badge>
        )}
        {product.featured && !discount && (
          <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground border-0 text-xs font-bold">
            Featured
          </Badge>
        )}
        <button className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:text-accent">
          <Heart size={16} />
        </button>
      </div>

      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium line-clamp-2 hover:text-primary transition-colors leading-snug">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(product.rating) ? "fill-secondary text-secondary" : "text-border"}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviewCount})</span>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {product.seller.verified && (
          <p className="text-xs text-muted-foreground mt-1 truncate">
            by {product.seller.name} ✓
          </p>
        )}

        <button
          onClick={() => addItem(product)}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <ShoppingCart size={14} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
