import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Separator } from '@/components/ui/separator';

interface Order {
  id: number;
  date: string;
  items: any[];
  total: number;
  status: string;
}

const Account = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      pending: 'pending',
      confirmed: 'confirmed',
      shipped: 'shipped',
      delivered: 'delivered',
      cancelled: 'cancelled',
    };
    return variants[status] || 'default';
  };

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      shipped: 'Enviado',
      delivered: 'Entregado',
      cancelled: 'Cancelado',
    };
    return texts[status] || status;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-muted/30">
        <div className="container-custom py-8">
          <h1 className="mb-8">Mi Cuenta</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* User Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre</p>
                    <p className="font-medium">{user?.name}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground">Tipo de Cuenta</p>
                    <Badge>{user?.role === 'admin' ? 'Administrador' : 'Cliente'}</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Orders History */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Historial de Pedidos</CardTitle>
                </CardHeader>
                <CardContent>
                  {orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" aria-hidden="true" />
                      <p className="text-muted-foreground mb-4">
                        No tienes pedidos aún
                      </p>
                      <Link to="/catalog" className="text-primary hover:underline">
                        Comenzar a comprar
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Link
                          key={order.id}
                          to={`/order-confirmation/${order.id}`}
                          className="block"
                        >
                          <div className="border rounded-lg p-4 hover:border-primary transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">Pedido #{order.id}</h3>
                                <Badge variant={getStatusBadge(order.status)}>
                                  {getStatusText(order.status)}
                                </Badge>
                              </div>
                              <ChevronRight className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>
                                {new Date(order.date).toLocaleDateString('es-AR', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="font-medium text-foreground">
                                ${order.total.toFixed(2)}
                              </span>
                            </div>

                            <div className="mt-2 text-sm text-muted-foreground">
                              {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
