import * as React from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Button, Typography, Card, CardContent, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const initialRows: GridRowsProp = [
  { id: 1, col1: 'Sentence 1 in English', col2: 'Phrase 1 en français', col3: 'جملة 1 بالعربية', viewed: false },
  { id: 2, col1: 'Sentence 2 in English', col2: 'Phrase 2 en français', col3: 'جملة 2 بالعربية', viewed: false },
  { id: 3, col1: 'Sentence 3 in English', col2: 'Phrase 3 en français', col3: 'جملة 3 بالعربية', viewed: false },
  { id: 4, col1: 'Sentence 4 in English', col2: 'Phrase 4 en français', col3: 'جملة 4 بالعربية', viewed: false },
  { id: 5, col1: 'Sentence 5 in English', col2: 'Phrase 5 en français', col3: 'جملة 5 بالعربية', viewed: false },
];

export default function SubtitleGrid() {
  const [currentRowIndex, setCurrentRowIndex] = React.useState(0);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([initialRows[0].id]);
  const [rows, setRows] = React.useState(initialRows); // Gestione dello stato delle righe

  // Funzione per inviare il sottotitolo e passare alla riga successiva
  const handleDisplaySubtitle = () => {
    markRowAsViewed(currentRowIndex);  // Segna la riga corrente come visualizzata

    // Se c'è una riga successiva, selezionala
    if (currentRowIndex < rows.length - 1) {
      const newIndex = currentRowIndex + 1;
      setCurrentRowIndex(newIndex);
      setRowSelectionModel([rows[newIndex].id]);
    }
  };

  // Funzione per segnare la riga come visualizzata
  const markRowAsViewed = (index: number) => {
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = { ...updatedRows[index], viewed: true }; // Aggiorna lo stato della riga
      return updatedRows;
    });
  };

  const columns: GridColDef[] = [
    { field: 'col1', headerName: 'English', flex: 1 },
    { field: 'col2', headerName: 'French', flex: 1 },
    { field: 'col3', headerName: 'Arabic', flex: 1 },
    {
      field: 'viewed',
      headerName: 'Viewed',
      flex: 0.5,
      renderCell: (params: any) => (
        params.value ? <CheckCircleIcon style={{ color: 'green' }} /> : <CheckCircleOutlineIcon />
      ),
    }
  ];

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        autoHeight
        pageSize={5}
        rowSelectionModel={rowSelectionModel}  // Imposta la riga selezionata
        onRowSelectionModelChange={(newSelection) => {
          setRowSelectionModel(newSelection);
          const selectedRowId = newSelection[0];
          const selectedRowIndex = rows.findIndex(row => row.id === selectedRowId);
          setCurrentRowIndex(selectedRowIndex);
        }}
      />

      <div style={{ marginTop: 20 }}>
        <Button variant="contained" onClick={handleDisplaySubtitle}>
          Display Subtitle
        </Button>
      </div>

      {/* Visualizzazione dei sottotitoli come card */}
      <div style={{ marginTop: 20 }}>
        <Typography variant="h6" gutterBottom>Current Subtitle:</Typography>

        <Grid container spacing={2}>
          {/* Card per la lingua inglese */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  English
                </Typography>
                <Typography variant="body1">
                  {rows[currentRowIndex].col1}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card per la lingua francese */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  French
                </Typography>
                <Typography variant="body1">
                  {rows[currentRowIndex].col2}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Card per la lingua araba */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Arabic
                </Typography>
                <Typography variant="body1">
                  {rows[currentRowIndex].col3}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
