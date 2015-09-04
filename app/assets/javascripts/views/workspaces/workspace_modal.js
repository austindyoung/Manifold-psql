Manifold.Views.WorkspaceModal = Backbone.CompositeView.extend({
  events: {
    // "input input[type=text]": 'attachResults',
    'submit form': 'submit',
    'click .m-background': 'removeModal'
    // 'click .project-result': 'stageProject'
  },

  attachResults: function (event) {
    $('#results').empty();
    event.preventDefault();
    var fragment = $(event.target).serializeJSON().fragment;

    var resultsArray = this.collection.filter(fragment);
    modal = new Manifold.Views.SelectProjectForm({
      model: this.model,
      resultsArray: resultsArray
    });
    $('#results').append(modal.render().$el);
  },

  removeModal: function () {
    this.remove();
  },

  template: JST['workspaces/modal'],

  initialize: function(options) {
    // this.model = options.model;
    // this.collection = options.collection;
    // this.parentDiv = options.parentDiv;
    // this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var renderedContent = this.template({
      workspace: this.model
    });
    this.$el.html(renderedContent);

    return this;
  },

  submit: function (event) {
    event.preventDefault();
    // var id = this.parentDiv.id
    var attrs = $(event.target).serializeJSON();
    // attrs.organization_id = id

    var success = function () {
      this.collection.add(this.model);
      this.model = new Manifold.Models.Workspace({ user_id: Manifold.CURRENT_USER.id })
      this.render();
    //navigate
    }.bind(this);

    function errors(model, response) {
      $('.errors').empty();
      response.responseJSON.forEach(function (el) {
        var $li = $('<li></li>');
        $li.text(el);
        $('.errors').append($li);
      }.bind(this));
    }
    // also save membership model between creator and project
    this.model.save(attrs, {
      wait: true,
      success: success,
      error: errors.bind(this)
    });
    this.remove();
  }
});
