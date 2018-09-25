import React, { Component } from 'react';
import { Grid, Row, Col, Carousel} from 'react-bootstrap';
import './new.css'
import Slider from 'react-slick';
import axios from 'axios';
import Pagination from "react-js-pagination";
import  Pagi from './pagination.js';
import {Redirect,Link,Route ,BrowserRouter as Router,Switch} from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
//import Newsdetails from './../newdetails/newsdetail';
import Footer from './../footer/footer';
export default class News extends Component {
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
        axios.get("http://localhost:3001/api/eventdetail")
        .then(res => {
            const a = res.data.filter(item => item.category == "tin tức");
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
        var month = a.getMonth()+1;
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
                    
            <div className="clearfix-page"></div>
            <div className="container background-white"> 
              <div className="clearfix"></div>                   
              <div className="document-wrap-content">
                <h1 className="title-article-detail">{data.title}</h1>
                <div className="main-image">
                  <img className="thumbnail" src={"http://localhost:3001/"+data.file}/>
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
            <Link to={{ pathname: `/Tintuc/${item._id}`}}>
            <div className="article" >
              <div className="row">
                <div className="col-md-3 col-sx-12">
                  <div className="list-left">
                    <a href="single.html"><img src={'http://localhost:3001/'+item.file} /></a>
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


        const New = () => (
          
            <div className="BKEvent">
              <Grid>
                <div className="articles">
                  <header className="all-Event">
                    Tin Tức Mới Nhất
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
          <Route exact path="/Tintuc" component={New} />
          <Route path="/Tintuc/:id" component={details} />
        </Switch>
      </div>
  
);
}  
}     