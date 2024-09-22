import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import SpeedDialActions from './SpeedDialActions';
import Grid2 from '@mui/material/Grid2'; // Importa Grid2

const EmptyShowCard: React.FC = () => (
  <Grid2 container spacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <Grid2 sx={{ flexGrow: 1 }}>
      <Card
        sx={{
          height: '200px', // Imposta un'altezza fissa uguale alle altre card
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative', // Per posizionare lo SpeedDial in modo assoluto
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              position: 'relative',
            }}
          >
            {/* Speed Dial posizionato assolutamente al centro */}
            <SpeedDialActions />
          </Box>
        </CardContent>
      </Card>
    </Grid2>
  </Grid2>
);

export default EmptyShowCard;
