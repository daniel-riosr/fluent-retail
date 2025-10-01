import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  rating?: number;
  reviewCount?: number;
  featured?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      sku: product.sku,
    });
  };

  const isLowStock = product.stock < 10;
  const isOutOfStock = product.stock === 0;

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
            loading="lazy"
          />
          {product.featured && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              Destacado
            </Badge>
          )}
          {isOutOfStock && (
            <Badge className="absolute top-2 right-2" variant="destructive">
              Agotado
            </Badge>
          )}
          {isLowStock && !isOutOfStock && (
            <Badge className="absolute top-2 right-2" variant="warning">
              Últimas unidades
            </Badge>
          )}
        </div>

        <CardContent className="p-4">
          <div className="mb-2">
            <p className="text-xs text-muted-foreground">{product.category}</p>
            <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>

          {product.rating && (
            <div className="flex items-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount} reseñas)
              </span>
            </div>
          )}

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-muted-foreground mt-1">
            SKU: {product.sku}
          </p>
        </CardContent>
      </Link>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          aria-label={`Agregar ${product.name} al carrito`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" aria-hidden="true" />
          {isOutOfStock ? 'Agotado' : 'Agregar al carrito'}
        </Button>
      </CardFooter>
    </Card>
  );
};
