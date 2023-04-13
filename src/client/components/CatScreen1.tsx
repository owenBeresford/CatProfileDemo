import React, { useState } from "react";
import { Cat, storeACat } from "../types/Cat";
import { ChangeTab } from "../types/ChangeTab";
import { mapInitialValue } from "../services/util";
import { NavLink } from "react-router-dom";
import Textarea from "rc-textarea";

export interface Screen1Props {
  build: Cat;
  returnCat: storeACat;
  incTab: ChangeTab;
  aKey: string;
}

const CatScreen1: React.FC<Screen1Props> = (props: Screen1Props) => {
  /* eslint-disable-next-line react/jsx-no-bind */
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
  const [lastInput, setLastInput] = useState<string>("athAbout");

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

  function onChange1(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    // possibly need to make local copy of this var, original demo did
    setAbout(e.target.value);
  }
  function onChange2(e: React.ChangeEvent<HTMLTextAreaElement>): void {
    // possibly need to make local copy of this var, original demo did
    setInterests(e.target.value);
  }

  return (
    <div className="aScreen popup" key={props.aKey}>
      {errMsg.length > 0 ? <p className="error">{errMsg}</p> : <></>}
      <form>
        <label htmlFor="athAbout">Describe yourself: </label>
        <Textarea
          autoSize={true}
          allowClear
          value={about}
          /* eslint-disable-next-line react/jsx-no-bind */
          onChange={onChange1}
        />

        <label htmlFor="athInterests">Your interests: </label>
        <Textarea
          autoSize={true}
          allowClear
          value={interests}
          /* eslint-disable-next-line react/jsx-no-bind */
          onChange={onChange2}
        />

        <label htmlFor="athTeam">Your team: </label>
        <input
          key={"athTeam" + team.replace(new RegExp("[ \\t'\"]", "g"), "_")}
          id="athTeam"
          name="athTeam"
          value={team}
          placeholder="Portugal"
          autoFocus={lastInput === "athTeam"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setLastInput("athTeam");
            setTeam(e.target.value);
          }}
        />

        <div className="buttonBar" key={props.aKey + "btns"}>
          <NavLink to="/">
            <span className="goBack button"> Cancel</span>
          </NavLink>
          <input
            key="athsubmit"
            className="button"
            id="sendP2"
            type="button"
            value="Next to review"
            /* eslint-disable-next-line react/jsx-no-bind */
            onClick={next}
          />
        </div>
      </form>
    </div>
  );
};

export default CatScreen1;
