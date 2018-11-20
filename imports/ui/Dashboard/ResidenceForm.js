import {Meteor} from 'meteor/meteor';
import React from 'react';
import Select from 'react-select';
import moment from 'moment';

import {Tracker} from 'meteor/tracker';

import {Sensors} from '../../api/Sensors';
import {Houses} from '../../api/Houses';

export default class ResidenceForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      stayOpen: false,
      disabled: false,
      Type:'',
      NumSensors:'0',
      SensorsName:[],
      IDSensors:[],
      IDLocation:[],
      SensorsOp:[],
      UsersOp:[],
      Client:''
    }
  }

  getFiltersArray(mg,op){
    let MagArray=[];
    let cont=0;
    if(mg){
      mg.map((data)=> {
        if(op){
          MagArray[cont] = {value:data.Id_Sensor,label:data.Type+" id:"+data.Id_Sensor,selected:false};
        }else{
          MagArray[cont] = {value:data._id,label:data.username,selected:false};
        }
        cont++;
      });
    }
    return MagArray;
  }

  componentDidMount(){
    this.ResidenceFormTracker = Tracker.autorun(()=>{
      Meteor.subscribe('HousesPublisher');
      let SensorsSub = Meteor.subscribe('SensorsPublish');
      Meteor.subscribe('usersList');
      if(SensorsSub.ready()){
        let SensorsInfo;
        let Id = this.props.match.params.id;
        let users = Meteor.users.find({roles:'Client'}).fetch();
        if(Id != '0'){
          let SensorsInfo = Sensors.find({Id_House:Id}).fetch();
          let HouseDetails = Houses.findOne({_id:Id});
          let SensorsName = [];
          let IDSensors = [];
          let IDLocation = [];
          let Type = {value:HouseDetails.Type,label:HouseDetails.Type,selected:true}
          if(HouseDetails.Id_Client){
            let ClientDetails = Meteor.users.findOne({_id:HouseDetails.Id_Client});
            let Client = {value:ClientDetails._id,label:ClientDetails.username,selected:true}
            this.setState({Client});
          }
          for (var i = 0; i < SensorsInfo.length; i++) {
            SensorsName[i] = SensorsInfo[i].Name;
            IDSensors[i] = {value:SensorsInfo[i].Id_Sensor,label:SensorsInfo[i].Type+" id:"+SensorsInfo[i].Id_Sensor,selected:true}
            IDLocation[i] = {value:SensorsInfo[i].Location,label:SensorsInfo[i].Location,selected:true}
          }
          this.setState({name:HouseDetails.Name,Type:Type,NumSensors:SensorsInfo.length,SensorsName,IDSensors,IDLocation})
        }
        SensorsInfo = Sensors.find({}).fetch();
        let SensorsOp = this.getFiltersArray(SensorsInfo,true);
        let UsersOp = this.getFiltersArray(users,false);
        this.setState({SensorsOp,UsersOp});
      }
    });
  }
  componentWillUnmount(){
    this.ResidenceFormTracker.stop();
  }

  onNameChange(e){
    this.setState({
      name:e.target.value
    });
  }
  onTypeChange(value){
    this.setState({ Type:value });
  }

  onUserChange(value){
    this.setState({ Client:value });
  }

  onNumSensorsChange(e){
    this.setState({NumSensors:e.target.value});
  }

  onSensorNameChange(op,e){
    let SensorsName = this.state.SensorsName;
    SensorsName[op] = e.target.value;
    this.setState({SensorsName});
  }

  onOpSensorChange(op,value){
    console.log(op);
    console.log(value);
    let IDSensors = this.state.IDSensors;
    IDSensors[op] = value;
    this.setState({IDSensors});
  }

  onOpLocationChange(op,value){
    let IDLocation = this.state.IDLocation;
    IDLocation[op] = value;
    this.setState({IDLocation});
  }

  onSaveResidence(e){
    e.preventDefault();
    if(this.state.name != '' && this.state.Type != ''){
      try{
        if(this.props.match.params.id != 0){
          let Id = this.props.match.params.id;
          Meteor.call('houses.update',Id,this.state.name,this.state.Type.value,'Active',Date.now());
          for (var i = 0; i < this.state.NumSensors; i++) {
            Meteor.call('sensors.assignHousing',this.state.IDSensors[i].value,this.state.SensorsName[i],this.state.IDLocation[i].value,Id)
          }
          if(this.state.Client != ''){
            Meteor.call('houses.assignClient',Id,this.state.Client.value)
          }
          alert('Updated');
        }else{
          Meteor.call('houses.insert',this.state.name,this.state.Type.value,'Active',Date.now());
          let HouseDetail = Houses.find({},{sort:{date:-1},limit:1}).fetch();
          for (var i = 0; i < this.state.NumSensors; i++) {
            Meteor.call('sensors.assignHousing',this.state.IDSensors[i].value,this.state.SensorsName[i],this.state.IDLocation[i].value,HouseDetail[0]._id)
          }
          if(this.state.Client != ''){

            Meteor.call('houses.assignClient',HouseDetail[0]._id,this.state.Client.value)
          }
          alert('Saved');
        }
        this.setState({name:'',Type:'',NumSensors:'0',SensorsName:[],IDSensors:[],IDLocation:[],Client:''})
      }catch(e){
        alert('Error: '+e);
      }
    }else{
      alert('Please complete the mandatory fields');
    }
  }

  renderSensorsFields(){
    let options = [
      { value: 'Bedroom', label: 'Bedroom' },
      { value: 'Living Room', label: 'Living Room' },
      { value: 'Kitchen', label: 'Kitchen' },
      { value: 'Bathroom', label: 'Bathroom' },
      { value: 'Laundry', label: 'Laundry' },
    ];
    let fields=[];
    for (var i = 0; i < this.state.NumSensors; i++) {
      fields[i] =  (
        <div key={i}>
          <h4>{'Sensor '+(i+1)}</h4>

          <div className="form-group">
              <label className="col-md-12">Name:</label>
              <div className="col-md-6">
                  <input type="text" className="form-control form-control-line" value={this.state.SensorsName[i]} onChange={this.onSensorNameChange.bind(this,i)}/>
              </div>
          </div>
          <div className="row" style={{marginBottom:'25px'}}>
              <div className="col-md-4">
                <div className="row row-without-margin">
                  <label className="">Select Sensor</label>
                </div>
                <Select id="sltAdType" simpleValue closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled} options={this.state.SensorsOp} onChange={this.onOpSensorChange.bind(this,i)} value={this.state.IDSensors[i]}/>
              </div>
              <div className="col-md-4">
                <div className="row row-without-margin">
                  <label className="">Location</label>
                </div>
                <Select id="sltAdType" simpleValue closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled} options={options} onChange={this.onOpLocationChange.bind(this,i)} value={this.state.IDLocation[i]}/>
              </div>
          </div>
        </div>
      );
    }
    return fields;
  }

  render(){
    let options = [
      { value: 'Holiday House', label: 'Holiday House' },
      { value: 'Residential House', label: 'Residential House' },
    ];
    return(
      <div className="card">
        <div className="card-block input_space_static">
            <form className="form-horizontal form-material">
              <div className="form-group">
                  <label className="col-md-12">Name:</label>
                  <div className="col-md-6">
                      <input type="text" className="form-control form-control-line" value={this.state.name} onChange={this.onNameChange.bind(this)}/>
                  </div>
              </div>
              <div className="row" style={{marginBottom:'25px'}}>
                  <div className="col-md-4">
                    <div className="row row-without-margin">
                      <label className="">Type</label>
                    </div>
                    <Select id="sltAdType" simpleValue disabled={this.state.disabled} value={this.state.Type} onChange={this.onTypeChange.bind(this)} options={options}l/>
                  </div>
                  <div className="col-md-4">
                    <div className="row row-without-margin">
                      <label className="">How many sensors will you register?</label>
                    </div>
                    <input type="number" className="form-control form-control-line" value={this.state.NumSensors} onChange={this.onNumSensorsChange.bind(this)}/>
                  </div>
              </div>
              <div className="row" style={{marginBottom:'25px'}}>
                  <div className="col-md-4">
                    <div className="row row-without-margin">
                      <label className="">Assign Client:</label>
                    </div>
                    <Select id="sltAdType" simpleValue disabled={this.state.disabled} value={this.state.Client} onChange={this.onUserChange.bind(this)} options={this.state.UsersOp}l/>
                  </div>
              </div>
              <h3>Sensors</h3>
              {this.renderSensorsFields()}
              <input type='submit' onClick={this.onSaveResidence.bind(this)} className='btn btn-info filter-btn' name='btn_submit' value='Save'/>
            </form>
        </div>
      </div>
    );
  }
}
