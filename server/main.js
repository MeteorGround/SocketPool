import {
    Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
    if (Topics.find().count() == 0) {
        Meteor.settings.Topics.forEach((topic) => Topics.insert({
            "topicName": topic
        }))
    }
});
