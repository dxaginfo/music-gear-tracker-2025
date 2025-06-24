import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Build as BuildIcon,
  LocationOn as LocationIcon,
  MusicNote as MusicNoteIcon,
  ExpandLess,
  ExpandMore,
  Settings as SettingsIcon,
  People as PeopleIcon,
  Analytics as AnalyticsIcon,
  QueueMusic as QueueMusicIcon,
  Album as AlbumIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

interface SidebarProps {
  drawerWidth: number;
  open: boolean;
  onClose: () => void;
  variant: 'permanent' | 'persistent' | 'temporary';
}

interface NavItem {
  title: string;
  path: string;
  icon: JSX.Element;
  children?: NavItem[];
  requiredRole?: string[];
}

const Logo = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'center',
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const Sidebar = ({ drawerWidth, open, onClose, variant }: SidebarProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { data: session } = useSession();
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({
    gear: true,
    music: false,
  });

  // Main navigation items
  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Equipment',
      path: '/equipment',
      icon: <InventoryIcon />,
      children: [
        {
          title: 'All Equipment',
          path: '/equipment',
          icon: <InventoryIcon />,
        },
        {
          title: 'Categories',
          path: '/equipment/categories',
          icon: <InventoryIcon />,
        },
        {
          title: 'Maintenance',
          path: '/equipment/maintenance',
          icon: <BuildIcon />,
        },
        {
          title: 'Locations',
          path: '/equipment/locations',
          icon: <LocationIcon />,
        },
      ],
    },
    {
      title: 'Music',
      path: '/music',
      icon: <MusicNoteIcon />,
      children: [
        {
          title: 'Setlists',
          path: '/music/setlists',
          icon: <QueueMusicIcon />,
        },
        {
          title: 'Songs',
          path: '/music/songs',
          icon: <AlbumIcon />,
        },
      ],
    },
    {
      title: 'Organizations',
      path: '/organizations',
      icon: <BusinessIcon />,
      requiredRole: ['admin', 'band_manager'],
    },
    {
      title: 'People',
      path: '/people',
      icon: <PeopleIcon />,
      requiredRole: ['admin', 'band_manager'],
    },
    {
      title: 'Reports',
      path: '/reports',
      icon: <AnalyticsIcon />,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <SettingsIcon />,
    },
  ];

  const handleSubMenuToggle = (key: string) => {
    setOpenSubMenus({
      ...openSubMenus,
      [key]: !openSubMenus[key],
    });
  };

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`);
  };

  const userRole = session?.user?.role || 'musician';

  const filterItemsByRole = (items: NavItem[]) => {
    return items.filter((item) => {
      // If requiredRole is not defined, show to everyone
      if (!item.requiredRole) return true;
      
      // Check if user's role is in the required roles
      return item.requiredRole.includes(userRole);
    });
  };

  const drawerContent = (
    <>
      <Logo>
        <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
          MGT
        </Typography>
      </Logo>
      <Divider />
      <List component="nav" sx={{ pt: 1 }}>
        {filterItemsByRole(navItems).map((item) => (
          item.children ? (
            <Box key={item.title}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleSubMenuToggle(item.title.toLowerCase())}
                  selected={isActive(item.path)}
                  sx={{ pl: 2 }}
                >
                  <ListItemIcon sx={{ color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                  {openSubMenus[item.title.toLowerCase()] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={openSubMenus[item.title.toLowerCase()]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {filterItemsByRole(item.children).map((child) => (
                    <ListItemButton
                      key={child.title}
                      onClick={() => {
                        router.push(child.path);
                        if (variant === 'temporary') {
                          onClose();
                        }
                      }}
                      selected={isActive(child.path)}
                      sx={{ pl: 4 }}
                    >
                      <ListItemIcon sx={{ color: isActive(child.path) ? 'primary.main' : 'inherit' }}>
                        {child.icon}
                      </ListItemIcon>
                      <ListItemText primary={child.title} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItem key={item.title} disablePadding>
              <ListItemButton
                onClick={() => {
                  router.push(item.path);
                  if (variant === 'temporary') {
                    onClose();
                  }
                }}
                selected={isActive(item.path)}
                sx={{ pl: 2 }}
              >
                <ListItemIcon sx={{ color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          )
        ))}
      </List>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="navigation menu"
    >
      {/* Mobile view */}
      {variant === 'temporary' && (
        <Drawer
          variant="temporary"
          open={open}
          onClose={onClose}
          ModalProps={{
            keepMounted: true, // Better performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      
      {/* Desktop view */}
      {variant === 'permanent' && (
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;