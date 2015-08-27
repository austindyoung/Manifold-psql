Manifold.Views.ProjectSearchModal = Backbone.View.extend({
  events: {
    // 'submit form': 'renderSelectUserModal',
    "input input[type=text]": 'attachResults',
    'click .project-result': 'addProject',
    'click .m-background': 'removeForm'
  },

  template: JST['add_forms/project_search_modal'],

  initialize: function () {

  },

  removeForm: function () {
    this.remove();
  },

  addProject: function (event) {
    var selected_project_id = $(event.target).data().id;
    var workspace_id = this.model.id;
    this.model = new Manifold.Models.WorkspaceProjectMembership({
      project_id: selected_project_id,
      workspace_id: workspace_id
    });
    // var notification = new Manifold.Models.ProjectMembershipNotification({
    //   user_id: selected_user_id,
    //   project_id: project_id,
    //   adder_id: parseInt(Manifold.CURRENT_USER.id)
    // });
    // notification.save();
    this.remove();
    this.model.save();
  },


  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
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
  }

});
