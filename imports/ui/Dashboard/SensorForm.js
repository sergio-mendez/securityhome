import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import Select from 'react-select';

import {Sensors} from '../../api/Sensors';

export default class SensorForm extends React.Component{
  constructor(props){
    super(props);
    this.state={
      SensorDetails:[],
      name:'',
      Type:'',
      State:'',
      Id:'',
      Id_Sensor:'',
    }
  }
  componentDidMount(){
    this.SensorsForm = Tracker.autorun(()=>{
      let SubReady = Meteor.subscribe('SensorsPublish');
      if(SubReady.ready()){
        let Id = this.props.match.params.id;
        if(Id != 0){
          let SensorDetails = Sensors.findOne({_id:Id});
          let Type = {'value':SensorDetails.Type,label:SensorDetails.Type,'selected':true}
          let State = {'value':SensorDetails.State,label:SensorDetails.State,'selected':true}
          this.setState({SensorDetails,name:SensorDetails.Name,Id_Sensor:SensorDetails.Id_Sensor,Type,State,Id})
        }else{

        }
      }
    });
  }
  componentWillUnmount(){
    this.SensorsForm.stop();
  }

  onNameChange(e){
    this.setState({
      name:e.target.value
    });
  }
  onId_SensorChange(e){
    this.setState({
      Id_Sensor:e.target.value
    });
  }
  onTypeChange(value){
    this.setState({ Type:value });
  }
  onStateChange(value){
    this.setState({ State:value });
  }
  onSaveSensor(e){
    e.preventDefault();
    if(this.state.name != '' && this.state.Type.value != '' && this.state.Id_Sensor != ''){
      try{
        if(this.state.Id != 0){
          Meteor.call('sensors.updateAll',this.state.Id,this.state.Id_Sensor,this.state.name,this.state.Type.value,this.state.State.value);
          alert('Updated');
        }else{
          Meteor.call('sensors.insertAll',this.state.Id_Sensor,this.state.name,this.state.Type.value,this.state.State.value);
          alert('Saved');
        }
        this.setState({name:'',Type:'',State:'',Id_Sensor:''});
      }catch(e){
        alert('Error: '+e);
      }
    }else{
      alert('Please complete the mandatory fields');
    }
  }

  render(){
    let options = [
      { value: 'Motion Sensor', label: 'Motion Sensor' },
      { value: 'Smoke Sensor', label: 'Smoke Sensor' },
      { value: 'Optical Sensor', label: 'Optical Sensor' },
      { value: 'Thermal Sensor', label: 'Thermal Sensor' },
      { value: 'Magnetic Sensor', label: 'Magnetic Sensor' },
    ];
    let optionsState = [
      { value: 'Active', label: 'Active' },
      { value: 'Inactive', label: 'Inactive' },
    ];
    return(
      <div className="card">
        <div className="card-block input_space_static">
            <form className="form-horizontal form-material">
              <div className="form-group">
                  <label className="col-md-12">Id Sensor:</label>
                  <div className="col-md-6">
                      <input type="text" className="form-control form-control-line" value={this.state.Id_Sensor} onChange={this.onId_SensorChange.bind(this)}/>
                  </div>
              </div>
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
                      <label className="">State</label>
                    </div>
                    <Select id="sltAdType" simpleValue disabled={this.state.disabled} value={this.state.State} onChange={this.onStateChange.bind(this)} options={optionsState}l/>
                  </div>
              </div>
              <input type='submit' onClick={this.onSaveSensor.bind(this)} className='btn btn-info filter-btn' name='btn_submit' value='Save'/>
            </form>
        </div>
      </div>
    );
  }
}
