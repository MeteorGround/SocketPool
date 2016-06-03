Roomdata = new Mongo.Collection('roomdata')

Roomdata.allow({
  insert: function(userId, doc){
    return !!userId;
  }
});
