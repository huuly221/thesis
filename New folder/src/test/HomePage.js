import React, { Component } from 'react';
import axios from 'axios';
class HomePage extends Component{
  handleRequest(){
        // axios.get('/try')
        // .then(res => console.log(res.data))
        // .catch(err => console.log(err))
    
       axios.post('/axios', {username: 'KHOAPHAM'})
       .then(res => console.log(res.data))
        .catch(err => console.log(err))
      }
  render(){
    return (
      <div>
        <h1>This is Homepage</h1>
        <button onClick={this.handleRequest.bind(this)}>request</button>
     </div>
    )
  }
}

export default HomePage;