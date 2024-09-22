import React from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';

const SpeedDialActions: React.FC = () => (
  <SpeedDial
    ariaLabel="Show Actions"
    icon={<AddIcon />}
    sx={{
      position: 'absolute', // Posizionato in modo assoluto nella card
      bottom: 0, // In basso al centro
      right: 0,
      left: 0,
      margin: '0 auto', // Centrato orizzontalmente
    }}
  >
    <SpeedDialAction
      icon={<AddIcon />}
      tooltipTitle="Create Show"
      onClick={() => alert('Create Show')}
    />
    <SpeedDialAction
      icon={<UploadIcon />}
      tooltipTitle="Import Show"
      onClick={() => alert('Import Show')}
    />
  </SpeedDial>
);

export default SpeedDialActions;
