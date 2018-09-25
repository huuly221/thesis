import React, { Component } from 'react';
export default class FeedBack extends Component {
  render() {
    
    return (
        <div className="contact_grid">
        <div className="col-md-8 contact-top">
          <h3>Gửi Lời Nhắn Cho Chúng Tôi</h3>
          <p className="contact_msg">Các thông tin cơ bản dưới đây:</p>
          <form>
            <div className="to">
              <input type="text" className="text" defaultValue="Họ và tên" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Name';}" />
              <input type="text" className="text" defaultValue="Email" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Email';}" style={{marginLeft: 20}} />
              <input type="text" className="text" defaultValue="Khoa" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Subject';}" style={{marginLeft: 20}} />
            </div>
            <div className="text">
              <textarea onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Message';}" defaultValue={"Lời Nhắn:"} />
            </div>
            <div className="form-contact-submit">
              <input name="submit" type="submit" id="submit" defaultValue="Gửi Lời Nhắn Cho Chúng Tôi " /><br />
              
            </div>
            <div className="clearfix"> </div>
          </form>
        </div>
        <div className="col-md-4 contact-top_right">
          <h3>Thông Tin Liên Hệ</h3>
          <p>Đại Học Bách Khoa, Lí Thường Kiệt, TP. Hồ Chí Minh</p>
          <ul className="contact_info">
            <li><span>+1900-235-2456</span></li>
            <li><span className="msg"><a href="malito:mail@example.com">ThienNhan@gmail.com</a></span></li>
          </ul>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}        