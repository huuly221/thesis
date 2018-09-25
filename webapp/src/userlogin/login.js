import React, { Component } from 'react';
import axios from 'axios';
import './main.css';
import './util.css';
import './fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import {connect} from 'react-redux';
import {PostData} from './postData';
import {Redirect} from 'react-router-dom';
import LoginG from './logingoogle';
import Wrong from './wronguser';
import { fail } from 'assert';
 class Login extends Component {
    constructor(props) {
        super(props);
       /// dinh nghia cac ham khoi tao
      
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
           data:[],
                 /////thuộc tính ban đầu
           
          
          
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
       //ham submit to hop du lieu gui len ham xu li
      handleSubmit(e) {
        e.preventDefault();
        let mssv = this.state.mssv.trim();
        let pass = this.state.pass.trim();
        if (!mssv || !pass) {
          return;
        }
        this.handleUserSubmit({ mssv: mssv, pass: pass });
        this.setState({ mssv: '', pass: '' });
      }
      // ham xu li du lieu chuyen len serve'
      handleUserSubmit(user) {
      
       ////chuyen hoa du lieu
       var {dispatch} = this.props; 
        let users = this.state.data;
        user.id = Date.now();
        let newUser = users.concat([user]);
        this.setState({ data: newUser });
        //post len serve xu li
        axios.post(this.props.url, user)
          .then(res => {
            if(res.data !='failed'){        
              sessionStorage.setItem("mssv",res.data);    
              dispatch({type: 'LOG_IN', mssv:res.data  });         
              this.setState({success: true})
            }
            else {
              sessionStorage.setItem("checklogin","Sai mssv hoặc password");  
              this.setState({fail: true})      ///// không thỏa đăng nhập
            }
          })
          .catch(err => {
            console.error(err);
            this.setState({ data: users });
          });
          
      }     
      
      render() {
        
                
      
            
           
          
          return (
            this.state.success? <Redirect to={'/'} /> : 
            
            /// form
              <div className="limiter">
              <div className="container-login100">
                <div className="wrap-login100 p-t-90 p-b-30">
                  <form className="login100-form validate-form" onSubmit={ this.handleSubmit } method='post' action="/addname" >
                   
                    <div className="text-center p-t-55 p-b-30">
                        <LoginG url='https://tuoitrebachkhoa.herokuapp.com/api/logingoogle'/>
                     
                    </div>
                    <div className="text-center p-t-55 p-b-30">
                    
                      <span className="txt1">
                        Đăng nhập tài khoản
                      </span>
                    </div>
                    <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter email: ex@abc.xyz">
                      <input className="input100" type="text" id="inputEmail" name="MSSV" onChange={this.handleIdChange} placeholder="MSSV" required autofocus/>
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
                  <div style={{'color':'red'}} hidden= {!this.state.fail}>
                      {sessionStorage.getItem("checklogin")} 
                    </div>
                
                  
                  
                </div>
              </div>
           
              
            </div>
          );
      }
}
export default connect()(Login);