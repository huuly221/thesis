import React, {Component} from 'react';
import {connect} from 'react-redux';
import GoogleLogin from 'react-google-login';
import {PostData} from './postData';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class LoginG extends Component {
constructor(props) {
    super(props);
       this.state = {
       loginError: false,
       redirect: false,
       email :''     
};
this.signup = this.signup.bind(this);
this.checkmail = this.checkmail.bind(this);

}

signup(res, type) {
     let postData;
     

    if (type === 'google' && res.w3.U3) {
    postData = {
      name: res.w3.ig,
      provider: type,
      email: res.w3.U3,
      provider_id: res.El,
      token: res.Zi.access_token,
      provider_pic: res.w3.Paa
    };
    this.setState({email:res.w3.U3})
    }

      if (postData) {
      PostData('/signup', postData).then((result) => {
        let responseJson = result;
        sessionStorage.setItem("userData", JSON.stringify(responseJson));
        this.setState({redirect: true});
      });
      } 
    var fullname = res.w3.ig 
    var firstname = fullname.substring(0,fullname.indexOf(' '));
    var lastname = fullname.substring(fullname.indexOf(' ') + 1)
    var nameVn = lastname +' '+ firstname;
    this.setState({nameVn:nameVn})
}


checkmail(mssv){
  var {dispatch} =this.props
  axios.post(this.props.url, {mssv})
          .then(res => {
            if(res.data !='failed'){
              console.log(res.data )
              sessionStorage.setItem("mssv",res.data); 
              dispatch({type: 'LOG_IN', mssv:res.data  });         
              this.setState({login: true})
            }
            else {
              sessionStorage.setItem("stack-mssv",mssv);
              sessionStorage.setItem("stack-name",this.state.nameVn)  ////////////////push mssv into router signup
              this.setState({signup: true})         ///// không thỏa đăng nhập
            }
          })
          .catch(err => {
            console.error(err);   
          });
}

render() {

  if ( this.state.redirect ||sessionStorage.getItem('userData') ) {
    var regex = /^[a-zA-Z0-9]+@hcmut.edu.vn$/
   
    if(regex.test(this.state.email)){
        var getmssv = this.state.email.substring(0,this.state.email.lastIndexOf("@"));
        this.checkmail(getmssv);
    }
    else{
      var res = ("Email ").concat(this.state.email,(" không hợp lệ."));
         sessionStorage.setItem("checklogin" ,res ); ///// use with router  
         this.setState({checkregex: true})  
    }
    
  }
 

const responseGoogle = (response) => {
    console.log("google console");
    console.log(response);
    this.signup(response, 'google');
}

return (
  this.state.login? <Redirect to={'/'} /> : 
  this.state.signup? <Redirect to={'/Dangki'} /> : 
  this.state.checkregex ? <Redirect to={'/login-with-google'} para ={sessionStorage.removeItem('userData')}/> :
<div className="row body">
<div className="medium-12 columns">
<div className="medium-12 columns">
<h2 id="welcomeText"></h2>



<GoogleLogin
clientId="899745502104-qh8m2ktne81o48p282sbcqtic0qrpgvf.apps.googleusercontent.com"
buttonText="Đăng kí mail sinh viên"
onSuccess={responseGoogle}
onFailure={responseGoogle}/>

</div>
   
<span >

 </span>
</div>
</div>
);
}
}
export default connect()(LoginG);