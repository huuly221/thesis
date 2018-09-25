import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import PostView from "../components/PostView/PostView";
import AdminIndex from '../components/AdminIndex';
import UploadFile from '../components/UploadFile/UploadFile';
import ListDataTable from '../components/ListDataTable/ListDataTable';



export default class AdminRouters extends Component {
       
   
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
        const Upload = () => {
            return <div className="clear-component">
               <ListDataTable 
                />
             </div>
        };
        return (
            <Switch>
                <Route exact path="/Admin-panel" component={Adminhome} />
                <Route path="/Admin-panel/Dang-bai" component={DangBai} />
                <Route path="/Admin-panel/Upload" component={Upload} />

            </Switch>
        );
    }
}