import React, { Component } from 'react';
import axios from 'axios';

import img_delete_image from '../news_image/delete_image.png'
import img_default_avatar from '../news_image/default_avatar.png'

import './upload_image.css'

class UploadImage extends Component {
    constructor(props) {
        super(props);
        this.state={
//##############___Set value file avatar__##############
            file: '',
//##############___Result Upload Image Avatar (Back End)__##############
            result_upload_avatar:false,
//##############___URL Image Avatar News __##############
            URL_avatar:'',
//##############___ClassName Hidden Button Choose Image Avatar__##############
            css_choose_file_avatar:"choose_file_avatar",
//##############___FileName Image Avatar__##############
            filename_avatar:'',
//##############___Result Delete Image Avatar (Back End)__##############           
            result_delete_avatar:false,

//##############___Set value files Image Infor News__##############
            files:null,
//##############___Array File Name Image Infor (Back End)__##############
            arrayimagenames:[],
//##############___Result Upload Image Infor News (Back End)__##############
            result_upload_imginfor:false,
//##############___Result Delete Image Infor News (Back End)__##############
            result_delete_imginfor:false,
        }   
    }
   
    UploadImageAvatar= async(e)=> {
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
        await axios.post("/phong-tro/dang-tin-moi/upload_image",formData,config)
            .then((res) => {
                this.setState({
                    result_upload_avatar:res.data.result,
                    filename_avatar:res.data.filename_avatar,
                    URL_avatar:"http://localhost:3001/phong-tro/open_image/nameimage="+res.data.filename_avatar
                });
            }).catch((error) => {
            console.log(error);
        });
        this.props.getUrlImage_News(this.state.URL_avatar,this.state.arrayimagenames);
    }
    Deleteavatar=async()=>{
        await axios.post('/phong-tro/dang-tin-moi/xoa-anh-dai-dien',{
            filename_avatar:this.state.filename_avatar
         },{headers: {'Accept': 'application/json'}})
        .then((res) => {
            this.setState({
                result_delete_avatar:res.data.result,
                file: '',
                result_upload_avatar:false,
                URL_avatar:'',
                css_choose_file_avatar:"choose_file_avatar",
                filename_avatar:'',
            });
        }).catch((error) => {
            console.log(error);
        });
        this.props.getUrlImage_News(this.state.URL_avatar,this.state.arrayimagenames);
    }

    UploadImageInfor=async (e)=>{
        e.preventDefault();
        await this.setState({
            files:e.target.files,
        }); 
        const formDataFilesInfor = new FormData();
        for (let i = 0 ; i < this.state.files.length ; i++) {
            formDataFilesInfor.append("files",this.state.files[i]);
        }
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        await axios.post("/phong-tro/dang-tin-moi/up-load_hinh-mo-ta",formDataFilesInfor,config)
            .then((res) => {
                this.setState({
                    arrayimagenames:res.data.arrayimagenames,
                    result_upload_imginfor:res.data.result
                })
            }).catch((error) => {
                console.log(error);
        });
        this.props.getUrlImage_News(this.state.URL_avatar,this.state.arrayimagenames);
    }
    DeleteImageInfor=async(e,item,index)=>{
        e.preventDefault();
        await axios.post('/phong-tro/dang-tin-moi/xoa-anh-mo-ta',{
            filename_imageinfor:item
         },{headers: {'Accept': 'application/json'}})
        .then((res) => {
            this.setState({
                result_delete_imginfor:res.data.result
            });
        }).catch((error) => {
            console.log(error);
        });
        var arrayimagenames_delete=this.state.arrayimagenames;
            arrayimagenames_delete.splice(index,1);
        
        await this.setState({
            arrayimagenames:arrayimagenames_delete,
        })
        this.props.getUrlImage_News(this.state.URL_avatar,this.state.arrayimagenames);
    } 
    render() {
        
        return (
            <div className="row image_news  wow fadeInUp" data-wow-delay="0.1s">
                    <div className="row image_news_title">
                         <div className="col-md-12 col-sm-12 col-xs-12">
                             <h2 className="info_news_div-h2">Hình ảnh mô tả</h2>
                         </div>
                    </div>
                    <div className="row image_news_avatar">
                           <div className="col-md-6 col-sm-6 col-xs-12 image_news_avatar_selectFile">
                               <div className="col-md-12 col-sm-12 col-xs-12 image_news_avatar_selectFile-lable">
                                  <label className="image_news_avatar_lable">Ảnh đại điện</label>
                               </div>
                                <div className="col-md-12 col-sm-12 col-xs-12 image_news_avatar_selectFile-input">
                                  <label htmlFor="upload-photo-avatar" className={this.state.result_upload_avatar ? this.state.css_choose_file_avatar : ''}>Chọn ảnh</label>
                                  <input type="file" name="file" id="upload-photo-avatar" onChange= {this.UploadImageAvatar} className={this.state.result_upload_avatar ? this.state.css_choose_file_avatar : ''}/>
                               </div>
                            </div>
                            <div className="col-md-6 col-sm-6 col-xs-12 image_news_avatar_upload">
                                <div className="image_news_avatar_upload_box">
                                    <div className="col-md-12 col-sm-12 col-xs-12 image_news_avatar_upload_div">
                                    <img src={this.state.result_upload_avatar ? this.state.URL_avatar : img_default_avatar} alt="avatar" className="image_news_avatar_img"/>
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 image_news_avatar_img-button">
                                    <button onClick={this.Deleteavatar}><img src={img_delete_image} alt="avatar" onClick={this.Deleteavatar} /><span> Xóa</span></button>
                                    </div>
                                </div>
                            </div>   
                    </div>
                    <div className="row image_infor_news">
                            <div className="col-md-12 col-sm-12 col-xs-12 image_infor_avatar_">
                               <div className="col-md-12 col-sm-12 col-xs-12">
                                  <label className="image_news_avatar_lable">Ảnh mô tả</label>
                               </div>
                               <div className="col-md-12 col-sm-12 col-xs-12">
                                  <label htmlFor="upload-photo-imginfor" className="upload-imginfor">Chọn ảnh</label>
                                  <input type="file" name="files" id="upload-photo-imginfor" multiple onChange= {(e)=>this.UploadImageInfor(e)}/>
                               </div>
                            </div>
                            <div className="row image_infor_news">
                                {  
                                    this.state.arrayimagenames.map((item,index)=>
                                        <div className="col-md-3 col-sm-3 col-xs-6" key={index}>
                                            <div className="image_infor_news_item">
                                                <div className="col-md-12 col-sm-12 col-xs-12 image_infor_news_item-img">
                                                    <img src={"http://localhost:3001/phong-tro/open_image/nameimage="+item} alt="infor" className="image_infor_news-img"/>
                                                </div>
                                                <div className="col-md-12 col-sm-12 col-xs-12 image_news_avatar_img-button">
                                                    <button onClick={e=>this.DeleteImageInfor(e,item,index)}><img src={img_delete_image} alt="avatar" className="img-infor"/><span> Xóa</span></button>
                                                </div>
                                            </div>
                                        </div> 
                                    )
                                }
                            </div>
                    </div>
            </div>

        );
    }
}

export default UploadImage;