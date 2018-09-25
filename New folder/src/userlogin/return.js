import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Signup from './signup';
class Return extends Component {

constructor(props){
    super(props);
    this.state = {
       redirect: false,
   };
}


render() {

if(!sessionStorage.getItem('userData') || this.state.redirect){
    return (<Redirect to={'/Dangnhap'}/>)
}

return (
<div >

<Signup 
url='https://tuoitrebachkhoa.herokuapp.com/api/signup'
pollInterval={2000}/>

</div>
);
}
}
export default Return;