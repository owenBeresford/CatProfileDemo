import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ShowCat from "./ShowCat";
import SignupCat from "./SignupCat";
import ListCats from "./ListCats";
import { CatState } from "../services/CatState";

// possible alternate design, move data ownership to root SPA node (in this case CatState)
const STATE = new CatState();

/**
 * A render func for Routes based component,  see [React Routes and BrowserRouter ](https://www.npmjs.com/package/react-router)
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ // there is nothing passed in
const CatRoutes = (props:any) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            <ListCats
              currentCats={STATE.currentCats}
              changeCat={STATE.changeCat}
              listenToState={STATE.listen}
              aKey={STATE.key}
            />
          }
        />
        <Route
          path="/list"
          element={
            <ListCats
              currentCats={STATE.currentCats}
              changeCat={STATE.changeCat}
              listenToState={STATE.listen}
              aKey={STATE.key}
            />
          }
          key="list"
        />
        <Route
          path="/signup"
          element={
            <SignupCat
              current={STATE.current}
              updateCat={STATE.updateCat}
              removeCat={STATE.removeCat}
              currentCats={STATE.currentCats}
            />
          }
          key="signup"
        />
        <Route
          path="/signup/:ID"
          element={
            <SignupCat
              current={STATE.current}
              updateCat={STATE.updateCat}
              removeCat={STATE.removeCat}
              currentCats={STATE.currentCats}
            />
          }
          key="edit"
        />
        <Route
          path="/profile/:ID"
          element={
            <ShowCat
              current={STATE.current}
              isChild={false}
              removeCat={STATE.removeCat}
              listenToState={STATE.listen}
              aKey={STATE.key}
            />
          }
          key="profile"
        />
        <Route
          path="*"
          element={
            <ListCats
              currentCats={STATE.currentCats}
              changeCat={STATE.changeCat}
              listenToState={STATE.listen}
              aKey={STATE.key}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default CatRoutes;
