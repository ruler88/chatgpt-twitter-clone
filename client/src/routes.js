import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

const MainRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
