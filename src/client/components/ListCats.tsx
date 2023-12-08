import React from "react";
import { NavLink } from "react-router-dom";
import { Cat } from "../types/Cat";
import { accessCurrentCats, listenHandler } from "../types/CatState";
import PropTypes from "prop-types";
import { nextId } from "../services/util";

/**
 * ListCatProps
 * Interface for the properties on this Component see {@link listenHandler} {@link accessCurrentCats}
 * @public
 * @typedef ListCatProps
 */
export interface ListCatProps {
  currentCats: accessCurrentCats;
  changeCat: (a: HTMLElement) => void;
  listenToState: listenHandler;
  aKey: string;
}

/**
 * ListCats
 * A Component to list all current {@link Cat} collection
 *
 * @public
 */
class ListCats extends React.Component<ListCatProps> {
  private lastUpdate: Date;

  /**
   * constructor
   * Boring con'tor
   *
   * @param {ListCatProps} props
   * @public
   */
  constructor(props: ListCatProps) {
    super(props);
    this.lastUpdate = new Date(new Date().getTime() - 3000);

    this.updateMe = this.updateMe.bind(this);
    props.listenToState(this.updateMe, "ListCats");
  }

  /**
   * InnerSignupPropTypes
   * The requirements for properties that need to be passed in, see [docs for dep](https://www.npmjs.com/package/prop-types)
   * @static
   * @protected
   * @internal
   */
  static CatListPropTypes = {
    currentCats: PropTypes.func.isRequired,
    changeCat: PropTypes.func.isRequired,
    listenToState: PropTypes.func.isRequired,
    aKey: PropTypes.string.isRequired,
  };

  /**
   * shouldComponentUpdate
   * A util for React, with a fairly clear name.
   *
   * @param { ListCatProps} nextProps
   * @internal
   */
  shouldComponentUpdate(nextProps: ListCatProps): boolean {
    if (this.props.aKey !== nextProps.aKey) {
      return true;
    }
    return false;
  }

  /**
   * updateMe
   * if this isn't a blink update, refresh / re-render
   * @internal
   */
  updateMe(): void {
    if ((new Date().getTime() - this.lastUpdate.getTime()) / 1000 > 0.2) {
      this.forceUpdate();
      this.lastUpdate = new Date(new Date().getTime() + 500);
    }
  }

  /**
   * createKey
   * A utility function to make a uniquReact key
   *
   * @param {Cat} ath
   * @internal
   */
  createKey(ath: Cat): string {
    return "aList" + this.props.aKey + "_" + ath.ID;
  }

  /**
   * render
   * Render the component to the screen.
   *
   * @public
   * @return React.ReactElement<ListCatProps>
   */
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
                key={this.createKey(ath)}
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
