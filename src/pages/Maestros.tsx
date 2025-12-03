import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api, Maestro } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sidebar } from '@/components/Sidebar';
import { toast } from '@/components/ui/use-toast';
import { Plus, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Maestros = () => {
  const { user, isAdmin } = useAuth();
  const [maestros, setMaestros] = useState<Maestro[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    saldoInicial: '',
  });

  useEffect(() => {
    loadMaestros();
  }, []);

  const loadMaestros = async () => {
    try {
      const data = await api.getMaestros();
      setMaestros(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los maestros',
        variant: 'destructive',
      });
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData({ nombre: '', saldoInicial: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      const saldoInicial = parseFloat(formData.saldoInicial);
      if (isNaN(saldoInicial) || saldoInicial < 0) {
        throw new Error('El saldo inicial debe ser un número positivo o cero');
      }

      if (!formData.nombre.trim()) {
        throw new Error('El nombre del maestro es requerido');
      }

      await api.createMaestro(
        formData.nombre.trim(),
        saldoInicial,
        user.id
      );

      toast({
        title: 'Éxito',
        description: 'Maestro creado correctamente',
      });

      handleCloseDialog();
      await loadMaestros();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo crear el maestro',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <div style={{ width: '16rem', flexShrink: 0 }}>
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto min-w-0">
        <div className="container mx-auto p-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gestión de Maestros</h1>
              <p className="text-muted-foreground">
                Administra los materiales y productos del sistema
              </p>
            </div>
            {isAdmin && (
              <Button onClick={handleOpenDialog}>
                <Plus className="mr-2 h-4 w-4" />
                Agregar
              </Button>
            )}
          </div>

          {/* Tabla de Maestros */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Saldo</TableHead>
                  <TableHead>Creado Por</TableHead>
                  <TableHead>Fecha de Creación</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maestros.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No hay maestros registrados
                    </TableCell>
                  </TableRow>
                ) : (
                  maestros.map((maestro) => (
                    <TableRow key={maestro.id}>
                      <TableCell className="font-mono text-xs">{maestro.id.slice(-8)}</TableCell>
                      <TableCell className="font-medium">{maestro.nombre}</TableCell>
                      <TableCell>
                        <span className="font-semibold">{maestro.saldo}</span>
                      </TableCell>
                      <TableCell>{maestro.creador?.name || 'Desconocido'}</TableCell>
                      <TableCell>
                        {format(new Date(maestro.createdAt), 'dd/MM/yyyy', { locale: es })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>

      {/* Dialog para Agregar Maestro */}
      {isAdmin && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar Maestro</DialogTitle>
              <DialogDescription>
                Crea un nuevo maestro (material) en el sistema
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="nombre">Nombre del Maestro</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    required
                    placeholder="Ej: Material A"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="saldoInicial">Saldo Inicial</Label>
                  <Input
                    id="saldoInicial"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.saldoInicial}
                    onChange={(e) =>
                      setFormData({ ...formData, saldoInicial: e.target.value })
                    }
                    required
                    placeholder="0.00"
                    className="mt-2"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Crear Maestro
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Maestros;

