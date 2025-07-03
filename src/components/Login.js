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
  );
};

export default Login;
