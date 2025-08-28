'use client';

import { ChevronsUpDown, DollarSign, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useLogoutMutation, useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { Skeleton } from '@/components/ui/skeleton';
import { Link, useNavigate } from 'react-router';
import { toast } from 'sonner';

export function NavUser() {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const { data, isLoading } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const user = data?.data;

  const getInitials = (first?: string, last?: string) => {
    if (!first && !last) return 'U';
    return `${first?.[0] ?? ''}${last?.[0] ?? ''}`.toUpperCase();
  };

  const avatarText = getInitials(user?.firstName, user?.lastName);

  const handleLogout = async () => {
    await logout(undefined);
    toast.success('Logout successful');
    navigate('/login', { replace: true });
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'investor':
        return 'Investor Profile';
      case 'entrepreneur':
        return 'Entrepreneur Profile';
      case 'mentor':
        return 'Mentor Profile';
      default:
        return 'Profile';
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isLoading ? (
                <div className="flex items-center gap-3 w-full">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <div className="grid flex-1 gap-1">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                  <Skeleton className="h-4 w-4 rounded-full ml-auto" />
                </div>
              ) : (
                <>
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.photo} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">{avatarText}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {!isLoading && (
            <DropdownMenuContent
              style={{ minWidth: 'var(--radix-dropdown-menu-trigger-width)' }}
              className="rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.photo} alt={user?.name} />
                    <AvatarFallback className="rounded-lg">{avatarText}</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuGroup>
                <Link to="/my-company-profile">
                  <DropdownMenuItem>
                    <DollarSign />
                    {getRoleLabel(user?.role)}
                  </DropdownMenuItem>
                </Link>
                <Link to="/profile">
                  <DropdownMenuItem>
                    <User />
                    Profile
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          )}
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
