Manifold.Collections.Projects = Backbone.Collection.extend({
  url: "/api/projects",
  model: Manifold.Models.Project,

  // initialize: function (models, options) {
  //   this.organization = options.organization;
  // },

  getOrFetch: function (id) {
    var project = this.get(id);

    if (!project) {
      project = new Manifold.Models.Project({ id: id });
      project.fetch({
        success: function () {
          this.add(project);
        }.bind(this)
      });
    } else {
      project.fetch();
    }

    return project;
  }
});
