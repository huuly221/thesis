import React from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const MapKhoa = compose(
  withProps({
   
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyB9Nj__lccU05pmFIupq_Kt0__mQuw8cK8&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '500px' ,width: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={16} defaultCenter={{ lat: 10.773872, lng: 106.659483 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: 10.773872, lng: 106.659483 }} />
    )}
  </GoogleMap>
));


 


  
  export default MapKhoa;

  