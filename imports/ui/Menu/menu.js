import React from 'react';
import { Route } from 'react-router-dom';

import MenuItems from './MenuItems';
import Users from './../UserManagement/Users';
import Profile from './../AccountManagement/profile';
import Dashboard from './../Dashboard/dashboard';
import Home from './../Home/Home';

export default class Menu extends React.Component{
  onLogout(e){
    e.preventDefault();
    Accounts.logout((err)=>{
      if(err){
        console.log(err);
      }
      else{
        this.props.history.push('/');
      }
    });
  }
  render(){
    return (
      <div className="fix-header fix-sidebar card-no-border">
        <div id="main-wrapper">
          <header>
          </header>
            <aside className="mini-sidebar left-sidebar">
                <div className="logo-img">
                  <div className="row">
                    <div className=''>
                      {/* <img src="https://ejemplos.impaktu.com/sites/default/file/I.png"  alt="homepage" className="light-logo" />
                      <img src="https://ejemplos.impaktu.com/sites/default/file/mpaktu.png"  alt="homepage" className="logo-name" /> */}
                    </div>
                  </div>
                </div>
                <div className="scroll-sidebar">
                    <nav className="sidebar-nav">
                        <ul key='ul_0' id="sidebarnav">
                            <MenuItems/>
                        </ul>
                        <div className="text-center m-t-30">
                        </div>
                    </nav>
                </div>
                <div className="sidebar-footer">
                    <a href="" className="link" data-toggle="tooltip" title="Settings"><i className="ti-settings"></i></a>
                    <a href="" onClick={ this.onLogout.bind(this)} className="link" data-toggle="tooltip" title="Logout"><i className="mdi mdi-power"><span className="glyphicon glyphicon-off" aria-hidden="true"></span></i></a>
                    <a href="" className="link" data-toggle="tooltip" title="Email"><i className="mdi mdi-gmail"></i></a>

                </div>
            </aside>

            <div className="page-wrapper">
                <div className="container-fluid">
                  <Route path='/menu/home' component={Home}/>
                  <Route path='/menu/users' component={Users}/>
                  <Route path='/menu/profile' component={Profile}/>
                  <Route path='/menu/dashboard' component={Dashboard}/>
                </div>
                <footer className="footer"> © 2018 SecurityHome S.A.S </footer>
            </div>
        </div>

      </div>
    );
  }
}
