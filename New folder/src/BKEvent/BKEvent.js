import React, { Component } from 'react';
import { Grid, Row, Col, Carousel } from 'react-bootstrap';
import axios from 'axios';
import './BKEvent.css'
import Slider from 'react-slick';
import para1 from '../image/parallax1.jpg';
import para2 from '../image/parallax2.jpg';
import para3 from '../image/parallax3.jpg';
import Pagination from "react-js-pagination";
import {Redirect,Link,Route ,BrowserRouter as Router,Switch} from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


export default class BKEvent extends Component {
        constructor(props) {
            super(props);
            this.state = {
              activePage: 2,
              chuyen: false,
              data:[],
              data2:[],
              currentPage: 1,
              todosPerPage: 5
            };
             // this.handlePageChange = this.handlePageChange.bind(this);
            this.convertStringToDateFormat = this.convertStringToDateFormat.bind(this);
            this.handleClick = this.handleClick.bind(this);
            this.parseHTML = this.parseHTML.bind(this);
            this.register = this.register.bind(this);
            this.func1 = this.fucn1.bind(this);
            
            
        }
        // handlePageChnage(pageNumber) {
        
        //     this.setState({activePage: pageNumber});
        //   }
        handleClick(event) {
            this.setState({
              currentPage: event
    
            });
          }
          componentDidMount(){
            axios.get("https://tuoitrebachkhoa.herokuapp.com/api/eventdetail")
            .then(res => {
                const a = res.data.filter(item => item.category == "sự kiện");
                console.log(this.state.data);
                this.setState({data: a})
            });
          }
    
          parseHTML(stringtext){
            var a= document.getElementsByClassName('content-artile-detail').parseHTML(stringtext);
            return a;
            //var x=document.getElementById("demo");
            //t.innerHTML = string;
            
          }
          convertStringToDateFormat(string){
            var a= new Date(string);
            var day = a.getDate();
            var month = a.getMonth();
            var year = a.getFullYear();
            var hour = a.getHours();
            if (a.getMinutes() < 10) {
              var min = "0"+a.getMinutes();
            }
            else{
              var min = a.getMinutes();
            }
            
    
            var dateformat = day+'/'+month+'/'+year+ ' '+ hour+':'+min;
            console.log(dateformat);
            return dateformat;
          }
          register(userevent){
            ////chuyen hoa du lieu 
                    
            userevent.id = Date.now();
            console.log(userevent)
            axios.post("https://tuoitrebachkhoa.herokuapp.com/api/eventsuser",userevent)
            .then(res => {
              
                
            });
            
          }
          fucn1(userevent){
            ////chuyen hoa du lieu 
                    
            alert('gregergerrere');
            console.log(userevent)
            axios.post("https://tuoitrebachkhoa.herokuapp.com/api/eventsuser",userevent)
            .then(res => {
              
                
            });
             
          }
    
