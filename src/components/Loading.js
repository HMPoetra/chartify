import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      flexDirection="column"
    >
      <CircularProgress />
      <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
        Memuat...
      </Typography>
    </Box>
  );
};

export default Loading;
