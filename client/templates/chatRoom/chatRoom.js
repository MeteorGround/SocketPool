// Meteor.subscribe('rooms');

Template.chatRoom.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('rooms');
  })
})

Template.chatRoom.helpers({
  getData(){
    let roomName = Rooms.findOne({"roomName": FlowRouter.getParam('roomName')});
    // roomName.map((index) =>  index.cleanRoom = index["roomName"].split('-').join(' '));
    // if(roomName){
      roomName['cleanRoom'] = roomName['roomName'].split('-').join(' ')
      return roomName;
    // }
  }
})

Template.chatRoom.events({
  'submit #messageForm': function(e){
    e.preventDefault();
    let $message = $('#message');
    const roomName = $('#roomName').text().split(' ').join('-');
    Rooms.update(Rooms.findOne({"roomName": roomName})._id,{
      $push: {
        roomMsg: {
          date: moment().format('MM-DD-YYYY, h:mm:ss'),
          sender: Meteor.user().username,
          message: $message.val()
        }
      }
    })
  }
})
