import React, { Component } from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
class Thuenhatro extends Component {
    constructor(props) {
        super(props);
        this.state={
            HouseHome:[],
            NameCity:[],
            NameDistricts:[],
            Click_Find_News:false,
        }
        this.props.StateFiterTyhomeNews_FtoApp(2);
        this.props.ListNewsResettoApp();
        
    }
    async UNSAFE_componentWillMount(){

        await axios.get('/trang-chu/tin-nha-tro')
        .then(res => {
            this.setState({
                HouseHome:res.data.HouseHome
            })
            if(res.data.HouseHome){
                res.data.HouseHome.forEach(element => {
                    axios.get(`/trang-chu/thong-tin-chi-tiet/city/${element.address.code_city}`)
                    .then(res=>{
                        let NameCity_Array=this.state.NameCity
                        NameCity_Array.push(res.data.NameCity)
                        this.setState({
                            NameCity:NameCity_Array
                        })
                    }
                       
                    )
                    .catch( (error) => console.log(error));

                    axios.get(`/trang-chu/thong-tin-chi-tiet/dictrict/${element.address.code_dictrict}`)
                    .then(res=>{
                        let NameDistricts_Array=this.state.NameDistricts;
                        NameDistricts_Array.push(res.data.NameDistricts)
                        this.setState({
                            NameDistricts:NameDistricts_Array
                        })
                    })
                    .catch( (error) => console.log(error)); 
                });
            }
        })
        .catch( (error) => console.log(error)); 

        // Get News to Server return list Room Home  
    }
    formatNumber=(num)=> {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    render() {
        return (
            <div className="Home container-fluid">
              {/* container */}
              <div className="container">
              { this.props.clickFindNewstoApp  &&
                                <div className="row home_tieude wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="col-md-12 home_tieude_divh2">
                                        <h2>Kết quả tìm kiếm</h2>
                                    </div>
                                    <div className="col-md-12 home_tieude_divp">
                                    <p>PhongTroVN giúp bạn tìm kiếm một cách nhanh nhất</p>
                                    </div>
                                </div>
                   }
                    { this.props.NewsFiltertoApp.length >0 ?
                                <div className="row">
                                    {
                                        this.props.NewsFiltertoApp.map((item,index)=>
                                            <div className="col-12 col-sm-6 col-md-4 col-xl-4" key={index} >
                                            <div className="Card wow fadeInUp" data-wow-delay="0.3s" >
                                                <div className="cardhome" >
                                                    <img className="card-img" src={item.img_avatar} alt="Card"/>
                                                    <div className="cardhome__tym">
                                                            <span>Lưu</span>
                                                    </div>
                                                    <div className="cardhome__price">
                                                    <span>{this.formatNumber(item.infor.price) ? this.formatNumber(item.infor.price) + " VND" : ""}</span>
                                                    </div>
                                                </div>
                                                <div className="taghome">
                                                    <Link className="Link-detail-news" onClick={this.NewsDeitail} id={item._id} to={`trang-chu/thong-tin-chi-tiet/${item._id}`}>{item.infor.title}</Link>
                                                    { 
                                                       this.props.GetNameDistrictsFiltertoApp.length>0 &&
                                                        <div className="taghome-location">
                                                            {/* <img src={img_icon_location} alt="icon_location"/>                                                  */}
                                                            <span> {this.props.GetNameDistrictsFiltertoApp[index] + ", "+ this.props.GetNameCityFiltertoApp[index]}</span>
                                                         </div>  

                                                    }
                                                    
                                                </div>
                                            </div>
                                        </div>
                                        
                                    )
                                    }
                                </div>
                                : <div><p className={ !this.props.clickFindNewstoApp ? "result_filter wow fadeInUp" :"result_filter_No_item wow fadeInUp"}  data-wow-delay="0.1s">Không có tin</p></div>
                        
                    }
                    <div className="row home_tieude wow fadeInUp" data-wow-delay="0.1s">
                         <div className="col-md-12 home_tieude_divh2">
                            <h2>Tin Nhà Trọ</h2>
                         </div>
                         <div className="col-md-12 home_tieude_divp">
                           <p>PhongTroVN giúp bạn tìm kiếm nhà trọ nhanh nhất</p>
                         </div>
                    </div>
                    <div className="row">
                        {
                            this.state.HouseHome.map((item,index)=>
                                <div className="col-12 col-sm-6 col-md-4 col-xl-4" key={index} >
                                <div className="Card wow fadeInUp" data-wow-delay="0.3s" >
                                    <div className="cardhome" >
                                        <img className="card-img" src={item.img_avatar} alt="Card"/>
                                        <div className="cardhome__tym">
                                                <span>Lưu</span>
                                        </div>
                                        <div className="cardhome__price">
                                        <span>{this.formatNumber(item.infor.price) ? this.formatNumber(item.infor.price) + " VND" : ""}</span>
                                        </div>
                                    </div>
                                    <div className="taghome">
                                        <Link className="Link-detail-news" onClick={this.props.NewsDetailtoApp} id={item._id} to={`trang-chu/thong-tin-chi-tiet/${item._id}`}>{item.infor.title}</Link>
                                        <div className="taghome-location">
                                            {/* <img src={img_icon_location} alt="icon_location"/> */}
                                            <span> {this.state.NameDistricts[index] + ", "+this.state.NameCity[index]}</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                           )
                        }
                    </div>
              {/* end-container */}
              </div> 
            </div>
        );
    }
}

export default Thuenhatro;