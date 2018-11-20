import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Houses = new Mongo.Collection('Houses');

if(Meteor.isServer){
  Meteor.publish('HousesPublisher',function(){
    return Houses.find({});
  })
}

Meteor.methods({
  'houses.insert'(Name,Type,State,date){
    Houses.insert({Name,Type,State,date});
  },
  'houses.update'(_id,Name,Type,State,date){
    Houses.update({_id},{$set:{Name,Type,State,date}});
  },
  'houses.assignClient'(_id,Id_Client){
    return Houses.update({_id},{$set:{Id_Client}});
  },
  'houses.delete'(){
    Houses.remove({_id});
  },
  'houses.getById'(_id){
    return Houses.find({_id});
  }
})
