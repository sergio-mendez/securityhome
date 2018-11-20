// import moment from 'moment';
//
// import { Sensors } from '../../imports/api/Sensors';
// import { SensorReport } from '../../imports/api/SensorReport';
//
// if(Meteor.isServer) {
//   // Sensors services to insert,update,delete or get, this incluse get all the sersors
//
//   Router.route('/sensors',{where: 'server'})
//     .get(function(){
//         var response = Sensors.find().fetch();
//         this.response.setHeader('Content-Type','application/json');
//         this.response.end(JSON.stringify(response));
//     })
//     .post(function(){
//         var response;
//         if(this.request.body.Id_Sensor === undefined || this.request.body.Name === undefined || this.request.body.Type === undefined || this.request.body.State === undefined || this.request.body.Location === undefined) {
//             response = {"error" : true,"message" : "invalid data"};
//         }else{
//           let data = this.request.body;
//           Meteor.call('sensors.insert',data.Id_Sensor,data.Name,data.Type,data.State,data.Location);
//           response = {"error" : false,"message" : "Sensor added."}
//         }
//         this.response.setHeader('Content-Type','application/json');
//         this.response.end(JSON.stringify(response));
//     });
//   Router.route('/sensor/:id',{where: 'server'})
//     .get(function(){
//         var response;
//         if(this.params.id !== undefined) {
//             var data = Sensors.find({Id_Sensor : this.params.id}).fetch();
//             if(data.length > 0) {
//                 response = data
//             } else {
//                 response = {"error" : true,"message" : "Sensor not found."}
//             }
//         }
//         this.response.setHeader('Content-Type','application/json');
//         this.response.end(JSON.stringify(response));
//     })
//     .put(function(){
//       var response;
//       if(this.params.id !== undefined) {
//           var data = Sensors.find({Id_Sensor : this.params.id}).fetch();
//           if(data.length > 0) {
//             let requestData = this.request.body;
//             Meteor.call('sensors.updateAll',data[0]._id,requestData.Id_Sensor,requestData.Name,requestData.Type,requestData.State,requestData.Location,(err,res)=>{
//               if(res === 1){
//                 response = {"error" : false,"message" : "Sensor information updated."}
//               }else{
//                 response = {"error" : true,"message" : "Sensor information not updated."}
//               }
//             })
//           }else {
//             response = {"error" : true,"message" : "Sensor not found."
//           }
//         }
//       }
//       this.response.setHeader('Content-Type','application/json');
//       this.response.end(JSON.stringify(response));
//     })
//     .delete(function(){
//         var response;
//         if(this.params.id !== undefined) {
//             var data = User.find({Id_Sensor : this.params.id}).fetch();
//             if(data.length >  0) {
//               Meteor.call('sensors.remove',data[0]._id,(err,res)=>{
//                 if(res === 1){
//                   response = {"error" : false,"message" : "User deleted."};
//                 }else{
//                   response = {"error" : true,"message" : "User not deleted."};
//                 }
//               });
//             }else{
//               response = {"error" : true,"message" : "User not found."}
//             }
//         }
//         this.response.setHeader('Content-Type','application/json');
//         this.response.end(JSON.stringify(response));
//     });
//   Router.route('/sensors/report',{where: 'server'})
//     .get(function(){
//         var response = SensorReport.find().fetch();
//         this.response.setHeader('Content-Type','application/json');
//         this.response.end(JSON.stringify(response));
//     })
//     .post(function(){
//         var response;
//         if(this.request.body.Id_Sensor === undefined || this.request.body.Report === undefined ) {
//             response = {"error" : true,"message" : "invalid data"};
//         }else{
//           let today = moment().format('YYYY-MM-DD');
//           let hour = moment().format('HH:mm:ss');
//           let data = this.request.body;
//           Meteor.call('sensorReport.insert',data.Id_Sensor,data.Report,today,hour);
//           response = {"error" : false,"message" : "Sensor Report added."}
//         }
//         this.response.setHeader('Content-Type','application/json');
//         this.response.end(JSON.stringify(response));
//     });
//
// }
