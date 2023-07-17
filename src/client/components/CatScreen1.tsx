import React, { useState, useRef, MutableRefObject } from "react";
import { Cat, storeACat } from "../types/Cat";
import { ChangeTab } from "../types/ChangeTab";
import { mapInitialValue, expandRef } from "../services/util";
import { NavLink } from "react-router-dom";
//import {textarea } from 'react-dom';
//import Textarea, { ResizableTextAreaRef, TextAreaRef }  from "rc-textarea";

export interface Screen1Props {
  build: Cat;
  returnCat: storeACat;
  incTab: ChangeTab;
  aKey: string;
}

const CatScreen1: React.FC<Screen1Props> = (props: Screen1Props) => {
  const about = useRef<HTMLTextAreaElement>(
    null
  ) as MutableRefObject<HTMLTextAreaElement>;
  const interests = useRef<HTMLTextAreaElement>(
    null
  ) as MutableRefObject<HTMLTextAreaElement>;
  const team = useRef<HTMLInputElement>(
    null
  ) as MutableRefObject<HTMLInputElement>;

  const [errMsg, setErrmsg] = useState<string>("");
  const [lastInput, setLastInput] = useState<string>("athAbout");

  function next(): boolean {
    if (!about || !interests || !team) {
      setErrmsg(
        "All cats must enter their team, and something for about and interests"
      );
      return false;
    }

    props.build.about = expandRef(about);
    props.build.interests = expandRef(interests);
    props.build.team = expandRef(team);
    props.incTab(2);
    props.returnCat(props.build);
    return false;
  }

  return (
    <div className="aScreen popup" key={props.aKey}>
      {errMsg.length > 0 ? <p className="error">{errMsg}</p> : <></>}
      <form>
        <label htmlFor="athAbout">Describe yourself: </label>
        <textarea
          /* autoSize={true}
          allowClear */
          ref={about}
          autoFocus={lastInput === "athAbout"}
          onBlur={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
            setLastInput("athAbout");
          }}
          defaultValue={mapInitialValue<string>(
            props.build,
            expandRef(about),
            props.build.about
          )}
        />

        <label htmlFor="athInterests">Your interests: </label>
        <textarea
          /* autoSize={true}
          allowClear */
          ref={interests}
          autoFocus={lastInput === "athInterests"}
          onBlur={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
            setLastInput("athInterests");
          }}
          defaultValue={mapInitialValue<string>(
            props.build,
            expandRef(interests),
            props.build.interests
          )}
        />

        <label htmlFor="athTeam">Your team: </label>
        <input
          key={"athTeam" + expandRef(team, true)}
          id="athTeam"
          name="athTeam"
          ref={team}
          placeholder="Portugal"
          autoFocus={lastInput === "athTeam"}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setLastInput("athTeam");
            props.build.team = e.target.value;
          }}
          defaultValue={mapInitialValue<string>(
            props.build,
            expandRef(team),
            props.build.team
          )}
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
