import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button, IconButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface ActDetailsProps {
  act: string;
  subtitles: { id: number; text: string }[];
  onUpdateSubtitles: (newSubtitles: any) => void;
}

const languagesList = ['English', 'French', 'Spanish', 'German', 'Italian'];

const ActDetails: React.FC<ActDetailsProps> = ({ act, subtitles, onUpdateSubtitles }) => {
  const [availableLanguages, setAvailableLanguages] = useState<string[]>(['English']);
  const [newLanguage, setNewLanguage] = useState<string>('');

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    ...availableLanguages.map((lang) => ({
      field: lang.toLowerCase(),
      headerName: lang,
      flex: 1,
      editable: true,
    })),
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteSubtitle(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  const handleDeleteSubtitle = (id: number) => {
    const updatedSubtitles = subtitles.filter((subtitle) => subtitle.id !== id);
    onUpdateSubtitles(updatedSubtitles);
  };

  const handleProcessRowUpdate = (newRow: any, oldRow: any) => {
    const updatedSubtitles = subtitles.map((subtitle) =>
      subtitle.id === newRow.id ? { ...subtitle, ...newRow } : subtitle
    );
    onUpdateSubtitles(updatedSubtitles);
    return newRow;
  };

  const handleAddSubtitle = () => {
    const newSubtitle = { id: subtitles.length + 1, text: 'New Subtitle' };
    onUpdateSubtitles([...subtitles, newSubtitle]);
  };

  const handleAddLanguage = () => {
    if (newLanguage && !availableLanguages.includes(newLanguage)) {
      setAvailableLanguages([...availableLanguages, newLanguage]);
    }
    setNewLanguage('');
  };

  return (
    <Box>
      <h4>Editing Act: {act}</h4>
      <Box style={{ height: 300, width: '100%' }}>
        <DataGrid
          rows={subtitles}
          columns={columns}
          processRowUpdate={handleProcessRowUpdate}
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Button variant="contained" onClick={handleAddSubtitle}>
          Add Subtitle
        </Button>

        {/* Select per aggiungere nuove lingue */}
        <FormControl sx={{ width: '200px' }}>
          <InputLabel id="select-language-label">Add Language</InputLabel>
          <Select
            labelId="select-language-label"
            value={newLanguage}
            label="Add Language"
            onChange={(e) => setNewLanguage(e.target.value)}
          >
            {languagesList
              .filter((lang) => !availableLanguages.includes(lang))
              .map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {lang}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button variant="outlined" onClick={handleAddLanguage}>
          Add Language
        </Button>
      </Box>
    </Box>
  );
};

export default ActDetails;
