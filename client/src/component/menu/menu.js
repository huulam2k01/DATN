import React, { Component } from 'react';
import img_icon_menu from '../header/image_header/icons_menu.png'
import {NavLink,Link} from "react-router-dom";
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state={
            scrolled:false,
        }
    }
    componentDidMount(){
        window.addEventListener('scroll',()=>{
            const isTop = window.scrollY < 150;
            if(isTop !==true) {
                this.setState({
                    scrolled:true
                })
            }
            else this.setState({scrolled:false})
        });
    }
    
    render() {        
        return (
                <div className={!this.props.stateFiterandslide_imgApp ? 
                  "col-md-12 col-sm-12 col-xs-12 header2-menu " 
                : "col-md-12 col-sm-12 col-xs-12 header2-menu_detail_news" }>
                            <nav className={!this.state.scrolled ? "navbar navbar-expand-lg header2-menu-nav" :"navbar navbar-expand-lg header2-menu-nav-fixed"} id="stickyHeader">
                                        <Link className="navbar-brand" to="/">PhongTroVN</Link>
                                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <span className="navbar-toggler-icon">
                                                <img src={img_icon_menu} alt="icomn_menu"></img>
                                            </span>
                                        </button> 
                                    <div className="collapse navbar-collapse" id="navbarNav">
                                        <ul className="nav navbar-nav ml-auto">
                                            <li className="nav-item active">
                                                <NavLink className="nav-link header2-menu-nav-item" exact activeClassName="header2-menu-nav-item-active" to='/' onClick={this.props.StateFiterandslide_FuncApp}>Trang chủ</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link header2-menu-nav-item" to='/thue-phong-tro'  activeClassName="header2-menu-nav-item-active" onClick={this.props.StateFiterandslide_FuncApp}>Thuê Phòng trọ</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link header2-menu-nav-item"   activeClassName="header2-menu-nav-item-active" to='/thue-nha-tro' onClick={this.props.StateFiterandslide_FuncApp}>Thuê nhà nguyên căn</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link header2-menu-nav-item"  activeClassName="header2-menu-nav-item-active" to='/thue-can-ho' onClick={this.props.StateFiterandslide_FuncApp}>Thuê căn hộ</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className="nav-link header2-menu-nav-item"  activeClassName="header2-menu-nav-item-active" to='/lien-he'>Liên hệ</NavLink>
                                            </li>
                                        </ul>
                                    </div>
                            </nav>
                      
                </div>
        );
    }
}

export default Menu;