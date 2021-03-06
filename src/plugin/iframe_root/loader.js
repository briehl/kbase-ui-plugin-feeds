define([], function () {
    'use strict';
    require.config({
        baseUrl: './modules',
        paths: {
            bluebird: 'vendor/bluebird/bluebird',
            bootstrap: 'vendor/bootstrap/bootstrap',
            bootstrap_css: 'vendor/bootstrap/css/bootstrap',
            css: 'vendor/require-css/css',
            font_awesome: 'vendor/font-awesome/css/font-awesome',
            highlight_css: 'vendor/highlightjs/default',
            highlight: 'vendor/highlightjs/highlight.pack',
            jquery: 'vendor/jquery/jquery',
            'js-yaml': 'vendor/js-yaml/js-yaml',
            kb_common: 'vendor/kbase-common-js',
            kb_common_ts: 'vendor/kbase-common-ts',
            kb_lib: 'vendor/kbase-common-es6',
            kb_service: 'vendor/kbase-service-clients-js',
            kb_knockout: 'vendor/kbase-knockout-extensions-es6',
            'knockout-arraytransforms': 'vendor/knockout-arraytransforms/knockout-arraytransforms',
            'knockout-projections': 'vendor/knockout-projections/knockout-projections',
            'knockout-switch-case': 'vendor/knockout-switch-case/knockout-switch-case',
            'knockout-validation': 'vendor/knockout-validation/knockout.validation',
            'knockout-mapping': 'vendor/bower-knockout-mapping/knockout.mapping',
            'knockout-plus': 'lib/knockout-plus/knockout-plus',
            knockout: 'vendor/knockout/knockout',
            marked: 'vendor/marked/marked',
            moment: 'vendor/moment/moment',
            numeral: 'vendor/numeral/numeral',
            md5: 'vendor/spark-md5/spark-md5',
            text: 'vendor/requirejs-text/text',
            yaml: 'vendor/requirejs-yaml/yaml',
            uuid: 'vendor/pure-uuid/uuid',
            underscore: 'vendor/underscore/underscore'
        },
        shim: {
            bootstrap: {
                deps: ['jquery', 'css!bootstrap_css']
            },
            highlight: {
                deps: ['css!highlight_css']
            }
        }
    });
});
