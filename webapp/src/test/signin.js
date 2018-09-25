import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
class SignIn extends React.Component{
    constructor(props) {
        super(props);
       /// dinh nghia cac ham khoi tao
      
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
      
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
           data:[],
           
           
          
          
        };
       
      }
      //ham lay mssv tu form
      handleIdChange(e){
        this.setState({mssv:e.target.value})
      }
      //ham lay pass tu form
      handlePasswordChange(e){
        this.setState({pass:e.target.value})
      }
  handleSubmit(e){
    e.preventDefault();
    var {dispatch} = this.props;
    console.log("1233");
    axios.post('https://tuoitrebachkhoa.herokuapp.com/api/signIn', {username: this.state.mssv.trim(),password:this.state.pass.trim()})
    .then(res => {
      if(res.data === 'DANG_NHAP_THANH_CONG'){
        dispatch({type: 'LOG_IN', username: this.state.mssv.trim()});
     }else{

      }
    })
    .catch(err => console.log(err))
  }
  render(){
    return (
      <div>
        <form className="login100-form validate-form" onSubmit={ this.handleSubmit } method='post' action="/addname" >
                   <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter email: ex@abc.xyz">
                     <input className="input100" type="text"   id="inputEmail" name="MSSV" onChange={this.handleIdChange} placeholder="MSSV" required autofocus/>
                     <span className="focus-input100" />
                   </div>
                   <div className="wrap-input100 validate-input m-b-20" data-validate="Please enter password">
                     <span className="btn-show-pass">
                       <i className="fa fa fa-eye" />
                     </span>
                     <input className="input100"  onChange={this.handlePasswordChange} id="inputPassword" type="password" name="pass" placeholder="Mật khẩu" required/>
                     <span className="focus-input100" />
                   </div>
                   <div className="container-login100-form-btn">
                     <button className="login100-form-btn" type='submit'>
                       Đăng nhập
                     </button>
                    
                   </div>
                  
                 </form>
      </div>
    )
  }
}

export default connect()(SignIn);