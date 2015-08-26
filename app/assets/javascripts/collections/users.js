Manifold.Collections.Users = Backbone.Collection.extend({
  url: "/api/users",
  model: Manifold.Models.User,
  filter: function (prefix) {
    prefix = prefix.toLowerCase();
    var regex = "^" + prefix
    return this.select(function (model) {
      return model.attributes.fname.toLowerCase().match(regex) || model.attributes.mname.toLowerCase().match(regex) || model.attributes.lname.toLowerCase().match(regex);
    });
  },

  select: function (condition) {
    var selected = [];
    this.models.forEach(function (model) {
      if (condition(model)) {
        selected.push(model);
      }
    });
    return selected;
  }
})
