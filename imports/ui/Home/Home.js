import React from 'react';
import { Alert } from 'react-bootstrap';
import { Session } from 'meteor/session';

export default class Home extends React.Component{
  componentDidMount(){
    Session.set({link_home:'active',link_dash:'',link_profile:'',link_users:''});
  }
  render(){
    return(
      <div>
        <div className="row page-titles">
            <div className="col-md-5 col-8 align-self-center">
                <h3 className="text-themecolor">Home</h3>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                </ol>
            </div>
            <div className="col-md-7 col-4 align-self-center">
            </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <h3 className="card-title"></h3>
              <div className="card-block">
                <div className='row'>
                  <div className='col-md-12' style={{marginTop:'-2%'}}>
                    <h1>Welcome to SecurityHome</h1>
                    {/*<h3>Contact with the salesperson to be assigned to a residence and get access to the dashboard.</h3>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='card'>
              <h3 className="card-title"></h3>
              <div className="card-block">
                <div className='row'>
                  <div className='col-md-12' style={{marginTop:'-2%'}}>
                    <h3>Recent Reports</h3>
                    <Alert bsStyle="warning">
                      <span className="glyphicon glyphicon-alert" aria-hidden="true"></span>
                      <strong> Some sensors are showing faults!</strong>
                    </Alert>
                    <Alert bsStyle="danger">
                      <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                      <strong> One of the sensors stopped working!</strong>
                    </Alert>
                    {/*<h3>Contact with the salesperson to be assigned to a residence and get access to the dashboard.</h3>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
