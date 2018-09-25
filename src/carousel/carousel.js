import React, { Component } from 'react';
import { Grid, Row, Col, Carousel } from 'react-bootstrap';
import './carousel.css';
import Slider from 'react-slick';
import para1 from '../image/parallax1.jpg';
import para2 from '../image/parallax2.jpg';
import para3 from '../image/parallax3.jpg';





export default class Carousels extends Component {
  render() {
    
    return (
     
              <div>
                  <div id="myCarousel" className="carousel slide" data-ride="carousel">
                    <ol className="carousel-indicators">
                      <li data-target="#myCarousel" data-slide-to={0} className="active" />
                      <li data-target="#myCarousel" data-slide-to={1} />
                      <li data-target="#myCarousel" data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                      <div className="item active">
                        <img src={para1} alt="Los Angeles" style={{width: '100%', height: '510px'}} />
                        <div className="carousel-caption">
                          <h4 className="readmore"><a href="#">Xem thêm >>></a></h4>
                          <h3>Los Angeles</h3>
                          <p>LA is always so much fun!</p>
                          
                        </div>
                      </div>
                      <div className="item">
                        <img src={para2} alt="Chicago" style={{width: '100%', height: '510px'}} />
                        <div className="carousel-caption">
                          <h4 className="readmore"><a href="#">Xem thêm >>></a></h4>
                          <h3>Chicago</h3>
                          <p>Thank you, Chicago!</p>
                        </div>
                      </div>
                      <div className="item">
                        <img src={para3} alt="New York" style={{width: '100%', height: '510px'}} />
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
         
    );
  }
}        