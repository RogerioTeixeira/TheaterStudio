import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import ActsSidebar from './ActsSidebar';
import ActDetails from './ActDetails';

const shows = [
  { id: 1, name: 'Romeo and Juliet', acts: ['Act 1', 'Act 2', 'Act 3'], subtitles: { 'Act 1': [], 'Act 2': [], 'Act 3': [] } },
  { id: 2, name: 'Hamlet', acts: ['Act 1', 'Act 2'], subtitles: { 'Act 1': [], 'Act 2': [] } },
  { id: 3, name: 'Othello', acts: ['Act 1', 'Act 2', 'Act 3', 'Act 4'], subtitles: { 'Act 1': [], 'Act 2': [], 'Act 3': [], 'Act 4': [] } },
];

const EditShowPage: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const navigate = useNavigate();
  const [selectedAct, setSelectedAct] = useState<string | null>(null);
  const [show, setShow] = useState<any>(null);
  const [acts, setActs] = useState<string[]>([]);
  const [subtitles, setSubtitles] = useState<any>({});

  useEffect(() => {
    const foundShow = shows.find((s) => s.id === parseInt(showId || ''));
    if (foundShow) {
      setShow(foundShow);
      setActs(foundShow.acts); // Carica gli atti dello spettacolo
      setSubtitles(foundShow.subtitles);
    } else {
      navigate('/');
    }
  }, [showId, navigate]);

  const handleSelectAct = (act: string) => {
    setSelectedAct(act);
  };

  const handleAddAct = (newAct: string) => {
    setActs([...acts, newAct]);
    setSubtitles({ ...subtitles, [newAct]: [] });
  };

  const handleDeleteAct = (actToDelete: string) => {
    setActs(acts.filter((act) => act !== actToDelete));
    setSubtitles((prev) => {
      const { [actToDelete]: _, ...rest } = prev;
      return rest;
    });
    if (selectedAct === actToDelete) {
      setSelectedAct(null); // Se l'atto eliminato è quello selezionato, azzera la selezione
    }
  };

  const handleEditAct = (oldAct: string, newAct: string) => {
    setActs(acts.map((act) => (act === oldAct ? newAct : act)));
    setSubtitles((prev) => {
      const { [oldAct]: subtitlesForOldAct, ...rest } = prev;
      return { ...rest, [newAct]: subtitlesForOldAct };
    });
    if (selectedAct === oldAct) {
      setSelectedAct(newAct); // Aggiorna l'atto selezionato
    }
  };

  const handleUpdateSubtitles = (newSubtitles: any) => {
    setSubtitles((prev) => ({ ...prev, [selectedAct!]: newSubtitles }));
  };

  if (!show) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ flexGrow: 1, padding: '24px' }}>
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

      <Grid2 container sx={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '16px', mt: 2 }}>
        <Box sx={{ gridColumn: '1' }}>
          <ActsSidebar
            acts={acts}
            onSelectAct={handleSelectAct}
            selectedAct={selectedAct}
            onAddAct={handleAddAct}
            onDeleteAct={handleDeleteAct}
            onEditAct={handleEditAct}
          />
        </Box>

        <Box sx={{ gridColumn: '2' }}>
          {selectedAct ? (
            <ActDetails
              act={selectedAct}
              subtitles={subtitles[selectedAct]}
              onUpdateSubtitles={handleUpdateSubtitles}
            />
          ) : (
            <Typography variant="h6">Seleziona un atto per modificare i dettagli</Typography>
          )}
        </Box>
      </Grid2>
    </Box>
  );
};

export default EditShowPage;
