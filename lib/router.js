FlowRouter.route('/', {
    action: function() {
        return BlazeLayout.render('layout', {
            content: 'home'
        })
    }
})

FlowRouter.route('/topic/:topic', {
    action: function() {
        return BlazeLayout.render('layout', {
            content: 'topic'
        })
    }
})

FlowRouter.route('/room/:topicLabel/:roomID', {
    action: function() {
        return BlazeLayout.render('layout', {
            content: 'room'
        })
    }
})
