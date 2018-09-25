import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './main.css';
import './util.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
 class Signup extends Component {
    constructor(props) {
        super(props);
       /// dinh nghia cac ham khoi tao
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTelChange = this.handleTelChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCheckPassword = this.handleCheckPassword.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.seePassword = this.seePassword.bind(this);
        //this.hidePassword = this.hidePassword.bind(this);
        this.state = {
         data:[],
         
           
        };
       
      }
      //ham lay tên tu form
      handleNameChange(e){
        this.setState({name:e.target.value})
      }
      //hàm lấy số điên thoại
      handleTelChange(e){
        this.setState({tel:e.target.value})
      }
      //ham lay pass tu form
      handlePasswordChange(e){
        this.setState({pass:e.target.value})
      }
      handleCheckPassword(e){
        if(this.state.pass && e.target.value === this.state.pass )
        {
          this.setState({repass:this.state.pass})             ///////re-enter to confirm password
          this.setState({Err:(<Check/>)})
        }
        else{
        this.setState({Err:(<EX/>)})
        this.setState({repass:''})
        
       }
      }
       //ham submit to hop du lieu gui len ham xu li
    handleSubmit(e) {
        e.preventDefault();
        let name = this.state.name.trim();
        let tel = this.state.tel.trim();
        let pass = this.state.repass.trim();
        if (!name || !pass||!tel) {
          return;
        }
        else{
          if(sessionStorage.getItem("stack-mssv")){
            var mssv =sessionStorage.getItem("stack-mssv")
            var email = mssv +"@hcmut.edu.vn";   /// get eamil from logingoogle to signup
            this.handleUserSubmit({email: email , mssv:mssv ,display_name: name, password: pass, phone: tel });
            this.setState({ name: '',tel:'', pass: '' ,repass:''});
           }
           this.setState({complete:true});
        }
    }
      // ham xu li du lieu chuyen len serve
      handleUserSubmit(user) {
        var {dispatch} = this.props; 
       ////chuyen hoa du lieu
        let users = this.state.data;
        user.id = Date.now();
        let newUser = users.concat([user]);
        this.setState({ data: newUser });
        //post len serve xu li
        axios.post(this.props.url, user)
          .catch(err => {
            console.error(err);
            this.setState({ data: users });
          });
          console.log(this.state.data);
          sessionStorage.setItem("mssv",sessionStorage.getItem("stack-mssv"));    
          dispatch({type: 'LOG_IN', mssv:sessionStorage.getItem("stack-mssv") });  
      }
      
      /*componentDidMount(){
        axios.get(this.props.url)
        .then(res => {
          this.setState({ data: res.data });
          
        });
      }*/
      seePassword(){
        this.setState({option :'test'});
      }
          /*
      hidePassword(){
        this.setState({option :'password'});
      }*/
      
      render() {
          return (
            /// form
            this.state.complete? <Redirect to={'/'} /> :
              <div className="limiter">
              <div className="container-login100">
                <div className="wrap-login100 p-t-90 p-b-30">
                  <form className="login100-form validate-form" onSubmit={ this.handleSubmit }  > 
                    <div className="clearfix"></div>          
                    <div className="text-center p-t-55 p-b-30">
                      <span className="txt1">
                        Tạo tài khoản mới
                      </span>
                    </div>
                    <div className="wrap-input100 validate-input m-b-16" >
                      <input className="input100" type="text"  name="namedisplay" onChange={this.handleNameChange} placeholder="Tên hiển thị" required autofocus/>
                      <span className="focus-input100" />
                    </div>
                    <div className="wrap-input100 validate-input m-b-16" >
                      <input className="input100" type="number"  name="tel" onChange={this.handleTelChange} placeholder="Số điện thoại" required autofocus/>
                      <span className="focus-input100" />
                    </div>
                    
                    <div className="wrap-input100 validate-input m-b-20" data-validate="Please enter password">
                      <input className="input100"  onChange={this.handlePasswordChange} id="inputPassword" type="password" name="pass" placeholder="Mật khẩu" required/>
                      <span className="focus-input100" />
                      <span className="btn-show-pass">
                        
                        
                      </span>
                    </div>
                    <div className="wrap-input100 validate-input m-b-20" data-validate="Please enter password">
                    
                      <input className="input100"  onChange={this.handleCheckPassword} id="inputPassword" type="password" name="repass" placeholder="Nhập lại mật khẩu" required/>
                      <span className="focus-input100" />
                      
                    </div>
                    <div>
                        {this.state.Err}
                        
                      </div>
                    <div className="container-login100-form-btn">
                      <button className="login100-form-btn" type='submit'>
                        Tạo tài khoản 
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          );
      }
}
const Check = () => (
  <div style={{'margin-bottom': '20px'}}>
    <img src='images/check.png' alt="V" style={{width: '23px', height: '23px'}} />
    <span style={{'color': '#3498DB','margin-left': '10px'}}>Mật khẩu đã khớp</span>
  </div>
);
const EX = () => (
  <div style={{'margin-bottom': '20px'}}>
    <img src='images/x-tick.gif' alt="X" style={{width: '20px', height: '20px'}} />
    <span style={{'color': 'red', 'margin-left': '10px'}}>Mật khẩu chưa khớp</span>
  </div>
);
export default connect()(Signup);