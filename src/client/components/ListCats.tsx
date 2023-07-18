import React from "react";
import { NavLink } from "react-router-dom";
import { Cat } from "../types/Cat";
import { accessCurrentCats, listenHandler } from "../types/CatState";
import PropTypes from "prop-types";
import { nextId } from "../services/util";

interface ListCatProps {
  currentCats: accessCurrentCats;
  changeCat: (a: HTMLElement) => void;
  listenToState: listenHandler;
  aKey: string;
}

class ListCats extends React.Component<ListCatProps> {
  private lastUpdate: Date;

  constructor(props: ListCatProps) {
    super(props);
    this.lastUpdate = new Date(new Date().getTime() - 3000);

    this.updateMe = this.updateMe.bind(this);
    props.listenToState(this.updateMe, "ListCats");
  }

  static CatListPropTypes = {
    currentCats: PropTypes.func.isRequired,
    changeCat: PropTypes.func.isRequired,
    listenToState: PropTypes.func.isRequired,
    aKey: PropTypes.string.isRequired,
  };

  shouldComponentUpdate(nextProps: ListCatProps): boolean {
    if (this.props.aKey !== nextProps.aKey) {
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

  render(): React.ReactElement<ListCatProps> {
    return (
      <div className="cats" key={this.props.aKey} data-testid={nextId()}>
        <ul className="aList">
          <li
            key={"aList" + this.props.aKey + "new"}
            title={"Signup and create a new profile"}
            className="button"
          >
            <NavLink to="/signup/"> Signup</NavLink>
          </li>
          {this.props.currentCats().map((ath: Cat, i: number) => {
            return (
              <li
                key={"aList" + this.props.aKey + "_" + ath.ID}
                title={"Display " + ath.name + "'s profile."}
                data-id={i}
              >
                <NavLink
                  to={"/profile/" + i}
                  onClick={(e) => {
                    if (!e.currentTarget) {
                      return;
                    }
                    this.props.changeCat(e.currentTarget as HTMLElement);
                  }}
                >
                  {ath.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    ) as React.ReactElement<ListCatProps>;
  }
}

export default ListCats;
