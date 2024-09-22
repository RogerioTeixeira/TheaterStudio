import React from 'react';
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import { Show } from '../types';

interface SidebarProps {
  shows: Show[];
  onShowSelect: (show: Show) => void;
}

const drawerWidth = 240;

const Sidebar: React.FC<SidebarProps> = ({ shows, onShowSelect }) => {
  return (
    <Drawer
      variant="permanent"
      style={{ width: drawerWidth, flexShrink: 0 }}
      PaperProps={{ style: { width: drawerWidth } }}
    >
      <Toolbar />
      <div>
        <List>
          {shows.map((show) => (
            <ListItemButton key={show.id} onClick={() => onShowSelect(show)}>
              <ListItemText primary={show.name} secondary={show.date} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
