import React from "react";
import { useParams, NavLink } from "react-router-dom";
import { removeableCat } from "../types/Cat";
import { renderDate, getDefaultSelfie, getFlag } from "../services/util";
import { accessACat, listenHandler } from "../types/CatState";
import PropTypes from "prop-types";

export interface ShowCatProps {
  current: accessACat;
  isChild: boolean;
  removeCat: removeableCat;
  listenToState: listenHandler;
  aKey: string;
}

export interface InnerShowCatProps extends ShowCatProps {
  ID: string;
}

export class ShowCatInner extends React.Component<InnerShowCatProps> {
  private lastUpdate: Date;
  private errMsg: string;

  constructor(props: InnerShowCatProps) {
    super(props);
    this.lastUpdate = new Date(new Date().getTime() - 3000);
    this.errMsg = "";

    this.updateMe = this.updateMe.bind(this);
    props.listenToState(this.updateMe, "ShowCat");
  }

  static InnerShowCatPropTypes = {
    current: PropTypes.func.isRequired,
    removeCat: PropTypes.func.isRequired,
    listenToState: PropTypes.func.isRequired,
    isChild: PropTypes.bool.isRequired,
    aKey: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps: ShowCatProps): boolean {
    if (this.props.aKey !== nextProps.aKey) {
      console.warn("IOIO I //should// update ShowCat");
      return true;
    }
    return false;
  }

  updateMe(): void {
    if ((new Date().getTime() - this.lastUpdate.getTime()) / 1000 > 0.2) {
      this.forceUpdate();
      this.lastUpdate = new Date(new Date().getTime() + 500);
    }
  }

  render(): React.ReactElement<InnerShowCatProps> {
    const CC = this.props.current();
    let tt: string | number = this.props.ID ?? "";
    tt = parseInt(tt, 10);
    if (!CC || !Number.isInteger(CC.ID) || tt !== CC.ID) {
      this.errMsg = "no ID and no data; pls talk to a dev.";
      return (
        <div className="error popup">
          Data loading.. no ID and no data; pls talk to a dev.
          <textarea
            defaultValue={
              JSON.stringify(CC) +
              "   :" +
              this.props.ID +
              ":  :" +
              CC.ID +
              ":   " +
              parseInt(this.props.ID || "", 10) +
              "   " +
              typeof this.props.ID +
              "  code thinks IDs match?" +
              (parseInt(this.props.ID || "", 10) === CC.ID ? "MATCH" : "FAIL") +
              "    " +
              typeof CC.ID +
              "   " +
              tt +
              "   isInteger " +
              Number.isInteger(this.props.ID)
            }
          ></textarea>
        </div>
      );
      //   }
    }
    // can also use &#9998; as an edit symbol
    // benefits from  .edit-icon { display: inline-block; transform: rotateZ(90deg); font-size:200%; }
    if (!CC.dob) {
      return <div className="error popup">Data loading... {this.errMsg}</div>;
    }
    const flag = getFlag(CC.team);
    if (flag === getFlag("unknown")) {
      this.errMsg =
        "Country '" +
        CC.team +
        "' not known to this platform.  Using default flag";
    }
    const age: string =
      new Date().getUTCFullYear() - CC.dob.getUTCFullYear() + " years old";

    return (
      <div className="cat popup" key={this.props.aKey}>
        <dl key={this.props.aKey + "dl"}>
          {this.errMsg ? (
            <>
              <dt></dt>
              <dd className="error">{this.errMsg}</dd>
            </>
          ) : (
            <></>
          )}
          <dt>
            Cat name
            <span className="goBack">
              <NavLink className="button bigger" to="/">
                {" "}
                ⇐{" "}
              </NavLink>
            </span>
            {this.props.isChild ? (
              <></>
            ) : (
              <>
                <span className="goBack">
                  <NavLink
                    className="button bigger"
                    to={"/signup/" + this.props.ID}
                  >
                    {" "}
                    ✍{" "}
                  </NavLink>
                </span>
                <span className="goBack">
                  <NavLink
                    className="button awkward"
                    to={"/"}
                    onClick={() => {
                      return this.props.removeCat(null);
                    }}
                  >
                    {" "}
                    ❌{" "}
                  </NavLink>
                </span>
              </>
            )}
          </dt>
          <dd>
            {CC.image === null ? (
              <img
                src={getDefaultSelfie()}
                width="100"
                height="150"
                alt="A fake face until there is funding."
              />
            ) : (
              <img
                src={CC.image}
                width="100"
                height="150"
                alt="The professional sporting-cats face"
              />
            )}
            <p className="inset"> {CC.name} </p>
          </dd>
          <dt>Expressed Gender </dt>
          <dd>{CC.gender}</dd>
          <dt>Date of birth </dt>
          <dd>
            <time dateTime={CC.dob.toString()}>
              {renderDate(CC.dob)}/ {age}
            </time>
          </dd>
          <dt>About me </dt>
          <dd>{CC.about}</dd>
          <dt>Team </dt>
          <dd className="superLarge">
            {CC.team} <span>{flag}</span>
          </dd>
          <dt>Sports </dt>
          <dd>
            <ul className="ticks">
              {CC.sports.map((val, i) => {
                return (
                  <li key={i} title={"A " + val + " sport "}>
                    {" "}
                    {val}
                  </li>
                );
              })}
            </ul>
          </dd>
          <dt>Other interests </dt>
          <dd>{CC.interests}</dd>
        </dl>
      </div>
    );
  }
}

export const ShowCat: React.FC<ShowCatProps> = (props) => {
  let { ID } = useParams();
  if (!ID) {
    ID = "";
  }
  return (
    <ShowCatInner {...props} ID={ID} />
  ) as React.ReactElement<ShowCatProps>;
};

export default ShowCat;
