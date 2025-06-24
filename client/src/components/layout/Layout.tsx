import { ReactNode, useState } from 'react';
import { Box, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DRAWER_WIDTH = 240;

const Layout = ({ children, darkMode, toggleDarkMode }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* App Bar */}
      <Header 
        drawerWidth={DRAWER_WIDTH} 
        onDrawerToggle={handleDrawerToggle}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      
      {/* Sidebar / Drawer */}
      <Sidebar
        drawerWidth={DRAWER_WIDTH}
        open={sidebarOpen}
        onClose={handleDrawerToggle}
        variant={isMobile ? 'temporary' : 'permanent'}
      />
      
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
          height: '100%',
          overflow: 'auto',
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Toolbar /> {/* Add space below app bar */}
        {children}
      </Box>
    </Box>
  );
};

export default Layout;