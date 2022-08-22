import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import img_icon_location from "../../home/image_icon/location.png";
import img_icon_price from "./news_image/price.png";
import img_icon_space from "./news_image/space.png";
import img_icon_phone_call from "./news_image/phone-call.png";

import "./news_new.css";

import UploadImage from "./upload_image_news/upload_image";
import SelectOption from "./select_option_NT/select_option_NT";
import GoogleMap from "./google_map/google_map";
import Utilities from "./utilities/utilities";
import  {
  geocodeByAddress, getLatLng,
} from "react-google-places-autocomplete";
class Newsnew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceSku: [
        {
          name: "thanh toans paypal",
          sku: "004",
          price: "5.00",
          currency: "USD",
          quantity: 2,
        },
        {
          name: "thanh toan bai dang phong tro",
          sku: "001",
          price: "1.00",
          currency: "USD",
          quantity: 1,
        },
        {
          name: "thanh toan bai dang nha tro",
          sku: "002",
          price: "1.50",
          currency: "USD",
          quantity: 1,
        },
        {
          name: "thanh toan bai dang can ho",
          sku: "003",
          price: "2.00",
          currency: "USD",
          quantity: 1,
        },
      ],

      sku: "001",
      //###########__ Get Children Select address__########
      city: "",
      district: "",
      street: "",
      //###########__ Get data Select address (to database)__########
      citys: [],
      districts: [],
      streets: [],

      //###########__ Get value input address__########
      inputmap: "",
      open_selectoption_NT_CH: false,
      result_postnews: false,
      //################__ Save News __###############
      code_city: "",
      code_dictrict: "",
      code_street: "",
      number_home: "",
      news_title: "",
      code_type_news: "",
      news_content_infor: "",
      price: "",
      acreage: "",
      url_Image: "",
      url_Images_Infor: [],
      message_postnews: "",
      price_format: "",
      //################__ Optiion Select Home __########
      nb_bedroom: "",
      nb_bath_toilet: "",
      nb_kitchenroom: "",
      //################__Utilities __########
      utilities: "",
      //################__Type Home (Thể loại đăng tin) __########
      typehome: 1,
      urltypenews: "",
      Lat_ggmap: "",
      Lng_ggmap: "",
    };
  }

  componentDidMount() {
    axios
      .post("/phong-tro/dang-tin-moi/chon-tinhTP")
      .then((res) =>
        this.setState({
          citys: res.data.citys,
        })
      )
      .catch((error) => console.log(error));

    window.addEventListener(
      "beforeunload",
      function (e) {
        // Do something
        console.log(e);
      },
      false
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.inputmap !== prevState.inputmap && this.state.inputmap) {
      console.log("BBBBBBBBBBB");
      geocodeByAddress(this.state.inputmap)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) =>
        console.log('Successfully got latitude and longitude', { lat, lng })
      )
     .catch((error) => console.error(error));
    }
  }

  submitClickCity = async (e) => {
    // Get value and children submit
    var city = "";
    let parent_code = e.target.value;
    if (e.target.value !== "0") {
      city = e.target[e.target.selectedIndex].text;
    }
    this.setState({
      code_city: parent_code,
      city: city,
      inputmap:
        this.state.number_home +
        " " +
        this.state.street +
        this.state.district +
        city,
    });
    await axios
      .post(
        "/phong-tro/dang-tin-moi/chon-QH",
        {
          parent_code,
        },
        { headers: { Accept: "application/json" } }
      )
      .then((res) => {
        this.setState({
          districts: res.data.districts,
        });
      })
      .catch((error) => console.log(error));

    //  Select list streets to code city (Lấy mã tỉnh chon ra danh sach duong)
    await axios
      .get(`/phong-tro/dang-tin-moi/danh-sach-duong/${parent_code}`)
      .then((res) => {
        this.setState({
          streets: res.data.streets,
        });
        if (res.data.streets) {
          this.setState({
            number_home: "",
            district: "",
            street: "",
            inputmap: city,
          });
        }
      })
      .catch((error) => console.log(error));
    if (parent_code === "0") {
      this.setState({
        streets: [],
        code_street: "",
        inputmap: "",
        number_home: "",
      });
    }
  };
  sumitClickDictrict = async (e) => {
    var district = "";
    let parent_code = e.target.value;
    let parent_code_city = this.state.code_city;
    if (e.target.value !== 0) {
      district = e.target[e.target.selectedIndex].text + ", ";
    }
    this.setState({
      district: district,
      code_dictrict: parent_code,
      inputmap:
        this.state.number_home +
        " " +
        this.state.street +
        district +
        this.state.city,
    });
    await axios
      .post(
        "/phong-tro/dang-tin-moi/chon-Duong",
        {
          parent_code,
          parent_code_city,
        },
        { headers: { Accept: "application/json" } }
      )
      .then((res) => {
        this.setState({
          streets: res.data.streets,
        });
      })
      .catch((error) => console.log(error));
  };
  HandlerInput = () => {
    console.log("AAAAAAAAAAA");
  };
  sumitClickStreet = (e) => {
    var street = "";
    if (e.target.value !== "0") {
      street = e.target[e.target.selectedIndex].text + ", ";
    }
    this.setState({
      street: street,
      code_street: e.target.value,
      inputmap:
        this.state.number_home +
        " " +
        street +
        this.state.district +
        this.state.city,
    });
  };
  HandlerInputNumberHome = () => {
    let number_home = this.refs.number_home.value;
    this.setState({
      number_home: number_home,
      inputmap:
        this.refs.number_home.value +
        " " +
        this.state.street +
        this.state.district +
        this.state.city,
    });
  };
  SelectTypeHome = (e) => {
    if (e.target.value === "1") {
      this.setState({
        typehome: 1,
        open_selectoption_NT_CH: false,
        sku: "001",
      });
    } else if (e.target.value === "2") {
      this.setState({
        typehome: 2,
        open_selectoption_NT_CH: true,
        sku: "002",
      });
    } else {
      this.setState({
        typehome: 3,
        open_selectoption_NT_CH: true,
        sku: "003",
      });
    }
  };
  getSelectSelectOption = (nb_bedroom, nb_bath_toilet, nb_kitchenroom) => {
    this.setState({
      nb_bedroom: nb_bedroom,
      nb_bath_toilet: nb_bath_toilet,
      nb_kitchenroom: nb_kitchenroom,
    });
  };
  getUrlImage_News = (Url_Image, NameImages_Infor) => {
    var Url_Images_Infor = [];
    NameImages_Infor.forEach((item) => {
      Url_Images_Infor.push(
        "http://localhost:3001/phong-tro/open_image/nameimage=" + item
      );
    });
    this.setState({
      url_Image: Url_Image,
      url_Images_Infor: Url_Images_Infor,
    });
  };
  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  handleChangeField = () => {
    this.setState({
      news_title: this.refs.title.value,
      news_content_infor: this.refs.content_infor.value,
      price: this.refs.price.value,
      price_format: this.formatNumber(this.refs.price.value),
      acreage: this.refs.acreage.value,
    });
  };
  sumitPostNews = async () => {
    let date = new Date();
    let date_format = date.toLocaleDateString();

    let date_n = new Date();
    let date_fn = new Date(date_n.setMonth(date_n.getMonth() + 1));
    let date_finish_format = date_fn.toLocaleDateString();

    let sku = this.state.sku;

    let title = this.state.news_title;
    let content_infor = this.state.news_content_infor;
    let number_phone = this.props.GetPhone_Number;
    let price = this.state.price;
    let acreage = this.state.acreage;
    let img_avatar = this.state.url_Image;
    let img_infor = this.state.url_Images_Infor;
    let code_city = this.state.code_city;
    let code_dictrict = this.state.code_dictrict;
    let code_street = this.state.code_street;
    let address_detail = this.state.inputmap;
    let typehome = this.state.typehome;
    let date_now = date_format;
    let date_finish = date_finish_format;
    let utilities = this.state.utilities;
    let Lat_ggmap = this.state.Lat_ggmap;
    let Lng_ggmap = this.state.Lng_ggmap;

    // let paymentState =false;
    //  await axios.post('/thanh-toan/pay',{sku}).then((res) => {
    //     if (res.status === 200) {
    //       console.log(res.data)
    //       let paymentWindow = window.open(res.data.forwardLink,'_blank',"width=1000,height=1000")
    //       if (window.focus) {paymentWindow.focus()}
    //       console.log("paymentWindow: ", paymentWindow);
    //     } else {
    //       console.log("thanh toan failed");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })

    let payment = await axios.post("/thanh-toan/pay", { sku });
    if (payment.status !== 200) {
      throw Error("Thanh toán thất bại");
    }
    let paymentWindow = window.open(
      payment.data.forwardLink,
      "_blank",
      "width=1000,height=1000"
    );
    //   document.getElementById('overlay').style.display = 'block';
    if (window.focus()) {
      paymentWindow.focus();
    }

    let state = setTimeout(async () => {
      state = document.cookie;
      if (state === "state=true") {
        document.cookie = "state=false; path=/";
        if (this.state.typehome === 1) {
          await axios
            .post("/phong-tro/dang-tin-moi/phong-tro", {
              title,
              content_infor,
              number_phone,
              price,
              acreage,
              img_avatar,
              img_infor,
              code_city,
              code_dictrict,
              code_street,
              Lat_ggmap,
              Lng_ggmap,
              typehome,
              utilities,
              date_now,
              date_finish,
              address_detail,
            })
            .then((res) => {
              if (res.data.result) {
                this.setState({
                  result_postnews: true,
                  message_postnews: res.data.message,
                  urltypenews: "/nguoi-dung/quan-ly-tin-dang/phong-tro",
                });
              } else {
                this.setState({
                  result_postnews: false,
                  message_postnews: res.data.message,
                });
              }
            })
            .catch((error) => console.log(error));
        } else if (this.state.typehome === 2) {
          let nb_bedroom = this.state.nb_bedroom;
          let nb_bath_toilet = this.state.nb_bath_toilet;
          let nb_kitchenroom = this.state.nb_kitchenroom;
          axios
            .post(
              "/phong-tro/dang-tin-moi/nha-tro",
              {
                title,
                content_infor,
                number_phone,
                price,
                acreage,
                img_avatar,
                img_infor,
                code_city,
                code_dictrict,
                code_street,
                Lat_ggmap,
                Lng_ggmap,
                nb_bedroom,
                nb_bath_toilet,
                nb_kitchenroom,
                utilities,
                date_now,
                date_finish,
                typehome,
                address_detail,
              },
              { headers: { Accept: "application/json" } }
            )
            .then((res) => {
              if (res.data.result) {
                this.setState({
                  result_postnews: true,
                  message_postnews: res.data.message,
                  urltypenews: "/nguoi-dung/quan-ly-tin-dang/nha-tro",
                });
              } else {
                this.setState({
                  result_postnews: false,
                  message_postnews: res.data.message,
                });
              }
            })
            .catch((error) => console.log(error));
        } else {
          let nb_bedroom = this.state.nb_bedroom;
          let nb_bath_toilet = this.state.nb_bath_toilet;
          let nb_kitchenroom = this.state.nb_kitchenroom;
          axios
            .post(
              "/phong-tro/dang-tin-moi/can-ho",
              {
                title,
                content_infor,
                number_phone,
                price,
                acreage,
                img_avatar,
                img_infor,
                code_city,
                code_dictrict,
                code_street,
                Lat_ggmap,
                Lng_ggmap,
                nb_bedroom,
                nb_bath_toilet,
                nb_kitchenroom,
                utilities,
                date_now,
                date_finish,
                typehome,
                address_detail,
              },
              { headers: { Accept: "application/json" } }
            )
            .then((res) => {
              if (res.data.result) {
                this.setState({
                  result_postnews: true,
                  message_postnews: res.data.message,
                  urltypenews: "/nguoi-dung/quan-ly-tin-dang/can-ho",
                });
              } else {
                this.setState({
                  result_postnews: false,
                  message_postnews: res.data.message,
                });
              }
            })
            .catch((error) => console.log(error));
        }
      }
    }, 10000);
    //   if (!paymentWindow.closed) {
    //     throw ("Thanh toán thất bại.")
    //   }

    // function getCookie() {
    //   state = document.cookie;
    //   console.log("state: ", state);
    // }
    //   const paymentState = await state;
    //   console.log("state: ",state);

    // console.log("paymentState: ", paymentState);

    // if(this.state.typehome===1){

    //    await axios.post('/phong-tro/dang-tin-moi/phong-tro',{
    //         title,content_infor,number_phone,price,acreage,img_avatar,img_infor,
    //         code_city,code_dictrict,code_street,Lat_ggmap,Lng_ggmap,typehome,
    //         utilities,date_now,date_finish,address_detail
    //      })
    //     .then(res => {
    //         if(res.data.result)
    //         {
    //             this.setState({
    //                 result_postnews:true,
    //                 message_postnews:res.data.message,
    //                 urltypenews:'/nguoi-dung/quan-ly-tin-dang/phong-tro'
    //             });

    //         }else{
    //             this.setState({
    //                 result_postnews:false,
    //                 message_postnews:res.data.message
    //             });
    //         }

    //     })
    //     .catch( (error) => console.log(error));
    // }else if(this.state.typehome===2){
    //     let nb_bedroom=this.state.nb_bedroom;
    //     let nb_bath_toilet=this.state.nb_bath_toilet;
    //     let nb_kitchenroom=this.state.nb_kitchenroom;
    //     axios.post('/phong-tro/dang-tin-moi/nha-tro',{
    //         title,content_infor,number_phone,price,acreage,img_avatar,img_infor,
    //         code_city,code_dictrict,code_street,Lat_ggmap,Lng_ggmap,nb_bedroom,nb_bath_toilet,
    //         nb_kitchenroom,utilities,date_now,date_finish,typehome,address_detail
    //      },{headers: {'Accept': 'application/json'}})
    //     .then(res => {
    //         if(res.data.result)
    //         {
    //             this.setState({
    //                 result_postnews:true,
    //                 message_postnews:res.data.message,
    //                 urltypenews:'/nguoi-dung/quan-ly-tin-dang/nha-tro'
    //             });
    //         }else{
    //             this.setState({
    //                 result_postnews:false,
    //                 message_postnews:res.data.message
    //             });
    //         }

    //     })
    //     .catch( (error) => console.log(error));
    // }
    // else{
    //     let nb_bedroom=this.state.nb_bedroom;
    //     let nb_bath_toilet=this.state.nb_bath_toilet;
    //     let nb_kitchenroom=this.state.nb_kitchenroom;
    //     axios.post('/phong-tro/dang-tin-moi/can-ho',{
    //         title,content_infor,number_phone,price,acreage,img_avatar,img_infor,
    //         code_city,code_dictrict,code_street,Lat_ggmap,Lng_ggmap,nb_bedroom,nb_bath_toilet,
    //         nb_kitchenroom,utilities,date_now,date_finish,typehome,address_detail
    //      },{headers: {'Accept': 'application/json'}})
    //     .then(res => {
    //         if(res.data.result)
    //         {
    //             this.setState({
    //                 result_postnews:true,
    //                 message_postnews:res.data.message,
    //                 urltypenews:'/nguoi-dung/quan-ly-tin-dang/can-ho'
    //             });
    //         }else{
    //             this.setState({
    //                 result_postnews:false,
    //                 message_postnews:res.data.message
    //             });
    //         }
    //     })
    //     .catch( (error) => console.log(error));
    // }
  };

  // Check value utilities (Lấy giá trị của các tiện ích)
  getValueUtilities = (valueisCheck) => {
    console.log(valueisCheck.isChecked_wifi);
    this.setState({
      utilities: valueisCheck,
    });
  };
  getLocation = (value) => {
    this.setState({
      Lat_ggmap: value.lat,
      Lng_ggmap: value.lng,
    });
    console.log("Lat_ggmap: ", this.state.Lat_ggmap);
    console.log("Lng_ggmap: ", this.state.Lng_ggmap);
    console.log("value: ", value);
  };

  render() {
    var KTL = true;
    if (this.state.message_postnews) {
      KTL = false;
    }
    if (this.state.result_postnews)
      return <Redirect to={this.state.urltypenews} />;
    return (
      <div className="container-fluid">
        <div className="row alert_messager">
          {!KTL && (
            <div className="alert alert-danger">
              {this.state.message_postnews}
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 tieudepage_mg">
            <h2 className="tieudepage_mg-h2">Đăng tin mới</h2>
            <p>
              Thông tin càng chính xác giúp cho người thuê một cách tốt nhất
            </p>
          </div>
        </div>
        <div className="ggmappage wow fadeInUp" data-wow-delay="0.1s">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12 ggmappage_mg">
              <h2 className="ggmappage_mg-h2">Địa chỉ cho thuê</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="form-group">
                <select
                  className="form-control nice-select wide select_item"
                  name="Haha"
                  onChange={(e) => this.submitClickCity(e)}
                >
                  <option value="0" name="0">
                    -- Chọn Tỉnh/Thành Phố --
                  </option>

                  {this.state.citys.map((item, index) => (
                    <option key={index} value={item.code} name={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="form-group">
                <select
                  className="form-control nice-select wide select_item"
                  onChange={(e) => this.sumitClickDictrict(e)}
                >
                  <option value="0">-- Chọn Quận/Huyện --</option>
                  {this.state.districts.map((item, index) => (
                    <option
                      key={index}
                      value={item.code}
                      typename={item.typename}
                    >
                      {item.typename}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="form-group">
                <select
                  className="form-control nice-select wide select_item"
                  onChange={(e) => this.sumitClickStreet(e)}
                >
                  <option value="0">-- Chọn Tên Phường --</option>
                  {this.state.streets.map((item, index) => (
                    <option key={index} value={item.code}>
                      {item.typename}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-12">
              <input
                className="input_so_nha"
                placeholder="Số Nhà"
                value={this.state.number_home}
                ref="number_home"
                onChange={this.HandlerInputNumberHome}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-1 col-sm-1 col-xs-2 exact_icon_location">
              <img src={img_icon_location} alt="icon location" />
            </div>
            <div className="col-md-11 col-sm-11 col-xs-10 exact_input_location">
              <input
                className="exact_input_location-input"
                placeholder="Địa chỉ chính xác"
                value={this.state.inputmap}
                ref="inputmap"
                onChange={this.HandlerInput}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12 google_map">
              <GoogleMap getLocationtoNewsNews={this.getLocation} />
            </div>

          </div>
        </div>
        <div className="row info_news  wow fadeInUp" data-wow-delay="0.1s">
          <div className="col-md-12 col-sm-12 col-xs-12 info_news_div">
            <h2 className="info_news_div-h2">Thông tin mô tả</h2>
          </div>
          <div className="col-md-8 col-sm-8 col-xs-12">
            <input
              className="infor_news_input_td"
              ref="title"
              value={this.state.news_title}
              onChange={this.handleChangeField}
              placeholder="Tiêu đề"
            />
          </div>
          <div className="col-md-4 col-sm-4 col-xs-12">
            <div className="col-md-10 col-sm-10 col-xs-12">
              <select
                className="form-control nice-select wide select_item"
                onChange={(e) => this.SelectTypeHome(e)}
              >
                <option value="1">Thuê phòng trọ</option>
                <option value="2">Thuê nhà nguyên căn</option>
                <option value="3">Thuê căn hộ</option>
              </select>
            </div>
          </div>
          <div className="row content_news">
            <div className="col-md-8 col-sm-8 col-xs-12 content_news">
              <textarea
                ref="content_infor"
                value={this.state.news_content_infor}
                onChange={this.handleChangeField}
                placeholder="Mô tả thông tin nhà trọ"
              />
            </div>
            <div className="col-md-4 col-sm-4 col-xs-12 content-warning">
              <div className="alert alert-warning" role="alert">
                <div className="row titel-warning">
                  <h4>Lưu ý khi đăng tin</h4>
                </div>
                <div className="row body-warning">
                  <ul>
                    <li>Nội dung phải viết bằng tiếng Việt có dấu</li>
                    <li>Tiêu đề tin không dài quá 100 kí tự</li>
                    <li>
                      Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng
                      có hiệu quả hơn.
                    </li>
                    <li>
                      {" "}
                      Để tăng độ tin cậy và tin rao được nhiều người quan tâm
                      hơn, hãy sửa vị trí tin rao của bạn trên bản đồ bằng cách
                      kéo icon tới đúng vị trí của tin rao.
                    </li>
                    <li>
                      Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều
                      lần so với tin rao không có ảnh. Hãy đăng ảnh để được giao
                      dịch nhanh chóng!
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4 ">
            <div className="row">
              <div className="col-md-2 col-sm-2 col-xs-4 icon_option">
                <img src={img_icon_phone_call} alt="icon phone" />
              </div>
              <div className="col-md-10 col-sm-10 col-xs-8 input_option">
                <input
                  className="content_news_ip"
                  placeholder="Số điện thoại"
                  value={"0" + this.props.GetPhone_Number}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            <div className="row">
              <div className="col-md-2 col-sm-2 col-xs-2 icon_option">
                <img src={img_icon_price} alt="icon price" />
              </div>
              <div className="col-md-6 col-sm-6 col-xs-6 input_option">
                <input
                  className="content_news_ip"
                  ref="price"
                  value={this.state.price}
                  onChange={this.handleChangeField}
                  placeholder="Giá tiền"
                />
              </div>
              {this.state.price_format && (
                <div className="col-md-4 col-sm-6 col-xs-4 row price_format">
                  <div className="row price_format-label">
                    <label>Số tiền:</label>
                  </div>
                  <div className="row  price_format-span">
                    <span>
                      {this.state.price_format
                        ? this.state.price_format + " VND"
                        : " "}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-4 col-sm-4 col-xs-4">
            <div className="row">
              <div className="col-md-2 col-sm-2 col-xs-4 icon_option">
                <img src={img_icon_space} alt="icon space" />
              </div>
              <div className="col-md-10 col-sm-10 col-xs-8 input_option">
                <input
                  className="content_news_ip"
                  ref="acreage"
                  value={this.state.acreage}
                  onChange={this.handleChangeField}
                  placeholder="Diện tích"
                />
                <label className="input_option-acreage">m2</label>
              </div>
            </div>
          </div>
          {this.state.open_selectoption_NT_CH && (
            <SelectOption getSelectSelectOption={this.getSelectSelectOption} />
          )}
        </div>
        <Utilities
          typehome={this.state.typehome}
          open_selectoption_NT_CH={this.state.open_selectoption_NT_CH}
          getValueUtilities={this.getValueUtilities}
        />
        <UploadImage
          getUrlImage_News={this.getUrlImage_News}
          PostNewsResult={this.state.result_postnews}
        />

        <div
          className="col-md-12 col-sm-12 col-xs-12"
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 5px 30px rgb(0 0 0 / 15%)",
            marginBottom: "50px",
            padding: "10px 15px 40px 15px",
          }}
        >
          <h3 className="info_news_div-h2" style={{ color: "red" }}>
            * Giá đăng tin :{" "}
            <span>
              {this.state.priceSku.find((x) => x.sku === this.state.sku).price}{" "}
              USD
            </span>
          </h3>
        </div>
        <div className="col-md-12 col-sm-12 col-xs-12">
          <button className="btn_PostNews" onClick={this.sumitPostNews}>
            Đăng tin
          </button>
        </div>
      </div>
    );
  }
}

export default Newsnew;
