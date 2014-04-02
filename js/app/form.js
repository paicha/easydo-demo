$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

//定义 collection
var files = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage("easydo-backbone")
});

var File = Backbone.Model.extend({
    localStorage: new Backbone.LocalStorage("easydo-backbone"),
    defaults: function() {
      return {
        title: "empty title",
        admin: "empty admin",
        tag: "empty title",
        size: "128",
        update: "2012/12/12"
      };
    },
});

//定义filelist view
var FileList = Backbone.View.extend({
    el: '#box', //选取元素
    render: function() {
        var that = this; //代替this
        var file = new files(); //初始化collection
        file.fetch({
            success: function(file) {
                var template = _.template($('#file-list-template').html(), {file: file.models});
                that.$el.html(template);
            }
        });
    },

    events: {
        "click #UploadFile": "toggleUpload"
    },

    toggleUpload: function(ev){
        var template = _.template($('#edit-file-template').html(), {
                file: null
            }); //渲染模板
            this.$el.append(template);//追加到模板
    }
});

var EditFile = Backbone.View.extend({
    el: '.FileList',
    render: function(options) {
        var that = this;
        if (options.id) {
            that.file = new File({
                id: options.id
            });
            that.file.fetch({
                success: function(file) {
                    var template = _.template($('#edit-file-template').html(), {
                        file: file
                    }); //渲染模板
                    that.$el.html(template);
                }
            });
        } else {
            var template = _.template($('#edit-file-template').html(), {
                file: null
            }); //渲染模板
            this.$el.html(template);
        }
    },

    saveFile: function(ev) {
        var fileDetails = $(ev.currentTarget).serializeObject();
        var file = new File();
        file.save(fileDetails, {
            success: function(file) {
                router.navigate('', {
                    trigger: true
                });
            }
        });
        return false;
    },
    deleteFile: function(ev) {
        this.file.destroy({
            success: function() {
                router.navigate('', {
                    trigger: true
                });
            }
        });
        return false;
    }
});



//定义路由
var Router = Backbone.Router.extend({
    routes: {
        '': 'index',
    }
});

//初始化
var fileList = new FileList();

//匹配index路由，执行动作
var router = new Router();
router.on('route:index', function() {
    fileList.render();
});

//通知开始监听
Backbone.history.start();