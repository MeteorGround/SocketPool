Rooms = new Mongo.Collection('rooms')

Rooms.allow({
  insert: function(userId, doc){
    return !!userId;
  }
});
