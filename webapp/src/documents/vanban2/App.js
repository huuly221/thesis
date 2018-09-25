import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './blog.css';
import { Document, Page } from 'react-pdf';
class App extends Component {
  
  render() {
    return (
        <div className="container">
        
        <div className="search">
        <input />
        <div className="select">
        <select>
  <option value="volvo">2014</option>
  <option value="saab">2015</option>
  <option value="opel">2016</option>
  <option value="audi">2017</option>
  <option value="audi">2018</option>
</select>
</div>
        </div> 
              <div className="row">          
      <div>
      <div className="col-md-4">
          <div className="tieude">
            <h2>Thông Báo</h2>
          </div>
          <div className="noidungthi">
            <ul className="recent-post-list">
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="sample.pdf" target="blank" className="thumb-holder pull-left">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="sample.pdf" target="blank">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="tieude">
            <h2>Biểu Mẫu</h2>
          </div>
          <div className="noidungthi">
            <ul className="recent-post-list">
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="thumb-holder pull-left">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}           
            </ul>	
          </div>
        </div>
        <div className="col-md-4">
          <div className="tieude">
            <h2>Khác</h2>
          </div>
          <div className="noidungthi">
            <ul className="recent-post-list">
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="sample.pdf" className="thumb-holder pull-left">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
              <li className="sidebar-recent-post-item">
                <div className="media">
                  <a href="#" className="image-post">
                    <img alt className="size-image" src="../images/2.jpg" />
                  </a>
                  <div className="media-body">
                    <div className="posted-date"><a href="#">Văn bản 1</a></div> 
                    <div className="posted-date">July 12 2014</div>
                    <div className="posted-date"><a href="#"><button className="button5 button6"> Xem trước</button></a></div>
                  </div>
                </div>
              </li>{/* /.sidebar-recent-post-item */}
            </ul>	
          </div>
        </div>
      </div>
        
      </div>
        </div>
    );
  }
}

export default App;
