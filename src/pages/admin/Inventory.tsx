import { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import productsData from '@/data/mock-products.json';

const AdminInventory = () => {
  const [products] = useState(productsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStock = (productId: string, newStock: number) => {
    toast.success(`Stock actualizado para producto #${productId}`);
    // In a real app, this would update the backend
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) return <Badge variant="destructive">Agotado</Badge>;
    if (stock < 10) return <Badge variant="warning">Bajo Stock</Badge>;
    return <Badge variant="success">En Stock</Badge>;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-muted/30">
        <div className="container-custom py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="mb-2">Gestión de Inventario</h1>
              <p className="text-muted-foreground">
                Administra productos, stock y precios
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
              Agregar Producto
            </Button>
          </div>

          {/* Search */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  placeholder="Buscar por nombre, SKU o categoría..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Mostrando {filteredProducts.length} de {products.length} productos
              </p>
            </CardContent>
          </Card>

          {/* Products Table */}
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Producto</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="font-medium">{product.name}</p>
                              {product.featured && (
                                <Badge variant="secondary" className="mt-1">Destacado</Badge>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setEditingProduct(product)}
                              >
                                {product.stock}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Actualizar Stock</DialogTitle>
                                <DialogDescription>
                                  {product.name} (SKU: {product.sku})
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="new-stock">Nuevo Stock</Label>
                                  <Input
                                    id="new-stock"
                                    type="number"
                                    min="0"
                                    defaultValue={product.stock}
                                    onChange={(e) => {
                                      if (editingProduct) {
                                        setEditingProduct({
                                          ...editingProduct,
                                          stock: parseInt(e.target.value) || 0
                                        });
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button
                                  onClick={() => {
                                    if (editingProduct) {
                                      handleUpdateStock(editingProduct.id, editingProduct.stock);
                                      setIsDialogOpen(false);
                                    }
                                  }}
                                >
                                  Actualizar Stock
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell>{getStockBadge(product.stock)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" aria-label="Editar producto" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="h-4 w-4 text-destructive" aria-label="Eliminar producto" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card className="mt-6">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2">💡 Funcionalidades del Panel</h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Click en el número de stock para actualizar la cantidad disponible</li>
                <li>Usa el buscador para filtrar productos por nombre, SKU o categoría</li>
                <li>Los cambios de stock se reflejan inmediatamente en la tienda</li>
                <li>Los productos con stock bajo (&lt;10) aparecen con badge de advertencia</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminInventory;
