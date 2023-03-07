import React, { useState, useEffect } from "react"; // RefObject
import DateBlock from "./DateBlock";
import BooleanButton from "./BooleanButton";
import { NavLink } from "react-router-dom";

import { ChangeTab } from "../types/ChangeTab";
import { Cat, DEFAULT_BIRTH_DATE, storeACat } from "../types/Cat";
import { KnownSports, KnownSportsValues } from "../types/KnownSports";
import { mapInitialValue, includesWithBetterTyping } from "../services/util";

export interface Screen0Props {
  build: Cat;
  returnCat: storeACat;
  incTab: ChangeTab;
  aKey:string;
}

const CatScreen0: React.FC<Screen0Props> = (props: Screen0Props) => {
  // I like the 'custom hooks' as described in https://react.school/ui/input; BUT it doesnt work efficiently with typescript

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
  const [name, setName] = useState<string>(
    mapInitialValue<string>(props.build, props.build.name, "")
  );
  const [gender, setGender] = useState<string>(
    mapInitialValue<string>(props.build, props.build.gender, "")
  );
  const [errMsg, setErrmsg] = useState<string>("");
  const [lastInput, setLastInput] = useState<string>("athName");

  useEffect(() => {
    setGender(props.build.gender);
  }, [props.build, setGender]);
  useEffect(() => {
    setName(props.build.name);
  }, [props.build, setName]);
  useEffect(() => {
    setDOB(props.build.dob.getTime());
  }, [props.build, setDOB]);
  useEffect(() => {
    setSports(props.build.sports);
  }, [props.build, setSports]);

  function next(): boolean {
    if (!dob || !name || !gender || sports.length === 0) {
      setErrmsg(
        "All cats must enter their name, gender, sports and date of birth"
      );
      console.log("Test Signup: Screen0: Error absent data, dying early.", dob, name, gender, sports );
      return false;
    }

    props.build.gender = gender;
    props.build.name = name;
    props.build.dob = new Date(dob);
    props.build.sports = [...sports];
    props.incTab(1);
    console.log("Signup: Screen0: jump to next tab",  );
    props.returnCat(props.build);
    return false;
  }

  function chooseSport(item: string): boolean {
    const WHICH: KnownSports = item as KnownSports;
    if (sports.includes(WHICH)) {
      // to remove a sport
      const index = sports.indexOf(WHICH);
      setSports(sports.splice(index, 1));
    } else {
      setSports([...sports, WHICH as KnownSports]);
    }
    return false;
  }
  const DEFAULT_DOB = DEFAULT_BIRTH_DATE.getTime();
  const CURRENT_SPORTS = mapInitialValue<Array<KnownSports>>(
    props.build,
    props.build.sports,
    []
  );

  const BITS = KnownSportsValues.map((name: KnownSports) => {
  return (
      <BooleanButton
        key={"athSport"+name}
        text={name}
          /* eslint-disable-next-line react/jsx-no-bind */
        push={chooseSport}
        active={includesWithBetterTyping(CURRENT_SPORTS, name)}
      />
    );
  });

  // IOIO pull out the date widget wrapper
  return (
    <div className="aScreen popup" key={props.aKey}>
      <form>
        {errMsg.length > 0 ? <p className="error">{errMsg}</p> : <></>}
        <label htmlFor="athName" className="shortLegend">
          {" "}
          Your name:{" "}
        </label>
        <input
          key={"athName" + name}
          id="athName"
          name="athName"
          value={name}
          placeholder="Your name"
          autoFocus={lastInput==="athName" }
          onBlur={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setName(e.target.value);
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setLastInput("athName");
            setName(e.target.value);
          }}

        />
        <label htmlFor="athGender" className="shortLegend">
          Gender: {gender}{" "}
        </label>
        <input
          key={"athGender" + gender}
          id="athGender"
          name="athGender"
          value={gender}
          placeholder="Describe yourself"
          autoFocus={lastInput==="athGender" }
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
            setLastInput("athGender");
            setGender(e.target.value);
          }}
        />
        <label htmlFor="athDob" className="shortLegend">
          Birth date:{" "}
        </label>
        <DateBlock passback={setDOB} initialVal={dob || DEFAULT_DOB} />

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
