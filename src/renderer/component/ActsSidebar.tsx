import React, { useState } from 'react';
import { Box, Typography, Button, TextField, List, ListItem, ListItemText, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SubtitlesSection from './SubtitlesSection';

interface ActDetailsProps {
  act: string;
}

const ActDetails: React.FC<ActDetailsProps> = ({ act }) => {
  const [subtitles, setSubtitles] = useState<string[]>(['Subtitle 1', 'Subtitle 2']);

  const handleAddSubtitle = () => {
    const newSubtitle = prompt('Insert new subtitle:');
    if (newSubtitle) {
      setSubtitles([...subtitles, newSubtitle]);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Details for {act}</Typography>

      {/* Sezione sottotitoli */}
      <SubtitlesSection
        subtitles={subtitles}
        onAddSubtitle={handleAddSubtitle}
        onDeleteSubtitle={(index) => setSubtitles(subtitles.filter((_, i) => i !== index))}
        onEditSubtitle={(index) => {
          const newSubtitle = prompt('Edit subtitle:', subtitles[index]);
          if (newSubtitle) {
            const updatedSubtitles = [...subtitles];
            updatedSubtitles[index] = newSubtitle;
            setSubtitles(updatedSubtitles);
          }
        }}
      />
    </Box>
  );
};

export default ActDetails;
