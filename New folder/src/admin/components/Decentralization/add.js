import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
 class AddAdmin extends Component {
    constructor(props) {
        super(props);
       /// dinh nghia cac ham khoi tao
       this.handleAdminNameChange =this.handleAdminNameChange.bind(this);
       this.handleEmailChange =this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTelChange = this.handleTelChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCheckPassword = this.handleCheckPassword.bind(this);
        this.handleAdminSubmit = this.handleAdminSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        

        //this.hidePassword = this.hidePassword.bind(this);
        this.state = {
         data:[],
         
 
        };
       
      }
      //ham lay user name
      handleAdminNameChange(e){
        this.setState({adminname:e.target.value})
      }
      // hàm lay ten hien thi
      handleNameChange(e){
        this.setState({name:e.target.value})
      }
      //ham lay email
      handleEmailChange(e){
        this.setState({email:e.target.value})
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
        let email = this.state.email.trim();
        let adminname = this.state.adminname.trim();
        if (!name || !pass||!tel||!adminname||!email) {
          return;
        }
        else{
            this.handleAdminSubmit({email: email , admin_name:adminname ,display_name: name, password: pass, phone: tel});
            this.setState({adminname:'', name: '',tel:'', pass: '' ,repass:'',email:''});
            
        }
    }
      // ham xu li du lieu chuyen len serve
      handleAdminSubmit(admin) {
       ////chuyen hoa du lieu
        let admins = this.state.data;
        admin.id = Date.now();
        let newAdmin = admins.concat([admin]);
        this.setState({ data: newAdmin });
        //post len serve xu li
        axios.post(this.props.url, admin)
        .then(res => {
            if(res.data !='failed'){                
              this.setState({success: true})
            }
            else{this.setState({fail: true})}
          })
          .catch(err => {
            console.error(err);
            this.setState({ data: admins });
          });
      }
      
      
      
       
      
      render() {
          return (
            this.state.success? <Redirect to={'/Admin-panel/Phan-quyen'} /> :
              <div className="limiter">
              <div className="container-login100">
                <div className="wrap-login100 p-t-90 p-b-30">
                  <form className="login100-form validate-form" onSubmit={ this.handleSubmit }> 
                    <div className="clearfix"></div>          
                    <div className="text-center p-t-55 p-b-30">
                      <span className="txt1">
                        Tạo tài khoản mới
                      </span>
                    </div>
                    <div className="wrap-input100 validate-input m-b-16" >
                      <input className="input100" type="text"  name="adminname" onChange={this.handleAdminNameChange} placeholder="Tên đăng nhập" required autofocus/>               
                    </div>
                    <div className="wrap-input100 validate-input m-b-16" >
                      <input className="input100" type="text"  name="namedisplay" onChange={this.handleNameChange} placeholder="Tên hiển thị" required autofocus/>               
                    </div>
                    <div className="wrap-input100 validate-input m-b-16" >
                      <input className="input100" type="email"  name="email" onChange={this.handleEmailChange} placeholder="Email" required autofocus/>               
                    </div>
                    <div className="wrap-input100 validate-input m-b-16" >
                      <input className="input100" type="number"  name="tel" onChange={this.handleTelChange} placeholder="Số điện thoại" required autofocus/>  
                    </div>    
                    <div className="wrap-input100 validate-input m-b-20" data-validate="Please enter password">
                      <input className="input100"  onChange={this.handlePasswordChange} id="inputPassword" type="password" name="pass" placeholder="Mật khẩu" required/>
                    </div>
                    <div className="wrap-input100 validate-input m-b-20" data-validate="Please enter password">
                      <input className="input100"  onChange={this.handleCheckPassword} id="inputPassword" type="password" name="repass" placeholder="Nhập lại mật khẩu" required/>
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
                <div style={{'color':'red'}} hidden= {!this.state.fail}>
                      Tên đăng nhập đã được sử dụng.
                    </div>
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
export default AddAdmin;