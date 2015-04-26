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
        'smart-date': 'smart-date.amd',
        'app': 'app'
    }
});
requirejs(["app"]);