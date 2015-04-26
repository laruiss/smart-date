exports.config =
  # See http://brunch.io/#documentation for docs.
  files:
    javascripts:
      joinTo:
        'js/vendor.js': /^bower_components\/(jquery|nanoscroller|moment|normalize)/
        'js/smart-date.js': /^app(\/|\\)(?!(templates))/
    stylesheets:
      joinTo:
        'css/smart-date.css': /(?!^app(\/|\\)demo)/
        'css/demo.css': /^app(\/|\\)demo/
    templates:
      joinTo: 'js/smart-date.js'

  # clean compiled js file from modules header
  # and wrap it like coffeescript should
  modules:
    definition: false
    wrapper: false

  plugins:
    eco:
      namespace: "JST"