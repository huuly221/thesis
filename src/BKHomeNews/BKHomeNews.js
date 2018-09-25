import React, { Component } from 'react';
import {Redirect,Link,Route ,BrowserRouter as Router,Switch} from 'react-router-dom';
import axios from 'axios';
import './style.css';
import Slider from 'react-slick';



function SampleNextArrow(props) {
    const {className, style, onClick} = props
    return (
      <div
        className={className}         
        style={{...style, display: 'block', background: 'grey',borderRadius: '100%'}}
        onClick={onClick}
      ></div>
    );
  }
  
  function SamplePrevArrow(props) {
    const {className, style, onClick} = props
    return (
      <div
        className={className}
        style={{...style, display: 'block', background: 'grey',borderRadius: '100%'}}
        onClick={onClick}
      ></div>
    );
  }      
class BKNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      data1:[],
      
    };
      this.convertStringToDateFormat = this.convertStringToDateFormat.bind(this);
      this.displayTitle = this.displayTitle.bind(this);
      this.displayDescription = this.displayDescription.bind(this);
      
    
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
displayDescription(description){
  if(description.length >180)
  {
      return description.substring(0,180) +'...';
  }
  else{return description }
}
displayTitle(title){
  if(title.length >20)
  {
      return title.substring(0,26) +'...';
  }
  else{return title }
}
componentDidMount(){
  axios.get("http://localhost:3001/api/eventdetail")
  .then(res => {
      var intro = res.data.filter(item => item.category == "giới thiệu");
      if(intro.length >=5){
          var tmp = [];
          for (var i = 0; i < 5; i++) {
              tmp.push(intro[i]);
          }
          this.setState({data: tmp})
      }
      else{
          this.setState({data: intro})
      }
      var news = res.data.filter(item => item.category == "tin tức");
      if(news.length >=5){
          var tmp = [];
          for (var i = 0; i < 5; i++) {
              tmp.push(news[i]);
          }
          this.setState({data1: tmp})
      }
      else{
          this.setState({data1: news})
      }
      
      
      
  });
  
}

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow:1 ,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      accessibility: true,
      arrows: true,
      swipeToSlide: true,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      infinite: true,
      fade: true,
    };
    return (
      <div className="all">
        {console.log(this.state.  data)}
        {/* content-section-starts-here */}
        <div className="main-body">
          <div className="wrap">
            <div className="BKNews-title">
              <div className="btn-BKNews">BK NEWS</div>
            </div>
            <div className="col-md-8 content-left">
              
              <div className="articles">
                <header className="panel-heading hvr-fade1 cover-heading  ">
                  <a>Giới thiệu</a>
                </header>
                      {this.state.data.map(item =>
                       <Link to={{ pathname: `/Gioithieu/${item._id}`}}>
                      <div className="article">
                      <div className="article-left">
                      <img src= {'http://localhost:3001/'+item.file} alt='image'/>
                      </div>
                      <div className="article-right">
                        <div className="article-title">
                          <p>{this.convertStringToDateFormat(item.date)}</p>
                          <a className="title" href="single.html"> {this.displayTitle(item.title)}</a>
                        </div>
                        <div className="article-text">
                          <p>{this.displayDescription(item.description)}</p>
                        
                          <div className="clearfix" />
                        </div>
                      </div>
                      <div className="clearfix" />
                    </div>
                    </Link>
                    )
                    }
                {/*<div className="article">
                  <div className="article-left">
                    <iframe width="100%" src="https://www.youtube.com/embed/mbDg4OG7z4Y" frameBorder={0} allowFullScreen />
                  </div>
                  <div className="article-right">
                    <div className="article-title">
                      <p>On Apr 11, 2015 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />2 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />54 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-thumbs-up" />18</a></p>
                      <a className="title" href="single.html">Contrary to popular belief, Lorem Ipsum is not simply random</a>
                    </div>
                    <div className="article-text">
                      <p>It is a long established fact that a reader will be distracted by the readable.....</p>
                      
                      <div className="clearfix" />
                    </div>
                  </div>
                  <div className="clearfix" />
                  </div>*/}
                
              </div>
              <div className="life-style">
                <header className="panel-heading hvr-fade1 cover-heading  ">
                  <a>Tin tức</a>
                </header>
               
                {this.state.data1.map(item =>
                 <Link to={{ pathname: `/Tintuc/${item._id}`}}>
                      <div className="article">
                      <div className="article-left">
                      <img src= {'http://localhost:3001/'+item.file} alt='image'/>
                      </div>
                      <div className="article-right">
                        <div className="article-title">
                          <p>{this.convertStringToDateFormat(item.date)}</p>
                          <a className="title" href="single.html"> {this.displayTitle(item.title)}</a>
                        </div>
                        <div className="article-text">
                          <p>{this.displayDescription(item.description)}</p>
                        
                          <div className="clearfix" />
                        </div>
                      </div>
                      <div className="clearfix" />
                    </div>
                    </Link>
                    )
                    }
              </div>
              
                
            </div>
            <div className="col-md-4 side-bar">
              
              
                    
                    
              
              <div className="clearfix" />
            </div>
            <div className="clearfix" />
          </div>
        </div>
       
        
      </div>
    );
  }
}

export default BKNews;
