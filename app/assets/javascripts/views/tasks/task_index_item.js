Manifold.Views.TasksIndexItem = Backbone.View.extend({
    template: JST['tasks/index_item'],
    className: "index-item task-item",
    // "index-item"

    initialize: function () {
      // this.collection = this.model.tasks();
      this.listenTo(this.model, 'sync', this.render);
    },

    render: function () {
      var content = this.template({
        task: this.model
      });
      this.$el.html(content);
      this.$el.data("id", this.model.id);
      this.$el.data("desc", this.model.attributes.description);
      this.$el.data("heading", this.model.attributes.title);
      // this.$el.data("id", this.model.id);
      // this.$el.data("desc", this.model.attributes.description);
      // this.$el.data("heading", task.attributes.title);
      return this;
    }

});
