import React from "react";
import { Toggle } from "react-toggle-component";
import { KnownSports } from "../types/KnownSports";

export interface ButtonProps {
  text: KnownSports;
  push: (e: KnownSports) => boolean;
  active: boolean;
}

// NB: push is a CB, not a call to Array.push
const BooleanButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  if (!props || !props.text) {
    return <></>;
  }
  const trigger = (): void => {
    props.push(props.text);
  };

  function createKey(nom:string):string {
    return "tag" + nom + (props.active ? "T" : "F");
  }

  const nom = props.text.replace(/ /g, "_");
  return (
    <label id={"lbl" + nom} className="buttons" htmlFor={"tog" + nom}>
      <Toggle
        key={ createKey(nom)}
        name={"tog" + nom}
        onToggle={trigger}
        checked={props.active}
      />
      {props.text}
    </label>
  );
};

export default BooleanButton;
