import React, { Component } from 'react';
import { Grid, Row, Col, Carousel } from 'react-bootstrap';
import './right-bar.css';
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
       
class RightBar extends Component {
    constructor(props){
        super(props)
    }
    click(){

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
                        <button className="button-link hvr-glow">LỊCH LÀM VIỆC</button>
                    </div>
                    <div className="sidebar-link">
                        <button className="button-link hvr-glow">HỆ THỐNG VĂN BẢN</button>
                    </div>
                    
                    <div className="list_vertical">
                    <section className="accordation_menu">
                        <div>
                        <input id="label-1" name="lida" type="radio" defaultChecked />
                        <label htmlFor="label-1" style={{'text-align': 'center','font-size': '1.5em'}} id="item1"><i className="ferme"> </i>SỰ KIỆN<i className="icon-plus-sign i-right1" /><i className="icon-minus-sign i-right2" /></label>
                        <div className="content" id="a1">
                            <div className="scrollbar" id="style-2">
                            <div className="force-overflow">
                                <div class="view-all"><a href="#">Xem tất cả</a></div>
                                <div className="popular-post-grids">
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html"><img src="images/bus2.jpg" alt /></a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> The section of the mass media industry</a>
                                        <p>On Feb 25 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />3 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html"><img src="images/bus1.jpg" alt /></a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> Lorem Ipsum is simply dummy text printing</a>
                                        <p>On Apr 14 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />2 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html"><img src="images/bus3.jpg" alt /></a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html">There are many variations of Lorem</a>
                                        <p>On Jun 25 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />0 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html"><img src="images/bus4.jpg" alt /></a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html">Sed ut perspiciatis unde omnis iste natus</a>
                                        <p>On Jan 25 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />1 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                        
                    </section>
                    </div>
                </div>
                    
               
            );
        }
}        

export default RightBar;
