import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import { Panel,Label,Button,Row,Grid,Col,Image } from 'react-bootstrap';

import {SensorReport} from '../../api/SensorReport';
import {Sensors} from '../../api/Sensors';

export default class SensorItem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      open: false,
      SensorsDetails:[],
      Alerts:0,
      Warnings:0,
      Failures:0,
      status:'success',
    }
  }
  componentDidMount(){
    this.SensorsItemTracker = Tracker.autorun(()=>{
      let sensorReSub = Meteor.subscribe('SensorReportPublish');
      Meteor.subscribe('SensorsPublish');
      let Alerts=0;
      let Warnings=0;
      let Failures=0;
      let status='success';
      if(sensorReSub.ready()){
        let SensorsDetails = Sensors.find({Id_House:this.props._id}).fetch();
        SensorsDetails.map((d)=>{
          let lastReport = SensorReport.findOne({Id_Sensor:d.Id_Sensor},{sort:{Date_t:-1,Hour:-1},limit:1});
          if(lastReport.Report == 'ALERT' || lastReport.Report == 'FAILURE'){
            status = 'danger';
          }else if(lastReport.Report == 'WARNING' && status != ''){
            status = 'warning';
          }
          let reports = SensorReport.find({Id_Sensor:d.Id_Sensor}).fetch();
          reports.map((reportDetail)=>{
            if(reportDetail.Report == 'ALERT'){
              Alerts++;
            }else if(reportDetail.Report == 'WARNING'){
              Warnings++;
            }else if(reportDetail.Report == 'FAILURE'){
              Failures++;
            }
          });
        });
        this.setState({SensorsDetails,Alerts,Warnings,Failures,status});
      }
    });
  }
  componentWillUnmount(){
    this.SensorsItemTracker.stop();
  }
  renderSensorDetail(){
    return this.state.SensorsDetails.map((d)=>{
      let lastSensorReport = SensorReport.findOne({Id_Sensor:d.Id_Sensor},{sort:{Date_t:-1,Hour:-1},limit:1});
      let lastUpdate = '--';
      let Hour = '--';
      let Report = '--';
      if(lastSensorReport){
        lastUpdate = lastSensorReport.Date_t;
        Hour = lastSensorReport.Hour;
        Report = lastSensorReport.Report;
      }
      return(
        <Col xs={3} sm={3} md={3} key={d._id}>
          <Row>
            <Col xs={4} sm={4} md={4}>
              <Image src="https://image.flaticon.com/icons/png/512/16/16995.png" style={{'width':'75px','height':'75px'}} />
            </Col>
            <Col xs={8} sm={8} md={8}>
              <p>Sensor Name: {d.Name}</p>
              <p>Location: {d.Location}</p>
              <p>Status: {Report}</p>
              <p>Last Update: {lastUpdate}</p>
              <p>Hour: {Hour}</p>
            </Col>
          </Row>
        </Col>
      );
    });
  }
  render(){
    return(
      <div>
        <Panel id="collapsible-panel-example-2" defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle>
              <Label bsStyle={this.state.status} style={{'marginRight':'5px'}}>Status</Label>
              {this.props.Name}
            </Panel.Title>
          </Panel.Heading>
          <Panel.Collapse>
            <Panel.Body>
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 pacing_detail">
                  <center><h4>{this.state.Alerts}</h4></center>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 pacing_detail">
                  <center><h4>{this.state.Warnings}</h4></center>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 pacing_detail">
                  <center><h4>{this.state.Failures}</h4></center>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-2 pacing_detail">
                  <center><h4>{this.state.SensorsDetails.length}</h4></center>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-1 pacing_detail">
                  <Button onClick={() => this.setState({ open: !this.state.open })}>
                    <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
                  </Button>
                </div>
              </div>
              <div className="camp-enun"></div>
              <div className="row">
                <div className="col-xs-3 col-sm-3 col-md-3 pacing_detail">
                  <center><h4>Total Alerts</h4></center>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 pacing_detail">
                  <center><h4>Total warnings</h4></center>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 pacing_detail">
                  <center><h4>Total Failures</h4></center>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-2 pacing_detail">
                  <center><h4>Total Sensors</h4></center>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-1 pacing_detail">
                </div>
              </div>

              <br />
              <Panel id="collapsible-panel-example-1" expanded={this.state.open} onToggle={()=>{}}>
                <Panel.Collapse>
                  <Panel.Body>
                    <Row>
                      {this.renderSensorDetail()}
                    </Row>
                  </Panel.Body>
                </Panel.Collapse>
              </Panel>

            </Panel.Body>
          </Panel.Collapse>
        </Panel>
      </div>
    );
  }
}
