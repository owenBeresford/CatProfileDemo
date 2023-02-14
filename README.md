# OSStest
this is only *four days* worth of typescript.  This is not a product.  
+++++ I do not publish code without tests; this is not published +++++

I am showing:
* About 600 standardised LOC that is not tests, CSS or libraries 
* I can use Enum (feels weird outside of SQL)
* I can use interfaces and types
* I can use basic React 18
* I have a reason to use a generic type (not been in a situation where those would help previously)
* I extended to include a *test API*, which manipulates static JSON, NB: low concurrency
* Some basic behavioural UI niceties added
* Created component tests in Mocha; Jest has issues with some of my choice of imports, and running this from a browser make those imports work
* The default Cat face was taken from https://www.reshot.com/free-svg-icons/face/
* ADDED: Profiles can be edited before they are saved

I have not built:
* A professional level webpack
* Any security on APIs or HTTPS etc
* CSS a tied to each component, as this project isn't large enough to need that organisation
* add CSS to webpack, add minify to the CSS
* any tests; but code does compile to JS. UPDATE: cough.
* support for older browsers yet; for a product I would transpile to a more generic version of JS
* correct types to compile Mongoose + lean() + typescript.  I spent 4h trying to solve that mess.  I could dodge by making that class a JS file
* There are clearly documented omissions, tagged with TODO in the files
* Move content of public/  to src/client/assets and edit build config to match
* Add static meta data to HTML template
* Transform useEffect to useTransform when I am writing really fast I cannot use the newest API with unknown side-effects 
* The libraries that I choose claim to want react16; they are running with react18.  This isn't a business critical situation
* Interaction: I should spend a lot more time on gender input.  In order to work with all theoretical options I am leaving this as a free text.  
* Interaction: I should implement the images, think about best image size on mobile, maybe add logo-or-banner--as-background feature.
* Interaction: Add the "arrow buttons" css, like on my site
* Interaction: Make the day picker nicer to use.
* interaction: Improve logo and brand packs 
* interaction: Make a better form validation, rather than that 2min "is it null" filter
* Interaction: as this UI is designed in layers, add a big vague-focus cattery in the background
* hygiene: add HTTPS
* hygiene: set HTTP headers 
* Add better/ complete code for the nation flags

