import React, { Component } from 'react';
import axios from 'axios';


 class Login extends Component {
    constructor(props) {
        super(props);
       /// dinh nghia cac ham khoi tao
      
        this.nameChange = this.nameChange.bind(this);
        this.subjectChange = this.subjectChange.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
           data:[],
                 /////thuộc tính ban đầu
           
          
          
        };
       
      }
     
      nameChange(e){
        this.setState({name:e.target.value})
      }
      subjectChange(e){
        this.setState({subject:e.target.value})
      }
     
      emailChange(e){
        this.setState({email:e.target.value})
      }
      contentChange(e){
        this.setState({content:e.target.value})
      }
       //ham submit to hop du lieu gui len ham xu li
      handleSubmit(e) {
        e.preventDefault();
        let name = this.state.name.trim();
        let email = this.state.email.trim();
        let subject = this.state.subject.trim();
        let content = this.state.content.trim();
        if (!name || !email||!subject ||!content) {
          return;
        }
        this.handleUserSubmit({ name: name, email: email,subject: subject,content: content });
        this.setState({ name: '', email: '' , subject: '' ,content: '' });
      }
      // ham xu li du lieu chuyen len serve'
      handleUserSubmit(feedback) {
        feedback.id = Date.now();
        //post len serve xu li
        axios.post(this.props.url, feedback)
          .then(alert("Gửi thành công"))
          .catch(err => {
            console.error(err);
          });
          
      }     
      
      render() {
          return (

            <div className="contact_grid">
            <div className="col-md-8 contact-top">
              <h3>Gửi Lời Nhắn Cho Chúng Tôi</h3>
              <p className="contact_msg">Vui lòng nhập đầy đủ thông tin để chúng tôi có hỗ trợ tốt nhất</p>
              <form onSubmit ={this.handleSubmit}>
                
                  <div className="form-group row">
                    <div className="col-xs-4">
                      <input type="text" class="form-control input-lg" placeholder="Họ và Tên" onfocus="this.value = '';" onChange={this.nameChange} required/>
                    </div>
                    <div className="col-xs-5">
                    <input type="text" class="form-control input-lg" placeholder="Chủ đề" onfocus="this.value = '';" onChange={this.subjectChange} required/>
                    </div>
                    <div className="col-xs-3">
                      <input type="email" class="form-control input-lg" placeholder="Email" onfocus="this.value = '';" onChange={this.emailChange} required/>
                    </div>
                  </div>
                  
                
                <div className="form-group">
                  <textarea class="form-control input-lg" rows="5" placeholder="Nội dung phản hồi" onChange={this.contentChange}  required />
                </div>
                <div className="form-submit1">
                  <input name="submit" type="submit" className="btn btn-info" id="submit" defaultValue="Gửi Lời Nhắn Cho Chúng Tôi " /><br />
                  
                </div>
                <div className="clearfix"> </div>
              </form>
            </div>
           
            <div className="clearfix" />
          </div>
          );
      }
}
export default Login;