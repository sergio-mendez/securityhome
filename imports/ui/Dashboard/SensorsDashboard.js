import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import React from 'react';
import Select from 'react-select';

import SensorItem from './SensorItem';
import {Houses} from '../../api/Houses';

export default class SensorsDashbaord extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      stayOpen: false,
      disabled: false,
      TypeFil: [],
      HousesDetails:[],
      name:'',
      AdminOp:'',
    };
  }
  componentDidMount(){
    this.SensorsDashbaordTracker = Tracker.autorun(()=>{
      Meteor.subscribe('HousesPublisher');
      let userId = Meteor.userId();
      let HousesDetails = [];
      setTimeout(()=>{
        let AdminOp = Roles.userIsInRole(userId, 'Administrator');
        if(AdminOp){
          HousesDetails = Houses.find({}).fetch();
        }else if (Roles.userIsInRole(userId, 'Client')){
          HousesDetails = Houses.find({Id_Client:userId}).fetch();
        }else{
          this.props.history.push('/menu/home');
        }
        this.setState({HousesDetails,AdminOp});
      },1000);
    });
  }
  componentWillUnmount(){
    this.SensorsDashbaordTracker.stop();
  }
  renderSensorItem(){
    return this.state.HousesDetails.map((details)=>{
      return <SensorItem key={details._id} {...details}/>;
    });
  }
  onTypeChange(value){
    this.setState({ TypeFil:value });
  }
  onNameChange(e){
    this.setState({name: e.target.value})
  }
  onClickSearch(e){
    e.preventDefault();
    let HousesDetails= [];
    if(this.state.AdminOp){
      if(this.state.TypeFil.value == 'All Houses'){
        HousesDetails = Houses.find({Name:{$regex:this.state.name,$options:'i'}}).fetch();
      }else{
        HousesDetails = Houses.find({Type:this.state.TypeFil.value,Name:{$regex:this.state.name,$options:'i'}}).fetch();
      }
    }else{
      let userId = Meteor.userId();
      if(this.state.TypeFil.value == 'All Houses'){
        HousesDetails = Houses.find({Name:{$regex:this.state.name,$options:'i'},Id_Client:userId}).fetch();
      }else{
        HousesDetails = Houses.find({Type:this.state.TypeFil.value,Name:{$regex:this.state.name,$options:'i'},Id_Client:userId}).fetch();
      }
    }
    this.setState({HousesDetails});
  }
  render(){
    let options = [
      { value: 'All Houses', label: 'All Houses' },
      { value: 'Holiday House', label: 'Holiday House' },
      { value: 'Residential House', label: 'Residential House' },
    ];
    return(
      <div>
      <div className="row">
        <div className="card">
          <form className="form-inline">
              <div className="row">
                <div className="col-sm-3 col-md-3 col-lg-3 input_space">
                  <div className="row row-without-margin">
                    <label className="">Type</label>
                  </div>
                  <Select multi closeOnSelect={!this.state.stayOpen} disabled={this.state.disabled}  placeholder="None selected" onChange={this.onTypeChange.bind(this)} options={options} value={this.state.TypeFil}/>
                </div>
                <div className="col-xs-11 col-sm-7 col-md-6 input_space">
                  <div className="row row-without-margin">
                    <label className="">Name</label>
                  </div>
                  <input type="text" ref='search' className="form-control filter-search" placeholder="Search" value={this.state.name} onChange={this.onNameChange.bind(this)}/>
                </div>
                <div className="col-xs-3 col-sm-1 col-md-1 input_space" style={{'marginTop':'3%'}}>
                  <input type='submit' className='btn btn-info filter-btn' name='btn_submit' value='Search' onClick={this.onClickSearch.bind(this)}/>
                </div>
              </div>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="">
          <div className="panel-group" id="" role="tablist" aria-multiselectable="true">
            {this.renderSensorItem()}
          </div>
        </div>
      </div>
    </div>
    );
  }
}
