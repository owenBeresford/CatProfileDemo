import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Cat } from "../types/Cat";
import { Transport, AxiosResponse } from "../types/Transport";
import { UseTransport } from "../services/Transport";

function ListCats() {
  const [currentCats, setCats] = useState<Array<Cat>>([] as Array<Cat>);
  const API: Transport<Array<Cat>, string> = UseTransport() as Transport<
    Array<Cat>,
    string
  >;

  useEffect(() => {
    if (currentCats.length === 0) {
      API.getAll(undefined).then((dd) => {
        const importList: AxiosResponse<Array<Cat>> = dd as AxiosResponse<
          Array<Cat>
        >;
        setCats(importList.data);
      });
    }
  }, [currentCats, setCats, API]);

  return (
    <div className="cats">
      <ul className="aList">
        <li
          key="new"
          title={"Signup and create a new profile"}
          className="button"
        >
          <NavLink to="/signup/"> Signup</NavLink>
        </li>
        {currentCats.map((ath, i) => {
          return (
            <li key={i} title={"Display " + ath.name + "'s profile "}>
              <NavLink to={"/profile/" + i}>{ath.name}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListCats;
