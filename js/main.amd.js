/*global requirejs */
requirejs.config({
    baseUrl: 'js/',
    paths: {
        "jquery": [
            '//cdnjs.cloudflare.com/ajax/libs/jquery/1.11.0/jquery.min',
            '../bower_components/jquery/jquery.min'
         ],
        "moment": [
            '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.2/moment-with-locales.min',
            '../bower_components/moment/min/moment-with-locales.min'
        ],
        "nanoscroller": [
            '//cdnjs.cloudflare.com/ajax/libs/jquery.nanoscroller/0.8.6/javascripts/jquery.nanoscroller.min',
            '../bower_components/nanoscroller/bin/javascripts/jquery.nanoscroller.min'
        ],
        'smart-date': 'smart-date.amd',
        'app': 'app'
    }
});
requirejs(["app"]);