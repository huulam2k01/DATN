import React, { Component } from 'react';
import './footer.css'
import img_school from './img_footer/img_school.jpg';
import img_envelope from './img_footer/envelope.png';
import img_location from './img_footer/location.png';
import img_phone_call from './img_footer/phone-call.png'



class Footer extends Component {
    render() {
        return (
            <div>
                    <div className="Footer">
                    <div className="container ">
                        <div className="row">
                            <div className="col-md-4 col-sm-4 col-xs-4 Footer-infor">
                                <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-header">
                                    <h3>Thông tin liên hệ</h3>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-content">
                                    <img src={img_school} alt="logo"/>
                                    <h1>PhongTroVN</h1>
                                    <p>PhongTroVn rất vui khi giúp được bạn</p>
                                </div>
                            
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4">
                                <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-header">
                                    <h3>Giờ làm việc</h3>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-hourwork">
                                    <p>Thứ 2 - Thứ 6 <span>09 AM - 19 PM</span></p>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                    <p>Thứ 7  <span>09 AM - 12 AM</span></p>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                    <p>Chủ nhật <span>09 AM - 19 PM</span></p>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                    <h6><img src={img_phone_call} alt="cty"/><span> (+84) 369576872</span></h6>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                    <h6><img src={img_envelope} alt="cty"/><span>tukna_lamdh4@gmail.com</span> </h6>
                                </div>
                                <div className="col-md-12 col-sm-12 col-xs-12  Footer-infor-hourwork">
                                    <h6><img src={img_location} alt="cty"/> <span>26 Nhân Hòa, Nhân Chính, Hoàn Kiếm, Hà Nội</span></h6>
                                </div>
                            
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-4">
                                <div className="row ">
                                <div className="col-md-12 col-sm-12 col-xs-12 Footer-infor-header">
                                    <h3>Menu</h3>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 Footer-menu">
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Trang chủ</p>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Thuê phòng trọ</p>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Thuê căn hộ</p>
                                    </div>
                                
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-6 Footer-menu ">
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Thuê nhà trọ</p>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Liên hệ</p>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 Footer-menu-link">
                                        <p>Thông tin chi tiêt</p>
                                    </div>
                                </div>
                                </div>
                            
                            </div>

                        </div>
                        
                    </div>
                    
                </div>
                <div className="Copyright">
                        <p>© Bản quyền thuộc về GinSuSpaceker | Cung cấp bởi GinSuSpaceker</p>
                </div>
         </div>
        );
    }
}

export default Footer;