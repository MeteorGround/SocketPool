import {
    Meteor
} from 'meteor/meteor'
import {
    seeds
} from '../lib/seeds'
import {
    topics
} from '../lib/collections'

Meteor.startup(() => {
    // code to run on server at startup
    if (topics.find().count() == 0)
        seeds.forEach((topic) => topics.insert({
            'label': topic
        }))
});
