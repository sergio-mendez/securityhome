import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const SensorReport = new Mongo.Collection('SensorReport');

if(Meteor.isServer){
  Meteor.publish('SensorReportPublish',function(){
    return SensorReport.find({});
  });
}

Meteor.methods({
  'sensorReport.insert'(Id_Sensor,Report,Date_t,Hour){
    SensorReport.insert({Id_Sensor,Report,Date_t,Hour});
  },
  'sensorReport.update'(_id,Report,Date_t,Hour){
    SensorReport.update({Id_Sensor,Report,Date_t,Hour});
  },
  'sensorReport.delete'(_id){
    SensorReport.remove({_id});
  },
  'sensorReport.getById'(_id){
    return SensorReport.find({_id});
  }
});
