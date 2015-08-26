Manifold.Views.TasksIndexItem = Backbone.View.extend({
    template: JST['tasks/index_item'],
    className: "index-item",

    initialize: function () {
      // this.collection = this.model.tasks();
      this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
      var content = this.template({
        task: this.model
      });
      this.$el.html(content);
      return this;
    }

});
