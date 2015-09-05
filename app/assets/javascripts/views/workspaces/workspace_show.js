Manifold.Views.WorkspaceShow = Backbone.CompositeView.extend({
    template: JST['workspaces/show'],

    events: {
      "click .project-heading": "renderProject",
      "click .project-to-ws": "renderProjectSearchModal",
      "click .edit-task": "log"
    },

    log: function () {
      console.log("here");

    },

    renderProjectSearchModal: function () {
      var all_projects = new Manifold.Collections.Projects();
      var id = this.model.id;
      var id_string = parseInt(id);
      all_projects.fetch({data: {all: "t", workspace_id: id_string}});
      var searchModal = new Manifold.Views.ProjectSearchModal({
        model: this.model,
        collection: all_projects,
        projects: this.projects
      });
      $('body').append(searchModal.render().$el);
    },

    navToProject: function (event) {
      event.preventDefault();
      var $target = $(event.target);
      var project_id = $target.data().id;
      var url = "#/projects/" + project_id;
      Backbone.history.navigate(url, {trigger: true});
    },

    initialize: function (options) {
      // todo: use patterns from organization show
      $('body').css('background-color', 'rgb(240,240,240) ')
      // this.collection = this.model.projects();
      this.members = this.model.members();
      this.projects = this.model.projects();
      this.users = options.users;
      this.workspaces = options.workspaces;
      // this.renderProjects();
      // debugger;
      this.listenTo(this.projects, 'add', this.addProject);
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.members, 'add', this.addMember);
    },

    render: function () {
      var content = this.template({
        workspace: this.model
      });
      this.$el.html(content);
      this.attachSubviews();
      // this.renderProjects();

      this.$('#projects-sidebar');
      // remove sortable
      this.$('#members');
      // remove sortable

      return this;
    },

    renderProject: function (event) {
      $('.project-heading').removeClass('active');
      $(event.target).addClass('active');
      $('#project').empty();
      event.preventDefault();
      var $target = $(event.target);
      var project_id = $target.data().projectId;
      var project = this.projects.findWhere({id: project_id});
      var projectView = new Manifold.Views.ProjectShow({
        model: project,
        workspace: this.model,
        collection: this.workspaces,
        users: this.users
      });
      this.addSubview("#project", projectView)
    },

    addProject: function (project) {
      var view = new Manifold.Views.ProjectIndexItem({
        model: project
      });
      this.addSubview('#content-sidebar', view);
    },

    addMember: function (member) {
      var view = new Manifold.Views.UserIndexItem({
        model: member
      });
      this.addSubview('#members', view);
    },

    renderProjects: function () {
      this.model.projects().each(this.addProject.bind(this));

    },

    renderMembers: function () {
      this.model.members().each(this.addMember.bind(this));
    },

    // renderTasks: function () {
    //
    // }

    // renderProjectForm: function () {
    //   var view = new Manifold.Views.ProjectForm({
    //     collection: this.collection,
    //     model: new Manifold.Models.Project(),
    //     parentDiv: this.model
    //   });
    //   this.addSubview('#project-form', view);
    // }
});
