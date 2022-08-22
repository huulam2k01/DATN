import React, { Component } from 'react';
import './utilities.css' 

class Utilities extends Component {
    constructor(props) {
        super(props)
        this.state={
            // All utilities
            isChecked_wifi:false,
            isChecked_mezzanine:false,
            isChecked_camera:false,
            isChecked_parking:false,
            //Nhà và căn hộ
            isChecked_fridge:false,
            isChecked_WashingMachine:false,
            isChecked_television:false,
            isChecked_AirConditional:false,
            isChecked_elevator:false,
            isChecked_pool:false,
            isChecked_park:false,
            isChecked_mattress:false,
        }
        
    }
    getValueIsChecked(){
        let utilities_typehome_roomhome={
            isChecked_wifi:this.state.isChecked_wifi,
            isChecked_mezzanine:this.state.isChecked_mezzanine,
            isChecked_camera:this.state.isChecked_camera,
            isChecked_parking:this.state.isChecked_parking,
        }
        if(this.props.typehome===1){
            this.props.getValueUtilities(utilities_typehome_roomhome);
        }else this.props.getValueUtilities(this.state);
    }
    
    toggleChange_wifi=async ()=>{
        await this.setState({
            isChecked_wifi:!this.state.isChecked_wifi
        })
        this.getValueIsChecked();
    }
    toggleChange_mezzanine=async()=>{
        this.setState({
            isChecked_mezzanine:!this.state.isChecked_mezzanine
    })
    this.getValueIsChecked();
    }
    toggleChange_camera=async()=>{
        this.setState({
            isChecked_camera:!this.state.isChecked_camera
       })
       this.getValueIsChecked();
    }
    toggleChange_parking=async()=>{
        this.setState({
            isChecked_parking:!this.state.isChecked_parking
       })
       this.getValueIsChecked();
    }
    toggleChange_fridge=async()=>{
        this.setState({
            isChecked_fridge:!this.state.isChecked_fridge
       })
       this.getValueIsChecked();
    }
    toggleChange_WashingMachine=async()=>{
        this.setState({
            isChecked_WashingMachine:!this.state.isChecked_WashingMachine
       })
       this.getValueIsChecked();
    }
    toggleChange_television=async()=>{
        this.setState({
            isChecked_television:!this.state.isChecked_television
       })
    }
    toggleChange_AirConditional=async()=>{
        this.setState({
            isChecked_AirConditional:!this.state.isChecked_AirConditional
       })
       this.getValueIsChecked();
    }
    toggleChange_elevator=async()=>{
        this.setState({
            isChecked_elevator:!this.state.isChecked_elevator
       })
       this.getValueIsChecked();
    }
    toggleChange_mattress=async()=>{
        this.setState({
            isChecked_mattress:!this.state.isChecked_mattress
       })
       this.getValueIsChecked();
    }
    toggleChange_pool=async()=>{
        this.setState({
            isChecked_pool:!this.state.isChecked_pool
       })
       this.getValueIsChecked();
    }
    toggleChange_park=async()=>{
        this.setState({
            isChecked_park:!this.state.isChecked_park
       })
       this.getValueIsChecked();
    }
    render() {
        
        return (

            <div className="row image_news  wow fadeInUp" data-wow-delay="0.1s">
                <div className="row image_news_title">
                         <div className="col-md-12 col-sm-12 col-xs-12">
                             <h2 className="info_news_div-h2">Tiện ích</h2>
                         </div>
                </div>
                <div className="row utilities-checkbox">

                {/* Chung cho cac the loai */}
                <div className="col-md-3 col-sm-3 col-xs-6">  
                    <label className="container-checkbox">Wifi
                        <input type="checkbox" 
                        checked={this.state.isChecked_wifi}
                        onChange={this.toggleChange_wifi} />
                        <span className="checkmark" />
                    </label>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6">  
                    <label className="container-checkbox">Gác lửng
                        <input type="checkbox" 
                        checked={this.state.isChecked_mezzanine}
                        onChange={this.toggleChange_mezzanine}/>
                        <span className="checkmark" />
                    </label>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6">  
                    <label className="container-checkbox">Camera an ninh
                        <input type="checkbox" 
                         checked={this.state.isChecked_camera}
                         onChange={this.toggleChange_camera}/>
                        <span className="checkmark" />
                    </label>
                </div>
                <div className="col-md-3 col-sm-3 col-xs-6">  
                    <label className="container-checkbox">Bãi để xe 
                        <input type="checkbox" 
                         checked={this.state.isChecked_parking}
                         onChange={this.toggleChange_parking}/>
                        <span className="checkmark" />
                    </label>
                </div>
                {/* Cho the loai nha nguyen can / can ho */}
                { this.props.open_selectoption_NT_CH &&
                <div className="row">
                    <div className="col-md-3 col-sm-3 col-xs-6">  
                        <label className="container-checkbox">Tủ lạnh
                            <input type="checkbox" 
                             checked={this.state.isChecked_fridge}
                             onChange={this.toggleChange_fridge} />
                            <span className="checkmark" />
                        </label>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">  
                        <label className="container-checkbox">Máy giặt
                            <input type="checkbox" 
                             checked={this.state.isChecked_WashingMachine}
                             onChange={this.toggleChange_WashingMachine} />
                            <span className="checkmark" />
                        </label>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">  
                        <label className="container-checkbox">Ti vi
                            <input type="checkbox" 
                             checked={this.state.isChecked_television}
                             onChange={this.toggleChange_television}/>
                            <span className="checkmark" />
                        </label>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">  
                        <label className="container-checkbox">Điều hòa 
                            <input type="checkbox"  
                             checked={this.state.isChecked_AirConditional}
                             onChange={this.toggleChange_AirConditional}/>
                            <span className="checkmark" />
                        </label>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">  
                        <label className="container-checkbox">Thang máy 
                            <input type="checkbox"  
                             checked={this.state.isChecked_elevator}
                             onChange={this.toggleChange_elevator}/>
                            <span className="checkmark" />
                        </label>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">  
                        <label className="container-checkbox">Giường nệm
                            <input type="checkbox" 
                            checked={this.state.isChecked_mattress}
                            onChange={this.toggleChange_mattress}/>
                            <span className="checkmark" />
                        </label>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">  
                        <label className="container-checkbox">Hồ bơi
                            <input type="checkbox" 
                            checked={this.state.isChecked_pool}
                            onChange={this.toggleChange_pool}/>
                            <span className="checkmark" />
                        </label>
                    </div>
                    <div className="col-md-3 col-sm-3 col-xs-6">  
                        <label className="container-checkbox">Công viên
                            <input type="checkbox" 
                             checked={this.state.isChecked_park}
                             onChange={this.toggleChange_park}/>
                            <span className="checkmark" />
                        </label>
                    </div>

                </div>
                }

               </div>
                
                   
               
                
            </div>
        );
    }
}

export default Utilities;