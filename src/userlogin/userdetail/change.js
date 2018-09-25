import React, { Component } from 'react';
import axios from 'axios';
import "./change.css";

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
        if (e.target.value == '' || e.target.value == undefined){
          this.setState({Err:''})
          this.setState({repass:''})
        }
        else if (this.state.pass && e.target.value === this.state.pass )
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
        console.log(this.state.tel)
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
        axios.post('http://localhost:3001/api/changeInfoUser',{case:check, info: info, mssv:sessionStorage.getItem("mssv") })
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
        axios.get(`http://localhost:3001/api/changeInfoUser?mssv=${mssv}`)
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
                  <header className="panel-heading hvr-fade1 cover-heading">
                        <a>Chỉnh sửa trang cá nhân</a>
                    </header>
                    {(!sessionStorage.getItem("admin"))?
                    <div className="articles">
                      <div className="row">
                        <div className="col-md-8 col-xs-12">
                          <div className="admin-elements" id="field-account">
                            <div className="object-field">
                              <div className="row">
                                <div className="col-md-3 col-xs-6 field-readonly field-label">
                                      Tên hiển thị
                                </div>
                                {(this.state.nameUpdate==false)
                                ?
                                <div className="col-md-6 col-xs-6 field-readonly">
                                  {this.state.display_name}
                                </div>
                                :
                                <div className="col-md-6 col-xs-6">
                                  <form onSubmit={ this.handleUpdate }>
                                    <div className="form-control">
                                    <input className="form-group"
                                        name="display-name"
                                        type='text'
                                        defaultValue={this.state.display_name}   
                                        onChange={this.handleNameChange} 
                                        required autofocus/>
                                    </div>
                                  </form>
                                              
                                </div>
                                }
                                <div className="col-md-3 col-xs-6">
                                  {
                                      (this.state.nameUpdate==false)

                                  ? <input name="display-name" class="btn btn-info" type='button' value ='Chỉnh sửa' onClick={ this.updateName} />
                                  : 
                                  <div className="btn-group">
                                    <input name="display-name" class="btn btn-danger" type='button' value ='Hủy' onClick={ this.cancelUpdate} />
                                    <input type='button' class="btn btn-info" value='Hoàn tất' onClick={ this.handleUpdate} />
                                  </div>
                                  } 
                                </div>
                              </div>
                            </div>

                            <div className="object-field">
                              <div className="row">
                                <div className="col-md-3 col-xs-6 field-readonly field-label">
                                  MSSV
                                </div>
                                <div className="col-md-6 col-xs-6 field-readonly">
                                  {this.state.mssv}
                                </div>
                              </div>
                            </div>
                            <div className="object-field">
                              <div className="row">
                                <div className="col-md-3 col-xs-6 field-readonly field-label">
                                  Email
                                </div>
                                <div className="col-md-6 col-xs-6 field-readonly">
                                  {this.state.email}
                                </div>
                              </div>
                            </div>
                            <div className="object-field">
                              <div className="row" >
                                <div className="col-md-3 col-xs-6 field-readonly field-label">
                                  Số điện thoại
                                </div>
                                {(this.state.phoneUpdate==false)
                                ?
                                <div className="col-md-6 col-xs-6 field-readonly">
                                  {this.state.phone}
                                </div>
                                :
                                <div className="col-md-6 col-xs-6">
                                  <form onSubmit={ this.handleUpdate }>
                                    <div className="form-control">
                                    <input className="form-group"
                                        name="display-name"
                                        type='number'
                                        defaultValue={this.state.phone}   
                                        onChange={this.handleTelChange} 
                                        required autofocus/>
                                    </div>
                                  </form>
                                              
                                </div>
                                }
                                <div className="col-md-3 col-xs-6">
                                  {
                                      (this.state.phoneUpdate==false)

                                  ? <input name="display-name" class="btn btn-info" type='button' value ='Chỉnh sửa' onClick={ this.updatePhone} />
                                  : 
                                  <div className="btn-group">
                                    <input name="display-name" class="btn btn-danger" type='button' value ='Hủy' onClick={ this.cancelUpdate} />
                                    <input type='button' class="btn btn-info" value='Hoàn tất' onClick={ this.handleUpdate} />
                                  </div>
                                  } 
                                </div> 
                              </div>
                            </div>
                        
                            <div className="object-field">
                              <div className="row" >
                                <div className="col-md-3 col-xs-6 field-readonly field-label">
                                Mật khẩu
                                </div>
                                {(this.state.passUpdate==false)
                                ?
                                <div className="col-md-6 col-xs-6 field-readonly">
                                  <p>*********</p>
                                </div>
                                :
                                <div className="col-md-6 col-xs-6">
                                  <form onSubmit={ this.handleUpdate }>
                                    <div className="form-control">
                                      <input className="form-group"
                                          name="display-name"
                                          
                                          placeholder="Mật khẩu mới"
                                          id="inputPassword" 
                                          type="password"
                                          name="pass"   
                                          onChange={this.handlePasswordChange} 
                                          required autofocus/>
                                    </div>
                                    <div className="form-control">
                                      
                                      <input className="form-group"
                                          name="display-name"
                                          type='password'
                                          placeholder="Nhập lại mật khẩu"   
                                          onChange={this.handleCheckPassword} 
                                          required autofocus/>
                                      <label for="pas">{this.state.Err}</label>
                                    </div>
                                  </form>
                                              
                                </div>
                                }
                                <div className="col-md-3 col-xs-6">
                                  {
                                      (this.state.passUpdate==false)

                                  ? <input name="display-name" class="btn btn-info" type='button' value ='Chỉnh sửa' onClick={ this.updatePass} />
                                  : 
                                  <div className="btn-group">
                                    <input name="display-name" class="btn btn-danger" type='button' value ='Hủy' onClick={ this.cancelUpdate} />
                                    <input type='button' class="btn btn-info" value='Hoàn tất' onClick={ this.handleUpdate} />
                                  </div>
                                  } 
                                </div> 
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </div>:null}
                    <div className="clearfix"></div> 
                  </div>
                </div>
              </div>
              

            
          );
      }
}
const Check = () => (
  <div style={{'margin-bottom': '20px'}}>
    <img src='https://vignette.wikia.nocookie.net/daftpunk/images/2/2a/Check.png/revision/latest?cb=20140708054958' alt="V" style={{width: '23px', height: '23px'}} />
    
  </div>
);
const EX = () => (
  <div style={{'margin-bottom': '20px'}}>
    <img src='https://www.shredfly.com/images/cross.png' alt="X" style={{width: '20px', height: '20px'}} />
    
  </div>
);
export default ChangeInfo;



