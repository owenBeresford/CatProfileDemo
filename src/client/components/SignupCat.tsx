import React, { useState, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Cat, storeACat } from "../types/Cat";
import { ChangeTab } from "../types/ChangeTab";
import { defaultCat } from "../services/util";

import CatScreen0 from "./CatScreen0";
import CatScreen1 from "./CatScreen1";
import CatScreen2 from "./CatScreen2";

interface SignupProps {
  current: Cat;
  currentCats: Array<Cat>;
  updateCat: storeACat;
  removeCat: storeACat;
}

const SignupCat: React.FC<SignupProps> = function (
  props: SignupProps
): React.ReactElement<SignupProps> {
  const { ID } = useParams();
  // short name isn't great, but confusing a type and variable is worse
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [signupScreen, setSignupScreen] = useState<number>(0);
  const [errMsg, setErrorMessage] = useState<string>("");

  if (!props.current || parseInt(ID || "", 10) !== props.current.ID) {
    if (!ID || (props.current && !props.current.ID)) {
      setErrorMessage("no ID and no data; pls talk to a dev.");
      return (
        <div className="error popup">
          Data loading.. no ID and no data; pls talk to a dev.
        </div>
      );
    }
    props.updateCat(defaultCat(null, props.currentCats.length));
  }

  return (
    <div className="signupContainer ">
      <>
        {errMsg ? <p className="error">{errMsg}</p> : <></>}
        <p className="error">To comply with GDPR, please enter fake data.</p>
        {spread(
          signupScreen,
          props.current,
          props.updateCat,
          props.removeCat,
          setSignupScreen
        )}
      </>
    </div>
  );
};

function spread(
  signupScreen: number,
  buildCat: Cat,
  setBuildingCat: storeACat,
  removeCat: storeACat,
  push: ChangeTab
): ReactElement {
  switch (signupScreen) {
    case 0:
      return (
        <CatScreen0 build={buildCat} incTab={push} returnCat={setBuildingCat} />
      );
    case 1:
      return (
        <CatScreen1 build={buildCat} incTab={push} returnCat={setBuildingCat} />
      );
    case 2:
      return (
        <CatScreen2
          build={buildCat}
          incTab={push}
          updateCat={setBuildingCat}
          removeCat={removeCat}
        />
      );
    default:
      throw new Error("Unknown value for the signup screen");
  }
}

export default SignupCat;
