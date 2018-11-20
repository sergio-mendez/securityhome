import {Meteor} from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import React from 'react';
import { Route,Link } from 'react-router-dom';
import { Session } from 'meteor/session';
import { Row } from 'react-bootstrap';

import SensorsDashbaord from './SensorsDashboard';
import ResidencesList from './ResidencesList';
import ResidenceForm from './ResidenceForm';
import SensorsManagement from './SensorsManagement';
import SensorForm from './SensorForm';

export default class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      rolValidation:false
    }
  }
  componentDidMount(){
    Session.set({link_home:'',link_dash:'active',link_profile:'',link_users:''});
    this.dashboardTracker = Tracker.autorun(()=>{
      let userId = Meteor.userId();
      Meteor.setTimeout(()=>{
        let rolValidation = Roles.userIsInRole(userId,'Administrator');
        if(rolValidation){
          this.setState({rolValidation});
        }
      },1000);
    });
  }
  componentWillUnmount(){
    this.dashboardTracker.stop();
  }
  renderAdminOptions(){
    let menuOptions;
    if(this.state.rolValidation){
      menuOptions = (
        <div>
          <div className='col-xs-4 col-sm-3 col-md-3 input_space campaign_button'>
            <Link ref='lMUpdate' className={'btn btn-success'} to={{ pathname: '/menu/dashboard/residences' }} >
              <i className="mdi mdi-gauge">
                <span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
              </i>
              <span className="hide-menu"> Residences Management</span>
            </Link>
          </div>
          <div className='col-xs-4 col-sm-3 col-md-2 input_space campaign_button'>
            <Link ref='lMUpdate' className={'btn btn-success'} to={{ pathname: '/menu/dashboard/sensors' }} >
              <i className="mdi mdi-gauge">
                <span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
              </i>
              <span className="hide-menu"> Sensors Management</span>
            </Link>
          </div>
        </div>
      )
    }
    return menuOptions;
  }
  render(){
    return(
      <div>
        <div className="row page-titles">
            <div className="col-md-5 col-8 align-self-center">
                <h3 className="text-themecolor">Dashboard</h3>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
            </div>
            <div className="col-md-7 col-4 align-self-center">
            </div>
        </div>
        <div className="row">
          <div className='card'>
            <div className='row'>
              <div className='col-xs-4 col-sm-3 col-md-2 input_space campaign_button'>
                <Link ref='lMUpdate' className={'btn btn-success'} to={{ pathname: '/menu/dashboard/direct' }} >
                  <i className="mdi mdi-gauge">
                    <span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
                  </i>
                  <span className="hide-menu"> Direct Dashboard</span>
                </Link>
              </div>
              {this.renderAdminOptions()}
            </div>
          </div>
        </div>
        {/* Dashboard content */}
        <Route path='/menu/dashboard/direct' component={SensorsDashbaord}/>
        <Row>
          <Route exact path='/menu/dashboard/residences' component={ResidencesList}/>
        </Row>
        <Route path='/menu/dashboard/residences/add/:id' component={ResidenceForm}/>
        <Route path='/menu/dashboard/sensors/add/:id' component={SensorForm}/>
        <Route exact path='/menu/dashboard/sensors' component={SensorsManagement}/>
      </div>
    );
  }
}
