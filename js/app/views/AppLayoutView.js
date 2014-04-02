define(['underscore', 'marionette', 'templates'], function(_, Marionette, templates) {

    return Marionette.Layout.extend({

        className: 'app-layout',

        template: _.template(templates.app.layout),

        regions: {

            topTabs:  "#topTabs",
            left:     "#left",
            content:  "#content",
            right:    "#right"
        },

        initialize: function(options) {
            $('body').removeClass('stripes-bg');
        }

    });
});
