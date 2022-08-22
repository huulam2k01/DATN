import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import {Link} from "react-router-dom";
import {Route,Switch} from "react-router-dom";


import img_icon_menu from '../newshome/image_newhome/icons_menu.png'
import Inforuser from './infor_user/infor_user';
import Newsnew from './news_new/news_new';
import Postmanagement from './post_management/post_management';
import PostmanagementNT from './post_manager_news_NT/post_news_NT';
import PostmanagementCH from './post_manager_news_CH/post_news_CH';
import './newshome.css'

import axios from 'axios';
import ChangePassword from './change_password/change_password';
class Newshome extends Component {
    constructor(props) {
        super(props);
        this.state={
            result_infor_user:'',
            username:'',
            role:'',
            number_phone:'',
            img_avatar:'',
            result_logout_user:false,
            clickgohome:false,
        }
    }
    async UNSAFE_componentWillMount(){
     await  axios.get("/nguoi-dung/thong-tin")
            .then(res => {
                this.setState({
                    result_infor_user:res.data.result,
                    username:res.data.username,
                    role:res.data.role,
                    number_phone:res.data.number_phone,
                    img_avatar:res.data.img_avatar
                });
                if(res.data.result===false){
                    this.props.ClickGoHome();
                }
            })
            .catch( (error) =>{throw(error)} );  
            setTimeout(()=>{this.callApiGetUser_HomeNews()},1000*60*15);
    }
    callApiGetUser_HomeNews=async ()=>{
        await  axios.get("/nguoi-dung/thong-tin")
        .then(res => {
            if(res.data.result===false){
                this.props.ClickGoHome();
            }
        })
      .catch( (error) =>{throw(error)} );
    }
    // Logout and back Home (Thoát tài khoản về trang home)
    ClickLogouttoHome = async()=>{
        await axios.get("/nguoi-dung/dang-xuat")
        .then(res => {
            this.setState({
                result_logout_user:res.data.result,
            });
            if(res.data.result) {
                this.props.ClickGoHome(); 
            }
            })
        .catch( (error) => console.log(error));
    }
    OpenModalChangePasswordtoHomeNews=()=>{
        const close = document.getElementById("HiddenChangePassword");
        close.click();
    }
    ClickGoHometoHomeNews=async()=>{
        await this.setState({
             clickgohome:true
        })
        this.props.ClickGoHome(); 
    }
    render() {
        if(this.state.result_logout_user) return <Redirect to='/'/>
        if(this.state.clickgohome) return <Redirect to='/'/>
        return (
            <div>
               <div className="row">
                    <div className="container-fluid header_page_MG">
                        <nav className="navbar navbar-expand-lg navbar-fixed-top" role="navigation">
                                <Link className="navbar-brand" to="/">PhongTroVN</Link>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#sidebar-collapse" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                    <img src={img_icon_menu} alt="icomn_menu"></img>
                                </button>
                        </nav>
                    </div>
               </div>
               <div className="row">
                    <div id="sidebar-collapse" className="col-md-2 col-sm-2 sidebar">
                        <div className=" row profile-sidebar">
                            <div className="col-md-4 col-sm-4 profile_imgavatar">
                                  <div className="profile-userpic">
                                        <img src={this.state.img_avatar ? this.state.img_avatar : "https://static123.com/uploads/images/2018/12/12/boy_1544603222.png"}className="img-responsive" alt="" />
                                  </div>
                            </div> 
                            <div className="col-md-8 col-sm-8 profile-infor">
                                <p className="profile-infor-username">{this.state.username}</p>
                                {
                                   this.state.role==="CHUNHATRO" && <p className="profile-infor-numberphone">{this.state.number_phone ? "0"+this.state.number_phone : " "}</p> 
                                }
                                 
                            </div> 
                        </div>
                        <div className="row">
                            <nav className="navbar navbar_mg">
                                <ul className="nav navbar-nav navbar_mg-ul">
                                    <li className="nav-item active">
                                        <Link className="nav-link nav_menu_mg" to='/nguoi-dung/sua-thong-tin'>Sửa đổi thông tin cá nhân</Link>
                                    </li>
                                    {
                                        this.state.role==="CHUNHATRO" && 
                                        <div>
                                            <li className="nav-item nav_menu_mg" >
                                                <Link className="nav-link nav_menu_mg" to='/nguoi-dung/dang-tin-moi'>Đăng tin mới</Link>
                                            </li>
                                            <li className="nav-link post_manager-memu" >Quản lý tin đăng
                                                <ul className="post_manager-memu-ul">
                                                        <li className="nav-item nav_menu_mg">
                                                            <Link  to='/nguoi-dung/quan-ly-tin-dang/phong-tro' className="nav-link nav_menu_mg ">Quản lý tin phòng trọ</Link>
                                                        </li>
                                                        <li className="nav-item nav_menu_mg">
                                                            <Link  to='/nguoi-dung/quan-ly-tin-dang/nha-tro' className="nav-link nav_menu_mg ">Quản lý tin nhà trọ</Link>
                                                        </li>
                                                        <li className="nav-item nav_menu_mg">
                                                            <Link  to='/nguoi-dung/quan-ly-tin-dang/can-ho' className="nav-link nav_menu_mg ">Quản lý tin căn hộ</Link>
                                                        </li>
                                                    </ul>
                                            </li>
                                                
                                        </div>
                                    }
                                   
                                   
                                    <li className="nav-item nav_menu_mg">
                                        <Link className="nav-link nav_menu_mg" to="/doi-mat-khau"
                                       onClick={this.OpenModalChangePasswordtoHomeNews} > Đổi mật khẩu</Link>
                                    </li>
                                    <li className="nav-item nav_menu_mg">
                                        <Link className="nav-link nav_menu_mg" to="" id="ClickGoHome" onClick={this.ClickGoHometoHomeNews}>Về trang chủ</Link>
                                    </li>
                                    <li className="nav-link nav_menu_mg" onClick={this.ClickLogouttoHome}>Đăng xuất
                                    </li>
                                    {/* Li ao */}
                                    <li className="nav-link nav_menu_mg hidden-change-password" id="HiddenChangePassword"
                                    data-toggle="modal" data-target="#modalChangePassword">HiddenChangePassWord
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="col-md-10 col-sm-10 wapper">
                    
                    <Switch>
                        <Route exact path="/nguoi-dung/sua-thong-tin" component={Inforuser}/>
                        
                        <Route
                            exact path="/nguoi-dung/dang-tin-moi"
                            render={props => < Newsnew {...props} GetPhone_Number={this.state.number_phone} 
                         />}
                        />
                        <Route  exact path="/nguoi-dung/quan-ly-tin-dang/phong-tro" component={Postmanagement}/> 
                        {
                            this.props.StateNextPage &&
                            <Route  exact path="/" component={Newsnew}/> 
                        }
                        
                        <Route  exact path="/nguoi-dung/quan-ly-tin-dang/nha-tro" component={PostmanagementNT}/> 
                        <Route  exact path="/nguoi-dung/quan-ly-tin-dang/can-ho" component={PostmanagementCH}/> 
                       
                    </Switch>
                    <ChangePassword/>
                    </div>
                   
               </div>
               
        </div>
        );
    }
}

export default Newshome;