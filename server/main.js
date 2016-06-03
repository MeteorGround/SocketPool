import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  // http://docs.meteor.com/api/core.html#Meteor-settings
  if(Topics.find().count() == 0){
    Meteor.settings.Topics.forEach((topic) => Topics.insert({
      "topicName": topic
    }))
  }
});
