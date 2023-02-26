import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Cat, storeACat } from "../types/Cat";
import { renderDate, getDefaultSelfie, getFlag } from "../services/util";

export interface ShowCatProps {
  current: Cat | null;
  isChild: boolean;
  removeCat: storeACat;
}

const ShowCat: React.FC<ShowCatProps> = (props: ShowCatProps) => {
  // short name isn't great, but confusing a type and variable is worse
  const { ID } = useParams();
  const [errMsg, setErrorMessage] = useState<string>("");
  if (!props.current || parseInt(ID || "", 10) !== props.current.ID) {
    //   if (!ID || (props.current && !props.current.ID)) {
    setErrorMessage("no ID and no data; pls talk to a dev.");
    return (
      <div className="error popup">
        Data loading.. no ID and no data; pls talk to a dev.
      </div>
    );
    //   }
  }

  // this component only knows about 1 cat, so there is no need to select the correct cat.
  function deleteCat(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    if (!props.current) {
      return;
    } // this button should be disabled if no cat
    props.removeCat(props.current);
  }

  // can also use &#9998; as an edit symbol
  // benefits from  .edit-icon { display: inline-block; transform: rotateZ(90deg); font-size:200%; }
  if (!props.current || !props.current.dob) {
    return <div className="error popup">Data loading.. {errMsg}</div>;
  }
  const flag = getFlag(props.current.team);
  const age: string =
    new Date().getUTCFullYear() -
    props.current.dob.getUTCFullYear() +
    " years old";
  return (
    <div className="cat popup">
      <dl>
        {errMsg ? (
          <>
            <dt></dt>
            <dd className="error">{errMsg}</dd>
          </>
        ) : (
          <></>
        )}
        <dt>
          Cat name
          {props.isChild ? (
            <></>
          ) : (
            <>
              <span className="goBack">
                <NavLink to={"/signup/" + ID}>✍ </NavLink>
              </span>
              <span className="goBack">
                <NavLink to={"/"} onClick={deleteCat}>
                  {" "}
                  &#9249;{" "}
                </NavLink>
              </span>
            </>
          )}
          <span className="goBack">
            <NavLink to="/">❌</NavLink>
          </span>
        </dt>
        <dd>
          {props.current.image === null ? (
            <img
              src={getDefaultSelfie()}
              width="100"
              height="150"
              alt="Fake face until there is funding."
            />
          ) : (
            <img
              src={props.current.image}
              width="100"
              height="150"
              alt="The professional sporting-cats face"
            />
          )}
          <p className="inset"> {props.current.name} </p>
        </dd>
        <dt>Expressed Gender </dt>
        <dd>{props.current.gender}</dd>
        <dt>Date of birth </dt>
        <dd>
          <time dateTime={props.current.dob.toString()}>
            {renderDate(props.current.dob)}/ {age}
          </time>
        </dd>
        <dt>About me </dt>
        <dd>{props.current.about}</dd>
        <dt>Team </dt>
        <dd className="superLarge">
          {props.current.team} <span>{flag}</span>
        </dd>
        <dt>Sports </dt>
        <dd>
          {" "}
          <ul className="ticks">
            {props.current.sports.map((val, i) => {
              return (
                <li key={i} title={"A " + val + " sport "}>
                  {" "}
                  {val}
                </li>
              );
            })}{" "}
          </ul>{" "}
        </dd>
        <dt>Other interests </dt>
        <dd>{props.current.interests}</dd>
      </dl>
    </div>
  );
};

export default ShowCat;
