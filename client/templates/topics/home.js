// Meteor.subscribe('topics');

Template.home.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('topics');
  })
})

Template.home.helpers({
  getTopics(){
    return Topics.find();
  }
})
