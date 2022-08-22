import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import icon_ggmap from './image_ggmap/icon_ggmap.png';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
    

    constructor(props) {
        super(props);
        this.state={
            center:{
                lat:10.8365648,
                lng:106.7560183
            },
            zoom:16
        } 
       
    }
    async componentDidMount(){
        if (navigator.geolocation) {
          await  navigator.geolocation.getCurrentPosition(this.getLocationForBrowser);
          } else {
           alert("Geolocation is not supported by this browser.");
        }
    }
    // getLocation=()=>{
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(this.getLocationForBrowser);
    //       } else {
    //        alert("Geolocation is not supported by this browser.");
    //     }
    // }
    getLocationForBrowser=(position)=>{
        this.setState({
            center:{
                lat:position.coords.latitude,
                lng:position.coords.longitude
            }
            
        })
        this.props.getLocationtoNewsNews(this.state.center)
    }
    handleApiLoaded=(map, maps)=>{
        new maps.Marker({
            position: this.state.center,
            map,
            title: 'Home Your!',
            icon:{
                url: icon_ggmap,
                scaledSize:
                {
                    width:40,height:40
                }
            }
        });   
    }
    // AIzaSyDLhm8DHP3A6kMCIsiwQWUU-pX5hSbyaQo
    // AIzaSyCwbFfVzU6GzI8OQFI1Z9wF8Ime0EFl50s
    // AIzaSyAnijyePZEIdaNU_S47o3r4gOX2etBYwFE
    render() {
        return (
        <div style={{ height: '500px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{key:'AIzaSyAnijyePZEIdaNU_S47o3r4gOX2etBYwFE'}}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
            >
            </GoogleMapReact>
            <AnyReactComponent
              lat={this.state.center.lat}
              lng={this.state.center.lng}
            />
          </div>
        );
    }
}

export default GoogleMap;