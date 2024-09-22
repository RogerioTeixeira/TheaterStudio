import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './AppLayout';
import EditShowPage from './component/EditShowPage'



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />} />
        <Route path="/edit/:showId" element={<EditShowPage />} />
      </Routes>
    </Router>
  );
}
