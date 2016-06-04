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
    triggersEnter: [function(context) {}],
    action() {
        BlazeLayout.render('layout', {
            content: 'chatRoom'
        })
    },
    triggersExit: [function(context) {
        // Rooms.insert({
        //     'topicName': 'test'
        // })
        Rooms.update(Rooms.findOne({
            "roomName": FlowRouter.getParam('roomName')
        })._id, {
            $pull:  {
                connectedUsers: Meteor.user().username
            }
        });
    }]
})
