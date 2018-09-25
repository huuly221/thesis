import React, { Component } from 'react';
import { Grid, Row, Col, Carousel } from 'react-bootstrap';
import axios from 'axios';
import './BKEvent.css'
import moment from 'moment';
import Pagination from "react-js-pagination";
import Listdetails from "./seedetail"
import {Redirect,Link,Route ,BrowserRouter as Router,Switch} from 'react-router-dom';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
class BKEvent extends Component {
  constructor(props) {
      super(props);
      this.state = {
        activePage: 2,
        chuyen: false,
        data:[],
        currentPage: 1,
        todosPerPage: 5
      };
       // this.handlePageChange = this.handlePageChange.bind(this);
      this.convertStringToDateFormat = this.convertStringToDateFormat.bind(this);
      this.convertStringToStartendDateFormat = this.convertStringToStartendDateFormat.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.parseHTML = this.parseHTML.bind(this);
      this.registerEvent = this.registerEvent.bind(this);
      this.thenShow = this.thenShow.bind(this);
      this.cancelRegisterEvent = this.cancelRegisterEvent.bind(this);
  }
  
  handleClick(event) {
      this.setState({
        currentPage: event

      });
    }
    componentDidMount(){
      axios.get("http://localhost:3001/api/eventdetail")
      .then(res => {
          const a = res.data.filter(item => item.category == "sự kiện" && item.sub_category ==  "năm học");
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
    convertStringToStartendDateFormat(string){
      var a= new Date(string);
      var day = a.getDate();
      var month = a.getMonth()+1;
      var year = a.getFullYear();

      var dateformat = day+'/'+month+'/'+year;
      
      return dateformat;
    }
    registerEvent(userevent){
     
      ////chuyen hoa du lieu 
      if(userevent.mssv === null){
        
        if (window.confirm("Để đăng kí sự kiện mời đăng nhập")) {
             this.setState({login:true});
            } 
      } 
      else{
        
        var end = new Date(userevent.endDate).getTime();
        var date = new Date("6/25/2018").getTime(); 
        var date1 = new Date("6/26/2018").getTime();
        console.log("dat1",date1-date)
        console.log("dat2",date1)
      if(Date.now()  >  end)
      { 
        alert("Sự kiện đã kết thúc")
      }
      else{
      axios.post("http://localhost:3001/api/eventsuser",userevent)
      .then(res=>{
        if(res.data =='duplicate_event')
        {alert("Bạn đã đăng kí sự kiện này rồi!!")
         }
        else{
        alert("Đăng kí thành công")
        }

      });
    }
    }
    
    }
    thenShow(date){
      const will = "Sự kiện sắp diễn ra";
      const ed = "Sự kiện đã kết thúc";
      const ing= "Sự kiện đang diễn ra";
      var startDate = new Date(date.startDate).getTime();
      var  endDate= new Date(date.endDate).getTime();
        if(Date.now() < startDate)
        {return "Sự kiện sắp diễn ra"}
        
        else if(Date.now() > endDate){return "Sự kiện đã kết thúc"}
        else{ return "Sự kiện đang diễn ra"}
    }
    seedetail(){
      this.setState({seedetail:true})
    }
    cancelRegisterEvent(cancel){
     
        var end = new Date(cancel.endDate).getTime();
        if(Date.now()  >  end)
        { 
          alert("Sự kiện đã kết thúc")
        }
        else{
        axios.delete(`http://localhost:3001/api/eventsuser?mssv=${cancel.mssv}&code_event=${cancel.code_event}`)
        .then(res=>{
        if(res.data ==='not_registry')
        {alert("Sự kiện này chưa đăng kí!!")
         }
        else{
        alert("Hủy thành công")
        }

       });
    }
    


    }
render() {

  const { data, currentPage, todosPerPage } = this.state;
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
    (this.state.login ==true)?<Redirect to="/Dangnhap"/>:
      <div className="documents-wrap">  
          <div className="clearfix-page"></div>
          <div className="container background-white"> 
            <div className="clearfix"></div>                   
            <div className="document-wrap-content">
             <h2>{this.thenShow({startDate:data.startDate,endDate:data.endDate})}</h2>
             <p className="doc-sub">Từ  {this.convertStringToDateFormat(data.startDate)} đến {this.convertStringToDateFormat(data.endDate)} </p>
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
              {(sessionStorage.getItem('admin')===null)?
              <div>
              <input
              name="display-name"   
              class="btn btn-info" 
              type='button'
              value ='Đăng kí sự kiện'
              onClick={this.registerEvent.bind(this,{code_event:data._id, title:data.title,startDate:data.startDate,endDate:data.endDate,mssv:sessionStorage.getItem("mssv")})} 
              />
              
              
               <input
              name="display-name" 
              class="btn btn-danger"
              type='button'
              value ='Hủy đăng kí'
              hidden= {sessionStorage.getItem("mssv")===null}
              onClick={this.cancelRegisterEvent.bind(this,{code_event:data._id, title:data.title,startDate:data.startDate,endDate:data.endDate,mssv:sessionStorage.getItem("mssv")})} 
              />
              </div>
              :null
              } 
              {(sessionStorage.getItem('admin')!=null)?
               
              <input
              name="display-name"   
              class="btn btn-primary" 
              type='button'
              value ='Danh sách thành viên đăng kí'
              onClick={this.seedetail.bind(this)} 
              />:null
              } 
              
              <div className="article-footer">
                <div className="article-poster">Người đăng: {data.poster}</div>
                <div className="article-date">
                Ngày đăng: {this.convertStringToDateFormat(data.date)}
                </div>
              </div>
            </div>
            {this.state.seedetail?<Listdetails Id ={data._id}/>:null
            }
          </div>
          <div className="clearfix-page"></div>
      </div>
   )
  }));

   const RenderTodos =()=>( 
    paginationdata.map((item, index) => {          ///mang  
        return (
          <Link to={{ pathname: `/Sukien-nam-hoc/${item._id}`}}>
          <div className="article" >
            <div className="row">
              <div className="col-md-3 col-sx-12">
                <div className="list-left">
                  <a href="single.html"><img src={'http://localhost:3001/'+item.file} /></a>
                  <div className="timing">
                      <div id="table">
                          <div className="tr">
                              <div className="td1">Ngày bắt đầu:</div>
                              <div className="td">{this.convertStringToStartendDateFormat(item.startDate)}</div>
                                                                      
                          </div>
                          <div className="tr">
                              <div className="td1">Ngày kết thúc:</div>
                              <div className="td">{this.convertStringToStartendDateFormat(item.endDate)}</div>      
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
                          <h3>Bach Khoa</h3>
                          <p>Thank you, Tp.Ho Chi Minh!</p>
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
                  Sự kiện năm học
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
       
          
      <Switch>
        <Route exact path="/Sukien-nam-hoc" component={Event} />
        <Route path="/Sukien-nam-hoc/:id" component={details} />
        
      </Switch>
   

);
}  
}     
export default BKEvent;