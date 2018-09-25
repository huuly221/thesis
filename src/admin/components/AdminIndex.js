import React, { Component } from 'react';
import { Button, Icon, Reveal } from 'semantic-ui-react';

import '../css/AdminIndex.css';
import axios from 'axios';
import FaDownload from 'react-icons/lib/fa/download';
import FaEye from 'react-icons/lib/fa/eye';
import { Document, Page } from 'react-pdf';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

class AdminIndex extends Component {
    constructor(props) {
        super(props);
        
        
    }
    
    render() {
        
        return(
            <div className="documents-wrap">
                <div className="clearfix-page"></div>
                <div className="container background-white"> 
                    <div className="clearfix"></div>                   
                    <div className="document-wrap-content">
                        <header className="panel-heading hvr-fade1 cover-heading">
                            <a>Trang cá nhân</a>
                            
                        </header>
                        
                        <Button animated>
                                <Button.Content visible>Đăng xuất</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='sign out' />
                                </Button.Content>
                        </Button>
                        <Button animated>
                            <Button.Content visible>Đổi mật khẩu</Button.Content>
                            <Button.Content hidden>
                                <Icon name='key'/>
                            </Button.Content>
                        </Button>
                        
                        <div className="articles">
                            <div className="all-Event">
                                <div>Tin Tức</div>
                            </div>
                            <div className="admin-elements">
                                <div className="row">
                                    <div className="col-md-3 col-xs-6">
                                        <div className="document-article1">
                                            <Link to={{pathname: `/Admin-panel/Dang-bai`}}>
                                                <Reveal animated='move' instant>
                                                    <Reveal.Content visible>
                                                        <a href="">Đăng bài</a>
                                                    </Reveal.Content>
                                                    <Reveal.Content hidden>
                                                        <Icon name='newspaper' />
                                                    </Reveal.Content>
                                                </Reveal> 
                                            </Link>    
                                        </div>
                                    </div>
                                    
                                                  
                                </div>
                            </div>
                        </div>
                        
                        <div className="articles">
                            <div className="all-Event">
                                <div>Văn bản</div>
                            </div>
                            <div className="admin-elements">
                                <div className="row">
                                    <div className="col-md-3 col-xs-6">
                                        <div className="document-article1">
                                            <Link to={{pathname: `/Admin-panel/Document-list`}}>
                                                <Reveal animated='move' instant>
                                                    <Reveal.Content visible>
                                                        <a href="">Văn bản</a>
                                                    </Reveal.Content>
                                                    <Reveal.Content hidden>
                                                        <Icon name='comments' />
                                                    </Reveal.Content>
                                                </Reveal>
                                            </Link>     
                                        </div>
                                    </div>  
                                                     
                                </div>
                            </div>
                        </div>

                        <div className="articles">
                            <div className="all-Event">
                                <div>Danh mục</div>
                            </div>
                            <div className="admin-elements">
                                <div className="row">
                                    <div className="col-md-3 col-xs-6">
                                        <div className="document-article1">
                                            <Reveal animated='move' instant>
                                                <Reveal.Content visible>
                                                    <a href="">Quản lý danh mục</a>
                                                </Reveal.Content>
                                                <Reveal.Content hidden>
                                                    <Icon name='settings' />
                                                </Reveal.Content>
                                            </Reveal>     
                                        </div>
                                    </div>  
                                    <div className="col-md-3 col-xs-6">
                                        <div className="document-article1">
                                        <Link to={{pathname: `/Admin-panel/event-manager`}}>
                                            <Reveal animated='move' instant>
                                                <Reveal.Content visible>
                                                    <a href="">Quản lý sự kiện</a>
                                                </Reveal.Content>
                                                <Reveal.Content hidden>
                                                    <Icon name='tasks' />
                                                </Reveal.Content>
                                            </Reveal>     
                                        </Link>
                                        </div>
                                    </div>                 
                                </div>
                            </div>
                        </div>





                        <div className="articles">
                            <div className="all-Event">
                                <div>Hình ảnh</div>
                            </div>
                            <div className="admin-elements">
                                <div className="row">
                                    <div className="col-md-3 col-xs-6">
                                        <div className="document-article1">
                                            <Reveal animated='move' instant>
                                                <Reveal.Content visible>
                                                    <a href="">Quản lý file</a>
                                                </Reveal.Content>
                                                <Reveal.Content hidden>
                                                    <Icon name='image' />
                                                </Reveal.Content>
                                            </Reveal>     
                                        </div>
                                    </div>                   
                                </div>
                            </div>
                        </div>





                        {(sessionStorage.getItem("is_root"))?
                        <div className="articles">
                            <div className="all-Event">
                                <div>Phân quyền</div>
                            </div>
                            <div className="admin-elements">
                                <div className="row">
                                    <div className="col-md-3 col-xs-6">
                                        <div className="document-article1">
                                        <Link to={{pathname: `/Admin-panel/Phan-quyen`}}>
                                            <Reveal animated='move' instant>
                                                <Reveal.Content visible>
                                                    <a href="">Phân quyền</a>
                                                </Reveal.Content>
                                                <Reveal.Content hidden>
                                                    <Icon name='sitemap' />
                                                </Reveal.Content>
                                            </Reveal>  
                                        </Link>   
                                        </div>
                                    </div>  
                                                  
                                </div>
                            </div>
                        </div>:null
                        }



                        <div className="articles">
                            <div className="all-Event">
                                <div>Phản hồi</div>
                            </div>
                            <div className="admin-elements">
                                <div className="row">
                                   
                                    <div className="col-md-3 col-xs-6">
                                    <Link to={{pathname: `/Admin-panel/Phan-hoi`}}>
                                        <div className="document-article1">
                                            <Reveal animated='move' instant>
                                                <Reveal.Content visible>
                                                    <a href="">Hộp thư phản hồi</a>
                                                </Reveal.Content>
                                                <Reveal.Content hidden>
                                                    <Icon name='inbox' />
                                                </Reveal.Content>
                                            </Reveal>     
                                        </div>
                                        </Link>
                                    </div>                 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminIndex;
