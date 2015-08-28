Manifold.Views.TaskForm = Backbone.View.extend({
  events: {
    'submit form': 'submit',
    // "input input[type=text]": 'add'
    "keyup": "add"
  },

  // decrementCursor: function (event) {
  //   var code = event.keyCode || event.which
  //   debugger;
  //   if (code === 8) {
  //     this.cursorPosition = this.cursorPosition - 1;
  //     console.log("dec");
  //   }
  // },

  template: JST['tasks/form'],

  initialize: function(options) {
    // this.model = options.model;
    // this.collection = options.collection;
    // this.parentDiv = options.parentDiv;
    // this.listenTo(this.model, 'sync', this.render);
    this.prev_name_size = 0;
    this.cursorPosition = 0;
    this.members = options.members;
  },

  render: function () {
    var renderedContent = this.template({
      task: this.model
    });
    this.$el.html(renderedContent);

    return this;
  },

  add: function (event) {
    // debugger;
    event.preventDefault();
    var $target = $(".assignee")
    var code = event.keyCode || event.which
    if (code === 8) {
      this.cursorPosition = this.cursorPosition - 1;
      console.log("dec");
    } else {
      this.cursorPosition = this.cursorPosition + 1;
    }
    // event.focus();
    // debugger;
    var name = $target.val();
    if (name[this.cursorPosition - 1] == " " && name[this.cursorPosition - 2] === " ") {
      this.cursorPosition = this.cursorPosition - 1;
      name = name.replace(/  /, " ");
    } else {
      $target.val(this.members.filter_auto_complete(name.slice(0, this.cursorPosition)))
      var cursorPosition = this.cursorPosition;
    }
    console.log(this.cursorPosition);
    $target.setCursorPosition(this.cursorPosition)
    this.prev_name_size = $target.val();
    // $target.focus();

  },

  submit: function (event) {
    event.preventDefault();
    // var id = this.parentDiv.id
    var attrs = $(event.target).serializeJSON();
    attrs.creator_id = parseInt(Manifold.CURRENT_USER.id);
    // attrs.organization_id = id

    var success = function () {
      this.collection.add(this.model);
      this.model = new Manifold.Models.Task({
        project_id: this.model.get("project_id")
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
  }
});
