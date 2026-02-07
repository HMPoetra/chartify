<<<<<<< HEAD
import React from 'react';
import { CssBaseline, TextField, Button, Typography, Container, Box, Paper, Grid } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: purple[200],
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
  },
});

const Login = () => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6}>
            <Paper elevation={6} sx={{ p: 4, borderRadius: 8 }}>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Box sx={{ mb: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" style={{ maxWidth: '25%', height: 'auto' }} />
                </Box>
                <Typography component="h1" variant={isMobile ? "h5" : "h4"} sx={{ mb: 2 }}>
                  Login
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    variant="outlined"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2, py: 1 }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
=======
import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  Paper,
  Fade,
  Grow
} from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/login/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userId', data.user.id);
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('role', data.user.role);

        Swal.fire({
          title: 'Login Berhasil!',
          html: `<strong>ID:</strong> ${data.user.id}<br><strong>Username:</strong> ${data.user.username}`,
          icon: 'success',
          confirmButtonText: 'Lanjutkan',
        }).then(() => navigate('/'));
      } else {
        const data = await response.json();
        setError(data.message || 'Login gagal');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Gagal terhubung ke server.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `radial-gradient(ellipse at top, #5B247A, #1b1b2f)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background Floating Blobs */}
      <Box
        sx={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'linear-gradient(45deg, #ff6ec4, #7873f5)',
          borderRadius: '50%',
          top: '-200px',
          left: '-200px',
          filter: 'blur(150px)',
          opacity: 0.4,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'linear-gradient(45deg, #42e695, #3bb2b8)',
          borderRadius: '50%',
          bottom: '-150px',
          right: '-150px',
          filter: 'blur(120px)',
          opacity: 0.3,
        }}
      />

      {/* Login Form */}
      <Grow in timeout={900}>
        <Paper
          elevation={12}
          sx={{
            p: 5,
            width: '100%',
            maxWidth: 420,
            borderRadius: 6,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.25)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
            }}
          >
            Selamat Datang
          </Typography>
          <Typography
            variant="body2"
            align="center"
            sx={{ mb: 3, color: '#ddd' }}
          >
            Silakan login ke akun Anda
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle sx={{ color: '#ccc' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: '#fff' },
                label: { color: '#ccc' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#888' },
                  '&:hover fieldset': { borderColor: '#fff' },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#ccc' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                input: { color: '#fff' },
                label: { color: '#ccc' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#888' },
                  '&:hover fieldset': { borderColor: '#fff' },
                },
              }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.3,
                fontWeight: 'bold',
                textTransform: 'none',
                background: 'linear-gradient(45deg, #7b2ff7, #f107a3)',
                color: '#fff',
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #6a1bcf, #e0069e)',
                },
              }}
            >
              Masuk
            </Button>
          </form>
        </Paper>
      </Grow>
    </Box>
>>>>>>> aa1ffb3ad (Revisi DatePicker & Final Projek)
  );
};

export default Login;
