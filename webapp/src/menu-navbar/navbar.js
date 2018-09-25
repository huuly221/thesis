import React, { Component } from 'react';
import { Navbar,NavItem,NavDropdown,MenuItem, Nav,FormGroup,FormControl, Button } from 'react-bootstrap';

import './navbar.css'
import logoBK from '../image/logoBKYouth.png';
import search from '../image/svg-search.gif';



class NavbarMenu extends Component {
    constructor(props) {
        super(props); 
        this.state = {  };
    }
    render() {
        return (
            <Navbar className="navbar-color" fixedTop collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        
                        <a href="#home"><img src={logoBK} width="70" height="70"  />BACHKHOA <br/> TUOITRE</a>
                        
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav className="hover-affect">
                    
                        <NavDropdown className="hvr-box-shadow-outset border" 
                            delay = {this.delaydrop}
                            eventKey={1} title="GIỚI THIỆU" id="intro" >
                            <MenuItem eventKey={1.1}>TRƯỜNG</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={1.2}>ĐOÀN THANH NIÊN</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={1.3}>HỘI SINH VIÊN</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={1.3}>CÂU LẠC BỘ ĐOÀN HỘI</MenuItem>
                        </NavDropdown>
                        
                        
                        <NavDropdown className="hvr-box-shadow-outset border" 
                            delay = {this.delaydrop}
                            eventKey={2} title="TIN TỨC" id="news" >
                            <MenuItem eventKey={2.1}>TRƯỜNG</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={2.2}>HOẠT ĐỘNG PHONG TRÀO</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={2.3}>HOẠT ĐỘNG QUYÊN GÓP</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={2.3}>CÔNG TÁC TỔ CHỨC</MenuItem>
                        </NavDropdown>
                        <NavDropdown className="hvr-box-shadow-outset border" 
                            delay = {this.delaydrop}
                            eventKey={3} title="SỰ KIỆN" id="event" >
                            <MenuItem eventKey={3.1}>ĐTN-HSV TRƯỜNG</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.2}>CƠ SỞ</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey={3.3}>NĂM HỌC</MenuItem>
                        </NavDropdown>
                        <NavDropdown className="hvr-box-shadow-outset border" 
                            delay = {this.delaydrop}
                            eventKey={4} title="VĂN BẢN" id="docs" >
                            <MenuItem eventKey={4.1}></MenuItem>
                            <MenuItem eventKey={4.2}>Another action</MenuItem>
                            
                            <MenuItem eventKey={4.3}>Something else here</MenuItem>
                            
                            <MenuItem eventKey={4.3}>Separated link</MenuItem>
                        </NavDropdown>
                        <NavItem className="hvr-box-shadow-outset border contact" eventKey={5} href="#" id="contact">
                        LIÊN HỆ
                        </NavItem>
                        
                    
                    </Nav>
                    <Nav pullRight>
                        <NavItem className="contact hvr-bounce-to-right" eventKey={1} href="#">
                        ĐĂNG NHẬP
                        </NavItem>
                        <Navbar.Form pullRight className="navbar-form">
                            <FormGroup className="menu-right">
                                <FormControl type="text" placeholder="TÌM KIẾM" />
                            </FormGroup>
                            <a className="menu-right" href ='#5' id="search">  
                                <img className="search-icon" src={search} width="32" height="32" />
                            </a>
                        </Navbar.Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
    /*render (){
        return (
            <Navbar inverse collapseOnSelect fuild="true">
                <Navbar.Header>
                    <Navbar.Brand>
                    <a href="#brand">React-Bootstrap</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                    <NavItem eventKey={1} href="#">
                        Link
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        Link
                    </NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.3}>Separated link</MenuItem>
                    </NavDropdown>
                    </Nav>
                    <Nav pullRight>
                        <NavItem eventKey={2} href="#">
                            <Navbar.Form pullRight>
                                <FormGroup>
                                    <FormControl type="text" placeholder="Search" />
                                </FormGroup>{' '}
                                <Button type="submit">Submit</Button>
                            </Navbar.Form>
                        </NavItem> 
                    <NavItem eventKey={2} href="#">
                        Link Right
                    </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }*/
}
                

export default NavbarMenu;
