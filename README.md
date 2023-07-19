# CatProfileDemo

This is not a product, this is a tech test.

Objectives

- use storybook, or cypress and vitest as I couldn't use mocha, jasmine or jest for component testing easily
- look at traditional JS unit-tests when using ES6 or JS modules as I loose time there too
- use react18 in a low-pace, code-first environment (see end); and reduce hacky use of useEffect

I wrote a "simple demo to match blogs" very quickly, in 4days. Since then I added testing; I have improved the software architecture; I intend to replace the CSS as modules and get a real DB involved.

I am showing:

- About 2000 standardised LOC that is not tests, CSS or libraries
- I can use Enum (feels weird outside of SQL)
- I can use interfaces and types
- I can use basic React 18
- I have a reason to use a generic type (not been in a situation where those would help previously)
- I extended to include a _test API_, which manipulates static JSON, NB: low concurrency
- Some basic behavioural UI niceties added
- Understanding the tradeoff between useState() and usRefs(); Have a centralised repo type class for state
- The default Cat face was taken from https://www.reshot.com/free-svg-icons/face/
- Make UI tests in Storybook & Make more tests in vitest & Make API test in Jest
- ADDED: Profiles can be edited before they are saved
- ADDED: cats-in-browser now have global IDs; Components have unique global ids (for the testscripts).
- ADDED: "cat catalogue" is transferred to client as 1 API request; I should add periodic updates
- ADDED: Ability to delete cats
- ADDED: more UI niceties
- Ensured scripts accessed via npm are correct & complete

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

Urgent need:

- I want to change CSS approach to have namespaces and be done in modular CSS style (most CSS here was just maximum rush speed); I guess this is a days work.
- Maybe try to get Mongoose TS types setup now; can't guesstimate. Maybe swap to TypeORM or Prisma if easier?
- I would like to add reference cypress test suite 
