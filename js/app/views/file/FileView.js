define([
  'underscore',
  'marionette',
  'templates',
  'vent'
],

function (_, Marionette, templates, vent) {

  return Marionette.ItemView.extend({

    className: "modal-dialog",

    template: _.template(templates.file.form),

    templateHelpers: {
      getTitle: function () {
        return (this.id ? '上传文件' : '上传文件夹');//TODO 判断
      }
    },

    triggers: {
      // FileController is listening
      'submit' : 'file:save'
    }

  });

});