Manifold.Views.TaskForm = Backbone.View.extend({
  events: {
    'submit form': 'submit',
    "keyup": "adder",
    "click #assignee-stager": "stageAssignee",
    'click .m-background': 'removeModal'
    // "input input[type=text]": 'add'
//
  },
  removeModal: function () {
    this.remove();
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
    this.test = 1;
    this.prev_name_size = 0;
    this.cursorPosition = 0;
    this.members = options.members;
  },

  render: function () {
    // debugger;
    var renderedContent = this.template({
      task: new Manifold.Models.Task()
    });
    this.$el.html(renderedContent);
    // this.model = new Manifold.Models.Task();
    return this;
  },

  stageAssignee: function () {
    $buffer = $("#assignee_id_buffer")
    var current_id = parseInt($buffer.val());
    var ids_array = JSON.parse($("#assignee_ids").val());
    ids_array.push(current_id);
    $("#assignee_ids").val(JSON.stringify(ids_array));
    this.cursorPositon = 0;
    $buffer.val('');
    $nextAssignee = $("<div></div>");
    $nextAssignee.text($("input.assignee").val());
    $("#assignees-stage").prepend($nextAssignee)
    $("input.assignee").val('');
  },

  adder: function (event) {
    event.preventDefault();
    var code = event.keyCode || event.which
    if ((($(document.activeElement)).attr("class") === "form-control assignee") && code !== 39) {
      var $target = $("input.assignee")
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
        $("#assignee_id_buffer").val(result.id);
      }
      $target.setCursorPosition(this.cursorPosition)
      this.prev_name_size = $target.val();
      // $target.focus();
  } else if ((($(document.activeElement)).attr("class") === "form-control assignee") && code === 39) {
    this.stageAssignee();
  }
  },

  submit: function (event) {
    event.preventDefault();
    var attrs = $(event.target).serializeJSON();
    var assignee_ids = JSON.parse(attrs.assignee_ids);
    var numAssignees = assignee_ids.length;
    var count = 0;
    delete attrs.assignee_ids;
    this.attrs = attrs
    attrs.creator_id = parseInt(Manifold.CURRENT_USER.id);
    this.attrs.assignees = [];
    var success = function () {
      for (var i = 0; i < assignee_ids.length; i++) {
      var assignee_id = assignee_ids[i];
      if (assignee_id) {
        var task_id = this.model.id;
        var assignment = new Manifold.Models.Assignment({
          task_id: task_id,
          asignee_id: assignee_id
          // oops
        });
        assignment.save();
        // this.model = new Manifold.Models.Task();
        var successUser = function (model) {
          // this.attrs.assignees = [model.attributes];

          count = count + 1;
          this.attrs.assignees.push(model.attributes);
          if (count === numAssignees) {
            this.model.attributes = this.attrs;
            // delete this.model.attributes.id;
            this.collection.add(this.model);
            // this.collection.add(this.task);
            this.render();
            // this.remove();
            //
          }
          // this.render();
        }.bind(this);

        var user = new Manifold.Models.User({id: assignee_id})

        user.fetch({
          wait: true,
          success: successUser
        });

      }


      // this.model = new Manifold.Models.Task({
      //   project_id: this.model.get("project_id")
      // });

    }
this.render();
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
    // this.task = new Manifold.Models.Task(attrs);
    // attrs.project_id = this.model.attributes.project_id;
    // delete this.model.attributes.id;
    delete this.model.attributes.id

    this.model.save(attrs, {
    // this.task.save({
      wait: true,
      success: success,
      error: errors.bind(this)
    });
  // this.render();
  }

});
