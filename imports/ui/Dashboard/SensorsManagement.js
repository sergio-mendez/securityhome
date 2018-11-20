import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import { Link } from 'react-router-dom';

import {Sensors} from '../../api/Sensors';

export default class SensorsManagement extends React.Component{
  constructor(props){
    super(props);
    this.state={
      SensorsDetails:[],
    }
  }
  componentDidMount(){
    this.SensorsManagementTracker = Tracker.autorun(()=>{
      Meteor.subscribe('SensorsPublish');
      let SensorsDetails = Sensors.find({},{sort:{Id_Sensor:1}}).fetch();
      this.setState({SensorsDetails});
    })
  }
  componentWillUnmount(){
    this.SensorsManagementTracker.stop();
  }
  renderSensorsList(){
    return this.state.SensorsDetails.map((detail)=>{
      return(
        <tr key={detail._id}>
          <td><center>{detail.Id_Sensor}</center></td>
          <td><center>{detail.Name}</center></td>
          <td><center>{detail.Type}</center></td>
          <td><center>{detail.State}</center></td>
          <td>
            <center>
              <Link ref='lHome' className={'btn btn-primary'} to={{ pathname: '/menu/dashboard/sensors/add/'+detail._id }}>
                <span className="glyphicon glyphicon-edit" aria-hidden="true"></span>
              </Link>
            </center>
          </td>
        </tr>
      );
    });
  }
  render(){
    return(
      <div className="col-lg-12">
          <div className="card">
              <div className="card-block">
                  <div className="row">
                      <div className="col-xs-1">
                          <span className="round">S</span> <span className="profile-status away pull-right"></span>
                      </div>
                      <div className="col-xs-1" style={{marginLeft:'-4%'}}>
                          <h4 className="card-title">Sensors. </h4>
                      </div>
                      <div className="col-xs-1" >
                        <Link ref='lMUpdate' className={'btn btn-default'} to={{ pathname: '/menu/dashboard/sensors/add/0' }} >
                          <i className="mdi mdi-gauge">
                            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                          </i>
                        </Link>
                      </div>
                  </div>
                  <div className="table-responsive">
                      <table className="table">
                          <thead>
                              <tr>
                                  <th><center>Id Sensor</center></th>
                                  <th><center>Name</center></th>
                                  <th><center>Type</center></th>
                                  <th><center>State</center></th>
                              </tr>
                          </thead>
                          <tbody>
                            {this.renderSensorsList()}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}
