Manifold.Views.ProjectShow = Backbone.CompositeView.extend({
    template: JST['projects/show'],

    events: {
      // "click .add-to-workspace": "renderAddModal",
      "click .create-task": "renderTaskModal",
      "click .add-user": "renderAddUserModal",
      "click .task-item": "renderTaskDetails",
      "click .navbar-header.project": "renderOverviewForm",
      'click .workspace-item': 'addToWorkspace',
      'click .task-completed': 'deleteTask'
    },


    deleteTask: function (event) {
      var task_id = parseInt($(event.target).data().id);
      var task = new Manifold.Models.Task({id: task_id});
      task.fetch();
      this.confirmDeletion(task)
      // task.destroy();

    },

    confirmDeletion: function (task) {
      var view = new Manifold.Views.CompletionModal({
        model: task
      });
      $('body').append(view.render().el);
    },

    addToWorkspace: function (event) {
      event.preventDefault();
      var workspace_id = $(event.target).data().id;
      var project_id = this.model.id;
      var user_id = parseInt(Manifold.CURRENT_USER.id)
      if (this.model.team_members().models.selects(function (mod) {
        return mod.id === user_id
      }).length !== 1) {
        var team_membership = new Manifold.Models.TeamMembership({
          member_id: user_id,
          project_id: project_id
        });
        team_membership.save();
      }
      this.model = new Manifold.Models.WorkspaceProjectMembership({
        workspace_id: workspace_id,
        project_id: project_id
      });
      var project = new Manifold.Models.Project({id: project_id});
      project.fetch();
      this.model.save()
      // this.remove();
    },


    renderAddModal: function () {
      console.log("add modal");
      modal = new Manifold.Views.ProjectToWorkspaceForm({
        model: this.model,
        collection: this.collection
      });
      $('.workspaces-dropdown').append(modal.render().$el);
    },

    renderTaskModal: function () {
      console.log("task modal");

    },

    renderAddUserModal: function () {
      modal = new Manifold.Views.UserToProjectForm({
        model: this.model,
        collection: this.collection,
        users: this.users,
      });
      $('body').append(modal.$el);
      modal.render();
    },

    initialize: function (options) {
      $('body').css('background-color', 'rgb(240,240,240) ')
      // this.collection = this.model.projects();
      this.tasks = this.model.tasks();
      this.team_members = this.model.team_members();
      this.renderTaskForm();
      this.users = options.users
      // this.renderAddToWorkspaceForm;
      // this.renderAddUserForm;
      // this.renderTasks();
      // this.listenTo(this.model, 'sync', this.render);
      this.renderTasks();
      this.renderTeamMembers();
      this.listenTo(this.model, 'add', this.render);
      this.listenTo(this.model, 'sync', this.render);
      this.listenTo(this.tasks, 'add', this.addTask);
      this.listenTo(this.tasks, 'remove', this.renderTasks);
      this.listenTo(this.team_members, 'add', this.addTeamMember);
      this.listenTo(this.team_members, 'sync', this.addTeamMember);
    },

    render: function () {
      var content = this.template({
        project: this.model
      });
      this.$el.html(content);
      this.attachSubviews();
      // this.renderTasks();
      // this.renderTeamMembers();
      this.renderOverviewForm();
      this.$('#tasks').sortable();
      this.$('#team-members').sortable();
      this.renderAddModal();
      return this;
    },

    addTask: function (task) {
      var view = new Manifold.Views.TasksIndexItem({
        model: task
      });
      this.addSubview('#tasks', view);
    },

    addTeamMember: function (team_member) {
      var view = new Manifold.Views.UserIndexItem({
        model: team_member
      });
      this.addSubview('#team-members', view);
    },

    renderTasks: function () {
      this.tasks.each(this.addTask.bind(this));
    },

    renderTeamMembers: function () {
      this.team_members.each(this.addTeamMember.bind(this));
    },

    renderTaskForm: function () {
      var task = new Manifold.Models.Task({
        project_id: this.model.id
      });
      var view = new Manifold.Views.TaskForm({
        collection: this.model.tasks(),
        model: task
      });
      this.addSubview('#task-form', view);
    },

    renderTaskDetails: function (event) {
      $('.task-item button').remove();
      $('#project-overview').empty();
      $('.task-item').removeClass('active');
      var $target = $(event.target)
      $target.addClass("active");
      var $span = $('<span></span>');
      // $span.addClass("glyphicon glyphicon-remove");
      $button = $("<button>x</button>");
      $button.append($span);
      $target.append($button);
      $('.task-item button').addClass("btn btn-defaul btn-xs task-completed");
      var $target = $(event.target);
      var desc = $target.data().desc;
      var title = $target.data().heading;
      var id = $target.data().id;
      $('.task-item button').data("id", id);
      var taskView = new Manifold.Views.TaskShow({
        heading: title,
        desc: desc
      });
      this.addSubview('#project-overview', taskView);
    },

    renderOverviewForm: function () {
        $('.task-item button').remove();
      $('.task-item').removeClass('active');
      $('#project-overview').empty();
      var view = new Manifold.Views.ProjectFormSide({
        model: this.model
      });
      this.addSubview('#project-overview', view);
    }

});
