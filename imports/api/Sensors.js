import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Sensors = new Mongo.Collection('Sensors');

if(Meteor.isServer){
  Meteor.publish('SensorsPublish',function(){
    return Sensors.find({});
  })
}

Meteor.methods({
  'sensors.insert'(Id_Sensor,Type,State){
    Sensors.insert({Id_Sensor,Type,State});
  },
  'sensors.insertAll'(Id_Sensor,Name,Type,State){
    Sensors.insert({Id_Sensor,Name,Type,State});
  },
  'sensors.updateAll'(_id,Id_Sensor,Name,Type,State){
    return Sensors.update({_id},{$set:{Id_Sensor,Name,Type,State}});
  },
  'sensors.assignHousing'(Id_Sensor,Name,Location,Id_House){
    return Sensors.update({Id_Sensor},{$set:{Name,Location,Id_House}});
  },
  'sensors.updateState'(_id,State){
    Sensors.update({_id},{$set:{State}});
  },
  'sensors.remove'(_id){
    Sensors.remove(_id);
  }
});
