import React, { useState, useRef, ChangeEventHandler, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format, isValid, parse } from "date-fns";
import { ChangeTab } from "../types/ChangeTab";
import { renderDate, nextId } from "../services/util";
import { DEFAULT_BIRTH_DATE } from "../types/Cat";
// react-popper/typings/react-popper.d.ts
/// <reference types="react-popper" />
import { usePopper } from "react-popper";
import FocusTrap from "focus-trap-react";

/**
 * The data that is required to drive the Date Block Component
 *  @typedef DateProps
 */
export interface DateProps {
  passback: ChangeTab;
  initialVal: number;
}

/**
 * DateBlock, a component to isolate issues relating to date-entry. 
 * HTML input date is usable except for Safari.
 * This UI should be better interaction in any case.

  WARN: this component does double the number of redraws that you expect.
 * @param {DateProps} props 
 * @return { React.FC<DateProps> }
 */
const DateBlock: React.FC<DateProps> = (props: DateProps) => {
  const [dob, setDOB] = useState<Date | undefined>(new Date(props.initialVal));
  // we have just assigned it
  /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion  */
  const [inputValue, setInputValue] = useState<string>(
    dob ? renderDate(dob) : renderDate(DEFAULT_BIRTH_DATE)
  );
  const [isPopperOpen, setIsPopperOpen] = useState<boolean>(false);

  useEffect(() => {
    const ddd = new Date(props.initialVal);
    setDOB(ddd);
    setInputValue(renderDate(ddd));
  }, [props.initialVal, setDOB, setInputValue]);

  const popperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const popper = usePopper(popperRef.current, popperElement, {
    placement: "bottom-start",
  });
  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  /**
   * handleDaySelect
   * Hidden function, acts as a done() event for date inputs
 
   * @param {Date | undefined} date 
   */
  function handleDaySelect(date: Date | undefined) {
    if (date) {
      setDOB(date);
      props.passback(date.getTime());
      setInputValue(format(date, "y-MM-dd"));
      closePopper();
    } else {
      setInputValue("");
    }
  }

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  /**
   * handleInputChange
   * Hidden function, acts as a data() event for date inputs
 
   * @param {Date | undefined} date 
   */
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, "y-MM-dd", new Date());
    if (isValid(date)) {
      setDOB(date);
    } else {
      setDOB(undefined);
    }
  };

  return (
    <div ref={popperRef} className="dateBlock" data-testid={nextId()}>
      <input
        placeholder={renderDate(new Date())}
        value={inputValue}
        onChange={handleInputChange}
        className="normal"
      />
      <button
        ref={buttonRef}
        type="button"
        className="datePopper"
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
            onDeactivate: closePopper,
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
              /* eslint-disable-next-line react/jsx-no-bind */
              onSelect={handleDaySelect}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
};

export default DateBlock;
