import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import img_icon_location from "./image_icon/location.png";
import img_idea from "./image_icon/idea.jpg";

import "./home.css";
import PaginatedItems from "./paginatedItems";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      All_News: [],
      NameCity: [],
      NameDistricts: [],
      FeedBack: [],
      NameCityFilter: [],
      NameDistrictsFilter: [],
      Click_Find_News: false,
      flagFilter: false,
      NameUser: [],
      NameRole: [],
    };
    this.props.StateFiterTyhomeNewstoApp();
  }
  async UNSAFE_componentWillMount() {
    await axios
      .get("/trang-chu/tin-tong-hop")
      .then((res) => {
        this.setState({
          All_News: res.data.All_News,
        });
        if (res.data.All_News) {
          res.data.All_News.forEach((element) => {
            axios
              .get(
                `/trang-chu/thong-tin-chi-tiet/city/${element.address.code_city}`
              )
              .then((res) => {
                let NameCity_Array = this.state.NameCity;
                NameCity_Array.push(res.data.NameCity);
                this.setState({
                  NameCity: NameCity_Array,
                });
              })
              .catch((error) => console.log(error));

            axios
              .get(
                `/trang-chu/thong-tin-chi-tiet/dictrict/${element.address.code_dictrict}`
              )
              .then((res) => {
                let NameDistricts_Array = this.state.NameDistricts;
                NameDistricts_Array.push(res.data.NameDistricts);
                this.setState({
                  NameDistricts: NameDistricts_Array,
                });
              })
              .catch((error) => console.log(error));
          });
        }
      })
      .catch((error) => console.log(error));


    // Get Feedback to Server return list Room Home
    await axios
      .get("/nguoi-dung/danh-gia")
      .then((res) => {
        this.setState({
          FeedBack: res.data.feedbacks,
        });
        if (res.data.feedbacks) {
          res.data.feedbacks.forEach((element) => {
            axios
              .get(`/nguoi-dung/thong-tin/${element.iduser}`)
              .then((res) => {
                let NameUser = this.state.NameUser;
                NameUser.push(
                  res.data.user.firstname + " " + res.data.user.lastname
                );
                let NameRole = this.state.NameRole;
                NameRole.push(res.data.user.role);
                this.setState({
                  NameUser: NameUser,
                  NameRole: NameRole,
                });
              })
              .catch((error) => console.log(error));
          });
        }
      })
      .catch((error) => console.log(error));
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  ClickFind_News = () => {
    const close = document.getElementById("Click_Find_News");
    close.click();
  };

  // Click News will show News Detail

  NewsDeitail = () => {
    this.props.NewsDetailtoApp();
  };
  render() {
    return (
      <div className="Home container-fluid">
        <div className="container">
          {this.props.clickFindNewstoApp && (
            <div className="row home_tieude wow fadeInUp" data-wow-delay="0.1s">
              <div className="col-md-12 home_tieude_divh2">
                <h2>Kết quả tìm kiếm</h2>
              </div>
              <div className="col-md-12 home_tieude_divp">
                <p>PhongTroVN giúp bạn tìm kiếm một cách nhanh nhất</p>
              </div>
            </div>
          )}
          {this.props.NewsFiltertoApp.length > 0 ? (
            <div className="row">
              {this.props.NewsFiltertoApp.map((item, index) => (
                <div className="col-12 col-sm-6 col-md-4 col-xl-4" key={index}>
                  <div className="Card wow fadeInUp" data-wow-delay="0.3s">
                    <div className="cardhome">
                      <img
                        className="card-img"
                        src={item.img_avatar}
                        alt="Card"
                      />
                      <div className="cardhome__tym">
                        <span>Lưu</span>
                      </div>
                      <div className="cardhome__price">
                        <span>
                          {this.formatNumber(item.infor.price)
                            ? this.formatNumber(item.infor.price) + " VND"
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="taghome">
                      <Link
                        className="Link-detail-news"
                        onClick={this.NewsDeitail}
                        id={item._id}
                        to={`trang-chu/thong-tin-chi-tiet/${item._id}`}
                      >
                        {item.infor.title}
                      </Link>
                      {this.props.GetNameDistrictsFiltertoApp.length > 0 && (
                        <div className="taghome-location">
                          <img src={img_icon_location} alt="icon_location" />
                          <span>
                            {" "}
                            {this.props.GetNameDistrictsFiltertoApp[index] +
                              ", " +
                              this.props.GetNameCityFiltertoApp[index]}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p
                className={
                  !this.props.clickFindNewstoApp
                    ? "result_filter wow fadeInUp"
                    : "result_filter_No_item wow fadeInUp"
                }
                data-wow-delay="0.1s"
              >
                Không có tin
              </p>
            </div>
          )}
          <div className="row home_tieude wow fadeInUp" data-wow-delay="0.1s">
            <div className="col-md-12 home_tieude_divh2">
              <h2>Tin Nổi Bật</h2>
            </div>
            <div className="col-md-12 home_tieude_divp">
              <p>PhongTroVN giúp bạn tìm kiếm một cách nhanh nhất</p>
            </div>
          </div>
          {/* News VIP  (Tin nổi bật)*/}
          {/* <div className="row"> */}
            {/* {
                            this.state.All_News.map((item,index)=>
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
                                        <div className="taghome-location">
                                            <img src={img_icon_location} alt="icon_location"/>
                                            <span> {this.state.NameDistricts[index] + ", "+this.state.NameCity[index]}</span>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                           )
                        } */}

            <PaginatedItems itemsPerPage={6} items={this.state.All_News} />
          {/* </div> */}
        </div>
        {/* Idea Website Slogan (Thể hiện slogan cho website) */}
        <div className="row idea">
          <div className="col-md-12 col-sm-12 col-xs-12 idea-content">
            <img src={img_idea} alt="idea" className="idea-content-img" />
            <div className="col-md-12 col-sm-12 col-xs-12 bg-overlay-black"></div>
            <div className="col-md-12 col-sm-12 col-xs-12 idea-content-slogan">
              <h3
                className="idea-content-slogan-h3 wow  fadeInUp"
                data-wow-delay="500ms"
              >
                Bạn đang tìm kiếm một nơi cho thuê?
              </h3>
              <h6
                className="idea-content-slogan-h6 wow fadeInUp"
                data-wow-delay="600ms"
              >
                PhongTroVN sẽ giúp bạn một cách nhanh chóng
              </h6>
              <input
                className="idea-content-slogan-button bnt_find wow fadeInUp"
                data-wow-delay="700ms"
                type="button"
                value="Tìm Kiếm"
                onClick={this.ClickFind_News}
              />
              <a href="#Find_News" id="Click_Find_News">
                Haha
              </a>
            </div>
          </div>
        </div>

        {/* FeedBack Website (Khách hàng đánh giá cho website) */}
        <div className="container">
          <div className="row home_tieude wow fadeInUp" data-wow-delay="0.1s">
            <div className="col-md-12 home_tieude_divh2">
              <h2>Đánh giá của mọi người</h2>
            </div>
            <div className="col-md-12 home_tieude_divp">
              <p>PhongTroVN giúp bạn tìm kiếm phòng trọ ưng ý và tốt nhất</p>
            </div>
          </div>
          <OwlCarousel
            className=" owl-carousel owl-theme "
            loop
            margin={0}
            nav
            autoplay
            autoplayTimeout={4000}
            smartSpeed={1000}
          >
            {this.state.FeedBack.map((item, index) => (
              <div className="box-feedback" key={index}>
                <div className=" box-title">
                  <h5 className="box-title-h6">{item.titelfeedback}</h5>
                </div>
                <div className=" box-content">
                  <p className="box-content-p">{item.contentfeedback}</p>
                </div>
                <div className=" box-author-info">
                  <img
                    src={img_idea}
                    alt="author"
                    className="box-author-info-img"
                  />
                  <p className="box-author-info-p">
                    {this.state.NameUser[index]},
                    <span className="box-author-info-span">
                      {this.state.NameRole[index]}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </OwlCarousel>
        </div>
      </div>
    );
  }
}

export default Home;
