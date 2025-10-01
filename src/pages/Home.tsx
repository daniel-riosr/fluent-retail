import { Link } from 'react-router-dom';
import { ArrowRight, Package, Shield, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import productsData from '@/data/mock-products.json';

const Home = () => {
  const featuredProducts = productsData.filter(p => p.featured).slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-28">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6 text-balance">
                Tu Tienda de Tecnología de Confianza
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                Encuentra los mejores productos de tecnología con envío rápido y 
                garantía extendida. Calidad y servicio excepcional en cada compra.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/catalog">
                  <Button size="xl" variant="hero">
                    Explorar Catálogo
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Button>
                </Link>
                <Link to="/help">
                  <Button size="xl" variant="outline">
                    Centro de Ayuda
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/50">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 animate-slide-up">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">Envío Rápido</h3>
                <p className="text-sm text-muted-foreground">
                  Entrega en 24-48 horas en la mayoría de productos. Seguimiento en tiempo real.
                </p>
              </div>

              <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-success" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">Compra Segura</h3>
                <p className="text-sm text-muted-foreground">
                  Protección de comprador y garantía de devolución de dinero en 30 días.
                </p>
              </div>

              <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">Soporte Premium</h3>
                <p className="text-sm text-muted-foreground">
                  Atención al cliente 24/7 para resolver todas tus dudas y consultas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="mb-2">Productos Destacados</h2>
                <p className="text-muted-foreground">
                  Los productos más populares y mejor valorados de nuestra tienda
                </p>
              </div>
              <Link to="/catalog">
                <Button variant="outline">
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 bg-muted/50">
          <div className="container-custom">
            <h2 className="text-center mb-12">Explora por Categoría</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Electrónica', 'Accesorios', 'Audio', 'Muebles'].map((category) => (
                <Link
                  key={category}
                  to={`/catalog?category=${category}`}
                  className="group p-6 bg-background rounded-lg border hover:border-primary hover:shadow-md transition-all text-center"
                >
                  <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {category}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-hover">
          <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="mb-4 text-primary-foreground">
                ¿Listo para comenzar?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Crea tu cuenta y disfruta de ofertas exclusivas, seguimiento de pedidos 
                y mucho más.
              </p>
              <Link to="/login">
                <Button size="xl" variant="secondary">
                  Crear Cuenta Gratis
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
