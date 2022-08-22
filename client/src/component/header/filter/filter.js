import React, { Component } from 'react';
import axios from 'axios';
import './filter.css'


import Slider from '@material-ui/core/Slider';
class Filter extends Component {
        constructor(props) {
            super(props);
            this.state={
                valuePrice:[2,20],
                valueAcreage:[20,100],
            
                citys:[],
                districts:[],
                streets:[],

                code_city:'' ,          
                code_dictrict:'',        
                code_street:'', 
                
                typehome:'',

                NewsFilter:[],
                NameCityFilter:[],
                NameDistrictsFilter:[]
            }
        }
        componentDidMount(){
            axios.post('/phong-tro/dang-tin-moi/chon-tinhTP')
           .then(res=>this.setState({
               citys:res.data.citys  
           }))
           .catch( (error) => console.log(error)); 
       }
        setRangePrice=(value)=>{
            this.setState({
                valuePrice:value
            })
        }
        setRangeAcreage=(value)=>{
            this.setState({
                valueAcreage:value
            })
        }
        submitClickCity= async (e)=>{   // Get value and children submit 
            let parent_code = e.target.value;  
            this.setState({
                code_city:parent_code,
            })
            // console.log("parent_code: ", parent_code);
             await axios.post('/phong-tro/dang-tin-moi/chon-QH',{
                parent_code
             },{headers: {'Accept': 'application/json'}})
            .then(res => {
                this.setState({
                    districts:res.data.districts
                });
            })
            .catch((error) => console.log(error));
            if(parent_code==="0"){
                this.setState({
                    streets:[],
                    code_street:'',
                });
            }
            await axios.get(`/phong-tro/dang-tin-moi/danh-sach-duong/${parent_code}`)
            .then(res => {
                this.setState({
                    streets:res.data.streets
                });
            })
            .catch((error) => console.log(error));
            if(parent_code==="0"){
                this.setState({
                    streets:[],
                    code_city:'' ,          
                    code_dictrict:'',        
                    code_street:'', 

                });
            }
        }
         sumitClickDictrict= async (e)=>{
            let parent_code =  e.target.value;
    
            this.setState({
                code_dictrict:parent_code,
            })      
            await axios.post('/phong-tro/dang-tin-moi/chon-Duong',{
                parent_code,
             },{headers: {'Accept': 'application/json'}})
            .then(res => {
                this.setState({
                    streets:res.data.streets
                });
            })
            .catch( (error) => console.log(error)); 
        }
        HandlerInput=()=>{
    
        }
        sumitClickStreet=  (e)=>{
            this.setState({
                code_street:e.target.value,
            }) 
        }
        sumitClickTypeHome=(e)=>{
            this.setState({
                typehome:e.target.value,
            }) 
        }
        ClickFilter= async(e)=>{
        e.preventDefault();
        let{code_city,code_dictrict,code_street,typehome,valuePrice,valueAcreage}=this.state;
        let PriceMin=valuePrice[0]*1000000;
        let PriceMax=valuePrice[1]*1000000;
        let AcreageMin=valueAcreage[0];
        let AcreageMax=valueAcreage[1];
        if(this.props.GetTypeNewstoApp)  typehome=this.props.GetTypeNewstoApp;
    


        await axios.post('/trang-chu/tim-kiem/gia-tien/dien-tich',{
        PriceMin,PriceMax,AcreageMin,AcreageMax
            },{headers: {'Accept': 'application/json'}})
        .then(res => {
                var NewsFilter=res.data.NewsFilter;
                if(code_city !=="0" && code_city!=='' ){
                    NewsFilter=res.data.NewsFilter.filter(result=>result.address.code_city===code_city);
                    
                }
                if(code_dictrict !=="0" && code_dictrict!=='' ){
                    NewsFilter=NewsFilter.filter(result=>result.address.code_dictrict===code_dictrict);  
                }
                if(code_street!=="0" && code_street!==''){
                    NewsFilter=NewsFilter.filter(result=>result.address.code_street===code_street);  
                }
                if(typehome!=="0" && typehome!==''){
                    NewsFilter=NewsFilter.filter(result=>result.infor.typehome===typehome);  
                }
                this.setState({
                    NewsFilter:NewsFilter
                })
            }
        )
        .catch( (error) => console.log(error)); 
        if(this.state.NewsFilter){
          this.state.NewsFilter.forEach(element => {
                axios.get(`/trang-chu/thong-tin-chi-tiet/city/${element.address.code_city}`)
                .then(res=>{
                    let NameCityFitter_Array=this.state.NameCityFilter;
                    NameCityFitter_Array.push(res.data.NameCity)
                    this.setState({
                        NameCityFilter:NameCityFitter_Array
                    })
                })
                .catch( (error) => console.log(error));

                axios.get(`/trang-chu/thong-tin-chi-tiet/dictrict/${element.address.code_dictrict}`)
                .then(res=>{
                    let NameDistrictsFitter_Array=this.state.NameDistrictsFilter;
                    NameDistrictsFitter_Array.push(res.data.NameDistricts)
                    this.setState({
                        NameDistrictsFilter:NameDistrictsFitter_Array
                    })
                })
                .catch( (error) => console.log(error)); 
            });
            
        }    
        this.props.GetNewsFiltertoApp(this.state.NewsFilter,this.state.NameCityFilter,this.state.NameDistrictsFilter,true);
    }
    render() {
        
        return (
            <div className="advanced-search-form" >
                 <div className="search-title" id="Find_News">
                     Tìm kiếm 
                 </div>
                 <div className="row" >
                    <div className="col-md-3 col-sm-4 col-xs-12 select_item">
                        <select className="form-control nice-select wide select_item" 
                        disabled={this.props.StateFiterTyhomeNews_TF ? "": "disabled"}
                        onChange={e=>this.sumitClickTypeHome(e)}>
                                    <option data-display="Thể loại" value="0" >Tất cả</option>
                                    <option value="1">Thuê Phòng Trọ</option>
                                    <option value="2">Thuê Nhà Trọ</option>
                                    <option value="3">Thuê Căn Hộ</option>
                        </select>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12">
                        <div className="form-group">
                            <select className="form-control nice-select wide select_item" name="Haha" onChange={e=>this.submitClickCity(e)}>
                                      <option value='0'>-- Chọn Tỉnh/Thành Phố --</option>
                                      
                                    { 
                                      this.state.citys.map((item,index)=>
                                        <option key={index} value={item.code} >{item.name}</option>)
                                    }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12">
                        <div className="form-group">
                            <select className="form-control nice-select wide select_item" onChange={e=>this.sumitClickDictrict(e)}>
                                            <option value='0'>-- Chọn Quận/Huyện --</option>
                                            {
                                                this.state.districts.map((item,index)=>
                                                    <option key={index} value={item.code} >{item.typename}</option>
                                                )
                                            }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-4 col-xs-12">
                        <div className="form-group">
                                <select className="form-control nice-select wide select_item" onChange={e=>this.sumitClickStreet(e)}>
                                            <option value='0'>-- Chọn Tên Phường --</option>
                                            {
                                            this.state.streets.map((item,index)=>
                                                <option key={index} value={item.code}>{item.typename}</option>
                                            )
                                            }
                                </select>
                        </div>
                    </div>
                 </div>
                 <div className="row">
                       
                        <div className="col-md-6 col-sm-6 col-xs-12">
                                <Slider
                                max={50}
                                min={0}
                                value={this.state.valuePrice}
                                onChange={(e,value)=>this.setRangePrice(value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"/>

                                <label className="range">{this.state.valuePrice[0] + " Triệu  - "  +  this.state.valuePrice[1]+ " Triệu "}</label>
                                
                            
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12">
                                <Slider
                                 max={200}
                                 min={0}
                                value={this.state.valueAcreage}
                                onChange={(e,value)=>this.setRangeAcreage(value)}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"/>
                                
                                <label className="range">{this.state.valueAcreage[0] + " m2  - "  +  this.state.valueAcreage[1]+ " m2 "}</label>
                        </div>


                 </div>
                 <div className="row find_home">
                        <input className="bnt_find" type="button" value="Tìm Kiếm" onClick={e=>this.ClickFilter(e)}/>
                 </div>
            </div>
        );
    }
}

export default Filter;