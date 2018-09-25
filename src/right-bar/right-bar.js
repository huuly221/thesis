import React, { Component } from 'react';
import {Redirect,Link,Route ,BrowserRouter as Router,Switch} from 'react-router-dom';
import './right-bar.css';

import axios from 'axios';


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
       
class RightBar extends Component {
    constructor(props){
        super(props)
        this.state = {
            event:3,
            data:[]
          }
          this.onclickHandle = this.onclickHandle.bind(this);
          this.stateOfevent = this.stateOfevent.bind(this);
          this.displayTitle = this.displayTitle.bind(this);
          this.convertStringToDateFormat = this.convertStringToDateFormat.bind(this);
        
    }
    onclickHandle(event){
        this.setState(event)
    }
    displayTitle(title){
        if(title.length >70)
        {
            return title.substring(0,70) +'...';
        }
        else{return title }
    }
    stateOfevent(event)
    {
        var end = new Date(event.endDate).getTime();
        var start = new Date(event.endDate).getTime();

        if(Date.now() >end)
        { return 'Đã kết thúc'}
        else if(Date.now() <start)
        { return 'Sắp diễn ra'}
        else { return 'Đang diễn ra'}

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
    componentDidMount(){
        axios.get("http://localhost:3001/api/eventdetail")
        .then(res => {
            const a = res.data.filter(item => item.category == "sự kiện");
            if(a.length >=5){
                var tmp = [];
                for (var i = 0; i < 5; i++) {
                    tmp.push(a[i]);
                }
                this.setState({data: tmp})
            }
            else{
                this.setState({data: a})
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
                <div className="right-bar">
                    
                    
                     
                    <div className="sidebar-link">
                    <input
                        className="button-link hvr-glow"
                        type='button'
                        value ='LỊCH LÀM VIỆC'
                        onClick={this.onclickHandle.bind(this,{event:2})} 
                         />  
                    </div>
                    {(this.state.event ===2)?
                    <div >
                        <h3>Lịch làm việc:</h3>
                        <p>Từ 7h00 - 17h00</p>  
                      </div>:null 
                      }  
                    <div className="sidebar-link">
                    <input
                        className="button-link hvr-glow"
                        type='button'
                        value ='SỰ KIỆN'
                        onClick={this.onclickHandle.bind(this,{event:3})} 
                         />  
                    </div>
                    {(this.state.event ===3)?
                    <div className="list_vertical">
                    <section className="accordation_menu">
                        <div>
                        
                        <div className="content" id="a1">
                            <div className="scrollbar" id="style-2">
                            <div className="force-overflow">
                                <div className="popular-post-grids">
                                {this.state.data.map(item =>
                                         <Link to={{ pathname: `/Sukien/${item._id}`}}>
                                        <div className="popular-post-grid">
                                        <div className="post-img">
                                        <img src={'http://localhost:3001/'+item.file} alt ='image' />
                                        </div>
                                        <div className="post-text">
                                        <p className="pp-title" > {this.displayTitle(item.title)}</p>
                                        <p>{this.stateOfevent({startDate:item.startDate,endDate:item.endDate})} </p>
                                        <p className="doc-sub">{this.convertStringToDateFormat(item.startDate)} - {this.convertStringToDateFormat(item.endDate)} </p>
                                        </div>
                                        <div className="clearfix" />
                                        </div>
                                        </Link>
                                 )}
                                    
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                        
                    </section>
                    </div>:null}
                </div>

                    
               
            );
        }
}        

export default RightBar;
