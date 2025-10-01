import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Package, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Navbar = () => {
  const { itemCount } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold text-xl"
            aria-label="Inicio - ShopHub"
          >
            <Package className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="hidden sm:inline">ShopHub</span>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <form className="w-full relative" role="search" onSubmit={(e) => { e.preventDefault(); navigate('/catalog'); }}>
              <label htmlFor="search" className="sr-only">Buscar productos</label>
              <Input
                id="search"
                type="search"
                placeholder="Buscar productos..."
                className="w-full pr-10"
                aria-label="Campo de búsqueda de productos"
              />
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                aria-label="Buscar"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
              </Button>
            </form>
          </div>

          {/* Navigation links */}
          <div className="flex items-center gap-2">
            <Link to="/catalog">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Catálogo
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative" aria-label={`Carrito de compras: ${itemCount} artículos`}>
                <ShoppingCart className="h-5 w-5" aria-hidden="true" />
                {itemCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    aria-label={`${itemCount} artículos en el carrito`}
                  >
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menú de usuario">
                    <User className="h-5 w-5" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {isAdmin ? (
                    <>
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        Panel Admin
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  ) : (
                    <DropdownMenuItem onClick={() => navigate('/account')}>
                      <User className="mr-2 h-4 w-4" />
                      Mi Cuenta
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5 sm:mr-2" aria-hidden="true" />
                  <span className="hidden sm:inline">Ingresar</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Search bar - Mobile */}
        <div className="md:hidden pb-3">
          <form className="w-full relative" role="search" onSubmit={(e) => { e.preventDefault(); navigate('/catalog'); }}>
            <label htmlFor="search-mobile" className="sr-only">Buscar productos</label>
            <Input
              id="search-mobile"
              type="search"
              placeholder="Buscar productos..."
              className="w-full pr-10"
            />
            <Button
              type="submit"
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </nav>
  );
};
