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
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';
import { Skeleton } from '@/components/ui/skeleton';
import { Link } from 'react-router';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { data, isLoading } = useUserInfoQuery(undefined);
  const user = data?.data;
  console.log(user);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.charAt(0);
  };

  const avatarText = getInitials(user?.firstName);

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
                // Skeleton UI while loading
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
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
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
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="truncate text-xs">{user?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuGroup>
                <Link to="/company-profile">
                  <DropdownMenuItem>
                    {user?.role === 'investor' ? (
                      <>
                        <DollarSign />
                        Investor Profile
                      </>
                    ) : (
                      <>
                        <DollarSign />
                        Entrepreneur Profile
                      </>
                    )}
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
              <DropdownMenuItem>
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
