import React, { Component } from 'react';

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
        
        {/* content-section-starts-here */}
        <div className="main-body">
          <div className="wrap">
            <div className="BKNews-title">
              <div className="btn-BKNews">BK NEWS</div>
            </div>
            <div className="col-md-8 content-left">
              <div className="slider">
                <div className="callbacks_wrap">
                  <ul className="rslides" id="slider">
                    <li>
                      <img src="images/3.jpg" alt />
                      <div className="caption">
                        <a href="single.html">Lorem Ipsum is simply dummy text of the printing and typesetting industry</a>
                      </div>
                    </li>
                    <li>
                      <img src="images/2.jpg" alt />
                      <div className="caption">
                        <a href="single.html">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</a>
                      </div>
                    </li>
                    <li>
                      <img src="images/1.jpg" alt />
                      <div className="caption">
                        <a href="single.html">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="articles">
                <header className="panel-heading hvr-fade1 cover-heading  ">
                  <a>Công tác tuyên giáo</a>
                </header>
                <div className="article">
                  <div className="article-left">
                    <a href="single.html"><img src="images/article1.jpg" /></a>
                  </div>
                  <div className="article-right">
                    <div className="article-title">
                      <p>On Feb 25, 2015 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />0 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />104 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-thumbs-up" />52</a></p>
                      <a className="title" href="single.html"> The section of the mass media industry that focuses on presenting</a>
                    </div>
                    <div className="article-text">
                      <p>The standard chunk of Lorem Ipsum used since the 1500s. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" exact original.....</p>
                     
                      <div className="clearfix" />
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="article">
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
                </div>
                <div className="article">
                  <div className="article-left">
                    <a href="single.html"><img src="images/article3.jpg" /></a>
                  </div>
                  <div className="article-right">
                    <div className="article-title">
                      <p>On Jun 21, 2015 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />0 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />181 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-thumbs-up" />89</a></p>
                      <a className="title" href="single.html">There are many variations that focuses on presenting</a>
                    </div>
                    <div className="article-text">
                      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.....</p>
                      
                      <div className="clearfix" />
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="article">
                  <div className="article-left">
                    <a href="single.html"><img src="images/article4.jpg" /></a>
                  </div>
                  <div className="article-right">
                    <div className="article-title">
                      <p>On Jan 17, 2015 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />1 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />144 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-thumbs-up" />74</a></p>
                      <a className="title" href="single.html">Lorem ipsum dolor sit amet, consectetur adipiscing elit</a>
                    </div>
                    <div className="article-text">
                      <p>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born.....</p>
                    
                      <div className="clearfix" />
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="article">
                  <div className="article-left">
                    <iframe width="100%" src="https://www.youtube.com/embed/GxXxvJYUpxk" frameBorder={0} allowFullScreen />
                  </div>
                  <div className="article-right">
                    <div className="article-title">
                      <p>On Mar 14, 2015 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />0 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />250 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-thumbs-up" />68</a></p>
                      <a className="title" href="single.html">On the other hand, we denounce with righteous indignation</a>
                    </div>
                    <div className="article-text">
                      <p>It is a long established fact that a reader will be distracted by the readable.....</p>
                    
                      <div className="clearfix" />
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
              <div className="life-style">
                <header className="panel-heading hvr-fade1 cover-heading  ">
                  <a>Công tác tuyên giáo</a>
                </header>
                <div className="life-style-grids">
                  <div className="life-style-left-grid">
                    <a href="single.html"><img src="images/l1.jpg" alt /></a>
                    <a className="title" href="single.html">It is a long established fact that a reader will be distracted.</a>
                  </div>
                  <div className="life-style-right-grid">
                    <a href="single.html"><img src="images/l2.jpg" alt /></a>
                    <a className="title" href="single.html">There are many variations of passages of Lorem Ipsum available.</a>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="life-style-grids">
                  <div className="life-style-left-grid">
                    <a href="single.html"><img src="images/l3.jpg" alt /></a>
                    <a className="title" href="single.html">Contrary to popular belief, Lorem Ipsum is not simply random text.</a>
                  </div>
                  <div className="life-style-right-grid">
                    <a href="single.html"><img src="images/l4.jpg" alt /></a>
                    <a className="title" href="single.html">Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</a>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
              <div className="sports-top">
                <div className="s-grid-left">
                  <div className="cricket">
                  <header className="panel-heading hvr-fade1 cover-heading  ">
                  <a>Công tác tuyên giáo</a>
                </header>
                    <div className="c-sports-main">
                      <div className="c-image">
                        <a href="single.html"><img src="images/bus1.jpg" alt /></a>
                      </div>
                      <div className="c-text">
                        <h6>Lorem Ipsum</h6>
                        <a className="power" href="single.html">It is a long established fact that a reader</a>
                        <p className="date">On Feb 25, 2015</p>
                        
                        <div className="clearfix" />
                      </div>
                      <div className="clearfix" />
                    </div>
                    <div className="s-grid-small">
                      <div className="sc-image">
                        <a href="single.html"><img src="images/bus2.jpg" alt /></a>
                      </div>
                      <div className="sc-text">
                        <h6>Lorem Ipsum</h6>
                        <a className="power" href="single.html">It is a long established fact that a reader</a>
                        <p className="date">On Mar 21, 2015</p>
                        
                        <div className="clearfix" />
                      </div>
                      <div className="clearfix" />
                    </div>
                    <div className="s-grid-small">
                      <div className="sc-image">
                        <a href="single.html"><img src="images/bus3.jpg" alt /></a>
                      </div>
                      <div className="sc-text">
                        <h6>Lorem Ipsum</h6>
                        <a className="power" href="single.html">It is a long established fact that a reader</a>
                        <p className="date">On Jan 25, 2015</p>
                        
                        <div className="clearfix" />
                      </div>
                      <div className="clearfix" />
                    </div>
                    <div className="s-grid-small">
                      <div className="sc-image">
                        <a href="single.html"><img src="images/bus4.jpg" alt /></a>
                      </div>
                      <div className="sc-text">
                        <h6>Lorem Ipsum</h6>
                        <a className="power" href="single.html">It is a long established fact that a reader</a>
                        <p className="date">On Jul 19, 2015</p>
                        
                        <div className="clearfix" />
                      </div>
                      <div className="clearfix" />
                    </div>
                  </div>
                </div>
                <div className="s-grid-right">
                  <div className="cricket">
                  <header className="panel-heading hvr-fade1 cover-heading  ">
                  <a>Công tác tuyên giáo</a>
                </header>
                    <div className="c-sports-main">
                      <div className="c-image">
                        <a href="single.html"><img src="images/tec1.jpg" alt /></a>
                      </div>
                      <div className="c-text">
                        <h6>Lorem Ipsum</h6>
                        <a className="power" href="single.html">It is a long established fact that a reader</a>
                        <p className="date">On Apr 22, 2015</p>
                       
                        <div className="clearfix" />
                      </div>
                      <div className="clearfix" />
                    </div>
                    <div className="s-grid-small">
                      <div className="sc-image">
                        <a href="single.html"><img src="images/tec2.jpg" alt /></a>
                      </div>
                      <div className="sc-text">
                        <h6>Lorem Ipsum</h6>
                        <a className="power" href="single.html">It is a long established fact that a reader</a>
                        <p className="date">On Jan 19, 2015</p>
                       
                        <div className="clearfix" />
                      </div>
                      <div className="clearfix" />
                    </div>
                    <div className="s-grid-small">
                      <div className="sc-image">
                        <a href="single.html"><img src="images/tec3.jpg" alt /></a>
                      </div>
                      <div className="sc-text">
                        <h6>Lorem Ipsum</h6>
                        <a className="power" href="single.html">It is a long established fact that a reader</a>
                        <p className="date">On Jun 25, 2015</p>
                       
                        <div className="clearfix" />
                      </div>
                      <div className="clearfix" />
                    </div>
                    <div className="s-grid-small">
                      <div className="sc-image">
                        <a href="single.html"><img src="images/tec4.jpg" alt /></a>
                      </div>
                      <div className="sc-text">
                        <h6>Lorem Ipsum</h6>
                        <a className="power" href="single.html">It is a long established fact that a reader</a>
                        <p className="date">On Jul 19, 2015</p>
                        
                        <div className="clearfix" />
                      </div>
                      <div className="clearfix" />
                    </div>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
            <div className="col-md-4 side-bar">
              
              
                    <section className="accordation_menu">
                    <div>
                        <input id="label-2" name="video" type="radio" defaultChecked/>
                        <label htmlFor="label-2" style={{'text-align': 'center','font-size': '1.5em'}} id="item2"><i className="icon-leaf" id="i2" />VIDEO<i className="icon-plus-sign i-right1" /><i className="icon-minus-sign i-right2" /></label>
                        <div className="content-BKnew" id="a2">
                            <div className="scrollbar" id="style-2">
                            <div className="force-overflow">
                                <div class="view-all"><a href="#">Xem tất cả</a></div>
                                <div className="popular-post-grids">
                                    <div className="popular-post-grid">
                                        <Slider {...settings}>
                                            <div>
                                                <iframe width="250px" height="200px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                            </div>
                                            <div>
                                                <iframe width="250px" height="200px" src="https://www.youtube.com/embed/RY3SOP5xwaU" frameBorder={0} allowFullScreen />
                                            </div>
                                            <div>
                                                <iframe width="250px" height="200px" src="https://www.youtube.com/embed/4sNysMT3OHU" frameBorder={0} allowFullScreen />
                                            </div>
                                        </Slider>
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> The section of the mass media industry</a>
                                        <p>On Feb 25 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />3 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> Lorem Ipsum is simply dummy text printing</a>
                                        <p>On Apr 14 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />2 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html">There are many variations of Lorem</a>
                                        <p>On Jun 25 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />0 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html">Sed ut perspiciatis unde omnis iste natus</a>
                                        <p>On Jan 25 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />1 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> Lorem Ipsum is simply dummy text printing</a>
                                        <p>On Apr 14 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />2 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> Lorem Ipsum is simply dummy text printing</a>
                                        <p>On Apr 14 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />2 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> Lorem Ipsum is simply dummy text printing</a>
                                        <p>On Apr 14 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />2 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> Lorem Ipsum is simply dummy text printing</a>
                                        <p>On Apr 14 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />2 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> Lorem Ipsum is simply dummy text printing</a>
                                        <p>On Apr 14 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />2 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> Lorem Ipsum is simply dummy text printing</a>
                                        <p>On Apr 14 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />2 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="popular-post-grid">
                                        <div className="post-img">
                                        <a href="single.html">
                                            <iframe width="70px" height="70px" src="https://www.youtube.com/embed/LGMn_yi_62k" frameBorder={0} allowFullScreen />
                                        </a>
                                        </div>
                                        <div className="post-text">
                                        <a className="pp-title" href="single.html"> Lorem Ipsum is simply dummy text printing</a>
                                        <p>On Apr 14 <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />2 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />56 </a></p>
                                        </div>
                                        <div className="clearfix" />
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        
                        
                    </section>
              
              <div className="clearfix" />
            </div>
            <div className="clearfix" />
          </div>
        </div>
        {/* content-section-ends-here */}
        {/* footer-section-starts-here */}
        
      </div>
    );
  }
}

export default BKNews;
