FlowRouter.route('/', {
    action() {
        BlazeLayout.render('layout', {
            content: 'home'
        })
    }
})

FlowRouter.route('/topic/:topicName', {
    action() {
        BlazeLayout.render('layout', {
            content: 'room'
        })
    }
})

FlowRouter.route('/:roomName', {
    action() {
        BlazeLayout.render('layout', {
            content: 'chatRoom'
        })
    },
    triggersExit: [function(context) {
        Rooms.update(  Rooms.findOne({
            "roomName": FlowRouter.getParam('roomName')
        })._id, {
            $pull:  {
                connectedUsers: Meteor.user().username
            }
        });
        if(Rooms.findOne({"roomName": FlowRouter.getParam('roomName')}).connectedUsers.length == 0){
          Rooms.remove( Rooms.findOne({
              "roomName": FlowRouter.getParam('roomName')
          })._id)
        }
    }]
})
