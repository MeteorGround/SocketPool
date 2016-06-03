Meteor.subscribe('rooms');

Template.chatRoom.helpers({
  getData(){
    let roomName = Rooms.find({"roomName": FlowRouter.getParam('roomName')}).fetch();
    roomName.map((index) =>  index.cleanRoom = index["roomName"].split('-').join(' '));
    return roomName;
  },
  getMsg(){
    let getMsg = Rooms.find({"roomName": FlowRouter.getParam('roomName')}).fetch();
    return "sdds"
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
