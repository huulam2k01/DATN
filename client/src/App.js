import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Header from "./component/header/header";
import RouterWeb from "./router";
import Newshome from "./component/newshome/newshome";
import Footer from "./component/footer/footer";
import ChangePassword from "./component/newshome/change_password/change_password";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nextpage: false,
      stateFiterandslide_img: false,
      statefilter: false,
      NewsFilter: [],
      NameCityFilter: [],
      NameDistrictsFilter: [],
      clickFindNews: false,
      typenews_menu: "",
    };
  }

  clickMovedOnUsertoApp = () => {
    this.setState({
      nextpage: !this.state.nextpage,
    });
  };
  clickPostNewstoApp = (nextpage) => {
    if (nextpage)
      this.setState({
        nextpage: !this.state.nextpage,
      });
  };
  ClickGoHome = () => {
    this.setState({
      nextpage: !this.state.nextpage,
      stateFiterandslide_img: false,
    });
  };
  NewsDetailtoApp = () => {
    this.setState({
      stateFiterandslide_img: true,
    });
  };
  StateFiterandslide = () => {
    this.setState({
      stateFiterandslide_img: false,
    });
  };
  // Trạng tháng của filter
  StateFiterTyhomeNews = () => {
    this.setState({
      statefilter: true,
      NewsFilter: [],
      clickFindNews: false,
      typenews_menu: "",
      NameCityFilter: [],
      NameDistrictsFilter: [],
    });
  };

  StateFiterTyhomeNews_F = (value) => {
    this.setState({
      statefilter: false,
      typenews_menu: value,
    });
  };
  GetNewsFilter = (
    NewsFilter,
    NameCityFilter,
    NameDistrictsFilter,
    clickFindNews
  ) => {
    this.setState({
      NewsFilter: NewsFilter,
      clickFindNews: clickFindNews,
      NameCityFilter: NameCityFilter,
      NameDistrictsFilter: NameDistrictsFilter,
    });
  };

  ListNewsReset = () => {
    this.setState({
      NewsFilter: [],
      clickFindNews: false,
      NameCityFilter: [],
      NameDistrictsFilter: [],
    });
  };

  render() {
    return (
      <>
        <div className="overlay" id="overlay"></div>
        <div className="App">
          <Router>
            {console.log(this.state.nextpage)}
             { !this.state.nextpage ? (
                <div>
                  <Header
                    clickPostNewstoApp={this.clickPostNewstoApp}
                    clickMovedOnUsertoApp={this.clickMovedOnUsertoApp}
                    stateFiterandslide_imgApp={
                      this.state.stateFiterandslide_img
                    } // (True/Faile) Hidden Fitter and slideShow Image
                    StateFiterandslide_FuncApp={this.StateFiterandslide} // Show Fitter and slideShow Image
                    StateFiterTyhomeNews_TF={this.state.statefilter} // (True/Faile) Hidden Fitter typenews
                    GetNewsFiltertoApp={this.GetNewsFilter} // get News Filter (Lấy tin từ tìm kiếm)
                    GetTypeNewstoApp={this.state.typenews_menu} // Get value type news filter
                  />
                  <RouterWeb
                    NewsDetailtoApp={this.NewsDetailtoApp}
                    stateFiterandslide_imgApp={
                      this.state.stateFiterandslide_img
                    } // (True/Faile) Hidden Fitter and slideShow Image
                    StateFiterTyhomeNewstoApp={this.StateFiterTyhomeNews} // Show Fitter and slideShow Image
                    StateFiterTyhomeNews_FtoApp={this.StateFiterTyhomeNews_F}
                    StateNextPage={this.state.nextpage} //Giử trạng thái next page Home sang HomeNews
                    GetNameCityFiltertoApp={this.state.NameCityFilter} // Truyền Array chứa tên thành phố khi tìm kiếm
                    GetNameDistrictsFiltertoApp={this.state.NameDistrictsFilter} // Truyền Array chứa tên quận huyện khi tìm kiếm
                    NewsFiltertoApp={this.state.NewsFilter} // News Filter
                    clickFindNewstoApp={this.state.clickFindNews} //(True/Faile)  Click button Find News
                    ListNewsResettoApp={this.ListNewsReset}
                  />
                  <ChangePassword />
                  <Footer />
                </div>
              ) : (
                <Newshome
                  ClickGoHome={this.ClickGoHome}
                  StateNextPage={this.state.nextpage}
                />
              ) // (True/Faile) next page go manager
            }
          </Router>
        </div>
      </>
    );
  }
}
export default App;
