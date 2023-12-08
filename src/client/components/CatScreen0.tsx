import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import DateBlock from "./DateBlock";
import BooleanButton from "./BooleanButton";
import { NavLink } from "react-router-dom";

import { ChangeTab } from "../types/ChangeTab";
import { Cat, DEFAULT_BIRTH_DATE, storeACat } from "../types/Cat";
import { KnownSports, KnownSportsValues } from "../types/KnownSports";
import {
  mapInitialValue,
  includesWithBetterTyping,
  expandRef,
} from "../services/util";

/**
 * Screen0Props
 * Interface for the properties on this Component see {@link storeACat}, {@link Cat}, {@link ChangeTab}
 * @public
 * @typedef Screen0Props
 */
export interface Screen0Props {
  build: Cat;
  returnCat: storeACat;
  incTab: ChangeTab;
  aKey: string;
}

/**
 * CatScreen0
 * A Component to input the first batch of form items
 *
 * @public
 */
const CatScreen0: React.FC<Screen0Props> = (props: Screen0Props) => {
  // I like the 'custom hooks' as described in https://react.school/ui/input; BUT it doesn't work efficiently with typescript

  const [sports, setSports] = useState<Array<KnownSports>>(
    mapInitialValue<Array<KnownSports>>(
      props.build,
      props.build.sports,
      [] as Array<KnownSports>
    )
  );
  const [dob, setDOB] = useState<number | undefined>(
    mapInitialValue<number>(
      props.build,
      props.build.dob.getTime(),
      DEFAULT_BIRTH_DATE.getTime()
    )
  );
  const name = useRef<HTMLInputElement>(
    null
  ) as MutableRefObject<HTMLInputElement>;
  const gender = useRef<HTMLInputElement>(
    null
  ) as MutableRefObject<HTMLInputElement>;

  const [errMsg, setErrmsg] = useState<string>("");
  const [lastInput, setLastInput] = useState<string>("athName");

  useEffect(() => {
    setSports(props.build.sports);
  }, [props.build, setSports]);

  /**
   * next
   * Event handler to write data back to the parent component
 
   * @internal
   */
  function next(): boolean {
    if (!dob || !name || !gender || sports.length === 0) {
      setErrmsg(
        "All cats must enter their name, gender, sports and date of birth"
      );
      console.log(
        "Test Signup: Screen0: Error absent data, dying early.",
        dob,
        name,
        gender,
        sports
      );
      return false;
    }

    props.build.gender = expandRef(gender);
    props.build.name = expandRef(name);
    props.build.dob = new Date(dob);
    props.build.sports = [...sports];
    props.incTab(1);
    props.returnCat(props.build);
    return false;
  }

  /**
   * chooseSport
   * Event handler to correctly update sports, addition ans subtraction
 
   * @internal
   */
  function chooseSport(item: string): boolean {
    const WHICH: KnownSports = item as KnownSports;
    if (sports.includes(WHICH)) {
      // to remove a sport
      const index = sports.indexOf(WHICH);
      setSports(sports.splice(index, 1));
    } else {
      setSports([...sports, WHICH as KnownSports]);
    }
    setLastInput("nobody,idontneednobody");
    return false;
  }

  const DEFAULT_DOB = DEFAULT_BIRTH_DATE.getTime();
  const CURRENT_SPORTS = mapInitialValue<Array<KnownSports>>(
    props.build,
    props.build.sports,
    props.build.sports
  );

  const BITS = KnownSportsValues.map((name: KnownSports) => {
    return (
      <BooleanButton
        key={"athSport" + name}
        text={name}
        /* eslint-disable-next-line react/jsx-no-bind */
        push={chooseSport}
        active={includesWithBetterTyping(CURRENT_SPORTS, name)}
      />
    );
  });
  const currentDob = mapInitialValue<number>(
    props.build,
    dob,
    props.build.dob.getTime()
  );

  return (
    <div className="aScreen popup" key={props.aKey}>
      <form>
        {errMsg.length > 0 ? <p className="error">{errMsg}</p> : <></>}
        <label htmlFor="athName" className="shortLegend">
          {" "}
          Your name:{" "}
        </label>
        <input
          key={"athName" + expandRef(name, true)}
          id="athName"
          name="athName"
          defaultValue={mapInitialValue<string>(
            props.build,
            expandRef(name),
            props.build.name
          )}
          ref={name}
          placeholder="Your name"
          autoFocus={lastInput === "athName"}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setLastInput("athName");
            props.build.name = e.target.value;
          }}
        />
        <label htmlFor="athGender" className="shortLegend">
          Gender: {expandRef(gender)}{" "}
        </label>
        <input
          key={"athGender" + expandRef(gender, true)}
          id="athGender"
          name="athGender"
          ref={gender}
          defaultValue={mapInitialValue<string>(
            props.build,
            expandRef(gender),
            props.build.gender
          )}
          placeholder="Describe yourself"
          autoFocus={lastInput === "athGender"}
          onBlur={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setLastInput("athGender");
            props.build.gender = e.target.value;
          }}
        />
        <label htmlFor="athDob" className="shortLegend">
          Birth date:{" "}
        </label>
        <DateBlock passback={setDOB} initialVal={currentDob || DEFAULT_DOB} />

        <label htmlFor="athSports">Sports: </label>
        <div className="appCols">{BITS}</div>

        <div className="buttonBar">
          <NavLink to="/">
            <span className="goBack button">Cancel</span>
          </NavLink>
          <input
            className="button"
            key={"athSubmit"}
            id="sendP1"
            type="button"
            value="Next "
            /* eslint-disable-next-line react/jsx-no-bind */
            onClick={next}
          />
        </div>
      </form>
    </div>
  );
};

export default CatScreen0;
