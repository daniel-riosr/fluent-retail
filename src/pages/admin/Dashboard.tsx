import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import productsData from '@/data/mock-products.json';

const AdminDashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    lowStockProducts: 0,
  });

  useEffect(() => {
    // Load orders
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);

    // Calculate stats
    const totalRevenue = storedOrders.reduce((sum: number, order: any) => sum + order.total, 0);
    const pendingOrders = storedOrders.filter((o: any) => o.status === 'pending').length;
    const lowStockProducts = productsData.filter(p => p.stock < 10 && p.stock > 0).length;

    setStats({
      totalOrders: storedOrders.length,
      totalRevenue,
      pendingOrders,
      lowStockProducts,
    });
  }, []);

  const recentOrders = orders.slice(-5).reverse();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-muted/30">
        <div className="container-custom py-8">
          <div className="mb-8">
            <h1 className="mb-2">Panel de Administración</h1>
            <p className="text-muted-foreground">
              Resumen general de la tienda y métricas clave
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pedidos</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  Pedidos totales procesados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  Ingresos acumulados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Pendientes</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                <p className="text-xs text-muted-foreground">
                  Requieren atención
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Stock Bajo</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.lowStockProducts}</div>
                <p className="text-xs text-muted-foreground">
                  Productos con poco stock
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pedidos Recientes</CardTitle>
                  <Link to="/admin/orders" className="text-sm text-primary hover:underline">
                    Ver todos
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay pedidos aún
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <Link
                        key={order.id}
                        to={`/admin/orders/${order.id}`}
                        className="block"
                      >
                        <div className="flex items-center justify-between p-3 border rounded-lg hover:border-primary transition-colors">
                          <div>
                            <p className="font-medium">Pedido #{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('es-AR')}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <Badge variant={order.status as any}>{order.status}</Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Low Stock Products */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Productos con Stock Bajo</CardTitle>
                  <Link to="/admin/inventory" className="text-sm text-primary hover:underline">
                    Ver inventario
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productsData
                    .filter(p => p.stock < 10 && p.stock > 0)
                    .slice(0, 5)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium line-clamp-1">{product.name}</p>
                            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                          </div>
                        </div>
                        <Badge variant="warning">
                          {product.stock} unidades
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/admin/orders"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary hover:bg-accent transition-all"
                >
                  <Package className="h-8 w-8 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Gestionar Pedidos</p>
                    <p className="text-sm text-muted-foreground">Ver y actualizar pedidos</p>
                  </div>
                </Link>

                <Link
                  to="/admin/inventory"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary hover:bg-accent transition-all"
                >
                  <ShoppingCart className="h-8 w-8 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Gestionar Inventario</p>
                    <p className="text-sm text-muted-foreground">Actualizar productos y stock</p>
                  </div>
                </Link>

                <Link
                  to="/catalog"
                  className="flex items-center gap-3 p-4 border rounded-lg hover:border-primary hover:bg-accent transition-all"
                >
                  <TrendingUp className="h-8 w-8 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-semibold">Ver Tienda</p>
                    <p className="text-sm text-muted-foreground">Vista de cliente</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
