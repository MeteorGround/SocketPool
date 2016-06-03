Meteor.publish('topics', function() {
  return Topics.find();
})

Meteor.publish('rooms', function() {
  return Rooms.find();
})
