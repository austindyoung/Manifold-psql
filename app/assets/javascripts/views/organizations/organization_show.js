Manifold.Views.OrganizationShow = Backbone.CompositeView.extend({
    template: JST['organizations/show'],

    events: {
      "click .create-project": "renderProjectModal",
      "click .add-user": "renderUserSearchForm",
      "click .project-heading": "navToProject"
    },

    initialize: function (options) {
      $('body').css('background-color', 'rgb(240,240,240) ')
      // this.collection = this.model.projects();
      // this.renderProjectForm();

      this.renderProjects();
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.collection, 'add', this.addProject);
      this.users = options.users;
    },

    navToProject: function (event) {
      event.preventDefault();
      var $target = $(event.target);
      var project_id = $target.data().projectId;
      var url = "#/projects/" + project_id;
      Backbone.history.navigate(url, {trigger: true});
    },

    render: function () {
      var content = this.template({
        organization: this.model
      });
      this.$el.html(content);
      this.attachSubviews();
      this.$('#projects').sortable();
      return this;
    },

    renderUserSearchForm: function () {
      modal = new Manifold.Views.UserToOrganizationForm({
        model: this.model,
        users: this.users
      });
      $('body').append(modal.$el);
      modal.render();
    },

    addProject: function (project) {
      var view = new Manifold.Views.ProjectIndexItem({
        model: project
      });
      this.addSubview('#projects', view);
    },

    renderProjects: function () {
      this.model.projects().each(this.addProject.bind(this));
    },

    // renderProjectForm: function () {
    //   var project = new Manifold.Models.Project({
    //     organization_id: this.model.id
    //   });
    //   var view = new Manifold.Views.ProjectForm({
    //     collection: this.model.projects(),
    //     model: project
    //   });
    //   this.addSubview('#project-form', view);
    // },

    renderProjectModal: function () {
      console.log("modal");
      var project = new Manifold.Models.Project({
        organization_id: this.model.id,
        owner_id: parseInt(Manifold.CURRENT_USER.id)
      });
      var modal = new Manifold.Views.ProjectFormModal({
        collection: this.model.projects(),
        model: project
      });
      $('body').append(modal.$el);
      modal.render();
    }
});
