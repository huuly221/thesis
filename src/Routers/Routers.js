import React, { Component } from 'react';
import { Navbar,NavItem,NavDropdown,MenuItem, Nav,FormGroup,FormControl, Grid, Row, Col, Carousel } from 'react-bootstrap';
import NavbarMenu from '../navbar2/navbar';
import RightBar from '../right-bar/right-bar';
import Carousels from '../carousel/carousel';

import Documents from '../documents/documents';
import BKHomeNews from '../BKHomeNews/BKHomeNews';
import Footer from '../footer/footer';
import MapKhoa from '../contact/Map';
import Contacts from '../contact/contacts';
////////////////////////////event
import BKEvent from '../BKEvent/BKEvent';
import BKEvent1 from '../BKEvent/event1';
import BKEvent2 from '../BKEvent/event2';
import BKEvent3 from '../BKEvent/event3';
////////////////////////////New

import News from '../bknew/News.js';
import News1 from '../bknew/News1.js';
import News2 from '../bknew/News2.js';
import News3 from '../bknew/News3.js';
import News4 from '../bknew/News4.js';

////////////////////////////intro
import BKIntroduce from '../BKIntroduce/BKIntroduce';
import Introduce1 from '../BKIntroduce/Introschool';
import Introduce2 from '../BKIntroduce/IntroDoan';
import Introduce3 from '../BKIntroduce/IntroHoi';
import Introduce4 from '../BKIntroduce/IntroClub';
/////////////////////////////
import Search from '../navbar2/result-search-bar';
////////////////////
//////////////////login
import Login from '../userlogin/login';
import Return from '../userlogin/return';
import Wrong from '../userlogin/wronguser';

import InfoUser from '../userlogin/userdetail/userdetail.js'

import {Redirect} from 'react-router-dom';
//////////////////login

