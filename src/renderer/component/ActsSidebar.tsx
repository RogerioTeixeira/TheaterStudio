import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Box, Tooltip, Button, ListItemIcon } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';

interface ActsSidebarProps {
  acts: string[];
  onSelectAct: (act: string) => void;
  selectedAct: string | null;
  onAddAct: (newAct: string) => void;
  onDeleteAct: (actToDelete: string) => void;
  onEditAct: (oldAct: string, newAct: string) => void;
}

const ActsSidebar: React.FC<ActsSidebarProps> = ({
  acts,
  onSelectAct,
  selectedAct,
  onAddAct,
  onDeleteAct,
  onEditAct,
}) => {
  const [editingAct, setEditingAct] = useState<string | null>(null);
  const [newActName, setNewActName] = useState('');
  const [addingNewAct, setAddingNewAct] = useState(false);

  const handleEditClick = (act: string) => {
    setEditingAct(act);
    setNewActName(act);
  };

  const handleSaveEdit = (act: string) => {
    if (newActName.trim()) {
      onEditAct(act, newActName);
    }
    setEditingAct(null);
  };

  const handleCancelEdit = () => {
    setEditingAct(null);
    setNewActName('');
  };

  const handleAddNewAct = () => {
    setAddingNewAct(true);
  };

  const handleSaveNewAct = () => {
    if (newActName.trim()) {
      onAddAct(newActName);
    }
    setNewActName('');
    setAddingNewAct(false);
  };

  const handleCancelNewAct = () => {
    setNewActName('');
    setAddingNewAct(false);
  };

  return (
    <Box sx={{ backgroundColor: '#F5F5F5', padding: '16px', height: '100%', borderRight: '1px solid #ddd' }}>
      <List>
        {acts.map((act, index) => (
          <ListItem
            key={index}
            button
            selected={selectedAct === act}
            onClick={() => onSelectAct(act)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer' // Cambia il cursore quando si passa sopra l'elemento
            }}
          >
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            {editingAct === act ? (
              <Box display="flex" alignItems="center" flexGrow={1}>
                <TextField
                  value={newActName}
                  onChange={(e) => setNewActName(e.target.value)}
                  size="small"
                  autoFocus
                  fullWidth // Assicura che l'input riempia tutto lo spazio disponibile
                  sx={{ height: '40px' }} // Forza l'altezza dell'input per corrispondere all'altezza del contenitore
                />
                <Tooltip title="Save">
                  <IconButton onClick={() => handleSaveEdit(act)}>
                    <CheckIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancel">
                  <IconButton onClick={handleCancelEdit}>
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            ) : (
              <Box display="flex" alignItems="center" flexGrow={1}>
                <ListItemText primary={act} />
                <Tooltip title="Edit">
                  <IconButton onClick={() => handleEditClick(act)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                {!editingAct && (
                  <Tooltip title="Delete">
                    <IconButton onClick={() => onDeleteAct(act)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            )}
          </ListItem>
        ))}
      </List>

      {/* Aggiunta di un nuovo atto */}
      {addingNewAct ? (
        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            value={newActName}
            onChange={(e) => setNewActName(e.target.value)}
            size="small"
            placeholder="New Act"
            autoFocus
            fullWidth
            sx={{ height: '40px' }} // Assicura che l'input riempia tutto lo spazio disponibile
          />
          <Tooltip title="Save">
            <IconButton onClick={handleSaveNewAct}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton onClick={handleCancelNewAct}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleAddNewAct}
          fullWidth
          sx={{ mt: 2 }}
        >
          Add New Act
        </Button>
      )}
    </Box>
  );
};

export default ActsSidebar;
