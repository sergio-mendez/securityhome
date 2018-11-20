import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: ''
    }
  }
  onSignup(e){
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    Accounts.createUser({email, password}, (err) => {
      if(err){
        this.setState({error: err.reason});
        console.log('Error Signup: ',err.reason);
      }
      else{
        this.setState({error: ''});
        this.props.history.push('/menu/home');
      }
    });
  }
  render(){
    if(!!Meteor.userId()){
      return <Redirect to="/menu/home" />
    }
    else{
      return (
        <div className='login-page'>
          <form id='loginForm' onSubmit={this.onSignup.bind(this)}>
            <div className='login-box'>
              <div className='login-logo'>
                <h1 style={{'color':'white'}}>SecurityHome</h1>
              </div>
              <div className='login-parent'>
                <div className='login-form'>
                  <p className="login-box-msg">New Account</p>
                  <div className='form-group has-feedback'>
                    <input type='email' className='form-control' ref='email' name='email' placeholder='Email:' required/>
                  </div>
                  { this.state.error ? <p>{this.state.error}</p> : undefined }
                  <div className='form-group has-feedback'>
                    <input type='password' className='form-control' ref='password' name='password' placeholder='Password:' required/>
                  </div>
                  <div>
                    <Link to="/">Alrady have an account.</Link>
                  </div>
                  <div className='row'>
                    <input type='submit' className='btn btn-info' name='btn_submit' value='Sign In'/>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }

}
