import React, { Component } from 'react';
import './datenow.css'
class Datenow extends Component {
    constructor(props) {
        super(props);
        var today = new Date();
        var day = today.getDay();
        switch(day) {
            case 0:
                day="Chủ Nhật"
                break;
            case 1:
                day="Thứ hai"
                break;
            case 2:
                day="Thứ ba"
                break;
            case 3:
                day="Thứ tư"
                break;
            case 4:
                day="Thứ năm"
                break;
            case 5:
                day="Thứ sáu"
                break;
            case 6:
                day="Thứ bảy"
                break;
            default:
                day="Lỗi"
          }
        var date= day+ ', '+today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()+'   (UTC+ ' + today.getUTCHours()+')';
        this.state={
           datenow:date
        } 
    }
  
    render() {
        return (
            <div className="date__now">
                <h5 id="date_now-h5">{this.state.datenow}</h5>
            </div>
        );
    }
}
export default Datenow;