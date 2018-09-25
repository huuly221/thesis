import React, { Component } from 'react';
import axios from 'axios';
import './userRegister.css';

export default class Register extends Component {
    constructor(props) {
        super(props);
       /// dinh nghia cac ham khoi tao
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
           data:[]
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
      // ham xu li du lieu chuyen len serve
      handleUserSubmit(user) {
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
      }
      
      
      render() {
          return (
            /// form
              <div className='f-lgin'>
              <form onSubmit={ this.handleSubmit } action="/addname">
                  <h2 className="form-signin-heading">Đăng ký</h2>
                  <label for="inputEmail" className="sr-only">Mssv</label>
                  <input type="text" onChange={this.handleIdChange} id="inputEmail" className="form-control" placeholder="Mssv" required autofocus />
                  <label for="inputPassword" className="sr-only">Mật khẩu</label>
                  <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Mật khẩu" required />
                  <input
                  className="btn btn-lg btn-primary btn-block"
                    type='submit' 
                    value='Post'/>
                  
              </form>
              </div>
          );
      }
}
