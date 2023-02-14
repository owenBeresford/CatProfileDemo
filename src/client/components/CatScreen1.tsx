import React, { useState } from "react";
import { Cat } from "../types/Cat";
import { ChangeTab } from "../types/ChangeTab";
import { mapInitialValue } from "../services/util";
import { NavLink } from "react-router-dom";
import "./SignupCats.css";

export interface Screen1Props {
  build: Cat;
  returnCat: (a: Cat) => void;
  incTab: ChangeTab;
}

const CatScreen1: React.FC<Screen1Props> = (props: Screen1Props) => {
  /* eslint-disable react/jsx-no-bind */
  const [about, setAbout] = useState<string>(
    mapInitialValue<string>(props.build, props.build.about, "")
  );
  const [interests, setInterests] = useState<string>(
    mapInitialValue<string>(props.build, props.build.interests, "")
  );
  const [team, setTeam] = useState<string>(
    mapInitialValue<string>(props.build, props.build.team, "")
  );
  const [errMsg, setErrmsg] = useState<string>("");

  function next(): boolean {
    if (!about || !interests || !team) {
      setErrmsg(
        "All cats must enter their team, and something for about and interests"
      );
      return false;
    }

    props.build.about = about;
    props.build.interests = interests;
    props.build.team = team;
    props.incTab(2);
    props.returnCat(props.build);
    return false;
  }

  return (
    <div className="aScreen popup">
      {errMsg.length > 0 ? <p className="error">{errMsg}</p> : <></>}
      <form>
        <label htmlFor="athAbout">Describe yourself: </label>
        <textarea
          id="athAbout"
          name="athAbout"
          placeholder="Describe qualifications, ambitions etc"
          cols={50}
          rows={5}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
            setAbout(e.target.value);
          }}
        >
          {about}
        </textarea>
        <label htmlFor="athInterests">Your interests: </label>
        <textarea
          id="athInterests"
          name="athInterests"
          placeholder="Describe yourself"
          cols={50}
          rows={5}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
            setInterests(e.target.value);
          }}
        >
          {interests}
        </textarea>
        <label htmlFor="athTeam">Your team: </label>
        <input
          id="athTeam"
          name="athTeam"
          value={team}
          placeholder="Real Madrid"
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setTeam(e.target.value);
          }}
        />

        <div className="buttonBar">
          <NavLink to="/">
            <span className="goBack button">❌ Cancel</span>
          </NavLink>
          <input
            className="button"
            id="sendP2"
            type="button"
            value="Next to review"
            onClick={next}
          />
        </div>
      </form>
    </div>
  );
};

export default CatScreen1;
