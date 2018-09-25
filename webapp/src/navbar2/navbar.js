import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

import axios from 'axios';  
import {connect} from 'react-redux';

import SearchBar from './searchbar'
import './navbar.css';
import logoBK from '../image/logoBKYouth.png';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ScrollUpButton from "react-scroll-up-button";
class NavbarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.checkUser = this.checkUser.bind(this);
        this.state = {
            collapse: false,
            isWideEnough: false,
            dropdownOpen: false
        };
    }
    logOut(e){
        e.preventDefault();
        sessionStorage.removeItem('mssv');
        if(sessionStorage.removeItem('userData')){
            sessionStorage.removeItem('userData');
        }
        
        var {dispatch} = this.props;
       dispatch({type: 'LOG_OUT'});
     }
    
    checkUser(check)
    { 
        if(check === null)
        {
            return(<li><Link to="/Dangnhap"><div>ĐĂNG NHẬP</div></Link></li>)
        }
        else{
            return( 
            <li className="dropdown">
            <Link to="/user-panel">
                <div className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{check}<span className="caret" /></div>
            </Link>
            <ul className="dropdown-menu" role="menu">
                <li><a href="#">PHẢN HỒI</a></li>
                <li className="divider" />
                <li><a href="#">HỘP THƯ PHẢN HỒI</a></li>
                <li className="divider" />
                <li><a href="#" onClick={this.logOut.bind(this)}>ĐĂNG XUẤT</a></li>  
            </ul>
        </li>)
        }
    }
    
    render() {
        var {mssv} =this.props;
        return (
            <div className="navbarBK container-fluid">
                <ScrollUpButton />
                <nav className="navbar navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar3" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <Link to="/"> 
                                <div className="navbar-brand" >
                                    <span className="logo-img"><img src={logoBK} width="50" height="50"  /></span>TUOITRE <br/> BACHKHOA
                                </div>
                            </Link>
                        </div>
                        <div id="navbar3" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className="dropdown">
                                    <Link to="/Gioithieu"> 
                                    <div className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">GIỚI THIỆU <span className="caret" /></div>
                                    </Link>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#">TRƯỜNG</a></li>
                                        <li className="divider" />
                                        <li><a href="#">ĐOÀN THANH NIÊN</a></li>
                                        <li className="divider" />
                                        <li><a href="#">HỘI SINH VIÊN</a></li>
                                        <li className="divider" />
                                        <li><a href="#">CÂU LẠC BỘ ĐOÀN HỘI</a></li>
                                        
                                        
                                    </ul>
                                </li>
                                <li className="dropdown">
                                <Link to="/Tintuc"> 
                                    <div className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">TIN TỨC <span className="caret" /></div>
                                    </Link>   
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#">TRƯỜNG</a></li>
                                        <li className="divider" />
                                        <li><a href="#">HOẠT ĐỘNG PHONG TRÀO</a></li>
                                        <li className="divider" />
                                        <li><a href="#">HOẠT ĐỘNG QUYÊN GÓP</a></li>
                                        <li className="divider" />
                                        <li><a href="#">CÔNG TÁC TỔ CHỨC</a></li>
                                        
                                        
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link to="/Sukien">
                                        <div className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> SỰ KIỆN <span className="caret" /></div>
                                    </Link>
                                    
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#">ĐTN-HSV TRƯỜNG</a></li>
                                        <li className="divider" />
                                        <li><a href="#">CƠ SỞ</a></li>
                                        <li className="divider" />
                                        <li><a href="#">NĂM HỌC</a></li>
                                        
                                        
                                        
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <Link to="/Vanban">
                                        <div className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">VĂN BẢN <span className="caret" /></div>
                                    </Link>
                                    <ul className="dropdown-menu" role="menu">
                                        <li><a href="#">ĐTN-HSV TRƯỜNG</a></li>
                                        <li className="divider" />
                                        <li><a href="#">CƠ SỞ</a></li>
                                        <li className="divider" />
                                        <li><a href="#">NĂM HỌC</a></li>  
                                    </ul>
                                </li>
                                <li><Link to="/Contact"><div>LIÊN HỆ</div></Link></li>
                                
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                           
                           {this.checkUser(mssv)}
                               <li>
                                   <SearchBar/>
                               </li>
                           </ul>
                        </div>
                    
                    </div>
        
                </nav>
            </div>
        );
    }
}
export default connect(function(state){
    return{mssv: state.mssv}
})(NavbarMenu);