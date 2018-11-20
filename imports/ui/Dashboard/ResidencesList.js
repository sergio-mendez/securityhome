import React from 'react';
import { Link } from 'react-router-dom';
import {Tracker} from 'meteor/tracker';
import { Button } from 'react-bootstrap';
import {Houses} from '../../api/Houses';
import {Sensors} from '../../api/Sensors';

export default class ResidencesList extends React.Component{
  constructor(props){
    super(props);
    this.state={
      'HousesList':[]
    }
  }
  componentDidMount(){
    this.ResidencesListTracker = Tracker.autorun(()=>{
      Meteor.subscribe('HousesPublisher');
      Meteor.subscribe('SensorsPublish');
      Meteor.subscribe('usersList');
      let HousesList = Houses.find({}).fetch();
      this.setState({HousesList});
    });
  }
  componentWillUnmount(){
    this.ResidencesListTracker.stop();
  }

  renderHousesList(){
    return this.state.HousesList.map((detail)=>{
      let sensorsCount = Sensors.find({Id_House:detail._id}).fetch();
      let ClientDetails = Meteor.users.findOne({_id:detail.Id_Client});
      let clientName = 'Not Assigned'
      if(ClientDetails){
        clientName = ClientDetails.username;
      }
      return(
        <tr key={detail._id}>
            <td><center>{detail.Name}</center></td>
            <td><center>{detail.Type}</center></td>
            <td><center>{sensorsCount.length}</center></td>
            <td><center>{clientName}</center></td>
            <td>
              <center>
                <Link ref='lHome' className={'btn btn-primary'} to={{ pathname: '/menu/dashboard/residences/add/'+detail._id }}>
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
                          <span className="round">R</span> <span className="profile-status away pull-right"></span>
                      </div>
                      <div className="col-xs-1" style={{marginLeft:'-4%'}}>
                          <h4 className="card-title">Residences. </h4>
                      </div>
                      <div className="col-xs-1" >
                        <Link ref='lMUpdate' className={'btn btn-default'} to={{ pathname: '/menu/dashboard/residences/add/0' }} >
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
                                  <th><center>Name</center></th>
                                  <th><center>Type</center></th>
                                  <th><center>Sensors</center></th>
                                  <th><center>Client</center></th>
                                  <th><center>More</center></th>
                              </tr>
                          </thead>
                          <tbody>
                            {this.renderHousesList()}
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}
