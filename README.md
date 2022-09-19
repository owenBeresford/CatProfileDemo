# OSStest
this is only *three days* worth of typescript.  This is not a product.  
+++++ I do not publish code without tests; this is not published +++++

I am showing:
* I can use Enum (feels weird outside of SQL)
* I can use interfaces and types
* I can use basic React 
* I have a reason to use a generic type (not been in a situation where those would help previously)
* I extended to include a *test API*, which manipulates static JSON, NB: low concurrency
* Some basic behavioural UI niceties added (to-date no CSS)

I have not built:
* add CSS to webpack, add minify to it
* any tests; but code does compile to JS
* support for older browsers yet; for a product I would transpile to a more generic version of JS
* correct types to compile Mongoose + lean() + typescript.  I spent 4h trying to solve that mess.  I could dodge by making that class a JS file
* A professional level webpack
* Any security on APIs or HTTPS etc
* There are clearly documented omissions, tagged with TODO in the files
* Move content of public/  to src/client/assets and edit build config to match
* Add static meta data to HTML template

