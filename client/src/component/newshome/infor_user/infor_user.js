import React, { Component } from 'react';
import axios from 'axios';
import './infor_user.css'
class Inforuser extends Component {
    constructor(props) {
        super(props);
        this.state={
            user:[],
            firstname:'',
            lastname:'',
            username:'',
            email:'',
            male:true,
            female:false,
            img_avatar:'',
            file:'',
            result_upload_avatar:false,
            filename_avatar:'',
            messages:''
        }
        
    }
    async componentDidMount(){
        await  axios.get("/nguoi-dung/chinh-sua-thong-tin")
        .then(res => {
            this.setState({
                user:res.data.user,
                firstname:res.data.user.infor.firstname,
                lastname:res.data.user.infor.lastname,
                username:res.data.user.local.username,
                number_phone:res.data.user.number_phone,
                email:res.data.user.local.email,
                male:res.data.user.infor.male_female.male,
                female:res.data.user.infor.male_female.female,
                img_avatar:res.data.user.infor.img_avatar

            })
        })
        .catch( (error) => console.log(error));
    }
    handleChangeField=()=>{
        this.setState({
           firstname:this.refs.firstname.value,
           lastname:this.refs.lastname.value,
       })       
    }
    UploadImageUser= async(e)=>{
        e.preventDefault();
        await this.setState({
            file:e.target.files[0],
        }); 
        const formData = new FormData();
        formData.append('file',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        await axios.post("/nguoi-dung/chinh-sua-thong-tin/anh-dai-dien",formData,config)
            .then((res) => {
                this.setState({
                    result_upload_avatar:res.data.result,
                    filename_avatar:res.data.filename_avatar,
                    img_avatar:"http://localhost:3001/nguoi-dung/open_image/nameimage="+res.data.filename_avatar
                });
            }).catch((error) => {
            console.log(error);
        });
    }
    ClickEditProfile=async ()=>{
        let {firstname,lastname,username,email,male,female,img_avatar}=this.state;
        await axios.post('/nguoi-dung/chinh-sua-thong-tin-ca-nhan',{
            firstname,lastname,username,email,male,female,img_avatar
         },{headers: {'Accept': 'application/json'}})
        .then(res => {
            this.setState({
                result:res.data.result,
                user:res.data.useredited,
                firstname:res.data.useredited.infor.firstname,
                lastname:res.data.useredited.infor.lastname,
                username:res.data.useredited.local.username,
                number_phone:res.data.useredited.number_phone,
                email:res.data.useredited.local.email,
                male:res.data.useredited.infor.male_female.male,
                female:res.data.useredited.infor.male_female.female,
                img_avatar:res.data.useredited.infor.img_avatar,
                messages:res.data.message
            });
        })
        .catch( (error) => console.log(error)); 
    }
    render() {
       console.log(this.state.male);
       
        return (
          <div className="container-fluid">
                <div className="row alert_messager"> 
                      { this.state.messages  && <div className="alert alert-danger">{this.state.messages}</div>}
                </div>
          <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 tieudepage_mg">
              <h2 className="tieudepage_mg-h2">Chỉnh sửa thông tin cá nhân</h2>
              <p>Thông tin càng chính xác giúp cho người thuê một cách tốt nhất</p>
          </div>
         </div>
       
        <div className="row info_news  wow fadeInUp"  data-wow-delay="0.1s">
          {/* left column */}
          <div className="col-md-3 form-change-image">
            <div className="text-center">
              <img src={this.state.img_avatar ? this.state.img_avatar : "https://static123.com/uploads/images/2018/12/12/boy_1544603222.png"} className="avatar img-circle img-responsive" alt="avatar" />
              <h6>Upload a different photo...</h6>
              <input type="file" className="form-control" onChange= {this.UploadImageUser}/>
            </div>
          </div>
          {/* edit form column */}
          <div className="col-md-9 personal-info">            
            <h3>Thông tin</h3>
              <div className="form-group">
                <label className="col-lg-3 control-label">Họ:</label>
                <div className="col-lg-8">
                  <input className="form-control" type="text"
                  ref="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChangeField}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Tên:</label>
                <div className="col-lg-8">
                  <input className="form-control" type="text" 
                   ref="lastname"
                   onChange={this.handleChangeField}
                   value={this.state.lastname} />
                </div>
              </div>
              <div className=" form-group">
                 <label className="  col-lg-3 control-label">Giới tính:</label>
                 <div className=" col-lg-8">
                    <input className=" radio-sex" type="radio" name="gender"   ref="male"  
                    value={this.state.male} 
                    defaultChecked={this.state.male}
                  /> <span>Nam</span>
                    <input className=" radio-sex-female" type="radio" name="gender"  ref="female" 
                    value={this.state.female} 
                    defaultChecked={this.state.female}
                    /> <span>Nữ</span>
                </div>
                    
              </div>
              <div className="form-group">
                <label className="col-lg-3 control-label">Email:</label>
                <div className="col-lg-8">
                  <input className="form-control" type="text" disabled
                   value={this.state.email} />
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Tên đăng nhập:</label>
                <div className="col-md-8">
                  <input className="form-control" type="text" 
                  value={this.state.username} disabled/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label">Số điện thoại:</label>
                <div className="col-md-8">
                  <input className="form-control" type="text" disabled
                  value={this.state.number_phone ? "0" + this.state.number_phone : ""}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-3 control-label" />
                <div className="col-md-8">
                  <input type="button" className="btn btn-primary" defaultValue="Lưu" onClick={this.ClickEditProfile} />
                </div>
              </div>

          </div>
        </div>
        </div>
        );
    }
}

export default Inforuser;