import React, { Component } from 'react';
import './documents.css';
import axios from 'axios';
import FaDownload from 'react-icons/lib/fa/download';
import FaEye from 'react-icons/lib/fa/eye';
import { Document, Page } from 'react-pdf';
class Documents extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data:[],
      numPages: null,
      pageNumber: 1,
    };
}

  componentDidMount(){
    axios.get(this.props.url)
    .then(res => {
      this.setState({ data: res.data});
      
    });
  }
 
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }
 
  render() {
    return(
    <div className="documents-wrap">
      <div className="clearfix-page"></div>
      <div className="container background-white">
          
        <div className="search-document">
          
          <form className="navbar-form">
            <div class="form-group select-form">
              <select class="form-control" id="sel1">
                <option>2014</option>
                <option>2015</option>
                <option>2016</option>
                <option>2017</option>
                <option selected>2018</option>
              </select>
            </div>
            <div className="input-group search-width">
              <input type="text" className="form-control" placeholder="Tên văn bản" name="ten-van-ban" />
              <div className="input-group-btn">
                <button className="btn btn-default" type="submit">
                  <i className="glyphicon glyphicon-search" />
                </button>
              </div>
            </div>
          </form>                                        
          
        </div> 
        <div className="clearfix"></div>
        {
          this.state.data.map(item =>
                            
                            
                            
                            
            <div className="document-wrap-content">
              <header className="panel-heading hvr-fade1 cover-heading">
                <a>{item.document_type}</a>
              </header>
              <div className="view-all style-all">
                <a href="#">Xem tất cả >>> </a>
              </div>
              <div className="articles">
                <div className="row">
                  {
                    item.document_list.map(element =>
                      <div className="col-md-6 col-xs-12">
                            <div className="document-article1">
                              <div className="row">
                                <div className="article-left col-md-3 col-xs-12">
                                    <a href="single.html"><img src={element.image} /></a>
                                </div>
                                <div className="article-right col-md-8 col-xs-12">
                                    <div className="document-title">
                                      <div className="doc-sub">Đăng ngày {element.postdate} <a className="span_link" href="#"><span className="glyphicon glyphicon-comment" />0 </a><a className="span_link" href="#"><span className="glyphicon glyphicon-eye-open" />{element.viewnumber} </a><a className="span_link" href="#"><span className="glyphicon glyphicon-thumbs-up" />{element.likenumber}</a></div>
                                      <a className="doc-title" href="single.html"> {element.title}</a>
                                      <div className="button-group">
                                        <a href="#"><button className="btn btn-info"> <FaEye/> Xem trước</button></a>
                                        <a href="#"><button className="btn btn-info"> <FaDownload/> Tải xuống</button></a>
                                      </div>
                                    </div>
                                    
                                </div>
                              </div>

                              
                            </div>
                      </div>
                    ) 
                  }
                </div>
              </div>
            </div>
          )
        }
          







        </div>
      </div>
    );
  }
}

export default Documents;
