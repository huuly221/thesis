import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

import axios from 'axios';  
import {connect} from 'react-redux';
import './navbar.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open:true
        };
    }
    handleSearchBox(e){
        if(e.target.value){
            this.setState({open: false}) ;
        }
        else{
            this.setState({open:true}) ;
        }
        

    }
    
    render() {

        return (
            <form className="navbar-form" >
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search" name="search" onChange={this.handleSearchBox.bind(this)} />
                    <div className="input-group-btn">
                        <button className="btn btn-default" type="submit" disabled ={this.state.open} >  
                            <i className="glyphicon glyphicon-search" />
                        </button>
                    </div>
                </div>
            </form>
        );
    }
}
export default SearchBar;