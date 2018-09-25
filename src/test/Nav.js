
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class Nav extends Component{
  render(){
    return (
      <div>
       <ul>
          <li><Link to="/" activeClassName="active">Homepage</Link></li>
          <li><Link to="/account" activeClassName="active">Account</Link></li>
          <li><Link to="/transaction" activeClassName="active">Transaction</Link></li>
        </ul>
      </div>
    )
  }
}

export default Nav;