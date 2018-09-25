import React, { Component } from 'react';
import { Button, Icon, Reveal } from 'semantic-ui-react';
import AddAmin from './add';
import Modify from './modify';
import '../../css/AdminIndex.css';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";

class Decentralization extends Component {
    constructor(props) {
        super(props);
        
        
    }
    
    render() {
        const TabDecen =() =>{
            return(
            <div className="articles">
                <div className="admin-elements">
                    <div className="row">
                        <div className="col-md-3 col-xs-6">
                            <div className="document-article1">
                                <Link to={{pathname: `/Admin-panel/Phan-quyen/Add-admin`}}>
                                    <Reveal animated='move' instant>
                                        <Reveal.Content visible>
                                            <a href="">Thêm admin</a>
                                        </Reveal.Content>
                                        <Reveal.Content hidden>
                                            <Icon name='add' />
                                        </Reveal.Content>
                                    </Reveal> 
                                </Link>    
                            </div>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <div className="document-article1">
                                <Link to={{pathname: `/Admin-panel/Phan-quyen/Modify-admin`}}>
                                    <Reveal animated='move' instant>
                                        <Reveal.Content visible>
                                            <a href="">Chỉnh sửa</a>
                                        </Reveal.Content>
                                        <Reveal.Content hidden>
                                            <Icon name='edit' />
                                        </Reveal.Content>
                                    </Reveal> 
                                </Link>        
                            </div>
                        </div>             
                    </div>
                </div>
            </div>)
        }
        const Add = () => {
            return <div className="clear-component">
               <AddAmin 
                url='https://tuoitrebachkhoa.herokuapp.com/api/admin/signup'
                />
             </div>
        };
        const Modi = () => {
            return <div className="clear-component">
               <Modify 
                url='https://tuoitrebachkhoa.herokuapp.com/api/bkdocument'
                />
             </div>
        };
        
        return(
            <div className="documents-wrap">
                <div className="clearfix-page"></div>
                <div className="container background-white"> 
                    <div className="clearfix"></div>                   
                    <div className="document-wrap-content">
                        <Link to={{pathname: `/Admin-panel/Phan-quyen`}}>
                        <header className="panel-heading hvr-fade1 cover-heading">
                            <a>Phân Quyền</a>
                            
                        </header>
                        </Link>
                       
                        <Switch>
                        <Route exact path="/Admin-panel/Phan-quyen" component={TabDecen} />
                        <Route  path="/Admin-panel/Phan-quyen/Add-admin" component={Add} />
                        <Route  path="/Admin-panel/Phan-quyen/Modify-admin" component={Modi} />
                        </Switch>
                        
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Decentralization;
