import React, { useState, ReactElement, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cat, storeACat, storeCats } from "../types/Cat";
import ShowCat from "./ShowCat";
import SignupCat from "./SignupCat";
import ListCats from "./ListCats";

import { Transport, AxiosResponse } from "../types/Transport";
import { UseTransport } from "../services/Transport";
import { defaultCat } from "../services/util";

const API: Transport<Array<Cat>, string> = UseTransport() as Transport<Array<Cat>, string>;



const OSSRoutes = () => {
  const [ currentCats, updateCats ] = useState<Array<Cat>>([] as Array<Cat> );
  const [ current, setCat] = useState<Cat>(defaultCat(null, currentCats.length));

  const updateCat=function(a:Cat ):void {
    setCat(a);
    if(a.ID === null) { throw Error("Cats must have an ID code, how did it gets it's label off?"); }
    if(a.ID<0 || a.ID>currentCats.length) {
      throw Error("This cat doesn't seem to be a local. Where did it come from?");
    }
console.log("Replacing cat "+a.ID, currentCats[ a.ID], a);    
    currentCats[ a.ID]= a;
  }

  const removeCat=function(a:Cat) {
    if(a.ID === null) { throw Error("Cats must have an ID code, how did it gets it's label off?"); }
    if(a.ID<0 || a.ID>currentCats.length) {
      throw Error("This cat doesn't seem to be a local. Where did it come from?");
    }
    const tmp=currentCats.splice(a.ID, 1);
    updateCats(tmp);
    if(a.ID===current.ID) {
      setCat( defaultCat(null, currentCats.length));
    }
  }

  useEffect(() => {
    if (currentCats.length === 0) {
      API.getAll(undefined).then((dd) => {
        const importList: AxiosResponse<Array<Cat>> = dd as AxiosResponse<
          Array<Cat>
        >;
        updateCats(importList.data);
      });
    }
  }, [currentCats, updateCats, API]);


  return (
    <BrowserRouter>
      <Routes>
       
        <Route index element={<ListCats currentCats={currentCats} updateCats={updateCats}  updateCat={updateCat} />} />
        <Route path="/list" element={<ListCats currentCats={currentCats} updateCats={updateCats} updateCat={updateCat} />} key="list" />
        <Route path="/signup" element={<SignupCat current={current} updateCat={updateCat} removeCat={removeCat }/>} key="signup" />
        <Route path="/signup/:ID" element={<SignupCat current={current} updateCat={updateCat} removeCat={removeCat } />} key="edit" />
        <Route
          path="/profile/:ID"
          element={<ShowCat current={current} isChild={false} removeCat={removeCat } />}
          key="profile"
        />
        <Route path="*" element={<ListCats currentCats={currentCats} updateCats={updateCats} updateCat={updateCat} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default OSSRoutes;
