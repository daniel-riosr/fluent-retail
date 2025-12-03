import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, TrendingUp, Users, Shield } from 'lucide-react';

const Landing = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <h1 className="mb-6 text-4xl md:text-5xl font-bold text-balance">
                Sistema de Gestión de Inventario
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-balance">
                Administra tus transacciones, maestros y usuarios de manera eficiente
                con nuestro sistema completo de gestión de inventario.
              </p>
              <Link to="/login">
                <Button size="xl" className="text-lg px-8 py-6">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 animate-slide-up">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">Gestión de Transacciones</h3>
                <p className="text-sm text-muted-foreground">
                  Registra y visualiza todas las transacciones de inventario con gráficas
                  y reportes detallados.
                </p>
              </div>

              <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="mx-auto w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <Package className="h-6 w-6 text-success" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">Control de Maestros</h3>
                <p className="text-sm text-muted-foreground">
                  Administra tus materiales y productos con seguimiento de saldos
                  en tiempo real.
                </p>
              </div>

              <div className="text-center p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="mx-auto w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-secondary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">Gestión de Usuarios</h3>
                <p className="text-sm text-muted-foreground">
                  Control de acceso con roles diferenciados para administradores
                  y usuarios regulares.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary-hover">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="mb-4 text-3xl font-bold text-primary-foreground">
                ¿Listo para comenzar?
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8">
                Inicia sesión para acceder a todas las funcionalidades del sistema.
              </p>
              <Link to="/login">
                <Button size="xl" variant="secondary" className="text-lg px-8 py-6">
                  Iniciar Sesión
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;

