import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a base theme
const baseTheme = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    subtitle1: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          height: 48,
          padding: '0 24px',
        },
        sizeMedium: {
          height: 40,
          padding: '0 16px',
        },
        sizeSmall: {
          height: 32,
          padding: '0 12px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          padding: '12px 16px',
          minWidth: 100,
          '&.Mui-selected': {
            fontWeight: 600,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: 'visible',
          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 24,
          '&:last-child': {
            paddingBottom: 24,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          height: '100%',
        },
        '#__next': {
          height: '100%',
        },
      },
    },
  },
};

// Create the light theme
export const lightTheme = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: 'light',
      primary: {
        main: '#3E64FF',
        light: '#7395FF',
        dark: '#2C47B8',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FF6B6B',
        light: '#FF9E9E',
        dark: '#C53A3A',
        contrastText: '#FFFFFF',
      },
      background: {
        default: '#F8F9FA',
        paper: '#FFFFFF',
      },
      text: {
        primary: '#202124',
        secondary: '#5F6368',
        disabled: '#9AA0A6',
      },
      error: {
        main: '#D93025',
      },
      warning: {
        main: '#F9AB00',
      },
      info: {
        main: '#1A73E8',
      },
      success: {
        main: '#1E8E3E',
      },
      divider: 'rgba(0, 0, 0, 0.12)',
    },
  })
);

// Create the dark theme
export const darkTheme = responsiveFontSizes(
  createTheme({
    ...baseTheme,
    palette: {
      mode: 'dark',
      primary: {
        main: '#7395FF',
        light: '#A9C0FF',
        dark: '#3E64FF',
        contrastText: '#FFFFFF',
      },
      secondary: {
        main: '#FF9E9E',
        light: '#FFC9C9',
        dark: '#FF6B6B',
        contrastText: '#000000',
      },
      background: {
        default: '#121212',
        paper: '#1E1E1E',
      },
      text: {
        primary: '#E8EAED',
        secondary: '#9AA0A6',
        disabled: '#5F6368',
      },
      error: {
        main: '#F28B82',
      },
      warning: {
        main: '#FDD663',
      },
      info: {
        main: '#8AB4F8',
      },
      success: {
        main: '#81C995',
      },
      divider: 'rgba(255, 255, 255, 0.12)',
    },
  })
);