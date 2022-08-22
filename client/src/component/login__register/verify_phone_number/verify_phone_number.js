import React, { Component } from 'react';
import axios from 'axios';


import img_icon_phone from '../image_icon_LaR/phone.png';
import img_icon_authentication from '../image_icon_LaR/authentication.png';

import './verify_phone_number.css'
class VerifyPhoneNumber extends Component {
  constructor(props) {
    super(props);
    this.state={
      number_phone:'',
      error_message:'',
      result_send_opt:false,
      disabled_input_phone_NB:'',
      key_OTP:'',
      result_key_Otp:''
    }
    
  }
  Click_send_otp=(e)=>{
    e.preventDefault();
    if(this.state.number_phone.length < 10)
    {
      this.setState({
          error_message:"Vui lòng kiểm tra lại số điện thoại"
      })
    }else{
      let {number_phone}= this.state;
        let number_phone_post = '84'+ parseInt(number_phone,10);
        axios.post('/nguoi-dung/xac-thuc/so-dien-thoai',{
          number_phone_post
         },{headers: {'Accept': 'application/json'}})
        .then(res => {
            this.setState({
                 result_send_opt:res.data.result,
                 error_message:res.data.message,
                 disabled_input_phone_NB:"disabled"
            });

            
        })
        .catch( (error) => console.log(error)); 
        setTimeout(()=>{
          this.setState({
            disabled_input_phone_NB:"",
            key_OTP:""
          });

        },1000*60)       
    }
  }
  getvaluePhone_NB=()=>{
      this.setState({
        number_phone:this.refs.number_phone.value,
    })
  }
  handleClickClosePhone_NB=()=>{
      this.setState({
        number_phone:'',
        error_message:'',
        result_send_opt:false,
        key_OTP:''
      })
  }
  getvaluekey_Otp=()=>{
        this.setState({
          key_OTP:this.refs.key_otp.value,
      })
    }
  Click_key_Otp=()=>{
    let {number_phone,key_OTP}= this.state;
    
    axios.post('/nguoi-dung/xac-thuc/so-dien-thoai/ma-OTP',{
      number_phone,key_OTP
     },{headers: {'Accept': 'application/json'}})
    .then(res => {
        this.setState({
             result_send_opt:res.data.result,
             error_message:res.data.message
        });
        if(res.data.result)
        {
          const closePhone_nb = document.getElementById("closePhone_nb");    
          closePhone_nb.click();
          this.props.getVerifyPhoneNumber(true);
        }else{
          this.props.getVerifyPhoneNumber(false);
        }
    })
    .catch( (error) => console.log(error));
    
  }
    render() {
        return (
          <div className="modal fade" id="modalVerifyPhone_Nb_Form" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">
                  <div className="modal-content">
                      <div className="modal-header text-center">
                      <h4 className="modal-title w-100 font-weight-bold">Xác thực số điện thoại</h4>
                      <button type="button" className="close" id="closePhone_nb" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" onClick={this.handleClickClosePhone_NB}>×</span>
                      </button>
                      </div>
                      <div className="modal-body mx-3">
                          {this.state.error_message.length>0 &&  <p  className="error_message-login">{this.state.error_message}</p>}
                          <div className="row row_form_phone_nb " >
                            <div className="col-md-2 col-sm-2 col-xs-3 icon_number_phone">
                                 <img src={img_icon_phone} alt="icon"/>
                            </div>
                            <div className="col-md-7 col-sm-6 col-xs-5 inputnumber_phone">
                                <input type="text" 
                                className="form-control " 
                                placeholder="Số điện thoại"
                                ref="number_phone"
                                onChange={this.getvaluePhone_NB}
                                value={this.state.number_phone}
                                disabled={this.state.disabled_input_phone_NB}
                               />
                            </div>
                            <div className=" col-md-3 col-sm-4 col-xs-4 bnt_form_phone_nb">
                                  <input type="button" value="Gửi OTP" onClick={(e)=>this.Click_send_otp(e)} disabled={this.state.disabled_input_phone_NB}/>
                            </div>
                            
                          </div>
                          { this.state.result_send_opt &&
                              <div className="row row_form_phone_nb">
                                <div className="col-md-2 col-sm-2 col-xs-3 icon_key_otp">
                                    <img src={img_icon_authentication} alt="icon"/>
                                </div>
                                <div className="col-md-7 col-sm-6 col-xs-5 inputkey_otp">
                                    <input type="text" 
                                    className="form-control " 
                                    placeholder="Mã OTP"
                                    ref="key_otp"
                                    onChange={this.getvaluekey_Otp}
                                    value={this.state.key_OTP}
                                  />
                                </div>
                                <div className=" col-md-3 col-sm-4 col-xs-4 bnt_form_phone_nb">
                                      <input type="button" value="Xác nhận" onClick={this.Click_key_Otp} />
                                </div>
                                
                              </div> 
                          }                     
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}

export default VerifyPhoneNumber;