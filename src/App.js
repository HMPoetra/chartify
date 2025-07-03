import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  CssBaseline,
  Container,
  Grid,
  Paper,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

// Komponen halaman
import Tentang from './pages/Tentang';
import CustomerService from './pages/CustomerService';

// Komponen Chart
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';
import Filter from './components/Filter';

// Komponen Loading
import Loading from './components/Loading';

const customTheme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: purple[200],
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

const App = () => {
  const [filters, setFilters] = useState({ periode: 'Bulanan', kategori: 'Semua Waktu' });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: 'Tentang', path: '/tentang' },
    { label: 'Layanan Pelanggan', path: '/customer-service' },
  ];

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem button component={Link} to={item.path} key={item.label}>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const fakeData = {
    bar: {
      labels: ['Januari', 'Februari', 'Maret'],
      datasets: [
        {
          label: 'Penjualan',
          data: [65, 59, 80],
          backgroundColor: purple[200],
          borderColor: purple[500],
          borderWidth: 1,
        },
      ],
    },
    line: {
      labels: ['Januari', 'Februari', 'Maret'],
      datasets: [
        {
          label: 'Pendapatan',
          data: [85, 69, 90],
          fill: false,
          backgroundColor: purple[100],
          borderColor: purple[500],
        },
      ],
    },
    pie: {
      labels: ['Mouse', 'Keyboard', 'Web Cam'],
      datasets: [
        {
          label: 'Penjualan Kategori',
          data: [300, 150, 100],
          backgroundColor: [purple[100], purple[300], purple[500]],
          borderColor: [purple[300], purple[400], purple[700]],
          borderWidth: 1,
        },
      ],
    },
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const isAuthenticated = () => {
    return true; // Selalu mengembalikan true agar login diabaikan
  };

  useEffect(() => {
    // Simulasikan penundaan loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Penundaan 2 detik

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        <Main
          menuItems={menuItems}
          drawer={drawer}
          drawerOpen={drawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
          fakeData={fakeData}
          handleFilterChange={handleFilterChange}
          isAuthenticated={isAuthenticated}
        />
      </Router>
    </ThemeProvider>
  );
};

const Main = ({ menuItems, drawer, drawerOpen, handleDrawerToggle, isMobile, fakeData, handleFilterChange, isAuthenticated }) => {
  const location = useLocation();

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={2}>
            {isMobile && (
              <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
                <MenuIcon />
              </IconButton>
            )}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <img src="/logo.png" alt="Chartify Logo" style={{ height: 50 }} />
              <Typography variant="h6" noWrap component="div" sx={{ ml: 1 }}>
                Chartify
              </Typography>
            </Link>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 3 }}>
              {menuItems.map((item) => (
                <Typography
                  key={item.label}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: '#fff',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  {item.label}
                </Typography>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
      >
        {drawer}
      </Drawer>

      <Routes>
        <Route
          path="/"
          element={
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Box mb={3}>
                <Filter onFilterChange={handleFilterChange} />
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Grafik Penjualan
                    </Typography>
                    <BarChart data={fakeData.bar} />
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Grafik Pendapatan
                    </Typography>
                    <LineChart data={fakeData.line} />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" color="primary" gutterBottom>
                      Distribusi Kategori Penjualan
                    </Typography>
                    <PieChart data={fakeData.pie} />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          }
        />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/customer-service" element={<CustomerService />} />
      </Routes>
    </>
  );
};

export default App;
