import React, { Component } from 'react';
import {Link} from "react-router-dom";
import img_icon_login from '../image_icon_LaR/avatar.png';
import img_icon_password from '../image_icon_LaR/lock.png';
import axios from 'axios';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            message:'',
            result:'',
        } 
        this.handleChangeField=this.handleChangeField.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleClickClose=this.handleClickClose.bind(this);
    }
    handleChangeField(){
        this.setState({
           username:this.refs.username.value,
           password:this.refs.password.value
       })
    }
    handleSubmit(){
        let {username,password}= this.state;
        if(!username || !password)
        {
            this.setState({
                message:"Vui lòng nhập đầy đủ thông tin!!"
            })
        }else{
            axios.post('/nguoi-dung/dang-nhap',{
                username:username,
                password:password
             },{headers: {'Accept': 'application/json'}})
            .then(res => {
                this.setState({
                    message:res.data.message,
                    result:res.data.result,
                    
                });
                if(this.state.result){
                    const close = document.getElementById("closelogin");
                    close.click();
                    this.props.callApiGetUser();
                    this.handleClickClose();
                    //this.props.onCloseForm(true);
                }
            })
            .catch( (error) => console.log(error));  
        }
        
    }
    handleClickClose(){
        this.setState({
                username:'',
                password:'',
                message:'',
        });
    }
    render() {
       
        var KTL=true;
        if(this.state.message.length>0){
            KTL=false;
        }
        return (
        <div className="modal fade" id="modalLoginForm" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header text-center">
                    <h4 className="modal-title w-100 font-weight-bold">Đăng nhập</h4>
                    <button type="button" className="close" id="closelogin" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" onClick={this.handleClickClose}>×</span>
                    </button>
                    </div>
                    <div className="modal-body mx-3">
                     {!KTL && 
                          <p  className="error_message-login">{ this.state.message} 
                          </p>
                     }
                    <div className="md-form mb-4 row">
                        <div className="col-md-2 col-sm-2 col-xs-3 icon_username">
                        <img src={img_icon_login} alt="icon"/>
                        </div>
                        <div className="col-md-10 col-sm-8 col-xs-9 inputusername">
                                <input type="text" 
                                className="form-control " 
                                placeholder="Tên đăng nhập"
                                ref="username"
                                onChange={this.handleChangeField}
                                value={this.state.username}/>
                        </div>
                    </div>
                    <div className="md-form mb-3 row">
                        <div className="col-md-2 col-sm-2 col-xs-3 icon_password">
                        <img src={img_icon_password} alt="icon"/>
                        </div>
                        <div className="col-md-10 col-sm-8 col-xs-9 inputpassword">
                                <input type="password" 
                                id="defaultForm-pass" 
                                className="form-control " 
                                placeholder="Mật khẩu"
                                ref="password"
                                onChange={this.handleChangeField}
                                value={this.state.password}/>
                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-4 span_registerinlogin">
                                <Link to='/nguoi-dung/dang-ky' data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#modalRegisterForm">
                                Quên mật khẩu
                                </Link>
                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-8 span_registerinlogin">
                                <span>Bạn chưa có tài khoản?<Link to='/nguoi-dung/dang-ky' data-dismiss="modal" aria-label="Close" data-toggle="modal" data-target="#modalRegisterForm">
                                Đăng ký
                                </Link></span>
                        </div>
                        
                    </div>
                    </div>
                    <div className="modal-footer d-flex justify-content-center bntdangnhap">
                        <input type="button" className="btn btn-default" value="Đăng nhập" onClick={this.handleSubmit}/>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Login;