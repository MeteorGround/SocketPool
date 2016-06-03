Meteor.subscribe('rooms');

Template.room.helpers({
  getRooms(){
    let roomsName = Rooms.find({"roomTopic": FlowRouter.getParam('topicName')}).fetch();
    roomsName.map((index) =>  index.cleanRoom = index.roomName.split('-').join(' '))
    return roomsName;
  }
})
Template.room.events({
  'submit #create-new-room': function(e){
    e.preventDefault();
    let roomName = $('#roomName').val();
    // TODO: CHECK IF ROOM ALREADY IN THIS TOPIC, IF TRUE (BEFORE INSERT IT APPEND AND INDEX)
    Rooms.insert({"roomName": roomName.split(' ').join('-'), "roomTopic": FlowRouter.getParam('topicName')})
  }
})
