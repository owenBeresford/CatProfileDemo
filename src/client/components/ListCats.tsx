import React from "react";
import { NavLink } from "react-router-dom";
import { Cat, storeCats, storeACat } from "../types/Cat";

interface ListCatProps {
  currentCats:Array<Cat>;
  updateCats:storeCats;
  updateCat:storeACat;
}

const ListCats:React.FC<ListCatProps> =function(props: ListCatProps):React.ReactElement<ListCatProps> {
  const changeCat= function(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>):void { 
    let dom=e!.currentTarget as HTMLElement;
    while(!dom.getAttribute('data-id') && dom.parentNode!==dom) {
      if(dom.parentNode) {
         dom=dom.parentNode as HTMLElement;
      }
    }
    const id:string|null=dom.getAttribute('data-id');
    if(typeof id !=='string') { return; }

    if(parseInt(id, 10)<props.currentCats.length) {
      props.updateCats( props.currentCats[ id] );
    }
  }


  return (
    <div className="cats">
      <ul className="aList">
        <li
          key="new"
          title={"Signup and create a new profile"}
          className="button" 
        >
          <NavLink to="/signup/"> Signup</NavLink>
        </li>
        {props.currentCats.map((ath, i) => {
          return (
            <li key={i} title={"Display " + ath.name + "'s profile "} data-id={i} >
              <NavLink to={"/profile/" + i} onClick={changeCat} >{ath.name}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  ) as React.ReactElement<ListCatProps>;
}

export default ListCats;
