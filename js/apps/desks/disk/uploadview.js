define([
  'underscore',
  'marionette',
  'apps/desks/disk/templates',
],

function (_, Marionette, templates) {

  return Marionette.ItemView.extend({

    className: "modal-dialog",

    template: _.template(templates.form),

    templateHelpers: {
      getTitle: function () {
        return (this.id ? '新建文件夹' : '上传文件');//TODO 判断
      }
    },

    triggers: {
      // FileController is listening
      'submit' : 'file:save'
    }

  });

});