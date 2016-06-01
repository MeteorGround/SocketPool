import {
    topics
} from '../../../lib/collections';
import {
    Session
} from 'meteor/session';

Template.topic.helpers({
    getRooms() {
      var topicName = FlowRouter.getParam('topic')
      var id = topics.findOne({
          "label": topicName
      })._id;
      Session.set('topic', id);
      return {rooms : topics.findOne(Session.get('topic')).rooms, topic: topicName};
    }
})



Template.topic.events({
  'submit #createRoom': function(e) {
    e.preventDefault();
    let roomName = $('#roomName').val();
    $('#roomName').val('')
    topics.update(Session.get('topic'), {
        $push: {
            rooms: {
              "_id" : new Meteor.Collection.ObjectID()._str,
                "label": roomName
            }
        }
    })
  }
})
