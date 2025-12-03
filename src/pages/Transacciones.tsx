import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { api, Maestro, Transaccion, TipoTransaccion } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sidebar } from '@/components/Sidebar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from '@/components/ui/use-toast';
import { Plus, Loader2, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const Transacciones = () => {
  const { user } = useAuth();
  const [maestros, setMaestros] = useState<Maestro[]>([]);
  const [maestroSeleccionado, setMaestroSeleccionado] = useState<string>('');
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [saldosDiarios, setSaldosDiarios] = useState<{ fecha: string; saldo: number }[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    tipo: 'ENTRADA' as TipoTransaccion,
    cantidad: '',
  });

  // Cargar maestros al montar
  useEffect(() => {
    const init = async () => {
      console.log('🚀 Inicializando página de Transacciones...');
      setIsLoadingData(true);
      setError(null);
      try {
        await loadMaestros();
        console.log('✅ Maestros cargados exitosamente');
      } catch (err) {
        console.error('❌ Error al inicializar:', err);
        setError('Error al cargar los datos. Por favor, recarga la página.');
      } finally {
        console.log('🏁 Finalizando carga, estableciendo isLoadingData = false');
        setIsLoadingData(false);
      }
    };
    init();
  }, []);

  // Cargar transacciones y saldos cuando cambia el maestro seleccionado
  useEffect(() => {
    if (maestroSeleccionado) {
      loadTransacciones();
      loadSaldosDiarios();
    } else {
      setTransacciones([]);
      setSaldosDiarios([]);
    }
  }, [maestroSeleccionado]);

  const loadMaestros = async () => {
    try {
      console.log('📦 Cargando maestros...');
      const data = await api.getMaestros();
      console.log('📦 Maestros cargados:', data.length);
      setMaestros(data);
      if (data.length > 0 && !maestroSeleccionado) {
        console.log('📦 Seleccionando primer maestro:', data[0].id);
        setMaestroSeleccionado(data[0].id);
      } else if (data.length === 0) {
        console.warn('⚠️ No hay maestros disponibles');
      }
    } catch (error: any) {
      console.error('❌ Error al cargar maestros:', error);
      const errorMessage = error?.message || 'No se pudieron cargar los maestros';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      // No lanzar el error para que la página se muestre aunque falle
      setMaestros([]);
    }
  };

  const loadTransacciones = async () => {
    if (!maestroSeleccionado) return;
    try {
      const data = await api.getTransacciones(maestroSeleccionado);
      setTransacciones(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar las transacciones',
        variant: 'destructive',
      });
    }
  };

  const loadSaldosDiarios = async () => {
    if (!maestroSeleccionado) return;
    try {
      const data = await api.getSaldosDiarios(maestroSeleccionado);
      setSaldosDiarios(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los saldos diarios',
        variant: 'destructive',
      });
    }
  };

  const handleOpenDialog = () => {
    if (!maestroSeleccionado) {
      toast({
        title: 'Advertencia',
        description: 'Por favor selecciona un maestro primero',
        variant: 'destructive',
      });
      return;
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData({ tipo: 'ENTRADA', cantidad: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !maestroSeleccionado) return;

    setIsLoading(true);
    try {
      const cantidad = parseFloat(formData.cantidad);
      if (isNaN(cantidad) || cantidad <= 0) {
        throw new Error('La cantidad debe ser un número positivo');
      }

      await api.createTransaccion(
        formData.tipo,
        cantidad,
        maestroSeleccionado,
        user.id
      );

      toast({
        title: 'Éxito',
        description: 'Transacción creada correctamente',
      });

      handleCloseDialog();
      await loadTransacciones();
      await loadSaldosDiarios();
      await loadMaestros(); // Recargar para actualizar saldos
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'No se pudo crear la transacción',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const maestroActual = maestros.find(m => m.id === maestroSeleccionado);

  // Debug logs
  console.log('🎨 Renderizando Transacciones:', {
    isLoadingData,
    error,
    maestrosCount: maestros.length,
    maestroSeleccionado,
    transaccionesCount: transacciones.length,
  });

  if (isLoadingData) {
    console.log('⏳ Mostrando estado de carga...');
    return (
      <div className="flex h-screen w-full">
        <div style={{ width: '16rem', flexShrink: 0 }}>
          <Sidebar />
        </div>
        <div className="flex-1 overflow-auto flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Cargando datos...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log('❌ Mostrando error:', error);
    return (
      <div className="flex h-screen w-full">
        <div style={{ width: '16rem', flexShrink: 0 }}>
          <Sidebar />
        </div>
        <div className="flex-1 overflow-auto flex items-center justify-center">
          <div className="text-center max-w-md">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error al cargar</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Recargar Página</Button>
          </div>
        </div>
      </div>
    );
  }

  console.log('✅ Renderizando contenido principal');
  return (
    <div className="flex h-screen w-full">
      <div style={{ width: '16rem', flexShrink: 0 }}>
        <Sidebar />
      </div>
      <main className="flex-1 overflow-auto min-w-0">
        <div className="container mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'red', backgroundColor: 'yellow', padding: '20px' }}>
              🎯 GESTIÓN DE TRANSACCIONES - ESTO DEBE SER VISIBLE
            </h1>
            <p className="text-muted-foreground" style={{ fontSize: '20px', fontWeight: 'bold' }}>
              Visualiza y gestiona las transacciones de inventario
            </p>
          </div>

          {/* Panel de Debug - Temporal */}
          <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
            <h3 className="font-bold mb-2">🔍 Debug Info:</h3>
            <ul className="text-sm space-y-1">
              <li>✅ Maestros cargados: <strong>{maestros.length}</strong></li>
              <li>✅ Maestro seleccionado: <strong>{maestroSeleccionado || 'NINGUNO'}</strong></li>
              <li>✅ Transacciones: <strong>{transacciones.length}</strong></li>
              <li>✅ Estado carga: <strong>{isLoadingData ? 'Cargando...' : 'Completado'}</strong></li>
              {maestroActual && (
                <li>✅ Maestro actual: <strong>{maestroActual.nombre}</strong> (Saldo: {maestroActual.saldo})</li>
              )}
            </ul>
          </div>

          {/* Selector de Maestro */}
          <div className="mb-6 flex gap-4 items-end">
            <div className="flex-1 max-w-md">
              <Label htmlFor="maestro">Seleccionar Maestro</Label>
              <Select
                value={maestroSeleccionado || ''}
                onValueChange={setMaestroSeleccionado}
              >
                <SelectTrigger id="maestro">
                  <SelectValue placeholder={maestros.length > 0 ? "Selecciona un maestro" : "No hay maestros"} />
                </SelectTrigger>
                <SelectContent>
                  {maestros.length > 0 ? (
                    maestros.map((maestro) => (
                      <SelectItem key={maestro.id} value={maestro.id}>
                        {maestro.nombre} (Saldo: {maestro.saldo})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>No hay maestros disponibles</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleOpenDialog} disabled={!maestroSeleccionado}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Movimiento
            </Button>
          </div>

          {/* Tabla de Transacciones */}
          {maestroSeleccionado && (
            <>
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4">Movimientos</h2>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Cantidad</TableHead>
                        <TableHead>Responsable</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transacciones.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center text-muted-foreground">
                            No hay transacciones para este maestro
                          </TableCell>
                        </TableRow>
                      ) : (
                        transacciones.map((trans) => (
                          <TableRow key={trans.id}>
                            <TableCell className="font-mono text-xs">{trans.id.slice(-8)}</TableCell>
                            <TableCell>
                              {format(new Date(trans.createdAt), 'dd/MM/yyyy HH:mm', { locale: es })}
                            </TableCell>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  trans.tipo === 'ENTRADA'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {trans.tipo}
                              </span>
                            </TableCell>
                            <TableCell>{trans.cantidad}</TableCell>
                            <TableCell>{trans.usuario?.name || 'Desconocido'}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Gráfica de Saldos por Hora */}
              {saldosDiarios.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Evolución de Saldos por Hora - {maestroActual?.nombre}
                  </h2>
                  <div className="border rounded-lg p-4 bg-white">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={saldosDiarios}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="fecha"
                          tickFormatter={(value) => format(new Date(value), 'dd/MM HH:mm', { locale: es })}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis />
                        <Tooltip
                          labelFormatter={(value) => format(new Date(value), 'dd/MM/yyyy HH:mm', { locale: es })}
                        />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="saldo"
                          stroke="#8884d8"
                          strokeWidth={2}
                          name="Saldo"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </>
          )}

          {maestros.length === 0 && !isLoadingData && (
            <div className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No hay maestros disponibles</h3>
              <p className="text-muted-foreground mb-4">
                Para comenzar, crea un maestro en la página de Maestros.
              </p>
              <Button asChild>
                <a href="/maestros">Ir a Maestros</a>
              </Button>
            </div>
          )}
          
          {/* Debug info - remover en producción */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-4 p-4 bg-muted rounded text-xs">
              <p><strong>Debug:</strong></p>
              <p>Maestros cargados: {maestros.length}</p>
              <p>Maestro seleccionado: {maestroSeleccionado || 'Ninguno'}</p>
              <p>Transacciones: {transacciones.length}</p>
              <p>Estado de carga: {isLoadingData ? 'Cargando...' : 'Completado'}</p>
              {error && <p className="text-destructive">Error: {error}</p>}
            </div>
          )}
        </div>
      </main>

      {/* Dialog para Agregar Movimiento */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Agregar Movimiento - {maestroActual?.nombre}
            </DialogTitle>
            <DialogDescription>
              Registra una nueva transacción de inventario para este maestro
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div>
                <Label>Tipo de Movimiento</Label>
                <RadioGroup
                  value={formData.tipo}
                  onValueChange={(value) =>
                    setFormData({ ...formData, tipo: value as TipoTransaccion })
                  }
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ENTRADA" id="entrada" />
                    <Label htmlFor="entrada" className="cursor-pointer">
                      Entrada
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="SALIDA" id="salida" />
                    <Label htmlFor="salida" className="cursor-pointer">
                      Salida
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="cantidad">Cantidad</Label>
                <Input
                  id="cantidad"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.cantidad}
                  onChange={(e) =>
                    setFormData({ ...formData, cantidad: e.target.value })
                  }
                  required
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
                Crear Movimiento
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transacciones;

