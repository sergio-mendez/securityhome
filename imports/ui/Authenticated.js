import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props)=> !!Meteor.userId() === true ? (<Component {...props} />) : (<Redirect to='/' />)} />
  );
}

export default Authenticated;
