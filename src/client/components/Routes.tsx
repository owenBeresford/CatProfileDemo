import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShowAthlete from './ShowAthlete';
import SignupAthlete from './SignupAthlete';
import ListAthletes from './ListAthletes';

const OSSRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ListAthletes />} />
        <Route path="/list" element={<ListAthletes />} />
        <Route path="/add" element={<SignupAthlete />} />
        <Route path="/profile/:ID" element={<ShowAthlete current={null} />} />
        <Route path="*" element={<ListAthletes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default OSSRoutes;