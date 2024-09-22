import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import ShowCard from './ShowCard';
import Grid2 from '@mui/material/Grid2'; // Importiamo Grid2
import { useNavigate } from 'react-router-dom';

const shows = [
  { id: 1, name: 'Romeo and Juliet', date: '2024-09-20', acts: ['Act 1', 'Act 2', 'Act 3'] },
  { id: 2, name: 'Hamlet', date: '2024-10-01', acts: ['Act 1', 'Act 2'] },
  { id: 3, name: 'Othello', date: '2024-11-15', acts: ['Act 1', 'Act 2', 'Act 3', 'Act 4'] },
  { id: 4, name: 'Othello', date: '2024-11-15', acts: ['Act 1', 'Act 2', 'Act 3', 'Act 4'] },
  { id: 5, name: 'Othello', date: '2024-11-15', acts: ['Act 1', 'Act 2', 'Act 3', 'Act 4'] },
  { id: 6, name: 'Othello', date: '2024-11-15', acts: ['Act 1', 'Act 2', 'Act 3', 'Act 4'] },
];

interface MainContentProps {
  selectedShow: any;
  selectedActIndex: number | null;
  onShowSelect: (show: any) => void;
  onActSelect: (index: number) => void;
}

const MainContent: React.FC<MainContentProps> = ({
  selectedShow,
  selectedActIndex,
  onShowSelect,
}) => {
  const navigate = useNavigate();

  // Funzione per gestire la navigazione alla pagina di modifica
  const handleEditClick = (showId: number) => {
    navigate(`/edit/${showId}`);
  };
  return (
  <main style={{ flexGrow: 1, padding: '24px', position: 'relative' }}>
    {/* AppBar with title and action buttons */}
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Show List
        </Typography>
        <Button variant="outlined" color="inherit" sx={{ mr: 2 }} onClick={() => alert('Create Show')}>
          Create
        </Button>
        <Button variant="outlined" color="inherit" onClick={() => alert('Import Show')}>
          Import
        </Button>
      </Toolbar>
    </AppBar>

    {/* Main content area */}
    <Box mt={2}>
      {!selectedShow ? (
        <Grid2
          container
          spacing={2}
          sx={{
            display: 'grid',
            gap: '16px',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',  // 2 colonne su schermi piccoli
              sm: 'repeat(3, 1fr)',  // 3 colonne su schermi medi
              md: 'repeat(4, 1fr)',  // 4 colonne su schermi più larghi
              lg: 'repeat(4, 1fr)',  // 5 colonne su schermi molto larghi (es. widescreen)
              xl: 'repeat(6, 1fr)',  // 5 colonne su schermi molto larghi (es. widescreen)
            },
          }}
        >
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} onEditClick={() => handleEditClick(show.id)} />
          ))}
        </Grid2>
      ) : (
        <div>
          {/* Show details and acts */}
          <h4>{selectedShow.name}</h4>
          <p>Date: {selectedShow.date}</p>
          <h6>Acts:</h6>
        </div>
      )}
    </Box>
  </main>
)};

export default MainContent;
