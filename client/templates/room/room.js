import {
    topics
} from '../../../lib/collections';
import {
    Session
} from 'meteor/session';

Template.room.helpers({
    getRoom() {
        const topicID = FlowRouter.getParam('topicLabel')
        const roomID = FlowRouter.getParam('roomID')
        var data = topics.findOne({
            "label": topicID
        }).rooms;
        data = data.find((room) => room._id === roomID)
        return {
            labelRoom: data.label
        }
    }
})

Template.room.events({
    'submit #messageForm': function(e) {
        e.preventDefault();
        const $message = $('#message');
        
        $message.val('')

    }
})
