# CatProfileDemo

This is not a product, this is a **tech test.**

---

My mangling of a normal js repo header:

- install via git
- this repo supports
  - "help"
  - "init"
  - "app", "start", "stayup:app"
  - "stop"
  - "lint"
  - "build:app"
  - "build:client"
  - "build:server"
  - "test:app"
  - "test:storybook" (will run a test GUI)
  - "build:storybook" (for editing only)
  - "vitest"
  - "vitest:ui" (will run extra test GUI)
  - "jest"
  - "build:docs" (will create docs)
  - "docs" (will serve docs)

### Objectives

- use storybook, and vitest, possibly cypress as I couldn't use mocha, jasmine or jest for component testing easily
- use react18 in a low-pace, code-first environment (see end); and reduce hacky use of useEffect

### Achievements:

I wrote a "simple demo to match blogs" very quickly, in 2days.
Since then I added testing; I have improved the software architecture; I intend to replace the CSS as modules and get a real DB involved.

I am showing:

- About 2000 standardised LOC that is not tests, docs, CSS or libraries
- Grownup use of css, docs & test tools
  - LINK https://owenberesford.me.uk/resource/storybook
  - LINK https://owenberesford.me.uk/resource/vitest
  - LINK https://owenberesford.me.uk/resource/docs-for-js-ts
  - LINK https://github.com/owenBeresford/oab1-conf/ ~ A set of config files to reduce my reading time in future. This list will not live that long
- I can use Enum (feels weird outside of SQL)
- I can use interfaces and types
- I can use basic React 18
- I have a reason to use a generic type (not been in a situation where those would help previously)
- I extended to include a _test API_, which manipulates static JSON, NB: low concurrency
- I have used UTF8 char for icons, (more iteration here would be important for commercial work)
- Some basic behavioural UI niceties
- Understanding the tradeoff between useState() and useRefs(); Have a centralised repo type class for state
- Config for test in Storybook, Vitest and Jest
- Reasonable management of package.json

### Credits:

- The default Cat face was taken from https://www.reshot.com/free-svg-icons/face/
- Linked packages are the property of their named owners, please see all the packages.json in node_modules after installation, or look them up in NPMJS

### Omissions:

I have not built:

- A professional level webpack (I imported it)
- CSS a tied to each component, as this project isn't large enough to need that organisation
- support for marginal browsers yet; for a product I would transpile to a more generic version of JS.
- There are clearly documented omissions, tagged with TODO in the files
- Transform useEffect to useTransform; when I am writing really fast I cannot use the newest API with unknown side-effects
- The libraries that I choose claim to want react16; they are running with react18. This isn't a business critical situation
- correct types to compile Mongoose + lean() + typescript. I spent 4h trying to solve that mess. I could dodge by making that class a JS file
- Interaction: I should spend a lot more time on gender input. In order to work with all theoretical options I am leaving this as a free text.
- Interaction: I should implement the images, think about best image size on mobile, maybe add logo-or-banner-as-background feature.
- Interaction: Make the day picker nicer to use.
- Interaction: Improve logo and brand packs
- Interaction: Make a better form validation, rather than that 2min "is it null" filter
- Interaction: as this UI is designed in layers, add a big vague-focus cat in the background
- hygiene: add HTTPS
- hygiene: set HTTP headers
- Add complete code for the nation flags. UPDATE: the EU is supported now, and common synonyms for the UK
- My props for components are passing stateless impure functions, which only modify things in Redux State.
- Add rest of component tests to vitest.
- Moved code to a newer "create app" template

Eventual need:

- I want to change CSS approach to have namespaces and be done in modular CSS style. Most existing CSS here was just maximum rush speed. (guess a days work.)
- Maybe try to get Mongoose TS types setup now; (can't guesstimate. Maybe swap to TypeORM or Prisma if easier? )
- I would like to add reference cypress test suite (guesstimate over a week)
