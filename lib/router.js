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
        const iDlino = Rooms.findOne({
            "roomName": FlowRouter.getParam('roomName')
        })._id;
        Rooms.update( iDlino, {
            $pull:  {
                connectedUsers: Meteor.user().username
            }
        });
        if(Rooms.findOne({"roomName": FlowRouter.getParam('roomName')}).connectedUsers.length == 0){
          Rooms.remove(iDlino)
        }
    }]
})
