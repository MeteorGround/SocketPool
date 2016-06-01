import {
    topics
} from '../../../lib/collections';

Template.home.helpers({
    getTopics() {
          return topics.find();
        
    }
})
