import React, { Component } from 'react';
import Nav from './Nav';
import axios from 'axios';
import {connect} from 'react-redux';
class Main extends Component{
    componentDidMount(){
        var {dispatch} = this.props;
        axios.get('http://localhost:3001/api/getInfo')
        .then(res => {
          if(res.data != 'CHUA_DANG_NHAP'){
            dispatch({type: 'LOG_IN', username: res.data});
          }
          else{console.log("chua dang nhap")}
        })
        .catch(err => console.log('LOI'))
      }
  render(){
    return (
      <div>
        <h1>Main</h1>
        <Nav/>
        {this.props.children}
      </div>
    )
  }
  
}

export default Main;