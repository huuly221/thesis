import React from 'react';
import {connect} from 'react-redux';
import SignIn from './signin.js';
import AccountInfo from './accountInfo.js';
class Account extends React.Component{
  render(){
      var {username} =this.props;
      var xtml =username === null ? <SignIn/> : <AccountInfo/>
    return (
      <div>
        {xtml}
      </div>
    )
  }
}

export default connect(function(state){
    return{username: state.username}
})(Account);