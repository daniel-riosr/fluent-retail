import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, RotateCcw, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';
import productsData from '@/data/mock-products.json';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = productsData.find(p => p.id === id);

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
            <p className="text-muted-foreground mb-6">
              El producto que buscas no existe o ha sido eliminado
            </p>
            <Link to="/catalog">
              <Button>Volver al Catálogo</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock < 10;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      sku: product.sku,
    }, quantity);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container-custom py-8">
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Inicio
                </Link>
              </li>
              <span className="text-muted-foreground">/</span>
              <li>
                <Link to="/catalog" className="text-muted-foreground hover:text-foreground">
                  Catálogo
                </Link>
              </li>
              <span className="text-muted-foreground">/</span>
              <li>
                <Link to={`/catalog?category=${product.category}`} className="text-muted-foreground hover:text-foreground">
                  {product.category}
                </Link>
              </li>
              <span className="text-muted-foreground">/</span>
              <li className="font-medium" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>

          <Link to="/catalog">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
              Volver al Catálogo
            </Button>
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                      aria-label={`Ver imagen ${index + 1} de ${product.name}`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - vista ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <Badge variant="outline" className="mb-2">{product.category}</Badge>
                <h1 className="mb-2">{product.name}</h1>
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
              </div>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-warning text-warning" aria-hidden="true" />
                    <span className="font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviewCount} reseñas)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {isOutOfStock ? (
                  <Badge variant="destructive">Agotado</Badge>
                ) : isLowStock ? (
                  <Badge variant="warning">Solo {product.stock} unidades disponibles</Badge>
                ) : (
                  <Badge variant="success">En stock ({product.stock} disponibles)</Badge>
                )}
              </div>

              <Separator className="my-6" />

              {/* Quantity Selector */}
              {!isOutOfStock && (
                <div className="mb-6">
                  <Label htmlFor="quantity" className="block text-sm font-medium mb-2">
                    Cantidad
                  </Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <input
                        id="quantity"
                        type="number"
                        min="1"
                        max={product.stock}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                        className="w-16 text-center border-x py-2 focus:outline-none"
                        aria-label="Cantidad"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.stock > 0 && `Máximo: ${product.stock}`}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 mb-8">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" aria-hidden="true" />
                  Agregar al Carrito
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full"
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                >
                  Comprar Ahora
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 gap-4 p-4 bg-muted rounded-lg">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-sm">Envío Rápido</p>
                    <p className="text-xs text-muted-foreground">Entrega en 24-48 horas</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-sm">Garantía Extendida</p>
                    <p className="text-xs text-muted-foreground">2 años de garantía del fabricante</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-sm">Devolución Fácil</p>
                    <p className="text-xs text-muted-foreground">30 días para devolver sin costo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-12">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Especificaciones</h2>
                <dl className="space-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b">
                      <dt className="font-medium text-sm">{key}</dt>
                      <dd className="text-sm text-muted-foreground">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Missing import
import { Label } from '@/components/ui/label';

export default ProductDetail;
