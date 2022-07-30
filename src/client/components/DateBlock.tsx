import React, { useState, useEffect, useRef, ChangeEventHandler } from "react";
import { DayPicker, DateRange } from 'react-day-picker';
import { format, isValid, parse } from 'date-fns';
import { ChangeTab } from '../types/ChangeTab';
// react-popper/typings/react-popper.d.ts
/// <reference types="react-popper" />
import { usePopper } from 'react-popper';
import FocusTrap from 'focus-trap-react';
// import { getPreferredLanguage, LANG_UK } from '../services/util';
import './signupAthletes.css';
//import { locale as lang1 } from 'date-fns/locale/en-GB';
//import { locale as lang2 } from 'date-fns/locale/en-US';

interface DateProps {
    passback:ChangeTab;
}

const DateBlock: React.FC<DateProps> = ( props:DateProps)=> {
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
    function handleDaySelect(date: Date|undefined ) {
        if (date) {
            setDOB(date);
            props.passback(date.getTime());
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
     return (
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
  );
}

export default DateBlock;
