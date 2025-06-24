import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Box,
  Divider,
  ListItemIcon,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  PersonOutline as PersonIcon,
} from '@mui/icons-material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/store';

interface HeaderProps {
  drawerWidth: number;
  onDrawerToggle: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header = ({ drawerWidth, onDrawerToggle, darkMode, toggleDarkMode }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const router = useRouter();
  const { data: session } = useSession();
  
  // Get notifications from Redux store
  const notifications = useAppSelector((state) => state.notification.notifications);
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsMenuClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push('/profile');
  };

  const handleSettingsClick = () => {
    handleMenuClose();
    router.push('/settings');
  };

  const handleLogout = async () => {
    handleMenuClose();
    await signOut({ redirect: true, callbackUrl: '/login' });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
        boxShadow: 1,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={onDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Musician Gear Tracker
        </Typography>
        
        {/* Toggle dark/light mode */}
        <IconButton color="inherit" onClick={toggleDarkMode} sx={{ ml: 1 }}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        
        {/* Notifications */}
        <IconButton
          color="inherit"
          aria-label="show notifications"
          onClick={handleNotificationsMenuOpen}
          sx={{ ml: 1 }}
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        
        {/* User profile */}
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
          sx={{ ml: 1 }}
        >
          {session?.user?.image ? (
            <Avatar 
              src={session.user.image} 
              alt={session.user.name || 'User'} 
              sx={{ width: 32, height: 32 }}
            />
          ) : (
            <AccountCircle />
          )}
        </IconButton>
      </Toolbar>
      
      {/* Profile dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
            mt: 1.5,
            width: 200,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" noWrap>
            {session?.user?.name || 'User'}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {session?.user?.email || ''}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleSettingsClick}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      
      {/* Notifications menu */}
      <Menu
        anchorEl={notificationsAnchorEl}
        id="notifications-menu"
        open={Boolean(notificationsAnchorEl)}
        onClose={handleNotificationsMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.12))',
            mt: 1.5,
            width: 320,
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1">Notifications</Typography>
        </Box>
        <Divider />
        {notifications.length > 0 ? (
          notifications.slice(0, 5).map((notification) => (
            <MenuItem 
              key={notification.id} 
              onClick={handleNotificationsMenuClose}
              sx={{ 
                px: 2, 
                py: 1.5,
                backgroundColor: notification.read ? 'transparent' : 'action.hover',
              }}
            >
              <Box>
                <Typography variant="body2" noWrap>
                  {notification.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.message}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </Box>
        )}
        {notifications.length > 5 && (
          <>
            <Divider />
            <MenuItem 
              onClick={() => {
                handleNotificationsMenuClose();
                router.push('/notifications');
              }}
              sx={{ justifyContent: 'center' }}
            >
              <Typography variant="body2" color="primary">
                View all notifications
              </Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </AppBar>
  );
};

export default Header;