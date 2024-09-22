import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface ShowCardProps {
  show: any;
  onEditClick: () => void; // Funzione per navigare alla pagina di modifica
}

const ShowCard: React.FC<ShowCardProps> = ({ show, onEditClick }) => (
  <Card
    sx={{
      width: '100%',
      paddingBottom: '100%',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CardContent
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h5">{show.name}</Typography>
      <Typography variant="subtitle1">Date: {show.date}</Typography>
      <Typography variant="body2">Acts: {show.acts.length}</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Tooltip title="Edit Show" arrow>
          <IconButton onClick={onEditClick}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Start Show" arrow>
          <IconButton onClick={() => alert(`Start ${show.name}`)}>
            <PlayArrowIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </CardContent>
  </Card>
);

export default ShowCard;