//import AdminIndex from '../admin/components/AdminIndex';
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
        
        this.isAdmin = this.isAdmin.bind(this);
        
   
    }
    isAdmin = () =>{   ////////check login in user detail page
      if(sessionStorage.getItem("admin") === null)
       return(<Redirect to="/"/>)
       else return(<AdminRouters />)
    }
    isLogInDetail = () =>{   ////////check login in user detail page
      if(sessionStorage.getItem("display_name") === null)
       return(<Redirect to="/Dangnhap"/>)
       else return(<Info />)
    }
    
   
    render() {
        return (
            <Router>

                <div>
                    
                    <NavbarMenu url='http://localhost:3001/admin/navbar'
                    pollInterval={2000} />
                    <Grid fluid="true">
                      <Route  path="/Contact" component={Contact} />
                         
                    </Grid>
                    <Route exact path="/" component={Home} />
                    <Grid>
                      <Route path="/Sukien" component={Events} />
                      <Route path="/Sukien-DTN-HSV" component={Events1} />
                      <Route path="/Sukien-co-so" component={Events2} />
                      <Route path="/Sukien-nam-hoc" component={Events3} />
                    </Grid>
                    
                    <Route  path="/Gioithieu" component={Intro} />
                    <Route path='/Gioithieu-truong'  component={Intro1} />
                    <Route path='/Gioithieu-doan-truong'  component={Intro2} />
                    <Route path='/Gioithieu-hoi-SV'  component={Intro3} />
                    <Route path='/Gioithieu-Cau-lac-bo'  component={Intro4} />
                    
                    <Route path="/Tintuc" component={Tintuc} />
                    <Route path='/Tintuc-truong'  component={Tintuc1} />
                    <Route path='/Tintuc-phong-trao'  component={Tintuc2} />
                    <Route path='/Tintuc-quyen-gop'  component={Tintuc3} />
                    <Route path='/Tintuc-cong-tac-to-chuc'  component={Tintuc4} />



                    <Route path="/Vanban" component={Vanban} />
                    <Route path={`${'/search'}/:Id`}    component={Search}/>

                    
                    <Switch>
                      <Route path="/Dangnhap" component={Log}/>
                      <Route path="/Dangki" component={Return}/>
                      <Route path="/login-with-google" component={Wrong}/>
                    </Switch>
                    <Route path="/user-panel" render={ () => (this.isLogInDetail() )}/>
                    <Route path="/admin-panel" render={ () => (this.isAdmin() )}/>
                    <Route path="/feed-back"  render={ () => (this.isLogInFeedback() )} />
                    <Route path="/feed-back"  render={ () => (this.isLogInFeedback() )} />
                    <Footer />
                </div>
            </Router>
        );
    }
}

  
  const Info = () => (
    <div className="clear-component">
      <InfoUser 
      url='http://localhost:3001/api/eventdetail'
      pollInterval={2000} />
    </div>
  );

  const Intro = () => (
    <div className="clear-component">
      <BKIntroduce 
      url='http://localhost:3001/api/eventdetail'
      pollInterval={2000} />
    </div>
  );
  const Intro1 = () => (
    <div className="clear-component">
      <Introduce1 
      url='http://localhost:3001/api/eventdetail'
      pollInterval={2000} />
    </div>
  );
  const Intro2 = () => (
    <div className="clear-component">
      <Introduce2 
      url='http://localhost:3001/api/eventdetail'
      pollInterval={2000} />
    </div>
  );
  const Intro3 = () => (
    <div className="clear-component">
      <Introduce3
      url='http://localhost:3001/api/eventdetail'
      pollInterval={2000} />
    </div>
  );
  const Intro4 = () => (
    <div className="clear-component">
      <Introduce4
      url='http://localhost:3001/api/eventdetail'
      pollInterval={2000} />
    </div>
  );
  
  
  
  const Events = () => (
    <div className="clear-component">
      <BKEvent 
      url='http://localhost:3001/api/eventdetail'
      pollInterval={2000} />
    </div>
  );
  const Events1 = () => (
    <div className="clear-component">
      <BKEvent1 
      url='http://localhost:3001/api/eventdetail'
      pollInterval={2000} />
    </div>
  );
  const Events2 = () => (
    <div className="clear-component">
      <BKEvent2 
      url='http://localhost:3001/api/eventdetail'
      pollInterval={2000} />
    </div>
  );
  const Events3 = () => (
    <div className="clear-component">
      <BKEvent3 
      url='http://localhost:3001/api/eventdetail'
      pollInterval={2000} />
    </div>
  );


  const Tintuc = () => (
    <div className="clear-component">
      <News
      url1='http://localhost:3001api/eventdetail'
      pollInterval={2000}
      />
    </div>
  );
  const Tintuc1 = () => (
    <div className="clear-component">
      <News1
      url1='http://localhost:3001api/eventdetail'
      pollInterval={2000}
      />
    </div>
  );
  const Tintuc2 = () => (
    <div className="clear-component">
      <News2
      url1='http://localhost:3001api/eventdetail'
      pollInterval={2000}
      />
    </div>
  );
  const Tintuc3 = () => (
    <div className="clear-component">
      <News3
      url1='http://localhost:3001api/eventdetail'
      pollInterval={2000}
      />
    </div>
  );
  const Tintuc4 = () => (
    <div className="clear-component">
      <News4
      url1='http://localhost:3001api/eventdetail'
      pollInterval={2000}
      />
    </div>
  );
  const Vanban = () => (
    <div className="clear-component">
      <Documents 
      url='http://localhost:3001/api/bkdocument'
      pollInterval={2000} />
    </div>
  );
  const Log = () => (
    <div className="clear-component">
      <Login 
     url= 'http://localhost:3001/api/login' 
     pollInterval={2000}/>
    </div>
  );
  const Contact = () => (
    <div className="clear-component">
        <MapKhoa isMarkerShown/>
        <Contacts url='http://localhost:3001/api/feedback'/>
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
                                <div className="documents-wrap">
                                        <div className="clearfix"></div>                   
                                        <div className="document-wrap-content">
                                    <RightBar />
                                    </div>
                                     
                                    
                                    </div>
                                    
                                </Col>
                        </Row>
                        
                    </Grid>
                    <div className="clearfix-page"></div>
                    <BKHomeNews />
    
    
   
    </div>
    
  );
  
  const Home1 = ({ match }) => (
    <div>
    <Carousels />
  
  
</div>
  );
 
export default Routers;
