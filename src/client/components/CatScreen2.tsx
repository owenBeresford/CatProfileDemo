import React from "react";
import { useNavigate } from "react-router";
import ShowCat from "./ShowCat";
import { Cat, ShippingCat, storeACat } from "../types/Cat";
import { UseTransport } from "../services/Transport";
import { Transport } from "../types/Transport";
import { ChangeTab } from "../types/ChangeTab";


export interface Screen2Props {
  build: Cat;
  incTab: ChangeTab;
  updateCat:storeACat;
  removeCat:storeACat;
}

const CatScreen2: React.FC<Screen2Props> = (props: Screen2Props) => {
  const NAVIGATE = useNavigate();

  function back(): boolean {
    props.incTab(0);
    return false;
  }

  function next(): boolean {
    props.updateCat(props.build);
    const API: Transport<ShippingCat, string> = UseTransport();
    /* eslint-disable react/jsx-no-bind */
    const tt: ShippingCat = {
      ...props.build,
      dob: props.build.dob.getTime(),
    } as ShippingCat;
    API.post(JSON.stringify(tt), undefined);

    NAVIGATE("/list");
    return false;
  }

  return (
    <div className="aScreen popup">
      <ShowCat current={props.build} isChild={true} removeCat={props.removeCat} />

      <div className="buttonBar">
        <input
          id="sendP3back"
          className="goBack button"
          type="button"
          value="Edit my profile"
          onClick={back}
        />

        <input
          id="sendP3"
          className="button"
          type="button"
          value="Save my profile"
          onClick={next}
        />
      </div>
    </div>
  );
};

export default CatScreen2;
