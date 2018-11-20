import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';
import React from 'react';
import { Session } from 'meteor/session';

export default class Profile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      UserName:'',
      Email:'',
      OldPassword:'',
      NewPassword:'',
      Rol:'Unassigned',
      admin_op:[]
    }
  }
  componentDidMount(){
    Session.set({link_home:'',link_dash:'',link_profile:'active',link_users:''});
    this.profileTracker = Tracker.autorun(()=>{
      try {
        let admin_op;
        let userId = Meteor.userId();
        let UserInfo = Meteor.user();
        if(UserInfo.username){
          this.setState({UserName:UserInfo.username});
        }
        if(UserInfo.roles){
          this.setState({Rol:UserInfo.roles[0]});
        }
        this.setState({Email:UserInfo.emails[0]['address']});
        setTimeout(()=>{
          if(Roles.userIsInRole(userId,['Administrator'])){
            admin_op = (
              <select key='s_1' onChange={this.onChangeRol.bind(this)} value={this.state.Rol} className="form-control form-control-line">
                <option disabled hidden value=''>Select Rol</option>
                <option value='Administrator'>Administrator</option>
                <option value='Adops'>AdopsAdmin</option>
                <option value='Sales'>SalesAdmin</option>
                <option value='Adops'>Adops</option>
                <option value='Sales'>Sales</option>
              </select>
            );
          }else{
            admin_op = (
              <label key='lbName' className="col-md-12">{this.state.Rol}</label>
            );
          }
          this.setState({admin_op});
        },1000);
      } catch (e) {}
    });
  }
  componentWillUnmount(){
    this.profileTracker.stop();
  }
  onChangeUserName(e){
    this.setState({
      UserName: e.target.value,
    });
  }
  onChangeEmail(e){
    this.setState({
      Email: e.target.value,
    });
  }
  onChangeOldPassword(e){
    this.setState({
      OldPassword: e.target.value,
    });
  }
  onChangeNewPassword(e){
    this.setState({
      NewPassword: e.target.value,
    });
  }
  onChangeRol(e){
    console.log(e.target.value);
    this.setState({
      Rol: e.target.value,
    });
  }
  UpdateProfile(e){
    e.preventDefault();
    let userInfo = Meteor.user();
    if(userInfo.roles){
      Meteor.users.update(userInfo._id,{$set:{'roles.0':this.state.Rol}})
    }
    if(this.state.Password == ''){
      Meteor.users.update(userInfo._id,{$set:{username:this.state.UserName,'emails.0.address':this.state.Email}});
    }else{
      Meteor.users.update(userInfo._id,{$set:{username:this.state.UserName,'emails.0.address':this.state.Email}});
      Accounts.changePassword(this.state.OldPassword,this.state.NewPassword,(err)=>{
        if(err){
          console.log(err);
        }else{ this.setState({OldPassword:'',NewPassword:''})}
      });
    }
  }
  render(){
    return(
      <div>
        <div className="row page-titles">
            <div className="col-md-5 col-8 align-self-center">
                <h3 className="text-themecolor">Profile</h3>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="">Home</a></li>
                    <li className="breadcrumb-item active">Profile</li>
                </ol>
            </div>
            <div className="col-md-7 col-4 align-self-center">
            </div>
        </div>
        <div className="row">
            <div className="col-lg-4 col-xlg-3 col-md-5">
                <div className="card">
                    <div className="card-block">
                        <center className="m-t-30"> <img src="https://ejemplos.impaktu.com/sites/default/files/styles/thumbnail/public/pictures/unknown.jpg" className="img-circle" width="150" />
                            <h4 className="card-title m-t-10">{this.state.UserName}</h4>
                            <h6 className="card-subtitle">{this.state.Rol}</h6>
                            <div className="row text-center justify-content-md-center">
                                {/* <div className="col-4 "><a href="javascript:void(0)" className="link"><i className="icon-people"></i> <font className="font-medium">254</font></a></div>
                                <div className="col-4 "><a href="javascript:void(0)" className="link"><i className="icon-picture"></i> <font className="font-medium">54</font></a></div> */}
                            </div>
                            <div className='row'>
                              <center>
                                <div className='col-xs-12 input_submit'>
                                    <button className="btn btn-success">Edit Photo</button>
                                </div>
                                {/* <div className='col-xs-4 input_submit'>
                                    <button className="btn btn-success">Agency</button>
                                </div> */}
                              </center>
                            </div>

                        </center>
                    </div>
                </div>
            </div>
            <div className="col-lg-8 col-xlg-9 col-md-7">
                <div className="card">
                    <div className="card-block">
                        <form className="form-horizontal form-material">
                            <div className="form-group">
                                <label className="col-md-12">Full Name</label>
                                <div className="col-md-12">
                                    <input type="text" placeholder="" className="form-control form-control-line" value={this.state.UserName} onChange={this.onChangeUserName.bind(this)}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="example-email" className="col-md-12">Email</label>
                                <div className="col-md-12">
                                    <input type="email" placeholder="" value={this.state.Email} onChange={this.onChangeEmail.bind(this)} className="form-control form-control-line" name="example-email" id="example-email"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-12">Old Password</label>
                                <div className="col-md-12">
                                    <input type="password" value={this.state.OldPassword} onChange={this.onChangeOldPassword.bind(this)} className="form-control form-control-line"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-md-12">New Password</label>
                                <div className="col-md-12">
                                    <input type="password" value={this.state.NewPassword} onChange={this.onChangeNewPassword.bind(this)} className="form-control form-control-line"/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-12">Rol</label>
                                <div className="col-sm-12">
                                  {this.state.admin_op}
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="col-sm-12">
                                    <button className="btn btn-success" onClick={this.UpdateProfile.bind(this)}>Update Profile</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
