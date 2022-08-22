import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import {Link} from "react-router-dom";
import axios from 'axios';

import OwlCarousel from 'react-owl-carousel';

import './newsdetail.css'
class NewsDetail extends Component {
    constructor(props) {
        super(props);
        this.state={
            news:[],
            NewsNears:[],
            NameCity:'',
            NameDistricts:'',
            typenews:'',
            center:{
                lat:'',
                lng:''
            },
            user:[],
            
        }
        
    }
   
    async UNSAFE_componentWillMount(){
        await axios.get(`/trang-chu/thong-tin-chi-tiet/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                news:res.data.news
            })
            if(res.data.news){
                res.data.news.forEach(element => {
                    
                    this.setState({
                        center:{
                            lat:element.address.Lat_ggmap,
                            lng:element.address.Lng_ggmap
                        },
                    })

                    // Get type News (Loại tin)
                    if(element.infor.typehome===1) {
                        this.setState({
                            typenews:'Thuê phòng trọ'
                        })
                    }else if(element.infor.typehome===2){
                        this.setState({
                            typenews:'Thuê nhà trọ'
                        })
                    }else {
                        this.setState({
                            typenews:'Thuê căn hộ'
                        })
                    }
                    // get name city (Lấy name của thành phố)
                    let code_city =element.address.code_city;

                    axios.get(`/trang-chu/thong-tin-chi-tiet/city/${code_city}`)
                    .then(res=>this.setState({
                        NameCity:res.data.NameCity  
                    }))
                    .catch( (error) => console.log(error));

                     // get name dictrict (Lấy name của quận huyện)
                     
                    axios.get(`/trang-chu/thong-tin-chi-tiet/dictrict/${element.address.code_dictrict}`)
                    .then(res=>{
                        console.log(res);
                        this.setState({
                        NameDistricts:res.data.NameDistricts  
                    })
                })
                    .catch( (error) => console.log(error));
                    // get news near (Lấy tin tức gần đó)
                    axios.get(`/trang-chu/tin-tuc-gan-do/${element.address.code_city}/${element.address.code_dictrict}`)
                    .then(res=>{
                        this.setState({
                            NewsNears:res.data.NewsNears  
                            
                        })
                    })
                    .catch( (error) => console.log(error));
                    axios.get(`/nguoi-dung/thong-tin/${element.infor.iduser}`)
                    .then(res=>{
                        this.setState({
                            user:res.data.user  
                            
                        })
                        
                    })
                    .catch( (error) => console.log(error));
                }); 
            }
        })
        
    }
    handleApiLoaded=(map, maps)=>{
        new maps.Marker({
            position: this.state.center,
            map,
            title: 'Home Your!'
        });   
    }
    formatNumber=(num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

    }
    ClickNewsNears= async ()=>{
        this.props.NewsDetailtoApp();
        await this.setState({
                    news:[],
                    NewsNears:[],
                    NameCity:'',
                    NameDistricts:'',
                    typenews:'',
                    center:{
                        lat:'',
                        lng:''
                    },
                    user:[],
            })
        await axios.get(`/trang-chu/thong-tin-chi-tiet/${this.props.match.params.id}`)
        .then(res => {
            this.setState({
                news:res.data.news
            })
            if(res.data.news){
                res.data.news.forEach(element => {
                    
                    this.setState({
                        center:{
                            lat:element.address.Lat_ggmap,
                            lng:element.address.Lng_ggmap
                        },
                    })

                    // Get type News (Loại tin)
                    if(element.infor.typehome===1) {
                        this.setState({
                            typenews:'Thuê phòng trọ'
                        })
                    }else if(element.infor.typehome===2){
                        this.setState({
                            typenews:'Thuê nhà trọ'
                        })
                    }else {
                        this.setState({
                            typenews:'Thuê căn hộ'
                        })
                    }
                    // get name city (Lấy name của thành phố)
                    axios.get(`/trang-chu/thong-tin-chi-tiet/city/${element.address.code_city}`)
                    .then(res=>this.setState({
                        NameCity:res.data.NameCity  
                    }))
                    .catch( (error) => console.log(error));

                     // get name dictrict (Lấy name của quận huyện)
                    axios.get(`/trang-chu/thong-tin-chi-tiet/dictrict/${element.address.code_dictrict}`)
                    .then(res=>this.setState({
                        NameDistricts:res.data.NameDistricts  
                    }))
                    .catch( (error) => console.log(error));
                    // get news near (Lấy tin tức gần đó)
                    axios.get(`/trang-chu/tin-tuc-gan-do/${element.address.code_city}/${element.address.code_dictrict}`)
                    .then(res=>{
                        this.setState({
                            NewsNears:res.data.NewsNears  
                            
                        })
                    })
                    .catch( (error) => console.log(error));

                    axios.get(`/nguoi-dung/thong-tin/${element.infor.iduser}`)
                    .then(res=>{
                        this.setState({
                            user:res.data.user  
                            
                        })
                        
                    })
                    .catch( (error) => console.log(error));
                }); 
            }
        })

    }
    render() {
        
        return (
           
                <div className="container News-detail">
                    { 
                    this.state.news.map((item,key)=>
                  
                        <div key={key}>
                        <div className="row">
                            <div className="col-md-12 col-sm-12 col-xs-12 News-detail-image ">
                                        <OwlCarousel
                                        className=" owl-carousel owl-theme "
                                        loop
                                        margin={10}
                                        nav
                                        items={1}
                                        lazyLoad
                                        autoplay
                                        autoplayTimeout={4000}
                                        smartSpeed={1000}
                                    >
                                        { 
                                        item.img_infor.map((item,index)=>
                                                    <img src={item} alt={item} key={index} className="carousel-item-img-detail-news  "/>
                                        )}
                                    </OwlCarousel>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-xs-12 News-detail-content wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="News-detail-content-title">
                                            <p className="News-detail-content-title-typenews">{this.state.typenews}</p>
                                            <h3 className="News-detail-content-title-title">{item.infor.title}</h3>
                                            <p className="News-detail-content-title-location">{this.state.NameDistricts + ", "  +this.state.NameCity}</p>
                                        </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-9 col-sm-9 col-xs-12 News-detail-content-left wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="col-md-12 col-sm-12 col-xs-12 News-detail-content-table wow fadeInUp" data-wow-delay="0.3s">
                                        <h1 className="News-detail-item">Chi tiết</h1>
                                        <table className="table table-bordered">
                                        <tbody>
                                                <tr>
                                                    <td className="News-detail-content-table-item">Ðịa chỉ</td>
                                                    <td colSpan="3">{item.address.address_detail}</td>  
                                                </tr>
                                                <tr>
                                                    <td className="News-detail-content-table-item">Giá:</td>
                                                    <td>{this.formatNumber(item.infor.price)} VND</td>
                                                    <td className="News-detail-content-table-item">Người đăng:</td>
                                                    <td>{this.state.user.firstname +"  " + this.state.user.lastname}</td>
                                                </tr>
                                                <tr>
                                                    <td className="News-detail-content-table-item">Diện tích:</td>
                                                    <td>Khoảng {item.infor.acreage} m2</td>
                                                    <td className="News-detail-content-table-item">Số diện thoại:</td>
                                                    <td>{"0"+this.state.user.number_phone}</td>
                                                </tr>
                                                <tr>
                                                    <td className="News-detail-content-table-item">Loại tin:</td>
                                                    <td>{this.state.typenews}</td>
                                                    <td className="News-detail-content-table-item">Số phòng bếp:</td>
                                                    <td>{item.infor.nb_kitchenroom} Phòng</td>
                                                </tr>
                                                <tr>
                                                    <td className="News-detail-content-table-item">Số phòng ngủ:</td>
                                                    <td>{item.infor.nb_bedroom} Phòng</td>
                                                    <td className="News-detail-content-table-item">Số phòng tolet:</td>
                                                    <td>{item.infor.nb_bath_toilet} Phòng</td>
                                                </tr>
                                        </tbody>
                                    </table>
                                    </div>  
                           
                                    <div className="col-md-12 col-sm-12 col-xs-12 News-detail-infor wow fadeInUp" data-wow-delay="0.4s">
                                            <h1 className="News-detail-item">Thông tin</h1>
                                            <p className="News-detail-infor-content">{item.infor.content_infor}</p>
                                    </div>
                                   
                                    <div className="row News-detail-untilities wow fadeInUp" data-wow-delay="0.5s">
                                        <h1 className=" col-md-12 col-sm-12 col-xs-12 News-detail-item">Tiện ích</h1>
                                        <div className="col-md-3 col-sm-3 col-xs-6">
                                            {item.utilities.isChecked_wifi && <p className="News-detail-infor-content" > Wifi </p>}
                                            {item.utilities.isChecked_mezzanine && <p className="News-detail-infor-content"> Gác lửng </p>}
                                            {item.utilities.isChecked_camera && <p className="News-detail-infor-content"> Camera an ninh </p>}
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-6">
                                            {item.utilities.isChecked_parking && <p className="News-detail-infor-content"> Bãi đậu xe riêng </p>}
                                            {item.utilities.isChecked_fridge && <p className="News-detail-infor-content"> Tủ lạnh </p>}
                                            {item.utilities.isChecked_WashingMachine && <p className="News-detail-infor-content"> Máy giặt </p>}
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-6">
                                            {item.utilities.isChecked_television && <p className="News-detail-infor-content"> Tivi </p>}
                                            {item.utilities.isChecked_AirConditional && <p className="News-detail-infor-content"> Máy điều hòa </p>}
                                            {item.utilities.isChecked_elevator && <p className="News-detail-infor-content"> Thang máy </p>}
                                        </div>
                                        <div className="col-md-3 col-sm-3 col-xs-6">
                                            {item.utilities.isChecked_pool && <p className="News-detail-infor-content"> Hồ bơi </p>}
                                            {item.utilities.isChecked_park && <p className="News-detail-infor-content"> Công viên </p>}
                                            {item.utilities.isChecked_mattress && <p className="News-detail-infor-content"> Wifi </p>}
                                        </div>
                                
                                    </div>
                                    <div className="col-md-12 col-sm-12 col-xs-12 News-detail-ggmap wow fadeInUp" data-wow-delay="0.6s">
                                            <h1 className="News-detail-item">Bản đồ</h1>
                                            <div style={{ height: '400px', width: '100%' }}>
                                                    <GoogleMapReact
                                                    bootstrapURLKeys={{key:'AIzaSyDLhm8DHP3A6kMCIsiwQWUU-pX5hSbyaQo'}}
                                                    defaultCenter={this.state.center}
                                                    defaultZoom={16}
                                                    yesIWantToUseGoogleMapApiInternals
                                                    onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
                                                    >
                                                    </GoogleMapReact>
                                            </div>
                                    </div>


                                </div>
                                <div className="col-md-3 col-sm-3 col-xs-12 News-near wow fadeInUp" data-wow-delay="0.7s">
                                     <div className="row News-near-header">
                                         <h6>Tin nổi bật gần đó</h6>
                                     </div>
                                     { 
                                    this.state.NewsNears.map((item,key)=>
                                     <div className="row News-near-content" key={key}>
                                            <div className="col-md-4 col-sm-4 col-xs-4 News-near-content-img">
                                                <img src={item.img_avatar} alt="item" />
                                            </div>
                                            <div className="col-md-8 col-sm-8 col-xs-8 News-near-content-link">
                                            <Link className="News-near-content-link-to" onClick={this.ClickNewsNears} to={`/trang-chu/thong-tin-chi-tiet/${item._id}`}>{item.infor.title}</Link>
                                            </div>
                                     </div>
                                     )
                                     }
                                     

                                </div>
                            </div>
                        </div>
                       </div>
                    )}
                        {/* <div className="row">
                        <h1>Tin gần dó</h1>

                        </div> */}
                </div>
           
          
           
        );
    }
}

export default NewsDetail;