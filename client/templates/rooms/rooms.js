// Meteor.subscribe('rooms');

Template.room.onCreated(function(){
  var self = this;
  self.autorun(function(){
    self.subscribe('rooms');
  })
})

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
    if(Rooms.findOne({"roomName": roomName.split(' ').join('-')})){
      alert('Already Added bb, sir thawa.')
    }else{
      Rooms.insert({"roomName": roomName.split(' ').join('-'), "roomTopic": FlowRouter.getParam('topicName'), bannedUser: [],connectedUsers: [], "voteState": {state: "off", yes: 0, no: 0, kicked: '', roomWatchers: []}})
      FlowRouter.go('/'+ roomName.split(' ').join('-'));
    }
  }
})
