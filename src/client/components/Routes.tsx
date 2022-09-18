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
        <Route path="/list" element={<ListAthletes />} key="list" />
        <Route path="/signup" element={<SignupAthlete />} key="signup" />
        <Route path="/profile/:ID" element={<ShowAthlete current={null} />} key="profile" />
        <Route path="*" element={<ListAthletes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default OSSRoutes;
