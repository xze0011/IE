// import React from 'react';
// import GoogleMapReact from 'google-map-react';

// // const mapStyles = {
// //     width: '1000px',
// //     height: '70%',
// //     margin:"2.5% -27%"
// //   };


// const Maps = (props) => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '10vh'
//       }}
//     >
//       <h1>Map</h1>
//       <div className='map' >
//       <Map
//         google={props.google}
//         zoom={14}
//         style={mapStyles}
//         initialCenter={
//           {
//             lat: -37.906612,
//             lng: 145.136693
//           }
//         }
//       />
//       </div>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//     apiKey: 'AIzaSyDHYvDznXH0Ep5elG3OHU-TfrMt80HItuI'
//   })(Maps);


import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Maps extends Component {
  static defaultProps = {
    center: {
      lat: -37.906612,
      lng: 145.136693
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '85vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDHYvDznXH0Ep5elG3OHU-TfrMt80HItuI'}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={-37.906612}
            lng={145.136693}

          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Maps;