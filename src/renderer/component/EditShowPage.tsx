import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Grid2 from '@mui/material/Grid2'; // Corretto import di Grid2
import ActsSidebar from './ActsSidebar';
import ActDetails from './ActDetails';

const shows = [
  { id: 1, name: 'Romeo and Juliet', acts: ['Act 1', 'Act 2', 'Act 3'] },
  { id: 2, name: 'Hamlet', acts: ['Act 1', 'Act 2'] },
  { id: 3, name: 'Othello', acts: ['Act 1', 'Act 2', 'Act 3', 'Act 4'] },
];

const EditShowPage: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const [selectedAct, setSelectedAct] = useState<string | null>(null);
  const [show, setShow] = useState<any>(null);

  useEffect(() => {
    const foundShow = shows.find((s) => s.id === parseInt(showId || ''));
    if (foundShow) {
      setShow(foundShow);
    } else {
      navigate('/');
    }
  }, [showId, navigate]);

  const handleSelectAct = (act: string) => {
    setSelectedAct(act);
  };

  if (!show) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ flexGrow: 1, padding: '24px' }}>
      {/* AppBar con titolo e pulsanti */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Edit: {show.name}
          </Typography>
          <Button variant="outlined" color="inherit" onClick={() => alert('Save changes')}>
            Save
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => navigate('/')}>
            Back
          </Button>
        </Toolbar>
      </AppBar>

      {/* Layout con CSS Grid */}
      <Grid2 container sx={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '16px', mt: 2 }}>
        <Box sx={{ gridColumn: '1' }}>
          <ActsSidebar acts={show.acts} onSelectAct={handleSelectAct} selectedAct={selectedAct} />
        </Box>

        <Box sx={{ gridColumn: '2' }}>
          {selectedAct ? (
            <ActDetails act={selectedAct} />
          ) : (
            <Typography variant="h6">Seleziona un atto per modificare i dettagli</Typography>
          )}
        </Box>
      </Grid2>
    </Box>
  );
};

export default EditShowPage;
