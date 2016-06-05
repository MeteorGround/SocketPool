Meteor.subscribe('userList')

Template.chatRoom.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('rooms');
    });
})

Template.chatRoom.helpers({
    getData() {
        let roomName = Rooms.findOne({
            "roomName": FlowRouter.getParam('roomName')
        });
        roomName['cleanRoom'] = roomName['roomName'].split('-').join(' ')

        if(Meteor.userId()){ 
          if (roomName.connectedUsers.indexOf(Meteor.user().username) === -1) {
              Rooms.update(Rooms.findOne({
                  "roomName": FlowRouter.getParam('roomName')
              })._id, {
                  $push: {
                      connectedUsers: Meteor.user().username
                  }
              });
          }
        }
        return roomName;
    },
    isLogged() {
        let roomName = Rooms.findOne({
            "roomName": FlowRouter.getParam('roomName')
        });
        return !!Meteor.user() && (roomName.bannedUser.indexOf(Meteor.userId()) == -1)
    },
    display() {
        let roomName = Rooms.findOne({
            "roomName": FlowRouter.getParam('roomName')
        });
        return (roomName.voteState.state == 'on') ? true : false
    }
})

Template.chatRoom.events({
    'click .yes': function(e) {
        const room = Rooms.findOne({
            "roomName": FlowRouter.getParam('roomName')
        });
        if (room.voteState.roomWatchers.indexOf(Meteor.user().username) == -1) {
            Rooms.update(room._id, {
                $inc: {
                    "voteState.yes": 1
                },
                $push: {
                    "voteState.roomWatchers": Meteor.user().username
                }
            })
        }

    },
    'click .no': function(e) {
        const room = Rooms.findOne({
            "roomName": FlowRouter.getParam('roomName')
        });
        if (room.voteState.roomWatchers.indexOf(Meteor.user().username) == -1) {
            Rooms.update(room._id, {
                $inc: {
                    "voteState.no": 1
                },
                $push: {
                    "voteState.roomWatchers": Meteor.user().username
                }
            })
        }

    },
    'click .vote-kick': function(e) {
        const usersOnline = $('#users li').size(),
            kicked = this.toString();
        if (usersOnline < 3) {
            $('.ds').append('<div class="sirsir alert alert-warning">Rah atbi maymknch tkcik ok by bb.</div>');
            setTimeout(function() {
                $('.sirsir').remove();
            }, 2000)
        } else {
            const room = Rooms.findOne({
                "roomName": FlowRouter.getParam('roomName')
            });
            if (room.voteState.state === "off") {

                Rooms.update(room._id, {
                    $set: {
                        voteState: {
                            state: 'on',
                            yes: 0,
                            no: 0,
                            kicked: this.toString(),
                            roomWatchers: []
                        }
                    }
                })
                setTimeout(function() {
                    const room = Rooms.findOne({
                        "roomName": FlowRouter.getParam('roomName')
                    });
                    if (room.voteState.yes > room.voteState.no) { // HI bchwiya bb li zarbo mato.
                        // do stuff
                        let idKicked = Meteor.users.findOne({
                            'username': kicked
                        })._id
                        Rooms.update(room._id, {
                            $push: {
                                bannedUser: idKicked

                            }
                        });
                    } else {
                        console.log("No bb mera okhra");
                    }
                    Rooms.update(room._id, {
                        $set: {
                            voteState: {
                                state: 'off',
                                yes: 0,
                                no: 0,
                                kicked: '',
                                roomWatchers: []
                            }
                        }
                    });
                }, 8000);
            } else {
                $('.ds').append('<div class="sirsir alert alert-warning">Another vote already running.</div>');
                setTimeout(function() {
                    $('.sirsir').remove();
                }, 2000)
            }
        }
    },
    'submit #messageForm': function(e) {
        e.preventDefault();
        let $message = $('#message');
        const roomName = $('#roomName').text().split(' ').join('-');
        Rooms.update(Rooms.findOne({
            "roomName": roomName
        })._id, {
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
