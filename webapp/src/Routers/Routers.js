import React, { Component } from 'react';
import { Navbar,NavItem,NavDropdown,MenuItem, Nav,FormGroup,FormControl, Grid, Row, Col, Carousel } from 'react-bootstrap';
import NavbarMenu from '../navbar2/navbar';
import RightBar from '../right-bar/right-bar';
import Carousels from '../carousel/carousel';
import BKEvent from '../BKEvent/BKEvent';
import Documents from '../documents/documents';
import BKNews from '../BKNews/BKNews';
import Footer from '../footer/footer';
import MapKhoa from '../contact/contact.js';
import logoBK from '../image/logo.png';
import search from '../image/svg-search.gif';
import News from '../bknew/News.js';
import BKIntroduce from '../BKIntroduce/BKIntroduce';
////////////////////
//////////////////login
import Login from '../userlogin/login';
import Return from '../userlogin/return';
import Wrong from '../userlogin/wronguser';

import InfoUser from '../userlogin/userdetail/userdetail.js'
import FeedBack from '../userlogin/userdetail/userfeedback.js';
import {Redirect} from 'react-router-dom';
//////////////////login

import AdminIndex from '../admin/components/AdminIndex';
///////////////////
import './Routers.css';
import AdminRouters from "../admin/router/AdminRouters";
//import NavbarMenu from '../menu-navbar/navbar';



import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

class Routers extends Component {
    constructor(props) {
        super(props); 
        this.state = {  };
        this.isLogInDetail = this.isLogInDetail.bind(this);
        this.isLogInFeedback = this.isLogInFeedback.bind(this);
   
    }
    isLogInDetail = () =>{   ////////check login in user detail page
      if(sessionStorage.getItem("mssv") === null)
       return(<Redirect to="/Dangnhap"/>)
       else return(<Info />)
    }
    isLogInFeedback = () =>{          ////// check login in user feedback
      if(sessionStorage.getItem("mssv") === null)
       return(<Redirect to="/Dangnhap"/>)
       else return(<FeedBack />)
    }
   
    render() {
        return (
            <Router>

                <div>
                    
                    <NavbarMenu url='https://tuoitrebachkhoa.herokuapp.com/admin/navbar'
                    pollInterval={2000} />
                    
                    <AdminRouters />
                    
                    <Grid fluid="true">
                    
                    
                      <Route  path="/Contact" component={Contact} />
                         
                    </Grid>
                    <Route exact path="/" component={Home} />
                    <Grid>
                   
                      <Route path="/Sukien" component={Events} />
                      
                    
                         
                    </Grid>
                    <Route path="/Gioithieu" component={Intro} />
                    <Route path="/Tintuc" component={Tintuc} />
                    <Route path="/Vanban" component={Vanban} />
                    
                    <Switch>
                      <Route path="/Dangnhap" component={Log}/>
                      <Route path="/Dangki" component={Return}/>
                      <Route path="/login-with-google" component={Wrong}/>
                    </Switch>
                    <Route path="/user-panel" render={ () => (this.isLogInDetail() )}/>
                    <Route path="/feed-back"  render={ () => (this.isLogInFeedback() )} />
                    <Footer />
                </div>
            </Router>
        );
    }
}

  const AdminPanel = () => (
    <div className="clear-component">
      <AdminIndex 
      url='https://tuoitrebachkhoa.herokuapp.com/admin/'
      pollInterval={2000} />
    </div>
  );
  const Info = () => (
    <div className="clear-component">
      <InfoUser 
      url='https://tuoitrebachkhoa.herokuapp.com/api/eventdetail'
      pollInterval={2000} />
    </div>
  );

  const Intro = () => (
    <div className="clear-component">
      <BKIntroduce 
      url='https://tuoitrebachkhoa.herokuapp.com/api/eventdetail'
      pollInterval={2000} />
    </div>
  );
  const Events = () => (
    <div className="clear-component">
      <BKEvent 
      url='https://tuoitrebachkhoa.herokuapp.com/api/eventdetail'
      pollInterval={2000} />
    </div>
  );
  const Tintuc = () => (
    <div className="clear-component">
      <News
      url1='https://tuoitrebachkhoa.herokuapp.com/api/eventdetail'
      pollInterval={2000}
      />
    </div>
  );
  const Vanban = () => (
    <div className="clear-component">
      <Documents 
      url='https://tuoitrebachkhoa.herokuapp.com/api/bkdocument'
      pollInterval={2000} />
    </div>
  );
  const Log = () => (
    <div className="clear-component">
      <Login 
     url= 'https://tuoitrebachkhoa.herokuapp.com/api/login' 
     pollInterval={2000}/>
    </div>
  );
  const Contact = () => (
    <div className="clear-component">
        <MapKhoa isMarkerShown/>
        <div className="contact_grid">
        <div className="col-md-8 contact-top">
          <h3>Gửi Lời Nhắn Cho Chúng Tôi</h3>
          <p className="contact_msg">Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy</p>
          <form>
            <div className="to">
              <input type="text" className="text" defaultValue="Name" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name';}" />
              <input type="text" className="text" defaultValue="Email" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" style={{marginLeft: 20}} />
              <input type="text" className="text" defaultValue="Subject" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Subject';}" style={{marginLeft: 20}} />
            </div>
            <div className="text">
              <textarea onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Message';}" defaultValue={"Message:"} />
            </div>
            <div className="form-submit1">
              <input name="submit" type="submit" id="submit" defaultValue="Gửi Lời Nhắn Cho Chúng Tôi " /><br />
              <p className="m_msg">Make sure you put a valid email</p>
            </div>
            <div className="clearfix"> </div>
          </form>
        </div>
        <div className="col-md-4 contact-top_right">
          <h3>Thông Tin Liên Hệ</h3>
          <p>diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis.</p>
          <ul className="contact_info">
            <li><span>+1900-235-2456</span></li>
            <li><span className="msg"><a href="malito:mail@example.com">mail(at)example.com</a></span></li>
          </ul>
        </div>
        <div className="clearfix" />
      </div>
      
      
    </div>
  );
  const Home = ({ match }) => (
    <div>
      
      <Grid fluid="true">
                    
                        <Row>
                                <Col xs={12} md={8}>
                                <Route
                                    exact
                                    path={match.url}
                                    render={() => <div className="clear-component"> <Carousels /></div>}
                                    />
                                </Col>
                                <Col xs={12} md={4}>
                                    <RightBar />
                                </Col>
                        </Row>
                        
                    </Grid>
                    <div className="clearfix-page"></div>
                    <BKNews />
    
    
   
    </div>
  );
  
  const Home1 = ({ match }) => (
    <div>
    <Carousels />
  
  
</div>
  );
 
export default Routers;
