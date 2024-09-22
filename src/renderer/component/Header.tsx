import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
  return (
    <AppBar position="fixed" style={{ zIndex: 1201 }}>
      <Toolbar>
        <Typography variant="h6" noWrap>
          Theater Subtitle Manager
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
