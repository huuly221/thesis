import React, { Component } from 'react';
import logo from './logo.svg';
import objectcss from './App.css';
import ReactDOM from 'react-dom';
import drop from './index.css';
import search from './image/search.png';
import logoBK from './image/bachkhoa.png';
import registerServiceWorker from './registerServiceWorker';
import ReactBootstrap from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import { DropdownButton } from 'react-bootstrap';
import {Navbar,NavItem,NavDropdown,MenuItem, Nav,FormGroup,FormControl} from 'react-bootstrap';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
class NavDropdownExample extends React.Component {
  constructor(props) {
      super(props)
      this.state = { isOpen: false }
    }
  
    handleOpen = () => {
      this.setState({ isOpen: true })
    }
  
    handleClose = () => {
       this.setState({ isOpen: false })
    }
    handlefadein=()=>{
      
      this.setState({opacity: 1}, () => {
          if(!this.timeout)
              clearTimeout(this.timeout);
          this.timeout = setTimeout(() => this.setState({opacity:0}),4000);
   })
  }
  
  render() {
    return (
<Navbar className="navbar-color" fixedTop collapseOnSelect>
<Navbar.Header>
  <Navbar.Brand>
    <img src={logoBK} width="50" height="50"  />
    <a href="#home">BACHKHOA <br/> TUOITRE</a>
    
  </Navbar.Brand>
  <Navbar.Toggle />
</Navbar.Header>
<Navbar.Collapse>
  <Nav>
  
  <NavDropdown  
        delay = {this.delaydrop}
        className ={objectcss.dropdown}
        eventKey={1} title="GIỚI THIỆU" id="intro" >
      <MenuItem eventKey={1.1}>TRƯỜNG</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={1.2}>ĐOÀN THANH NIÊN</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={1.3}>HỘI SINH VIÊN</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={1.3}>CÂU LẠC BỘ ĐOÀN HỘI</MenuItem>
    </NavDropdown>
    
    
    <NavDropdown  className ={objectcss.dropdown}
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
    <NavDropdown  className ={objectcss.dropdown}
        delay = {this.delaydrop}
        eventKey={3} title="SỰ KIỆN" id="event" >
      <MenuItem eventKey={3.1}>ĐTN-HSV TRƯỜNG</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.2}>CƠ SỞ</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.3}>NĂM HỌC</MenuItem>
    </NavDropdown>
    <NavDropdown  className ={objectcss.dropdown}
        delay = {this.delaydrop}
        eventKey={4} title="VĂN BẢN" id="docs" >
      <MenuItem eventKey={4.1}></MenuItem>
      <MenuItem eventKey={4.2}>Another action</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={4.3}>Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={4.3}>Separated link</MenuItem>
    </NavDropdown>
    <NavItem eventKey={5} href="#" id="contact">
      LIÊN HỆ
    </NavItem>
    
   
  </Nav>
  <Nav pullRight>
    <NavItem eventKey={1} href="#">
      ĐĂNG NHẬP
    </NavItem>
    <Navbar.Form pullLeft>
      <FormGroup>
        <FormControl type="text" placeholder="TÌM KIẾM" />
      </FormGroup>
      <a style={{paddingLeft: '25px'}} href ='#5' id="search">  
      <img src={search} width="25" height="25" /></a>
    </Navbar.Form>
  </Nav>
</Navbar.Collapse>
</Navbar>
    );
  }
}

export default NavDropdownExample;
