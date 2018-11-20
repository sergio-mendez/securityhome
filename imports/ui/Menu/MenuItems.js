import {Tracker} from 'meteor/tracker';
import { Roles } from 'meteor/alanning:roles';
import { Route,Link } from 'react-router-dom';
import React from 'react';
import { Session } from 'meteor/session';

export default class MenuItems extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      menuItems:[]
    }
  }
  componentDidMount(){
    this.menuItemsTracker = Tracker.autorun(()=>{
      let menu = [];
      let userId = Meteor.userId();
      menu.push(this.menuOptions(0));
      if(Roles.userIsInRole(userId, 'Administrator')){
        menu.push(this.menuOptions(1));
        menu.push(this.menuOptions(2));
      }else if(Roles.userIsInRole(userId, 'Client')){
        menu.push(this.menuOptions(1));
      }
      menu.push(this.menuOptions(3));
      this.setState({menuItems:menu});
    });
  }
  componentWillUnmount(){
    this.menuItemsTracker.stop();
  }
  menuOptions(op){
    let menu;
    switch (op) {
      case 0:
       menu = (
        <li key='0' className={Session.get('link_home')}>
          <Link className={'waves-effect waves-dark '+Session.get('link_home')} to={{ pathname: '/menu/home' }} >
            <i className="mdi mdi-gauge">
              <span className="glyphicon glyphicon-home" aria-hidden="true"></span>
            </i>
            <span className="hide-menu">Home</span>
          </Link>
        </li>);
        break;
      case 1:
        menu  = (
           <li key='1' className={Session.get('link_dash')}>
             <Link className={'waves-effect waves-dark '+Session.get('link_dash')} to={{ pathname: '/menu/dashboard/direct' }} >
               <i className="mdi mdi-gauge">
                 <span className="glyphicon glyphicon-list-alt" aria-hidden="true"></span>
               </i>
               <span className="hide-menu">Dashboard</span>
             </Link>
           </li>
         );
        break;
      case 2:
        menu = (
          <li key='2' className={Session.get('link_users')}>
            <Link className={'waves-effect waves-dark '+Session.get('link_users')} to={{ pathname: '/menu/users/users_list' }} >
              <i className="mdi mdi-gauge">
                <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
              </i>
              <span className="hide-menu">Users</span>
            </Link>
          </li>
        );
        break;
      case 3:
        menu = (
          <li key='3' className={Session.get('link_profile')}>
            <Link className={'waves-effect waves-dark '+Session.get('link_profile')} to={{ pathname: '/menu/profile' }} >
              <i className="mdi mdi-gauge">
                <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
              </i>
              <span className="hide-menu">Profile</span>
            </Link>
          </li>
        );
        break;
    }
    return menu;
  }
  render(){
    return this.state.menuItems;
  }
}
