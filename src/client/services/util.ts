import { Cat } from "../types/Cat";
import { KnownSports } from "../types/KnownSports";
import { MutableRefObject } from "react";

let ID_OFFSET = 0;
// assuming only one copy of this file is compiled, this should lead to globally uniqiue ids
export function nextId(): string {
  ID_OFFSET++;
  return "obj" + ID_OFFSET;
}
export function resetId(): string {
  ID_OFFSET = 1;
  return "obj" + ID_OFFSET;
}

export function getPreferredLanguage(): string {
  // ie running inside Node
  if (process && process.env && "LANG" in process.env) {
    const LANG = process.env["LANG"].toLowerCase();
    if (LANG.includes("en_gb")) {
      return LANG_UK;
    }
    if (LANG.includes("en")) {
      return "en-us";
    }
  }

  if (!("language" in navigator) || navigator.language.length === 0) {
    return LANG_UK; // I understand a US company may disagree with this
  }
  if (Array.isArray(navigator.language)) {
    return navigator.language[0].toLocaleLowerCase();
  } else {
    return navigator.language.toLocaleLowerCase();
  }
}
export const LANG_UK = "en-gb";
const DEFAULT_NAME = "Default cat";

export function noop() {
  return;
}

// this is too small to be its own component
// yes there are some libraries that offer features like this;
// but the code to set them up is about the same volume as below
export function renderDate(d: Date): string {
  const lang = getPreferredLanguage();
  if (lang === LANG_UK) {
    return (
      d.getUTCFullYear() + "-" + (d.getUTCMonth() + 1) + "-" + d.getUTCDate()
    );
  }
  if (lang === "en-us") {
    return (
      d.getUTCMonth() + 1 + "-" + d.getUTCDate() + "-" + d.getUTCFullYear()
    );
  } else {
    // add more code here
    return d.toString();
  }
}

/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export function expandRef(val: MutableRefObject<any>, trim = false): string {
  if (val.current) {
    if (trim) {
      return val.current.value.replace(new RegExp("[ \\t'\"]", "g"), "_");
    } else {
      return val.current.value;
    }
  } else {
    return "";
  }
}

export function getDefaultSelfie(): string {
  return "/default-face.svg";
}

export function defaultCat(cur: Cat | null, nextID: number): Cat {
  if (cur) {
    if (typeof cur.dob !== "object") {
      cur.dob = new Date(cur.dob);
    }
    cur.ID = nextID;
    return cur;
  }

  return {
    name: DEFAULT_NAME,
    dob: new Date(),
    team: "",
    gender: "",
    sports: ["American Football"],
    about: "",
    interests: "",
    image: null,
    ID: nextID,
  } as Cat;
}

export function TESTdefaultCat(): Cat {
  return {
    name: DEFAULT_NAME,
    dob: new Date(),
    team: "",
    gender: "",
    sports: ["American Football"],
    about: "",
    interests: "",
    image: null,
    ID: 1,
  } as Cat;
}

export function getFlag(team: string): string {
  // Flag chars have been manually extracted from
  // http://xahlee.info/comp/unicode_flags.html
  // convert to dictionary with more data https://stackoverflow.com/a/55005075/2375161
  team = team.toLowerCase().trim();
  const flags: Record<string, string> = {
    iceland: "🇮🇸",
    denmark: "🇩🇰",
    norway: "🇳🇴",
    finland: "🇫🇮",
    sweden: "🇸🇪",
    "united kingdom": "🇬🇧",
    uk: "🇬🇧",
    england: "🇬🇧",
    britain: "🇬🇧",
    ireland: "🇮🇪",
    netherlands: "🇳🇱",
    belgium: "🇧🇪",
    france: "🇫🇷",
    spain: "🇪🇸",
    portugal: "🇵🇹",
    italy: "🇮🇹",
    germany: "🇩🇪",
    poland: "🇵🇱",
    czechia: "🇨🇿",
    luxembourg: "🇱🇺",
    switzerland: "🇨🇭",
    austria: "🇦🇹",
    slovakia: "🇸🇰",
    slovenia: "🇸🇮",
    croatia: "🇭🇷",
    hungary: "🇭🇺",
    estonia: "🇪🇪",
    latvia: "🇱🇻",
    lithuania: "🇱🇹",
    ukraine: "🇺🇦",
    romania: "🇷🇴",
    macedonia: "🇲🇰",
    greece: "🇬🇷",
  };

  if (flags[team]) {
    return flags[team];
  } else {
    console.warn(
      "Country '" + team + "' not known to this platform.  Using default"
    );
    return "🇪🇺";
  }
}

// If sharedCat is in default state, prefer local value, otherwise prefer non-empty shared values
export function mapInitialValue<T>(shared: Cat, field: T, defaultVal: T): T {
  if (shared.name === DEFAULT_NAME) {
    return defaultVal;
  } else if (field) {
    return field;
  } else {
    return defaultVal;
  }
}

// snarl at whatever beaurocrat made types for Array.includes
// pour example https://stackoverflow.com/questions/71639989/typescript-why-array-includes-expects-searchelement-to-be-never-type

export function includesWithBetterTyping(
  ar: Array<KnownSports>,
  key: KnownSports
): boolean {
  let found = false;
  ar.forEach((cur: KnownSports, i: number): number => {
    if (cur === key) {
      found = true;
    }
    return i;
  });
  return found;
}
