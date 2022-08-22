import React, { Component } from 'react';
import axios from 'axios';
import img_icon_titlefeedback from '../image_icon_LaR/quality.png';
import img_icon_contentfeedback from '../image_icon_LaR/survey.png';
class FeedBack extends Component {
    constructor(props) {
        super(props);
        this.state={
            titelfeedback:'',
            contentfeedback:'',
            result:'',
            message:''

        }
    }
    handleChangeField=()=>{
        this.setState({
            titelfeedback:this.refs.titelfeedback.value,
            contentfeedback:this.refs.contentfeedback.value,
       })
    }
    ClickFeedBack= async()=>{
        let {titelfeedback,contentfeedback}=this.state;
        if(!titelfeedback || !contentfeedback){
            this.setState({
                message:"Vui lòng nhập đầy đủ nội dung",
                result:false, 
            });
        }else{
            await axios.post('/nguoi-dung/danh-gia',{
                titelfeedback,contentfeedback
             },{headers: {'Accept': 'application/json'}})
            .then(res => {
                this.setState({
                    message:res.data.message,
                    result:res.data.result, 
                });
                 if(res.data.result){
                    const closeFeedback = document.getElementById("IDChangeFeedBack");
                    setTimeout(()=>{closeFeedback.click()},1000*3); 
                 }
            })
            .catch( (error) => console.log(error)); 
        }
    }
    ClickCloseFeedBack=()=>{
        this.setState({
            titelfeedback:'',
            contentfeedback:'',
            result:'',  
            message:''
        })
    }
    render() {
        var KTL=true;
        if(this.state.message.length>0){
            KTL=false;
        }
        return (
            <div className="modal fade" id="modalFeedBack" tabIndex={-1} role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header text-center">
                        <h4 className="modal-title w-100 font-weight-bold">Đánh giá</h4>
                        <button type="button" className="close"  data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true" id="IDChangeFeedBack" onClick={this.ClickCloseFeedBack}>×</span>
                        </button>
                    </div>
                <div className="modal-body mx-3">
                {!KTL && 
                        <p  className="error_message-login">{ this.state.message} 
                        </p>
                }
                <div className="md-form mb-5 row feedback-content">
                    <div className="col-md-2 col-sm-2 col-xs-3 icon_username">
                        <img src={img_icon_titlefeedback} alt="icon"/>
                    </div>
                    <div className="col-md-10 col-sm-8 col-xs-9 inputusername">
                            <input type="text" 
                            className="form-control " 
                            placeholder="Tiêu đề đánh giá"
                            ref="titelfeedback"
                            onChange={this.handleChangeField}
                            value={this.state.titelfeedback}
                           />
                    </div>
                </div>
                
                <div className="md-form mb-5 row feedback-content">
                    <div className="col-md-2 col-sm-2 col-xs-3 icon_password">
                            <img src={img_icon_contentfeedback} alt="icon"/>
                    </div>
                    <div className="col-md-10 col-sm-8 col-xs-9 inputpassword">
                        <textarea type="text"                                               
                        className="form-control feedback-content-textarea" 
                        placeholder="Nội dung đánh giá"
                        ref="contentfeedback"
                        onChange={this.handleChangeField}
                        value={this.state.contentfeedback}
                        />
                    </div>
                </div>
            </div>
                <div className="modal-footer d-flex justify-content-center bntdangnhap">
                <input type="button" className="btn btn-default" value="Đánh giá" onClick={this.ClickFeedBack}/>
                </div>
            </div>
    </div>
            </div>
        );
    }
}

export default FeedBack;