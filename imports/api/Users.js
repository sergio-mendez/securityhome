import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

if(Meteor.isServer){
  Meteor.publish('usersList', function(){
    return Meteor.users.find({});
  });
  Meteor.users.allow({
    update: function(userId, doc, fields, modifier){
      if (userId && doc._id === userId) {
        console.log("user allowed to modify own account!");
        return true;
      }else if(Roles.userIsInRole( userId,'Administrator')){
        return true;
      }
    },
    insert: function(userId, doc) {
      if (userId && doc._id === userId) {
        console.log("user allowed to modify own account!");
        return userId && doc.owner === userId;
        return true;
      }else if(Roles.userIsInRole( userId,'Administrator')){
        return true;
      }
    },
  })
}

Meteor.methods({
  'user.changePassword'(userId,Password){
    Accounts.setPassword(userId, Password);
  }
});
