import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, Package, Users, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar';

export const Sidebar = () => {
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const menuItems = [
    {
      title: 'Transacciones',
      icon: LayoutDashboard,
      path: '/transacciones',
      visible: true, // Visible para ADMIN y USER
    },
    {
      title: 'Maestros',
      icon: Package,
      path: '/maestros',
      visible: true, // Visible para ADMIN y USER
    },
    {
      title: 'Usuarios',
      icon: Users,
      path: '/usuarios',
      visible: isAdmin, // Solo visible para ADMIN
    },
  ];

  return (
    <SidebarProvider>
      <SidebarComponent collapsible="none" className="border-r w-64">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{getInitials(user?.name || 'U')}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{user?.name || 'Usuario'}</span>
              <span className="text-xs text-muted-foreground">{user?.email || ''}</span>
            </div>
          </div>
        </SidebarHeader>

        <Separator />

        <SidebarContent className="p-2">
          <SidebarMenu>
            {menuItems
              .filter(item => item.visible)
              .map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link to={item.path}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </Button>
        </SidebarFooter>
      </SidebarComponent>
    </SidebarProvider>
  );
};

