import React, { Component } from 'react';
import {Route,Switch} from "react-router-dom";
import Home from './component/home/home';
import ThuePhongTro from './component/thuephongtro/thuephongtro';
import ThueNhaTro from './component/thuenhatro/thuenhatro';
import Contact from './component/contact/contact';
import NewsDetail from './component/newsdetail/newsdetail'
import ThueCanHo from './component/thuecanho/thuecanho';

class RouterWeb extends Component {
   
    render() {
        return (
            <div>   
                    <Switch>
                        {!this.props.StateNextPage &&
                            <Route
                                exact path='/'
                                render={props => < Home {...props} NewsDetailtoApp={this.props.NewsDetailtoApp}     // State img-home silderShow (True or False)
                                StateFiterTyhomeNewstoApp={this.props.StateFiterTyhomeNewstoApp}
                                NewsFiltertoApp={this.props.NewsFiltertoApp}             // List then News Filter 
                                clickFindNewstoApp={this.props.clickFindNewstoApp}       // State press button Find News to Filter (True or False)
                                GetNameCityFiltertoApp={this.props.GetNameCityFiltertoApp}
                                GetNameDistrictsFiltertoApp={this.props.GetNameDistrictsFiltertoApp}
                                />}   
                            
                            
                            
                            />
                        }
                        <Route
                            path="/thue-phong-tro" 
                            render={props => < ThuePhongTro {...props} NewsDetailtoApp={this.props.NewsDetailtoApp} 
                            StateFiterTyhomeNews_FtoApp={this.props.StateFiterTyhomeNews_FtoApp} 
                            NewsFiltertoApp={this.props.NewsFiltertoApp}
                            clickFindNewstoApp={this.props.clickFindNewstoApp}
                            ListNewsResettoApp={this.props.ListNewsResettoApp}
                            GetNameCityFiltertoApp={this.props.GetNameCityFiltertoApp}
                            GetNameDistrictsFiltertoApp={this.props.GetNameDistrictsFiltertoApp}/>}
                        />
                        {/* {this.props.stateFiterandslide_imgApp && */}
                        <Route
                            path="/trang-chu/thong-tin-chi-tiet/:id"
                            render={props => < NewsDetail {...props} NewsDetailtoApp={this.props.NewsDetailtoApp} 
                            />}
                        />
                        {/* } */}
                         <Route
                           path="/thue-nha-tro" 
                            render={props => < ThueNhaTro {...props} NewsDetailtoApp={this.props.NewsDetailtoApp} 
                            StateFiterTyhomeNews_FtoApp={this.props.StateFiterTyhomeNews_FtoApp} 
                            NewsFiltertoApp={this.props.NewsFiltertoApp}
                            clickFindNewstoApp={this.props.clickFindNewstoApp} 
                            ListNewsResettoApp={this.props.ListNewsResettoApp}
                            GetNameCityFiltertoApp={this.props.GetNameCityFiltertoApp}
                            GetNameDistrictsFiltertoApp={this.props.GetNameDistrictsFiltertoApp}/>}
                        />    
                         <Route
                           path="/thue-can-ho" 
                            render={props => < ThueCanHo {...props} NewsDetailtoApp={this.props.NewsDetailtoApp} 
                            StateFiterTyhomeNews_FtoApp={this.props.StateFiterTyhomeNews_FtoApp}  
                            NewsFiltertoApp={this.props.NewsFiltertoApp}
                            clickFindNewstoApp={this.props.clickFindNewstoApp}
                            ListNewsResettoApp={this.props.ListNewsResettoApp}
                            GetNameCityFiltertoApp={this.props.GetNameCityFiltertoApp}
                            GetNameDistrictsFiltertoApp={this.props.GetNameDistrictsFiltertoApp}/>}
                        />  
                        <Route path="/lien-he" component={Contact}/>  
                       
                    </Switch>
            </div>
        );
    }
}
export default  RouterWeb;