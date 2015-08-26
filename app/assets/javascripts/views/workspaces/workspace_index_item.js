Manifold.Views.WorkspaceIndexItem = Backbone.CompositeView.extend({

    // events: {
    //   'sortreceive': 'receiveTask',
    //   'sortremove': 'removeTask',
    //   'sortstop': 'saveTasks'
    // },

    template: JST['workspaces/index_item'],

    className: 'ws-item',

    initialize: function () {
      // this.collection = this.model.tasks();
      this.listenTo(this.model, 'sync', this.render);
      // this.listenTo(this.collection, 'add', this.addTask);
      // this.listenTo(this.collection, 'add resize', this.setHeight);
    },

    render: function () {
      var content = this.template({
        workspace: this.model
      });
      this.$el.html(content);
      this.attachSubviews();
      this.renderMembers();
      return this;
    },

    addMember: function (member) {
      var view = new Manifold.Views.UserIndexItem({
        model: member
      });
      this.addSubview('#members', view);
    },

    renderMembers: function () {
      this.model.members().each(this.addMember.bind(this));
    }

  });
