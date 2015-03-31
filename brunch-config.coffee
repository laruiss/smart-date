exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app(\/|\\)(?!templates)/
        'js/vendor.js': /^(?!app)/
    stylesheets:
      joinTo: 'css/app.css'
    templates:
      joinTo: 'js/app.js'

  # clean compiled js file from modules header and wrap it like coffeescript should
  modules:
    definition: false
    wrapper: false

  plugins:
    eco:
      namespace: "JST"
