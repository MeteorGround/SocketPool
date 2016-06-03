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
