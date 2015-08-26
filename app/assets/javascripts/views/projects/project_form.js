// Manifold.Views.ProjectForm = Backbone.View.extend({
//   template: JST['projects/form'],
//
//   events: {
//     "click .btn btn-success": "addProject"
//   },
//
//   addProject: function (event) {
//     event.preventDefault();
//     var attrs = this.$el.serializeJSON();
//
//     var self = this;
//     this.model.set(attrs);
//     this.model.save({}, {
//       success: function () {
//         self.collection.unshift(that.model, {merge: true});
//         self.model = new Manifold.Models.Project();
//       }
//     });
//   }
//   // ,
//   // create: function (event) {
//   //   event.preventDefault();
//   //   this.collection.create({
//   //     board_id: this.collection.board.id,
//   //     ord: this.collection.length,
//   //     title: this.$('textarea').val()
//   //   }, { wait: true });
//   //   this.$('textarea').val('');
//   //   this.$('textarea').focus();
//   // }
// });

Manifold.Views.ProjectForm = Backbone.View.extend({
  events: {
    'submit form': 'submit'
  },

  template: JST['projects/form'],

  initialize: function(options) {
    // this.model = options.model;
    // this.collection = options.collection;
    // this.parentDiv = options.parentDiv;
    // this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    var renderedContent = this.template({
      project: this.model
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
      this.model = new Manifold.Models.Project({
        organization_id: this.model.get("organization_id")
      });
      this.render();
      // Backbone.history.navigate(
      //   '#/organizations/' + this.model.get("organization_id"),
      //   { trigger: true }
      // );
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
