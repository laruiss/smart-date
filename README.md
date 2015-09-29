# (Uncommon) date picker jQuery plugin

This is a date picker designed by Julien Pate (@julienpate) for SmartFocus, developed by Stanislas Ormières (@laruiss)

[![Go to demo][2]][1]

  [1]: http://laruiss.github.io/smart-date
  [2]: smart-date-screenshot.png?raw=true (Click to go demo)

[Go to demo](http://laruiss.github.io/smart-date)

* UI Design : Julien Pate
* UX Design : Julien Pate / Stanislas Ormières

* Developed by Stanislas Ormières

## Use

* Depends on [momentJS](http://momentjs.com) and [nanoscroller](https://jamesflorentino.github.io/nanoScrollerJS/)
* Supports all the [locales](ihttps://en.wikipedia.org/wiki/Locale) supported by [momentJS](http://momentjs.com/#multiple-locale-support)


```javascript
// Add the plugin to element(s)
$(selector).smartDate();

// Add the plugin to element(s) with a specific locale
// Supports all the locale supported by momentJS
$(selector).smartDate({locale: 'fr'});
```

```javascript
// Retrieve the date (JS Date object) programmatically
$(selector).smartDate('date');

// Retrieve the year programmatically
// Returns number primitive, full year: 4 digits
$(selector).smartDate('year');

// Retrieve the month programmatically
// Returns number primitive, JS month: from 0 to 11
$(selector).smartDate('month');

// Retrieve the day of month programmatically
// Returns number primitive, from 1 to 31
$(selector).smartDate('day');

```

## Developped with Brunch, stylus, bower

* [Brunch](http://brunch.io) is fun!
* [Stylus](http://learnboost.github.io/stylus/) is neat!
* [Bower](http://bower.io) is... well, you know Bower.

## Getting started
* Install (if you don't have them):
    * [Node.js](http://nodejs.org): `brew install node` on OS X
    * [Brunch](http://brunch.io): `npm install -g brunch`
    * [Bower](http://bower.io): `npm install -g bower`
    * Brunch plugins and Bower dependencies: `npm install & bower install`.
* Run:
    * `brunch watch --server` — watches the project with continuous rebuild. This will also launch HTTP server with [pushState](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Manipulating_the_browser_history).
    * `brunch build --production` — builds minified project for production
* Learn:
    * `public/` dir is fully auto-generated and served by HTTP server.  Write your code in `app/` dir.
    * Place static files you want to be copied from `app/assets/` to `public/`.
    
