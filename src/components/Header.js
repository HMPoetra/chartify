import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Box,
  useMediaQuery
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemText primary="Chartify" />
        </ListItem>
        <ListItem button component={Link} to="/tentang">
          <ListItemText primary="Tentang" />
        </ListItem>
        <ListItem button component={Link} to="/customer-service">
          <ListItemText primary="Customer Service" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'purple' }}>
      <Toolbar>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerContent}
            </Drawer>
            <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
              Chartify
            </Typography>
          </>
        ) : (
          <>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 'bold'
              }}
            >
              Chartify
            </Typography>
            <Button
              color="inherit"
              component={Link}
              to="/tentang"
              sx={{ textTransform: 'none', mx: 1 }}
            >
              Tentang
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/customer-service"
              sx={{ textTransform: 'none', mx: 1 }}
            >
              Customer Service
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
