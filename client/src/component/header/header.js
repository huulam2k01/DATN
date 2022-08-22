import React, { Component } from 'react';
import './header.css'
import Datenow from './datenow/datenow';
import img_icon_login from '../header/image_header/icon_login.png'
import LoginRegister from '../login__register/login__register';
import Menu from '../menu/menu';
import SlideHeader from './slide_header/slide_header';
import Filter from './filter/filter';

class Header extends Component {
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row header1">
                    <div className="col-md-6 col-sm-6 col-xs-6 header1_info_left" >
                        <Datenow/>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6 header1_info_right">
                        <LoginRegister clickPostNewstoApp={this.props.clickPostNewstoApp}  clickMovedOnUsertoApp={this.props.clickMovedOnUsertoApp}/>
                        <div className="header1_info_right__div-img">
                             <img  src={img_icon_login} alt="icon_login"/>
                        </div>
                    </div>
                </div>
                <div className="row header2">
                    <div className="row header2-slide-menu" id={!this.props.stateFiterandslide_imgApp ? "header2-menu" :""}>
                       <Menu StateFiterandslide_FuncApp={this.props.StateFiterandslide_FuncApp} 
                       stateFiterandslide_imgApp={this.props.stateFiterandslide_imgApp}/>
                    </div>
                 {!this.props.stateFiterandslide_imgApp &&
                    <div className="row header_slide">
                       <SlideHeader/>
                    </div>
                 }
                </div>
                {!this.props.stateFiterandslide_imgApp &&
                <div className="row">
                    <div className="container form_filter"> 
                        <Filter StateFiterTyhomeNews_TF={this.props.StateFiterTyhomeNews_TF}  // Hiện hoặc ẩn fitter
                        GetNewsFiltertoApp={this.props.GetNewsFiltertoApp}
                         GetTypeNewstoApp={this.props.GetTypeNewstoApp}                       // GetTypeNewstoApp         
                         />      
                             
                    </div>
                </div>
                }
               
            </div>
        );
    }
}

export default Header;