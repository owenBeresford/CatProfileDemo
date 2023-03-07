import React, { useState, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { Cat, storeACat, removeableCat } from "../types/Cat";
import { ChangeTab } from "../types/ChangeTab";
import { defaultCat } from "../services/util";
import { accessCurrentCats, accessACat} from '../types/CatState';
import PropTypes from 'prop-types';

import CatScreen0 from "./CatScreen0";
import CatScreen1 from "./CatScreen1";
import CatScreen2 from "./CatScreen2";

interface SignupProps {
  current: accessACat;
  currentCats: accessCurrentCats;
  updateCat: storeACat;
  removeCat: removeableCat;
}

interface InnerSignupProps extends SignupProps {   
  ID:string; 
}

export class InnerSignupCat extends React.Component<InnerSignupProps> {
//  private lastUpdate:Date;
  private errMsg:string;
  private screenNo:number;
  private builder:Cat;

  constructor(props:InnerSignupProps) {
    super(props);
    this.screenNo=0;
    this.errMsg="";
    if(props.current()) {
      this.builder=props.current();
    } else {
      this.builder=defaultCat(null, props.currentCats.length);
    }
    this.incTab=this.incTab.bind(this);
    this.updateBuildingCat=this.updateBuildingCat.bind(this);
  }

  static InnerSignupPropTypes = {
    current: PropTypes.func.isRequired,
    currentCats: PropTypes.func.isRequired,
    updateCat: PropTypes.func.isRequired,
    removeCat: PropTypes.func.isRequired,
    ID: PropTypes.string.isRequired,
  };

  incTab(newVal:number):void {
    console.log("TEST running inctab "+newVal);
    this.screenNo=newVal;
    // I think this is react17 vs react18 issue.
      this.forceUpdate();
  }

  updateBuildingCat(a:Cat):void {
    this.builder=a;
  }

  failMsg(str="no ID and no data; pls talk to a dev."):React.ReactElement {
     this.errMsg= str;
  console.log("signup:failMsg ", str);   
      return (
        <div className="error popup">
          {str}
        </div>
      ); 
  }

  render(): React.ReactElement<SignupProps> {
console.log("signup:render #75 ", this.props.ID, this.builder );
     // no data & no id
    if(!this.builder && (this.props.ID===null || this.props.ID.length===0)) {
     return this.failMsg();
    }
    // OR wrong cat for ID
    else if(this.props.ID && this.builder.ID!==parseInt(this.props.ID, 10)) {
       if(parseInt(this.props.ID , 10) > this.props.currentCats().length) {
        // this shouldn't happen, its logic failure elsewhere
        return this.failMsg();
       } else if (this.props.ID) {
      this.props.updateCat(this.props.currentCats()[parseInt(this.props.ID , 10)]);
      } 
    } else if( this.props.current()['ID'] >0 && !this.props.ID ){
       this.props.updateCat( defaultCat(null, this.props.currentCats().length) );
    }
    // OR new Cat requested; it will be applied a the end
    console.log("signup:render #90 "+this.screenNo);
    return (
    <div className="signupContainer " key={this.screenNo}>
      <>
        {this.errMsg ? <p className="error">{this.errMsg}</p> : <></>}
        <p className="error">To comply with GDPR, please enter fake data.</p>
        {this.spread(
          this.builder,
          this.props.updateCat,
          this.props.removeCat,
        )}
      </>
    </div>
  );
}

private spread(
  buildCat: Cat,
  updateCat: storeACat,
  removeCat: removeableCat,
 ): ReactElement {
  switch (this.screenNo) {
    case 0:
      return (
        <CatScreen0 build={buildCat} incTab={this.incTab} returnCat={this.updateBuildingCat} aKey={"Screen0_"+this.screenNo}/>
      );
    case 1:
      return (
        <CatScreen1 build={buildCat} incTab={this.incTab} returnCat={this.updateBuildingCat} aKey={"Screen1_"+this.screenNo} />
      );
    case 2:
      return (
        <CatScreen2
          build={buildCat}
          incTab={this.incTab}
          updateCat={updateCat}
          removeCat={removeCat}
          aKey={"Screen2_"+this.screenNo}
        />
      );
    default:
      throw new Error("Unknown value for the signup screen");
  }
}
}

export const SignupCat:React.FC<SignupProps> =(props) => {
    let { ID } = useParams();
    if(!ID) { ID=""; }
    return <InnerSignupCat {...props} ID={ID} /> as React.ReactElement<InnerSignupProps>;
};
 
export default SignupCat;
