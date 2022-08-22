import React, { Component } from 'react';
import './select_option_NT.css'

class SelectOption extends Component {
    constructor(props) {
        super(props);
        this.state={
            nb_bebroom:'',
            nb_bathrom_toilet:'',
            nb_kitchenroom:''
        }
    }
    SelectBedRoom=(e)=>{
        this.setState({
            nb_bebroom:e.target.value
        })
        this.props.getSelectSelectOption(e.target.value,this.state.nb_bathrom_toilet,this.state.nb_kitchenroom);
    }
    SelectBath_Toilet=(e)=>{
        this.setState({
            nb_bathrom_toilet:e.target.value
        })
        this.props.getSelectSelectOption(this.state.nb_bebroom,e.target.value,this.state.nb_kitchenroom);
    }
    SelectKitchenRoom=(e)=>{
        this.setState({
            nb_kitchenroom:e.target.value
        })
        this.props.getSelectSelectOption(this.state.nb_bebroom,this.state.nb_bathrom_toilet,e.target.value);
    }
    render() {
        return (
            <div className="row option_motel">
                <div className="col-md-4 col-sm-4 col-xs-4 option_motel_div"> 
                        <label>Phòng ngủ</label>
                        <select className="form-control nice-select wide select_item select_item_option_NT " onChange={e=>this.SelectBedRoom(e)}>
                            <option value='0'>-- Số phòng ngủ --</option>
                            <option value='1'>1 Phòng </option>
                            <option value='2'>2 Phòng</option>
                            <option value='3'>3 Phòng</option>
                            <option value='4'>4 Phòng</option>
                        </select>
                    
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4 option_motel_div">
                
                <label>Số phòng tắm/vệ sinh </label>
                
                
                    <select className="form-control nice-select wide select_item" onChange={e=>this.SelectBath_Toilet(e)}>
                        <option value='0'>-- Số phòng tắm/vệ sinh --</option>
                        <option value='1'>1 Phòng</option>
                        <option value='2'>2 Phòng</option>
                        <option value='3'>3 Phòng</option>
                    </select>
               
                </div>
                <div className="col-md-4 col-sm-4 col-xs-4 option_motel_div">
                  
                      <label>Phòng bếp</label>
                 
                   
                        <select className="form-control nice-select wide select_item" onChange={e=>this.SelectKitchenRoom(e)}>
                    
                            <option value='0'>-- Số phòng bếp --</option>
                            <option value='1'>1 Phòng </option>
                            <option value='2'>2 Phòng</option>
                            <option value='3'>3 Phòng</option>
                        </select>
                   
                </div>
        </div>
        

        );
    }
}

export default SelectOption;