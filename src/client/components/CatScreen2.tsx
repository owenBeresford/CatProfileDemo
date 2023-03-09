import React from "react";
import { useNavigate } from "react-router";
import { ShowCatInner } from "./ShowCat";
import { Cat, ShippingCat, storeACat, removeableCat } from "../types/Cat";
import { UseTransport } from "../services/Transport";
import { Transport } from "../types/Transport";
import { ChangeTab } from "../types/ChangeTab";
import { noop } from "../services/util";

export interface Screen2Props {
  build: Cat;
  incTab: ChangeTab;
  updateCat: storeACat;
  removeCat: removeableCat;
  aKey: string;
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
    /* eslint-disable-next-line react/jsx-no-bind */
    const tt: ShippingCat = {
      ...props.build,
      dob: props.build.dob.getTime(),
    } as ShippingCat;
    API.post(JSON.stringify(tt), undefined);

    NAVIGATE("/list");
    return false;
  }

  const localCat = (): Cat => {
    return props.build as Cat;
  };
  // this view has no update requirement, so listenToState is void

  // <!-- add supersize CSS and an ⇐ to before content  to -->
  return (
    <div className="aScreen popup" key={props.aKey}>
      <ShowCatInner
        current={localCat}
        isChild={true}
        removeCat={props.removeCat}
        aKey={props.aKey + "localCat"}
        listenToState={noop}
        ID={"" + props.build.ID}
      />

      <div className="buttonBar" key={props.aKey + "btns"}>
        <input
          id="sendP3back"
          className="goBack button"
          type="button"
          value="Edit my profile"
          /* eslint-disable-next-line react/jsx-no-bind */
          onClick={back}
        />

        <input
          id="sendP3"
          className="button"
          type="button"
          value="Save my profile"
          /* eslint-disable-next-line react/jsx-no-bind */
          onClick={next}
        />
      </div>
    </div>
  );
};

export default CatScreen2;
