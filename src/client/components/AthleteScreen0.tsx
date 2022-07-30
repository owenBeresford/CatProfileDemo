import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import { Athlete } from '../types/Athlete';
import { DayPicker, DateRange } from 'react-day-picker';
import { format, isValid, parse } from 'date-fns';
import { KnownSports, KnownSportsValues } from '../types/KnownSports';
// react-popper/typings/react-popper.d.ts
/// <reference types="react-popper" />
import { usePopper } from 'react-popper';
import FocusTrap from 'focus-trap-react';
import BooleanButton from './BooleanButton';
// import { getPreferredLanguage, LANG_UK } from '../services/util';
import './signupAthletes.css';
//import { locale as lang1 } from 'date-fns/locale/en-GB';
//import { locale as lang2 } from 'date-fns/locale/en-US';

export interface Screen0Props {
    build:Athlete,

}

const AthleteScreen0: React.FC<Screen0Props> = ( props:Screen0Props)=> {
    const [ sports, setSports ] = useState<Array<KnownSports>>([] as Array<KnownSports>);
    const [ dob, setDOB] = useState<Date|undefined>(new Date( '2002-07-01' ));
    const [inputValue, setInputValue] = useState<string>('');
    const [isPopperOpen, setIsPopperOpen] = useState(false);
    
    const popperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
        null
      );

    const popper = usePopper(popperRef.current, popperElement, {
        placement: 'bottom-start'
      });

    const closePopper = () => {
        setIsPopperOpen(false);
        buttonRef?.current?.focus();
    };
    

    const MASK=(e:Event) => { return false; }

    function next(e:React.MouseEvent):boolean {

        // suppress default browser action    
        return false;
    }
    
    function chooseSport(item:string):boolean {
        const WHICH:KnownSports = item as KnownSports;
        if( sports.includes( WHICH) ) {
            var index = sports.indexOf( WHICH );
            setSports( sports.splice(index, 1) );
        } else {    
            setSports( [...sports, WHICH as KnownSports ] );
        }
        return false;
    }

    function handleDaySelect(date: Date|undefined ) {
        if (date) {
            setDOB(date);
            setInputValue(format(date, 'y-MM-dd'));
            closePopper();
        } else {
            setInputValue('');
        }
    };

    const handleButtonClick = () => {
        setIsPopperOpen(true);
      };

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setInputValue(e.currentTarget.value);
        const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());
        if (isValid(date)) {
          setDOB(date);
        } else {
          setDOB(undefined);
        }
      };

// locale={getPreferredLanguage()===LANG_UK?lang1:lang2}
// IOIO pull out the date widget wrapper
    return (
    <div className="aScreen popup">
       <form >
            <label htmlFor="athName">Enter your name: </label> 
            <input id="athName" name="athName" value="" placeholder="your name" />
            <label htmlFor="athGender">Gender: </label> 
            <input id="athGender" name="athGender" value="" placeholder="describe yourself" />
            <label htmlFor="athDob">Birth date: </label>
            <div>
      <div ref={popperRef}>
        <input
          type="text"
          placeholder={format(new Date(), 'y-MM-dd')}
          value={inputValue}
          onChange={handleInputChange}
          className="input-reset pa2 ma2 bg-white black ba"
        />
        <button
          ref={buttonRef}
          type="button"
          className="pa2 bg-white button-reset ba"
          aria-label="Pick a date"
          onClick={handleButtonClick}
        >
          <span role="img" aria-label="calendar icon">
            📅
          </span>
        </button>
      </div>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            onDeactivate: closePopper
          }}
        >
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className="dialog-sheet"
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
          >
            <DayPicker
              initialFocus={isPopperOpen}
              mode="single"
              defaultMonth={dob}
              selected={dob}
              onSelect={handleDaySelect}
            />
          </div>
        </FocusTrap>
      )}
    </div>

            <label htmlFor="athSports">Sports: </label> 
            <div>
               { KnownSportsValues.map((name, i)=> {
                   return (<BooleanButton text={name} push={chooseSport} />); 
               }) } 
            </div>    
 
            <div className="buttonBar">
                <input id="sendP1" type="button" value="Next " onClick={next} />
            </div>   
       </form>
    </div>
  );
}

export default AthleteScreen0;
