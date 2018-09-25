
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Routers from './Routers/Routers';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import '../node_modules/semantic-ui-css/semantic.css';
import '../node_modules/hover.css/css/hover-min.css';
import '../node_modules/slick-carousel/slick/slick.css';
import '../node_modules/slick-carousel/slick/slick-theme.css';
import GoogleMapReact from 'google-map-react';
import MapKhoa from './contact/contact';
import BKEvent from './BKEvent/BKEvent';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CKEditors from './admin/components/CKEditor/CKEditors';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
var {Provider} = require('react-redux');
var redux =require('redux');
var mssv =(state =null,action) =>{  ///type of action 
    switch (action.type){
        case 'LOG_IN': 
            return action.mssv;
        case 'LOG_OUT':  
            return null;
        default: 
            return state;
    }
}
var reducer =redux.combineReducers({mssv});
var store = redux.createStore(reducer);
if(sessionStorage.getItem("mssv")!=null){
  store.dispatch({type: 'LOG_IN', mssv:sessionStorage.getItem("mssv")  });
}


//import '../public/ckeditor/ckeditor';
ReactDOM.render(<Provider store={store}><Routers /></Provider>, document.getElementById('root'));
registerServiceWorker();



/*
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import HomePage  from './test/HomePage';
import Nav from './test/Nav';
import Account  from './test/Account';
import Transaction  from './test/Transaction';
import Main from './test/Main';
import {Redirect} from 'react-router-dom';
import { BrowserRouter as Router, Route, Link,Switch } from "react-router-dom";
import {Provider} from 'react-redux';
var redux =require('redux');
var username =(state = null,action) =>{  ///type of action 
    switch (action.type){
        case 'LOG_IN': 
            return action.username;
        case 'LOG_OUT':  
            return null;
        default: 
            return state;
    }
}
var isLoggedIn = () =>{
  if(store.getState().username === null)
  return(<Redirect to="/"/>)
   else return(<Transaction />)
}
var reducer =redux.combineReducers({username});
var store = redux.createStore(reducer);
console.log(store.getState());
//store.dispatch({type:'LOG_IN',username:1412352})
console.log(store.getState());
ReactDOM.render(
  <Provider store={store}>
  <Router>
    <div>
        <Main/>
        <Route exact path="/" component={HomePage}/>
        <Route path="/account" component={Account}/>
        <Route path="/transaction"  render={ () => (isLoggedIn() )}/>
    </div>
    </Router>
    </Provider>
  ,
  document.getElementById('root')
);
registerServiceWorker();
*/
  


/*import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';

ReactDOM.render(
  <CommentBox
    url='https://tuoitrebachkhoa.herokuapp.com/api/comments'
    pollInterval={2000} />,
  document.getElementById('root')
);
*/

  
 