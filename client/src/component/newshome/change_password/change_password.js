import React, { Component } from 'react';
import axios from 'axios';
import img_icon_password from './icon_change_password/lock.png';
class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            passwordold:'',
            password:'',
            verifypassword:'',
            message:'',
        } 
        
    }
    handleChangeField=()=>{
        this.setState({
           password:this.refs.password.value,
           passwordold:this.refs.passwordold.value,
           verifypassword:this.refs.verifypassword.value,
       })
    }
    SubmitChangePassword=async()=>{
        let {passwordold,password,verifypassword}=this.state;
        if(!passwordold || !password || !verifypassword){
            this.setState({
                message:"Vui lòng nhập đầy đủ thông tin"
            })
        }else{
            if(password===verifypassword)
           {
            await axios.post('/nguoi-dung/doi-mat-khau',{
                passwordold,password
             },{headers: {'Accept': 'application/json'}})
            .then(res => {
                this.setState({
                    message:res.data.message,
                    result:res.data.result, 
                });
                 if(res.data.result){
                    const close = document.getElementById("IDChangePassword");
                    setTimeout(()=>{close.click()},1000*1);
                 }
            })
            .catch( (error) => console.log(error));  
           }else{
            this.setState({
                message:"Nhập lại mật khẩu không khớp",
            })
        }
        }
    }
    ClickCloseChangePassword=()=>{
        this.setState({
            passwordold:'',
            password:'',
            verifypassword:'',
            message:''
        })
    }
    render() {
        var KTL=true;
        if(this.state.message.length>0){
            KTL=false;
        }
        return (
            <div className="modal fade" id="modalChangePassword" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">

            <div className="modal-content">
            <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Đổi mật khẩu</h4>
                <button type="button" className="close"  data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" id="IDChangePassword" onClick={this.ClickCloseChangePassword}>×</span>
                </button>
            </div>
            <div className="modal-body mx-3">
            {!KTL && 
                      <p  className="error_message-login">{ this.state.message} 
                      </p>
            }
                <div className="md-form mb-5 row">
                    <div className="col-md-2 col-sm-2 col-xs-3 icon_username">
                        <img src={img_icon_password} alt="icon"/>
                    </div>
                    <div className="col-md-10 col-sm-8 col-xs-9 inputusername">
                            <input type="password" 
                            className="form-control " 
                            placeholder="Mật khẩu cũ"
                            ref="passwordold"
                            onChange={this.handleChangeField}
                            value={this.state.passwordold}
                           />
                    </div>
                </div>
                
                <div className="md-form mb-5 row">
                    <div className="col-md-2 col-sm-2 col-xs-3 icon_password">
                            <img src={img_icon_password} alt="icon"/>
                    </div>
                    <div className="col-md-10 col-sm-8 col-xs-9 inputpassword">
                        <input type="password"                                               
                        className="form-control " 
                        placeholder="Mật khẩu mới"
                        ref="password"
                        onChange={this.handleChangeField}
                        value={this.state.password}
                        />
                    </div>
                </div>
                <div className="md-form mb-5 row">
                    <div className="col-md-2 col-sm-2 col-xs-3 icon_password">
                        <img src={img_icon_password} alt="icon"/>
                    </div>
                    <div className="col-md-10 col-sm-8 col-xs-9 inputpassword">
                        <input type="password"                                                 
                        className="form-control " 
                        placeholder="Nhập lại mật khẩu mới"
                        ref="verifypassword"
                        onChange={this.handleChangeField}
                        value={this.state.verifypassword}
                        />
                    </div>
                </div>
            </div>
                <div className="modal-footer d-flex justify-content-center bntdangnhap">
                <input type="button" className="btn btn-default" value="Lưu"  onClick={this.SubmitChangePassword}/>
                </div>
            </div>
    </div>
            </div>
        );
    }
}

export default ChangePassword;