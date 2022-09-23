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

I have not built:
* CSS a tied to each component, as this project isn't large enough to need that organisation
* add CSS to webpack, add minify to the CSS
* any tests; but code does compile to JS
* support for older browsers yet; for a product I would transpile to a more generic version of JS
* correct types to compile Mongoose + lean() + typescript.  I spent 4h trying to solve that mess.  I could dodge by making that class a JS file
* A professional level webpack
* Any security on APIs or HTTPS etc
* There are clearly documented omissions, tagged with TODO in the files
* Move content of public/  to src/client/assets and edit build config to match
* Add static meta data to HTML template
* Transform useEffect to useTransform when I am writing really fast I cannot use the newest API with unknown side-effects 
* The libraries that I choose claim to want react16; they are running with react18.  This isn't a business critical situation

