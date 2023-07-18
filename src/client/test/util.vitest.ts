import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import { assert, describe, expect, it } from 'vitest';

import { renderDate, expandRef, mapInitialValue, defaultCat, getFlag, getPreferredLanguage }  from '../services/util';
import { Cat } from "../types/Cat";
// the utils file is the most algorithmically important file, and the least OO; fortunately these functions are isolated to testable 

describe('Reference test, but own code', () => {
  it('whats this date?', () => {
    assert.equal(getPreferredLanguage() , "en-gb", "country code lookup worked");
	
    const point1 =(new Date("2023-05-06T23:00:00Z"));
    assert.equal(renderDate(point1), "2023-5-6", "have i renderd date? #1");
    const point2 =(new Date("2023-05-06T23:00:00-11:00"));
    assert.equal(renderDate(point2), "2023-5-7", "have i renderd date? #2");
    const point3 =(new Date("2023-05-06T23:00:00+11:00"));
    assert.equal(renderDate(point3), "2023-5-6", "have i renderd date? #3");
 
//    expect(1 + 1).eq(2)
//    expect({ foo: 'bar' }).toMatchSnapshot()  
  });

  it("looking at mapping on expandRef", () => {
    const point2 = { current:document.createElement('input') } as MutableRefObject<HTMLInputElement>;
    point2.current.value="test";
    assert.equal(expandRef(point2, false), "test", "test 2");
    point2.current.value="  test   ";
    assert.equal(expandRef(point2, true), "__test___", "test 3");
    point2.current.value="\"  test  \" ";
    assert.equal(expandRef(point2, true), "___test____", "test 4");
	try {
    	const point1 = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
    	assert.equal(expandRef(point1, false), "", "test 1");
	} catch(e ) {
		assert.equal(true, true, "iAs expected, Unable to use a React hook in a test");
	}

  } );

  it("looking at mapping on mapInitialValue", () => {
 // mapInitialValue<T>(shared: Cat, field: T, defaultVal: T): T
    let tt={
    name: "out1",
    dob: new Date(),
    team: "",
    gender: "",
    sports: ["American Football"],
    about: "sdf",
    interests: "sdfsd",
    image: null,
    ID: -1,
    } as Cat;

    assert.equal(mapInitialValue(tt, "out2", "out3") , "out2", "test 1");
    tt.name="Default cat";
    assert.equal(mapInitialValue(tt, "out2", "out3") , "out3", "test 2");
    tt.name="out1";
    assert.equal(mapInitialValue(tt, "", "out3") , "out3", "test 3");

  } );

  it("looking at getFlag", () => {
  // getFlag(team: string): string
    assert.equal(getFlag("poland" ) , "🇵🇱", "test 1");
    assert.equal(getFlag("united kingdom" ) , "🇬🇧", "test 2");
    assert.equal(getFlag("uk" ) , "🇬🇧", "test 3"); 
    assert.equal(getFlag("britain" ) , "🇬🇧", "test 4"); 
    assert.equal(getFlag("england" ) , "🇬🇧", "test 5"); 
    assert.equal(getFlag("canary isles" ) , "🇪🇺", "test 6");
    assert.equal(getFlag("ukraine" ) , "🇺🇦", "test 7");

  } );


 
});