      render() {
    
        const { data2,data, currentPage, todosPerPage } = this.state;
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const listchan = data.slice(indexOfFirstTodo, indexOfLastTodo);
    
        const paginationdata = listchan.filter((data)=>{
          return (data._id %2!=0)
        });
        const details = ({match}) =>(data.filter(data=>
          data._id == match.params.id
        ).map((data)=>{
         return (  
           
            <div className="documents-wrap">
                   <input
                    name="display-names"
                    type='button'
                    value ='Đăng kí'
                    onClick={this.register.bind(this,{codeevent:data._id, event:data.title,startdate:data.startdate,enddate:data.enddate,})} 
                    />     
                     <input
                    name="display-names"
                    type='button'
                    value ='Đăng nhaapkj'
                    onClick={this.fucn1} 
                    />     
                <div className="clearfix-page"></div>
                <div className="container background-white"> 
                  <div className="clearfix"></div>                   
                  <div className="document-wrap-content">
                    <h1 className="title-article-detail">{data.title}</h1>
                    <div className="main-image">
                      <img className="thumbnail" src={"../"+data.file}/>
                    </div>
                    <div className="well">
                      {data.description}
                    </div>
                    <hr/>
                    <div className="content-artile-detail">
                      { ReactHtmlParser(data.content) }
                    </div>
                    <hr/>
                    
                    <div className="article-footer">
                      <div className="article-poster">Người đăng: {data.poster}</div>
                      <div className="article-date">
                      Ngày đăng: {this.convertStringToDateFormat(data.date)}
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className="clearfix-page"></div>
            </div>
         )
        }));
    
         const RenderTodos =()=>( 
          paginationdata.map((item, index) => {          ///mang  
              return (
                <Link to={{ pathname: `/Sukien/${item._id}`}}>
                <div className="article" >
                  <div className="row">
                    <div className="col-md-3 col-sx-12">
                      <div className="list-left">
                        <a href="single.html"><img src={item.file} /></a>
                        <div className="timing">
                            <div id="table">
                                <div className="tr">
                                    <div className="td1">Ngày bắt đầu:</div>
                                    <div className="td">{this.convertStringToDateFormat(item.startdate)}</div>
                                                                            
                                </div>
                                <div className="tr">
                                    <div className="td1">Ngày kết thúc:</div>
                                    <div className="td">{this.convertStringToDateFormat(item.enddate)}</div>      
                                </div>    
                            </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-9 col-sx-12">
                      <a href="#">
                        <div className="list-right">
                          <div className="article-title">
                            <p className="doc-sub">Đăng ngày {this.convertStringToDateFormat(item.date)} <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />0 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />24 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-thumbs-up" />12</a></p>
                            <a className="doc-title" href="single.html"> {item.title}</a>
                          </div>
                          <div className="article-text">
                            <p>{item.description}...</p>       
                          </div>
                        </div>
                      </a>
                    </div>   
                  </div>
                </div>  
                </Link>                                    
              )
            })
          );
    
    
            const Event = () => (
              
                <div className="BKEvent">
                  <Grid>
                    <div>
                        <div id="myCarousel" className="carousel slide" data-ride="carousel">
                            <ol className="carousel-indicators">
                            <li data-target="#myCarousel" data-slide-to={0} className="active" />
                            <li data-target="#myCarousel" data-slide-to={1} />
                            <li data-target="#myCarousel" data-slide-to={2} />
                            </ol>
                            <div className="carousel-inner">
                            <div className="item active">
                                <img src="./images/parallax1.jpg" alt="Los Angeles" style={{width: '100%', height: '510px'}} />
                                <div className="carousel-caption">
                                <h4 className="readmore"><a href="#">Xem thêm >>></a></h4>
                                <h3>Los Angeles</h3>
                                <p>LA is always so much fun!</p>
                                
                                </div>
                            </div>
                            <div className="item">
                                <img src="./images/parallax2.jpg" alt="Chicago" style={{width: '100%', height: '510px'}} />
                                <div className="carousel-caption">
                                <h4 className="readmore"><a href="#">Xem thêm >>></a></h4>
                                <h3>Chicago</h3>
                                <p>Thank you, Chicago!</p>
                                </div>
                            </div>
                            <div className="item">
                                <img src="./images/parallax3.jpg" alt="New York" style={{width: '100%', height: '510px'}} />
                                <div className="carousel-caption">
                                <h4 className="readmore"><a href="#">Xem thêm >>></a></h4>
                                <h3>New York</h3>
                                <p>We love the Big Apple!</p>
                                </div>
                            </div>
                            </div>
                            <a className="left carousel-control" href="#myCarousel" data-slide="prev">
                            <span className="glyphicon glyphicon-chevron-left" />
                            <span className="sr-only">Previous</span>
                            </a>
                            <a className="right carousel-control" href="#myCarousel" data-slide="next">
                            <span className="glyphicon glyphicon-chevron-right" />
                            <span className="sr-only">Next</span>
                            </a>
                        </div>

                    </div>



                    <div className="articles">
                      <header className="all-Event">
                        Sự kiện mới nhất 
                      </header>
                      <RenderTodos />
                      <div id="page-numbers">
                        <div>
                            <Pagination
                              activePage={this.state.currentPage}
                              itemsCountPerPage={this.state.todosPerPage}
                              totalItemsCount={this.state.data.length}
                              pageRangeDisplayed={4}
                              onChange={this.handleClick}
                              
                            />
                        </div>
                      </div>
                    </div>
                  </Grid>
                </div>
              
            );
            
            // Logic for displaying page numbers  
            return (   
              <div>
            <Switch>
              <Route exact path="/Sukien" component={Event} />
              <Route path="/Sukien/:id" component={details} />
            </Switch>
          </div>
      
    );
    }  
    }     