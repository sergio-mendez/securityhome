import {Meteor} from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import {Tracker} from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';

export default class EditUser extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      UserName:'',
      Email:'',
      Password:'',
      Rol:'0',
      rol: false,
      newUser:false,
      btnText: 'Update account',
      txtPassword: 'Change Password',
      admin_op:[],
    };
  }
  componentDidMount(){
    this.edituserTracker = Tracker.autorun(()=>{
      if(this.props.match.params.id != '0'){
        Meteor.subscribe('usersList');
        let user = Meteor.users.find({_id:this.props.match.params.id}).fetch();
        user = user[0];
        try {
          let admin_op;
          let userId = Meteor.userId();
          if(user.emails){
            this.setState({Email:user.emails[0]['address']});
          }
          if(user.roles){
            this.setState({rol:true});
            this.setState({Rol:user.roles[0]});
          }
          setTimeout(()=>{
            if(Roles.userIsInRole(userId,'Administrator')){
              admin_op = (
                <select key='select_ad' onChange={this.onChangeRol.bind(this)} value={this.state.Rol} className="form-control form-control-line">
                  <option disabled hidden value='0'>Select Rol</option>
                  <option value='Administrator'>Administrator</option>
                  <option value='Client'>Client</option>
                </select>
              );
              console.log('entro');
            }
            this.setState({admin_op});
          },1000);
          if(user.username){
            this.setState({UserName:user.username});
          }
        } catch (e) {
          console.log('Genero error: '.e);
        }
      }else{
        this.setState({newUser:true,btnText:'Create new account',txtPassword:'Password'});
      }
    });
  }
  componentWillUnmount(){
    this.edituserTracker.stop()
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
  onChangePassword(e){
    this.setState({
      Password: e.target.value,
    });
  }
  onChangeRol(e){
    this.setState({
      Rol: e.target.value,
    });
  }
  UpdateProfile(e){
    e.preventDefault();
    let id;
    let newUser = this.state.newUser;
    console.log(newUser);
    if(newUser){
      let username = this.state.UserName;
      let email = this.state.Email;
      let password = this.state.Password;
      console.log(username,email,password);
      Accounts.createUser({username,email,password}, (err) => {
        if(err){
          this.setState({error: err.reason});
          console.log('Error Signup: ',err.reason);
        }else{
          Meteor.logout();
        }
      });
      setTimeout(()=>{
        id = Meteor.users.findOne({'emails.0.address':email});
        Roles.addUsersToRoles(id._id,[this.state.Rol]);
        this.props.history.push('/menu/users/users_list');
      }, 5000);
      //
      //
    }else{
      if(this.state.rol){
        Meteor.users.update(this.props.match.params.id,{$set:{'roles.0':this.state.Rol}})
      }else{
        Roles.addUsersToRoles(this.props.match.params.id,[this.state.Rol]);
      }
      if(this.state.Password == ''){
        Meteor.users.update(this.props.match.params.id,{$set:{username:this.state.UserName,'emails.0.address':this.state.Email}});
      }else{
        Meteor.users.update(this.props.match.params.id,{$set:{username:this.state.UserName,'emails.0.address':this.state.Email}});
        Meteor.call('user.changePassword',this.props.match.params.id,this.state.Password);
      }
      this.props.history.push('/menu/users/users_list');
    }
  }
  render(){
    return(
      <div>
        <div className="col-lg-4 col-xlg-3 col-md-5">
            <div className="card">
                <div className="card-block">
                    <center className="m-t-30"> <img src="https://ejemplos.impaktu.com/sites/default/files/styles/thumbnail/public/pictures/unknown.jpg" className="img-circle" width="150" />
                        <h4 className="card-title m-t-10">{this.state.UserName}</h4>
                        <h6 className="card-subtitle">{this.state.Rol}</h6>
                        <div className="row text-center justify-content-md-center">
                        </div>
                        <div className='row'>
                          <center>
                            <div className='col-xs-12 input_submit'>
                                <button className="btn btn-success">Edit Photo</button>
                            </div>
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
                            <label className="col-md-12">{this.state.txtPassword}</label>
                            <div className="col-md-12">
                                <input type="password" value={this.state.Password} onChange={this.onChangePassword.bind(this)} className="form-control form-control-line"/>
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
                                <button className="btn btn-success" onClick={this.UpdateProfile.bind(this)}>{this.state.btnText}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    );
  }
}
