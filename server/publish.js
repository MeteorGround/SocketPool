Meteor.publish('topics', function() {
  return Topics.find();
})

Meteor.publish('rooms', function() {
  return Rooms.find();
})

Meteor.publish('roomdata', function() {
  return Roomdata.find();
})
