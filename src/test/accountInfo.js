import React from 'react';
import {connect} from 'react-redux';
import SignIn from './signin.js';
class AccountInfo extends React.Component{
    logOut(e){
            e.preventDefault();
            var {dispatch} = this.props;
           dispatch({type: 'LOG_OUT'});
         }
  render(){
    var {username} = this.props;
    var xhtml = username === null? <SignIn/>:<AccountInfo/>
    return (
      <div>
        <h1>This is Account</h1>
        <p>Username: {this.props.username}</p>
        <a href="#" onClick={this.logOut.bind(this)}>Log out</a>
      </div>
    )
  }
}

export default  connect(function (state){
  return {username: state.username};
})(AccountInfo);