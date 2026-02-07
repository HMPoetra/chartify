import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
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
  Button,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

// Komponen halaman
import Tentang from './pages/Tentang';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

// Komponen Chart
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import PieChart from './components/PieChart';

// Komponen lainnya
import Loading from './components/Loading';
import LoginCRUD from './components/LoginCRUD';

const customTheme = createTheme({
  palette: {
    primary: { main: purple[500] },
    secondary: { main: purple[200] },
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: { fontWeight: 600 },
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

const fakeData = {
  line: [
    { name: 'Jan', value: 30 },
    { name: 'Feb', value: 20 },
    { name: 'Mar', value: 27 },
  ],
  bar: [
    { name: 'A', uv: 4000, pv: 2400 },
    { name: 'B', uv: 3000, pv: 1398 },
  ],
  pie: [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
  ],
};

const Main = ({ menuItems, drawer, drawerOpen, handleDrawerToggle, isMobile }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
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

          {!isMobile && isAuthenticated && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  component={Link}
                  to={item.path}
                  color="inherit"
                  sx={{ textTransform: 'none', fontWeight: 500 }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  window.location.href = '/login';
                }}
              >
                Logout
              </Button>
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
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Line Chart
                      </Typography>
                      <LineChart data={fakeData.line} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Bar Chart
                      </Typography>
                      <BarChart data={fakeData.bar} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 3 }}>
                      <Typography variant="h6" color="primary" gutterBottom>
                        Pie Chart
                      </Typography>
                      <PieChart data={fakeData.pie} />
                    </Paper>
                  </Grid>
                </Grid>
              </Container>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tentang"
          element={
            <ProtectedRoute>
              <Tentang />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loginCRUD"
          element={
            <ProtectedRoute>
              <LoginCRUD />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

const App = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { label: 'Tentang', path: '/tentang' },
    { label: 'Data Karyawan', path: '/loginCRUD' },
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;

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
        />
      </Router>
    </ThemeProvider>
  );
};

export default App;
