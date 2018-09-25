import React, { Component } from 'react';
import axios from 'axios';

 class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
          nameUpdate: false,
          passUpdate: false,
          phoneUpdate: false,
 
         };
       /// dinh nghia cac ham khoi tao
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTelChange = this.handleTelChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleCheckPassword = this.handleCheckPassword.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updatePhone = this.updatePhone.bind(this);
        this.updatePass = this.updatePass.bind(this);
        this.cancelUpdate =this.cancelUpdate.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        
       
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
          this.setState({repass:this.state.pass})           
          this.setState({Err:(<Check/>)})
        }
        else{
        this.setState({Err:(<EX/>)})
        this.setState({repass:''})
        
       }
      }
      


      updateName(e) {
        e.preventDefault();
        this.setState({ nameUpdate: !this.state.nameUpdate ,passUpdate: false, phoneUpdate: false});
      }
      updatePhone(e) {
        e.preventDefault();
        this.setState({ phoneUpdate: !this.state.phoneUpdate,passUpdate: false, nameUpdate: false  });
      }
      updatePass(e) {
        e.preventDefault();
        this.setState({ passUpdate: !this.state.passUpdate,nameUpdate: false, phoneUpdate: false });
      }
      cancelUpdate(e){
        e.preventDefault();
        this.setState({
          nameUpdate: false,
          passUpdate: false,
          phoneUpdate: false});
      }
      handleUpdate(e){
        e.preventDefault();
        var check ="";
        var info;
        
        if(this.state.nameUpdate && this.state.name)
        {
          info = this.state.name;
          check= "display_name";
          this.state.data.display_name = info;
        }
         else if(this.state.phoneUpdate && this.state.tel){
           info = this.state.tel;
           check ="phone";
           this.state.data.phone = info;
            
         }
         else if(this.state.passUpdate && this.state.repass) {
          info = this.state.repass;
          check= "password";
        }
        if(check !="" && info && sessionStorage.getItem("mssv")){
        axios.post('https://tuoitrebachkhoa.herokuapp.com/api/changeInfoUser',{case:check, info: info, mssv:sessionStorage.getItem("mssv") })
        .then(
          this.setState({
            nameUpdate: false,
            passUpdate: false,
            phoneUpdate: false,
            display_name: this.state.data.display_name,
            phone: this.state.data.phone,
          })
        )
        .catch(err => {
          console.error(err);
        });
        }
        
      }
      
    
      componentDidMount() {
        if(sessionStorage.getItem("mssv"))
        { var mssv = sessionStorage.getItem("mssv")
        axios.get(`https://tuoitrebachkhoa.herokuapp.com/api/changeInfoUser?mssv=${mssv}`)
          .then(res => {
            this.setState({ data: res.data });
            this.setState({display_name: this.state.data.display_name})
            this.setState({mssv: this.state.data.mssv})
            this.setState({email: this.state.data.email})
            this.setState({phone: this.state.data.phone})   
          })
        }
      }
       
      
      render() {
          return (
              
            <div className="documents-wrap">
            <div className="clearfix-page"></div>
                <div className="container background-white"> 
                  <div className="clearfix"></div>                   
                  <div className="document-wrap-content">
                  <div className="articles">
                        <div className="admin-elements">
                <div className="row">
                  <div className="row" >
                          <div className="col-md-3 col-xs-6">
                          Tên hiển thị
                          </div>
                          {this.state.nameUpdate==false
                          ?
                          <div className="col-md-3 col-xs-6">
                          {this.state.display_name}
                          </div>
                          :
                          <div className="col-md-3 col-xs-6">
                            <form onSubmit={ this.handleUpdate }>
                                <input className="form-group"
                                   name="display-name"
                                  type='text'
                                  value = {this.state.display_name}
                                  defaultValue={this.state.display_name}
                                  onChange={this.handleNameChange} 
                                   required autofocus/>
                                  </form>
                          </div>
                        }
                          <div className="col-md-3 col-xs-6">
                          <input name="display-name"type='button'value ='update'onClick={ this.updateName} />
                          
                          </div>
                   </div>
                  </div>

                    <div className="row">
                          <div className="col-md-3 col-xs-6">
                          MSSV
                          </div>
                          <div className="col-md-3 col-xs-6">
                          {this.state.mssv}
                          </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3 col-xs-6">
                        Email
                        </div>
                        <div className="col-md-3 col-xs-6">
                        {this.state.email}
                        </div>
                  </div>
                  <div className="row">
                  <div className="row" >
                          <div className="col-md-3 col-xs-6">
                          Số điện thoại
                          </div>
                          <div className="col-md-3 col-xs-6">
                          {this.state.phone}
                          </div>
                          <div className="col-md-3 col-xs-6">
                          <input name="display-name"type='button'value ='update'onClick={ this.updatePhone}  />
                          </div>
                   </div>
                      <div className="row" >
                      { (this.state.phoneUpdate)
                            ? (<form onSubmit={ this.handleUpdate }>
                                <input
                                   name="display-name"
                                  type='number'
                                  onChange={this.handleTelChange} 
                                  placeholder="Số điện thoại" required autofocus/>
                                  <input
                                    name="display-name"
                                  type='button'
                                  value ='Hủy'
                                  onClick={ this.cancelUpdate} 
                                  />
                                <input
                                  type='submit'
                                  value='Update' />
                              </form>)
                            : null}
                      </div>
                  </div>
                  
                  <div className="row">
                  <div className="row" >
                          <div className="col-md-3 col-xs-6">
                           Mật khẩu
                          </div>
                          <div className="col-md-3 col-xs-6">
                          <p>*********</p>
                          </div>
                          <div className="col-md-3 col-xs-6">
                          <input name="display-name"type='button'value ='update'onClick={ this.updatePass} />
                          </div>
                   </div>
                      <div className="row" >
                      { (this.state.passUpdate)
                            ? (<div>
                            <form onSubmit={ this.handleUpdate }>
                                <input 
                                 onChange={this.handlePasswordChange}
                                  id="inputPassword" type="password"
                                   name="pass" placeholder="Mật khẩu" required autofocus/>
                                    <input 
                                     onChange={this.handleCheckPassword}
                                      id="inputPassword" type="password" 
                                      name="repass" placeholder="Nhập lại mật khẩu" required autofocus/>
                                      
                                    <input
                                    name="display-name"
                                    type='button'
                                    value ='Hủy'
                                    onClick={ this.cancelUpdate} 
                                  />
                                    <input
                                    type='submit'
                                    value='Update' />
                              </form>
                              <span>
                              {this.state.Err}
                            </span>
                            </div>
                            )
                            : null}
                      </div>
                  </div>
              </div>
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
    
  </div>
);
const EX = () => (
  <div style={{'margin-bottom': '20px'}}>
    <img src='images/x-tick.gif' alt="X" style={{width: '20px', height: '20px'}} />
    
  </div>
);
export default ChangeInfo;



