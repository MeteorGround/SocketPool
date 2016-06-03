Meteor.subscribe('topics');

Template.home.helpers({
  getTopics(){
    return Topics.find();
  }
})
