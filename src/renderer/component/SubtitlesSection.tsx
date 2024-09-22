import React from 'react';
import { Box, List, ListItem, ListItemText, IconButton, Tooltip, Button , Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface SubtitlesSectionProps {
  subtitles: string[];
  onAddSubtitle: () => void;
  onDeleteSubtitle: (index: number) => void;
  onEditSubtitle: (index: number) => void;
}

const SubtitlesSection: React.FC<SubtitlesSectionProps> = ({ subtitles, onAddSubtitle, onDeleteSubtitle, onEditSubtitle }) => {
  return (
    <Box mt={2}>
      <Typography variant="h6">Subtitles</Typography>
      <List>
        {subtitles.map((subtitle, index) => (
          <ListItem key={index}>
            <ListItemText primary={subtitle} />
            <Tooltip title="Edit Subtitle" arrow>
              <IconButton onClick={() => onEditSubtitle(index)}>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete Subtitle" arrow>
              <IconButton onClick={() => onDeleteSubtitle(index)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
      <Button variant="outlined" startIcon={<AddIcon />} onClick={onAddSubtitle}>
        Add Subtitle
      </Button>
    </Box>
  );
};

export default SubtitlesSection;
