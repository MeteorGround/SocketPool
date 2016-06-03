Meteor.subscribe('roomdata');
Meteor.subscribe('rooms');

Template.chatRoom.helpers({
  getData(){
    let roomName = Rooms.find({"roomName": FlowRouter.getParam('roomName')}).fetch();
    console.log(roomName);
    return "hello its me";
  }
})

Template.chatRoom.events({
  'submit #messageForm': function(e){
    e.preventDefault();
    let $message = $('#message');
    console.log("Message: ", $message.val());
    console.log("Time: ", moment().format('MM-DD-YYYY, h:mm:ss'));
    console.log("Sender: ", Meteor.user().username);
  }
})
