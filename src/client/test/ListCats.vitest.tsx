import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { assert, describe, expect, it, vi } from "vitest";
import { render, cleanup, screen, fireEvent } from "@testing-library/react";

import { Cat } from "../types/Cat";
import ListCats, { ListCatProps } from "../components/ListCats";

const TEST1 = (i: HTMLElement) => {
  console.log("FAKE CB: next tab, ... GO!");
};
const TEST2 = (a: () => void, b: string) => {
  console.log("FAKE CB: Updating state");
};
const TEST_listcats1 = () => {
  return [
    {
      name: "cat1",
      dob: new Date(),
      team: "poland",
      gender: "m",
      sports: [
        "Body Building",
        "Boxing",
        "Cross Country Running",
        "Cross Country Skiing",
      ],
      about: "gegws asgshgas dshs fdsd djd jd djdjd gjdgj dgjdjd tj",
      interests:
        "adfgbad sdfgad agh afdhg ashga hgagh sh f g fsd jsf jkfh kh f hk fg d sfsr sds",
      image: null,
      ID: 0,
    },
    {
      name: "cat2",
      dob: new Date(),
      team: "lithunia",
      gender: "f",
      sports: [
        "Down Hill Skiing",
        "Equestrianism",
        "eSports",
        "Fencing",
        "Field Hockey",
      ],
      about:
        "rfth dshs hs hsfhs hsa hsfh ghfhsfg hsfgjh sghj jhs jkdhj sfjhs jdfgkj dgk dghj sjds ",
      interests: "dsfg ujl j sfgh agath dkg ljsg dafj gklyu kdh adg adhjk",
      image: "/tmp/basic.jpg",
      ID: 1,
    },
    {
      name: "cat3",
      dob: new Date(),
      team: "romania",
      gender: "f",
      sports: [
        "Racquetball",
        "Rowing",
        "Rugby",
        "Sailing",
        "Softball",
        "Shooting",
        "Skateboarding",
      ],
      about:
        "rfth dshs hs hsfhs hsa hsfh ghfhsfg hsfgjh sghj jhs jkdhj sfjhs jdfgkj dgk dghj sjds ",
      interests: "dsfg ujl j sfgh agath dkg ljsg dafj gklyu kdh adg adhjk",
      image: null,
      ID: 2,
    },
  ] as Array<Cat>;
};

const TEST_listcats2 = () => {
  return [
    {
      name: "cat2",
      dob: new Date(),
      team: "poland",
      gender: "m",
      sports: [
        "Golf",
        "Tennis",
        "Cricket",
        "Basketball",
        "Baseball",
        "American Football",
        "Aquatics",
        "Archery",
        "Automobile Racing",
        "Badminton",
        "Beach Volleyball",
        "Bobsleigh",
        "Body Building",
        "Boxing",
        "Cross Country Running",
        "Cross Country Skiing",
        "Curling",
        "Cycling",
        "Darts",
        "Decathlon",
        "Down Hill Skiing",
        "Equestrianism",
        "eSports",
        "Fencing",
        "Field Hockey",
        "Figure Skating",
        "Gymnastics",
        "Ice Hockey",
        "Martial Arts",
        "Mixed Martial Arts",
        "Modern Pentathlon",
        "Motorcycle Racing",
        "Netball",
        "Polo",
        "Racquetball",
        "Rowing",
        "Rugby",
        "Sailing",
        "Softball",
        "Shooting",
        "Skateboarding",
        "Skeet Shooting",
        "Skeleton",
        "Snow Boarding",
        "Soccer (Football)",
        "Squash",
        "Surfing",
        "Swimming",
        "Track and Field",
      ],
      about:
        "gegws asgshgas dshs fdsd djd jd djdjd gjdgj dgjdjd tjsjs sfhjs fjhsfghsfg hsfhsf ghsf ghsfhsfh fghsfghsfg sfghshsfghsf sfgh sfghsf ghsf ghs hsf ghs fhsfgh sfh sfghsf hsfgh agha hgagad fgadfgad fgadgadfgadfg adf gadfg adfgadfg adsfg adg adfg adgadfg",
      interests:
        "adfgbad sdfgad agh afdhg ashga hgagh sh f g fsd jsf jkfh kh f hk fg d sfsr sdsiuoyuouiopui$%^^  jykiu;ioilkhg  gthyukbkioo ff",
      image: null,
      ID: 0,
    },
  ] as Array<Cat>;
};

const TEST_listcats3 = () => {
  return [] as Array<Cat>;
};

describe("Simple component test 3", () => {
  it("Can load ListCats", () => {
    const args = {
      currentCats: TEST_listcats1,
      changeCat: TEST1,
      listenToState: TEST2,
      aKey: "qwerty",
    } as ListCatProps;

    const BLOB = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ListCats {...args} />} />
        </Routes>
      </BrowserRouter>
    );
    assert.notEqual(BLOB.getByTestId("obj1"), null, "we have a component");
    assert.notEqual(BLOB.getByTestId("obj1"), undefined, "we have a component");

    const cat2 = screen.getByText(/cat2/i);
    const logSpy = vi.spyOn(console, "log");
    fireEvent.click(cat2);
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  it("Can load ListCats deux", () => {
    const args = {
      currentCats: TEST_listcats2,
      changeCat: TEST1,
      listenToState: TEST2,
      aKey: "qwerty",
    } as ListCatProps;

    const BLOB = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ListCats {...args} />} />
        </Routes>
      </BrowserRouter>
    );
    assert.notEqual(BLOB.getByTestId("obj2"), null, "we have a component");
    assert.notEqual(BLOB.getByTestId("obj2"), undefined, "we have a component");

    const cat2 = screen.getByText(/cat2/i);
    const logSpy = vi.spyOn(console, "log");
    fireEvent.click(cat2);
    expect(logSpy).toHaveBeenCalledTimes(1);
  });

  it("Can load ListCats troi", () => {
    const args = {
      currentCats: TEST_listcats3,
      changeCat: TEST1,
      listenToState: TEST2,
      aKey: "qwerty",
    } as ListCatProps;

    const BLOB = render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ListCats {...args} />} />
        </Routes>
      </BrowserRouter>
    );
    assert.notEqual(BLOB.getByTestId("obj3"), null, "we have a component");
    assert.notEqual(BLOB.getByTestId("obj3"), undefined, "we have a component");
  });

  cleanup();
});
