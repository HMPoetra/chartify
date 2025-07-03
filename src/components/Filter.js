import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Filter = ({ onFilterChange }) => {
  const handlePeriodeChange = (event) => {
    onFilterChange('periode', event.target.value);
  };

  const handleKategoriChange = (event) => {
    onFilterChange('kategori', event.target.value);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Periode</InputLabel>
        <Select defaultValue="all" label="Periode" onChange={handlePeriodeChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Mingguan">Mingguan</MenuItem>
          <MenuItem value="Bulanan">Bulanan</MenuItem>
          <MenuItem value="yearly">Tahunan</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" fullWidth>
        <InputLabel>Kategori</InputLabel>
        <Select defaultValue="all" label="Kategori" onChange={handleKategoriChange}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="Mouse">Mouse</MenuItem>
          <MenuItem value="Keyboard">Keyboard</MenuItem>
          <MenuItem value="WCam">Web Cam</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default Filter;
