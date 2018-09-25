import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import PostView from "../components/PostView/PostView";
import AdminIndex from '../components/AdminIndex';
import UploadFile from '../components/UploadFile/UploadFile';
import ListDataTable from '../components/ListDataTable/ListDataTable';
import Decen from '../components/Decentralization/decentralization';
import {Redirect} from 'react-router-dom';
import DocumentList from "../components/DocumentManager/DocumentList/DocumentList";
import AddAdmin from '../components/Decentralization/add';
import Modify from '../components/Decentralization/modify';
import FeedBack from '../components/res-feedback/res-feedback';
class AdminRouters extends Component {
    constructor(props) {
        super(props); 
        this.state = {  };
        
        
        this.isRoot = this.isRoot.bind(this);
            
    
    }
    isRoot = () =>{   ////////check login in user detail page
        if(sessionStorage.getItem("is_root") === null)
         return(<Redirect to="/Admin-panel"/>)
         else return(<Decen />)
      }
   
    render() {
        const Adminhome = () =>  {
            return  <AdminIndex 
               />
            
        };
        const DangBai = () => {
            return <div className="clear-component">
               <PostView 
                />
             </div>
        };
        const UploadDocument = () => {
            return <div className="clear-component">
                <DocumentList 
                />
            </div>
        }
        const Upload = () => {
            return <div className="clear-component">
               <ListDataTable 
                />
             </div>
        };
        const Add = () => {
            return (
            <div className="clear-component">
               <AddAdmin 
                url='http://localhost:3001/api/admin/signup'
                />
             </div>)
        };
        const Modi = () => {
            return (<div className="clear-component">
               <Modify 
                url='http://localhost:3001/api/bkdocument'
                />
             </div>)
             }
       
        return (
            <Switch>
                <Route exact path ="/Admin-panel" component={Adminhome} />
                <Route exact path ="/Admin-panel/Dang-bai" component={DangBai} />
                <Route exact path ="/Admin-panel/Phan-hoi" component={FeedBack} />
                <Route exact path ="/Admin-panel/Upload" component={Upload} />
                <Route exact path ="/Admin-panel/Phan-quyen"  render={ () => (this.isRoot() )}/>
                <Route exact path="/Admin-panel/Phan-quyen/Add-admin" component={Add} />
                <Route exact path="/Admin-panel/Phan-quyen/Modify-admin" component={Modi} />
                <Route exact path ="/Admin-panel/Document-list" component={UploadDocument} />  
            </Switch>
        );
    }
}
export default  AdminRouters;