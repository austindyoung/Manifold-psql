Manifold.Views.TaskForm = Backbone.View.extend({
  events: {
    'submit form': 'submit',
    "keyup": "adder"
    // "input input[type=text]": 'add'
//
  },

  // decrementCursor: function (event) {
  //   console.log("def function");
  //   var code = event.keyCode || event.which
  //   if (code === 8) {
  //     this.cursorPosition = this.cursorPosition - 2;
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

  adder: function (event) {

    event.preventDefault();
    var code = event.keyCode || event.which
    if ((($(document.activeElement)).attr("class") === "form-control assignee") && code !== 39) {
      var $target = $(".assignee")
      if (code === 8) {
        this.cursorPosition = this.cursorPosition - 1;
      } else {
        this.cursorPosition = this.cursorPosition + 1;
      }
      // event.focus();

      var name = $target.val();
      if (name[this.cursorPosition - 1] == " " && name[this.cursorPosition - 2] === " ") {
        this.cursorPosition = this.cursorPosition - 1;
        name = name.replace(/  /, " ");
      } else {
          var result = this.members.filter_auto_complete(name.slice(0, this.cursorPosition));
          if (result && result.attributes.mname !== "") {
            name = result.attributes.fname + " " + result.attributes.mname + " " + result.attributes.lname;
          }
          else if (result) {
            name = result.attributes.fname + " " + result.attributes.lname;
          }
           else {
            name = name.slice(0, this.cursorPosition);
          };
        $target.val(name)
        var cursorPosition = this.cursorPosition;
      } if (result) {
        $("#assignee_id").val(result.id);
      }
      $target.setCursorPosition(this.cursorPosition)
      this.prev_name_size = $target.val();
      // $target.focus();
  } else if ((($(document.activeElement)).attr("class") === "form-control assignee")) {
    console.log('assign');
  }
  },

  submit: function (event) {
    event.preventDefault();
    // var id = this.parentDiv.id
    var attrs = $(event.target).serializeJSON();
    this.attrs = attrs
    var assignee_id = attrs.assignee_id;
    delete attrs.assignee;
    attrs.creator_id = parseInt(Manifold.CURRENT_USER.id);

    var success = function () {

      if (assignee_id) {
        var task_id = this.model.id;
        var assignment = new Manifold.Models.Assignment({
          task_id: task_id,
          asignee_id: assignee_id
          // oops
        });
        assignment.save();
        var successUser = function (model) {
          this.attrs.assignees = [model.attributes];
          this.model.attributes = attrs;
          this.collection.add(this.model);
        }.bind(this);
        var user = new Manifold.Models.User({id: assignee_id})

        user.fetch({
          wait: true,
          success: successUser
        });
      };


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
    console.log(this.model.id);
  }
});
