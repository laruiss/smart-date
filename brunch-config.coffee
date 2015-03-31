exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'js/rolling-date.js': /^app(\/|\\)(?!templates)/
        'js/vendor.js': /^(?!app)/
    stylesheets:
      joinTo:
        'css/rolling-date.css': /(?!^app(\/|\\)demo)/
        'css/demo.css': /^app(\/|\\)demo/
    templates:
      joinTo: 'js/rolling-date.js'

  # clean compiled js file from modules header
  # and wrap it like coffeescript should
  modules:
    definition: false
    wrapper: false

  plugins:
    eco:
      namespace: "JST"