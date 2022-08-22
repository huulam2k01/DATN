import React, { Component } from 'react';
import img_slide1 from '../image_header/hero1.jpg'
import img_slide2 from '../image_header/hero2.jpg'
import img_slide3 from '../image_header/hero3.jpg'

class SlideHeader extends Component {
    render() {
        return (
            <div id="demo"style={{width:'100%'}} className="carousel slide" data-ride="carousel">
            {/* Indicators */}
                                {/* The slideshow */}
                            <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={img_slide1} alt="Los Angeles" className="carousel-item_img"/>
                            </div>
                            <div className="carousel-item">
                                <img  src={img_slide2} alt="Chicago" className="carousel-item_img"/>
                            </div>
                            <div className="carousel-item">
                                <img  src={img_slide3} alt="New York" className="carousel-item_img"/>
                            </div>
                            </div>
                                {/* Left and right controls */}
                            <a className="carousel-control-prev" href="#demo" data-slide="prev">
                                <div className="prev_backgroups">
                                    <span className="carousel-control-prev-icon" />
                                </div>
                            </a> 
                                <a className="carousel-control-next" href="#demo" data-slide="next">
                                <div className="next_backgroups">
                                    <span className="carousel-control-next-icon"/>
                                </div>
                            </a>
            </div>
        );
    }
}

export default SlideHeader;