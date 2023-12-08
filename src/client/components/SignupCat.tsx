import React, { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Cat, storeACat, removeableCat } from "../types/Cat";
import { accessCurrentCats, accessACat } from "../types/CatState";
import PropTypes from "prop-types";
import { defaultCat } from "../services/util";

import ErrorMsg from "./ErrorMsg";
import CatScreen0 from "./CatScreen0";
import CatScreen1 from "./CatScreen1";
import CatScreen2 from "./CatScreen2";

/**
 * SignupProps
 * Interface for the properties on this Component
 * @public
 * @typedef SignupProps
 */
interface SignupProps {
  current: accessACat;
  currentCats: accessCurrentCats;
  updateCat: storeACat;
  removeCat: removeableCat;
}

/**
 * InnereSignupProps
 * Interface for the properties
 * @public
 * @typedef InnerSignupProps
 */
interface InnerSignupProps extends SignupProps {
  ID: string;
}

/**
 * InnerSignupCat
 * The Component that renders a signup form, composed of several smaller forms
 * This makes a  {@link Cat},
 * @internal
 * @public
 */
export class InnerSignupCat extends React.Component<InnerSignupProps> {
  private errMsg: string;
  private screenNo: number;
  private builder: Cat;

  /**
   * constructor
   * A con'tor, populates local state as expected
 
   * @param { InnerSignupProps} props
   * @public
   */
  constructor(props: InnerSignupProps) {
    super(props);
    this.screenNo = 0;
    this.errMsg = "";
    if (props.current()) {
      this.builder = props.current();
    }
    if (this.props.ID) {
      this.props.updateCat(
        this.props.currentCats()[parseInt(this.props.ID, 10)]
      );
      this.builder = this.props.currentCats()[parseInt(this.props.ID, 10)];
    } else {
      this.builder = defaultCat(null, this.props.currentCats().length);
      this.props.updateCat(this.builder);
    }
    if (!this.builder) {
      console.error("I think you are running a unit-test with insuffient data");
      this.builder = defaultCat(null, this.props.currentCats().length);
      this.props.updateCat(this.builder);
    }

    // if have some sort of imported cat, that is not a complete one, it will have no id
    // the variable will capture data from the user to become complete
    if (this.builder.ID === 0 && props.ID === "" && this.screenNo === 0) {
      this.builder.ID = props.currentCats().length;
      props.updateCat(this.builder);
    }

    this.incTab = this.incTab.bind(this);
    this.updateBuildingCat = this.updateBuildingCat.bind(this);
  }

  /**
   * InnerSignupPropTypes
   * The properties that need to be passed in  see [docs for dep](https://www.npmjs.com/package/prop-types)
   * @static
   * @protected
   * @internal
   */
  static InnerSignupPropTypes = {
    current: PropTypes.func.isRequired,
    currentCats: PropTypes.func.isRequired,
    updateCat: PropTypes.func.isRequired,
    removeCat: PropTypes.func.isRequired,
    ID: PropTypes.string.isRequired,
  };

  /**
   * incTab
   * Event handler to move to next form section
   * @protected
   * @internal
   */
  incTab(newVal: number): void {
    this.screenNo = newVal;
    // I think this is react17 vs react18 issue.
    this.forceUpdate();
  }

  /**
   * updateBuildingCat
   * write back function
   * @protected
   * @internal
   */
  updateBuildingCat(a: Cat): void {
    this.builder = a;
  }

  /**
   * failMsg
   * Utility to make a ErrorMsg
 
   * @param {string} [str = "no ID and no data; pls talk to a dev."]
   * @private
   * @internal
   */
  failMsg(str = "no ID and no data; pls talk to a dev."): React.ReactElement {
    this.errMsg = str;
    return <ErrorMsg lead="Data loading..." err={str} />;
  }

  /**
   * render
   * The render function on this component
   *
   * @public
   */
  render(): React.ReactElement<SignupProps> {
    if (
      // no Cat and no ID is an empty page, so an ERROR
      !this.builder &&
      (this.props.ID === null || this.props.ID.length === 0)
    ) {
      return this.failMsg();
    }

    // wrong cat for ID
    if (this.props.ID && this.builder.ID !== parseInt(this.props.ID, 10)) {
      if (parseInt(this.props.ID, 10) > this.props.currentCats().length) {
        // this shouldn't happen, its logic failure elsewhere
        // I haven't seen it happen, but i'm coding defensively.
        return this.failMsg();
      }
    }
    // OR new Cat requested; it will be applied to the list at the end
    if (this.builder.ID === 0 && this.props.ID === "" && this.screenNo === 0) {
      this.builder.ID = this.props.currentCats().length;
      this.props.updateCat(this.builder);
    }

    return (
      <div className="signupContainer " key={this.screenNo}>
        <>
          {this.errMsg ? <p className="error">{this.errMsg}</p> : <></>}
          <p className="error">To comply with GDPR, please enter fake data.</p>
          {this.spread(
            this.builder,
            this.props.updateCat,
            this.props.removeCat
          )}
        </>
      </div>
    );
  }

  /**
   * spread
   * A function to isolate a switch statement, to make the above render function easier to read
   * @private
   * @param {Cat} buildCat - the Cat being assembled
   * @param {storeACat} updateCat - callback to push data to parent form
   * @param {removeableCat} removeCat - callback to delete it
   * @throws Error when an unknown screen is requested
   */
  private spread(
    buildCat: Cat,
    updateCat: storeACat,
    removeCat: removeableCat
  ): ReactElement {
    switch (this.screenNo) {
      case 0:
        return (
          <CatScreen0
            build={buildCat}
            incTab={this.incTab}
            returnCat={this.updateBuildingCat}
            aKey={"Screen0_" + this.screenNo}
          />
        );
      case 1:
        return (
          <CatScreen1
            build={buildCat}
            incTab={this.incTab}
            returnCat={this.updateBuildingCat}
            aKey={"Screen1_" + this.screenNo}
          />
        );
      case 2:
        return (
          <CatScreen2
            build={buildCat}
            incTab={this.incTab}
            updateCat={updateCat}
            removeCat={removeCat}
            aKey={"Screen2_" + this.screenNo}
          />
        );
      default:
        throw new Error("Unknown value for the signup screen");
    }
  }
}

/**
 * SignupCat
 * A wrapper Component that passes an ID off the URL
 * This is a recommended hack to have my functional design and components-that-have-state 'cake' and also eat the cake
 * @public
 */
export const SignupCat: React.FC<SignupProps> = (props) => {
  let { ID } = useParams();
  if (!ID) {
    ID = "";
  }
  return (
    <InnerSignupCat {...props} ID={ID} />
  ) as React.ReactElement<InnerSignupProps>;
};

export default SignupCat;
