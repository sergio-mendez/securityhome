import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';

export default class Login extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      error: ''
    }
  }
  onLogin(e){
    e.preventDefault();
    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    Meteor.loginWithPassword({email},password,(err) => {
      if(err){
        this.setState({error: err.reason});
        console.log('Error login',err.reason);
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
          <form id='loginForm' onSubmit={this.onLogin.bind(this)}>
            <div className='login-box'>
              <div className='login-logo'>
                <h1 style={{'color':'white'}}>SecurityHome</h1>
              </div>
              <div className='login-parent'>
                <div className='login-form'>
                  <p className="login-box-msg">Sign in to start your session</p>
                  <div className='form-group has-feedback'>
                    <input type='email' className='form-control' ref='email' name='email' placeholder='Email:' required/>
                  </div>
                  { this.state.error ? <p className='error-message'>{this.state.error}</p> : undefined }
                  <div className='form-group has-feedback'>
                    <input type='password' className='form-control' ref='password' name='password' placeholder='Password:' required/>
                  </div>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <Link to="/signup">Create account.</Link>
                    </div>
                    <div className='col-sm-6'>
                      <Link to='/reset'>Forgot Password ?</Link>
                    </div>
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
