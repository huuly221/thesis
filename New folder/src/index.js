
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
var display_name =(state =null,action) =>{  ///type of action 
    switch (action.type){
        case 'LOG_IN': 
            return action.display_name;
        case 'LOG_OUT':  
            return null;
        default: 
            return state;
    }
}
var reducer =redux.combineReducers({display_name});
var store = redux.createStore(reducer);
if(sessionStorage.getItem("display_name")!=null){
  store.dispatch({type: 'LOG_IN', display_name:sessionStorage.getItem("display_name")  });
}


//import '../public/ckeditor/ckeditor';
ReactDOM.render(<Provider store={store}><Routers /></Provider>, document.getElementById('root'));
registerServiceWorker();




  
 