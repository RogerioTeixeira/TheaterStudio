import React, { useState } from 'react';
import { CssBaseline } from '@mui/material';
import MainContent from './component/MainContent';

const AppLayout: React.FC = () => {
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedActIndex, setSelectedActIndex] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <MainContent
        selectedShow={selectedShow}
        selectedActIndex={selectedActIndex}
        onShowSelect={(show) => {
          setSelectedShow(show);
          setSelectedActIndex(null);
        }}
        onActSelect={setSelectedActIndex}
      />
    </div>
  );
};

export default AppLayout;
