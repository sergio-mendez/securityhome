import React from 'react';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
// import { Router } from 'meteor/iron:router';

import Routes from '../imports/routes/routes'
import Menu from '../imports/ui/Menu/menu';

// Router.configure({
//   noRoutesTemplate:'noRoutesTemplate'
// });

Meteor.startup(()=>{
  let pos = this.location.pathname.split('/');
  if(pos[2] == 'dashboard'){
    Session.set({link_home:'',link_dash:'active',link_profile:'',link_users:''});
  }else if (pos[2] == 'home') {
    Session.set({link_home:'active',link_dash:'',link_profile:'',link_users:''});
  }else if(pos[2] == 'profile'){
    Session.set({link_home:'',link_dash:'',link_profile:'active',link_users:''});
  }else if(pos[2] == 'users_list'){
    Session.set({link_home:'',link_dash:'',link_profile:'',link_users:'active'});
  }
  ReactDOM.render(<Routes/>,document.getElementById('App'))
});
