import React from "react";
import { Toggle } from "react-toggle-component";
import { KnownSports } from "../types/KnownSports";

/** 
 * The data that is required to drive the Boolean Button component
 *   @typedef ButtonProps
 *  
 *   NB: push is a CB, not a call to Array.push
 */
export interface ButtonProps {
  text: KnownSports;
  push: (e: KnownSports) => boolean;
  active: boolean;
}

/** 
 * The runtime defined component BooleanButton
 *    NB: push is a CB, not a call to Array.push
 * 
 * @param {ButtonProps} props 
 * @return { React.FC<ButtonProps> }
 */
const BooleanButton: React.FC<ButtonProps> = (props: ButtonProps) => {
  if (!props || !props.text) {
    return <></>;
  }
  const trigger = (): void => {
    props.push(props.text);
  };

  /**
   * createKey
   * A hidden function, creates a hash for the React key
 
   * @param {string} nom
   * @return {string}
   * @internal 
   */
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
