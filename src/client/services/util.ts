import { Cat } from "../types/Cat";
import { KnownSports } from "../types/KnownSports";
import { MutableRefObject } from "react";

/**
 * ID_OFFSET 
 * Counter for the below ID functions, scope limited to this module.
 */
let ID_OFFSET = 0;

/**
 * nextId
 * Compute a new global id (works like PG sequence id).
 * Assuming only one copy of this file is compiled, this should lead to globally unique ids.
 
 * @public
 */
export function nextId(): string {
  ID_OFFSET++;
  return "obj" + ID_OFFSET;
}

/**
 * resetId
 * Compute a new global id (works like PG sequence id).
 
 * @public
 */
export function resetId(): string {
  ID_OFFSET = 1;
  return "obj" + ID_OFFSET;
}

/**
 * getPreferredLanguage
 * Pull data from the process and navigator objects to compute best UI language.
 * 
 * @access public
 */
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

/**
 * noop
 * Do nothing as a service.  
 * 
 * @public
 */
export function noop() {
  return;
}


/**
 * renderDate
 * Convert Date object to string.
 *
 * This is too small to be its own component.
 * yes there are some libraries that offer features like this;
 * but the code to set them up is about the same volume as below.
 * @param {Date} d
 * @public
 */
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


/**
 * expandRef
 * Convert a React ref() to string 
 
 * @param {MutableRefObject<any>} val
 * @param {boolean} [trim= false]
 * @public
 */
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

/**
 * getDefaultSelfie
 * static data map
 * 
 * @public
 */
export function getDefaultSelfie(): string {
  return "/default-face.svg";
}

/**
 * defaultCat
 * Statically create a default Cat, so we never pass null around
 
 * @param {Cat | null } cur 
 * @param {number} nextID
 * @public
 */
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

/**
 * TESTdefaultCat
 * Statically create a default Cat, so we never pass null around
 
 * @param {Cat | null } cur 
 * @param {number} nextID
 * @public
 */
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

/**
 * getFlag
 * Convert a country name to a flag UTF8 symbol
 *
 * Flag chars have been manually extracted from
 * @link http://xahlee.info/comp/unicode_flags.html

 * @link https://stackoverflow.com/a/55005075/2375161
 * @param {string} team
 * @public
 */
export function getFlag(team: string): string {
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

/**
 * mapInitialValue
 * Mapping utility, to hide if traps elsewhere
 * If sharedCat is in default state, prefer local value, otherwise prefer non-empty shared values
 *
 * @param {Cat} shared
 * @param {<T>} field - probably T is a string, but not guaranteed
 * @param {<T>} defaultVal
 * @public
 * @return {<T>}
 */
export function mapInitialValue<T>(shared: Cat, field: T, defaultVal: T): T {
  if (shared.name === DEFAULT_NAME) {
    return defaultVal;
  } else if (field) {
    return field;
  } else {
    return defaultVal;
  }
}


/**
 * includesWithBetterTyping
 * Array.includes, but works better with TS types
 *
 * Snarl at whatever beaurocrat made types for Array.includes
 * pour example https://stackoverflow.com/questions/71639989/typescript-why-array-includes-expects-searchelement-to-be-never-type
 * 
 * @param {Array<KnownSports>} ar 
 * @param { KnownSports} key 
 * @public
 */
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

