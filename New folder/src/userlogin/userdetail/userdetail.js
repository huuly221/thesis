import React, { Component } from 'react';
import { Grid, Row, Col, Carousel} from 'react-bootstrap';
import axios from 'axios';
import { Button, Icon, Reveal } from 'semantic-ui-react';
import {Redirect,Link,Route ,BrowserRouter as Router,Switch} from 'react-router-dom';
import "./detail.css";
import para from '../images/back.jpg';
import Calendar from 'react-calendar';
import BigCalendar from "react-big-calendar";
import FeedBack from './userfeedback';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ChangeInfo from './change'
moment.locale("en");
BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
export default class Userdetail extends Component {
    constructor(props) {
        super(props);
   this.state = {
        date: new Date(),
        es:[],
        ex:"tftftf"
      }
      this.onChange= this.onChange.bind(this);
    }
onChange = date => this.setState({ date })
componentDidMount(){
    axios.get("https://tuoitrebachkhoa.herokuapp.com/api/bkuser")
    .then(res => {
      this.setState({ es: res.data});
    });
}

  render() {
      const event =()=>(
           <div className="container">
         <div className="calendar">
                <BigCalendar
                events={this.state.es}
                views={['month','day']}
                step={60}
                showMultiDayTimes
                defaultDate={new Date()}

                />
                </div>
                        </div>
                    
      );
        
    const home = ()=>{
        return (
          <div className="documents-wrap">
          <div className="clearfix-page"></div>
              <div className="container background-white"> 
                <div className="clearfix"></div>                   
                <div className="document-wrap-content">
                    <header className="panel-heading hvr-fade1 cover-heading">
                        <a>Trang cá nhân</a>
                        
                    </header>
                   
                    <Button animated>
                            <Button.Content visible>Đăng xuất</Button.Content>
                            <Button.Content hidden>
                                <Icon name='sign out' />
                            </Button.Content>
                    </Button>
                    

                     <Link to={{ pathname: `/user-panel/change-info`}}>
                    <Button animated>
                        <Button.Content visible>Tài khoản</Button.Content>
                        <Button.Content hidden>
                            <Icon name='key'/>
                        </Button.Content>
                    </Button>
                    </Link>
                    
                    <div className="articles">
                        <div className="admin-elements">
                            
                            <div className="row">
                                <div className="col-md-3 col-xs-6">
                                    <div className="document-article1">
                                        <Link to={{ pathname: `/user-panel/event`}}>
                                            <Reveal animated='move' instant>
                                                <Reveal.Content visible>
                                                    <a href="">Sự kiện</a>
                                                </Reveal.Content>
                                                <Reveal.Content hidden>
                                                    <Icon name='calendar' />
                                                </Reveal.Content>
                                            </Reveal> 
                                        </Link>    
                                    </div>
                                </div>
                                <div className="col-md-3 col-xs-6">
                                    <div className="document-article1">
                                        <Link to={{pathname: `/user-panel/feedback`}}>
                                            <Reveal animated='move' instant>
                                                <Reveal.Content visible>
                                                    <a href="">Phản hồi</a>
                                                </Reveal.Content>
                                                <Reveal.Content hidden>
                                                    <Icon name='inbox' />
                                                </Reveal.Content>
                                            </Reveal> 
                                        </Link>    
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                  </div>
              </div>
        </div>
        )

    }
        return (   
        <Switch>
          <Route exact path="/user-panel" component={home} />
          <Route exact path="/user-panel/event" component={event} />
          <Route exact path="/user-panel/feedback" component={FeedBack} />
          <Route exact path="/user-panel/change-info" component={ChangeInfo} /> 
        </Switch>
        ); 
    } 
}