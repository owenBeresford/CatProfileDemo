import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowCat from "./ShowCat";
import SignupCat from "./SignupCat";
import ListCats from "./ListCats";

const OSSRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ListCats />} />
        <Route path="/list" element={<ListCats />} key="list" />
        <Route path="/signup" element={<SignupCat />} key="signup" />
        <Route path="/signup/:ID" element={<SignupCat />} key="edit" />
        <Route
          path="/profile/:ID"
          element={<ShowCat current={null} isChild={false} />}
          key="profile"
        />
        <Route path="*" element={<ListCats />} />
      </Routes>
    </BrowserRouter>
  );
};

export default OSSRoutes;
