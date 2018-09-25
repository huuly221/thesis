import React, { Component } from 'react';
import { Grid, Row, Col, Carousel } from 'react-bootstrap';
import './footer.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



      
import logoBK from '../image/logoBKYouth.png';
class Footer extends Component {
    constructor(props){
        super(props)
    }
    click(){

    }
        render() {
          
            return (
                <footer className="footer">
                    <Grid>
                        <Row>
                            <Col xs={12} md={5}>
                                <div className="footer-left">
                                    <Link to="/">
                                        <a className="footer-brand" href="#home">
                                            <span className="logo-img"><img src={logoBK} className="img-responsive" width="90" height="90" /></span>
                                            <div className="title-footer">
                                                ĐOÀN THANH NIÊN - HỘI SINH VIÊN <br/> BÁCH KHOA TP.HCM
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            </Col>
                            <Col xs={12} md={7}>
                                <div className="footer-right">
                                    <div id="table">
                                        <div className="tr">
                                            <div className="td1">Văn Phòng :</div>
                                            <div className="td">+ Phòng 114B1, cơ sở Lý Thường Kiệt 
                                                                <br/>+ Phòng 105-106H1, cơ sở Dĩ An</div>
                                            
                                        </div>
                                        <div className="tr">
                                            <div className="td1">Điện thoại :</div>
                                            <div className="td">+ (08) 38.647 256 - 5123 (ĐTN) 
                                                                <br/>+ (08) 38.647 256 - 5124 (HSV)</div>
                                            
                                        </div>
                                        <div className="tr">
                                            <div className="td1">Email :</div>
                                            <div className="td">+ ĐTN: dtn@hcmut.edu.vn 
                                                                <br/>+ HSV: dhbachkhoa@hoisinhvien.vn</div>
                                            
                                        </div>
                                        
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </footer>
                    
               
            );
        }
}        

export default Footer;
