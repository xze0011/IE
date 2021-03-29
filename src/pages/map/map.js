import React,{useState,useRef, useCallback,useEffect} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import './map.css'
import Search from './mapsearch';
import Locate from './locate';
import axios from 'axios';


const Maps = ()=>{
  const [toilet, setToilet] = useState([]);
  const [isLoading,setIsLoading] = useState(false); 
  const [carpark,setCarpark] = useState([]);
  const libraries = ["places"]
  const mapContainerStyle={
    height: '100vh', width: '99vw'
  }
  const center = {
    lat: -37.906612,
    lng: 145.136693
  }
  useEffect(async () => {
    const result = await axios(
      'https://data.gov.au/data/api/3/action/datastore_search?resource_id=34076296-6692-4e30-b627-67b7c4eb1027&q=VIC',
    );
    const carparkResult = await axios(
      'https://reactapi20210329180903.azurewebsites.net/api/Carpark',
    );
    setToilet(result.data.result.records);
    setCarpark(carparkResult.data)
    setIsLoading(true);
    console.log(carpark)
  },[isLoading]);
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const [flag,setFlag] = useState(false); 
  const {isLoaded,loadError} = useLoadScript({
    googleMapsApiKey:"AIzaSyDHYvDznXH0Ep5elG3OHU-TfrMt80HItuI",
    libraries,
  });
  const mapRef =useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  if(loadError) return 'Error loading maps';
  if(!isLoaded) return 'loading maps';
  
  return(
    <div>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={8} center={center} onLoad={onMapLoad}>
        <Locate panTo={panTo} />
        <Search panTo={panTo}/>
        {toilet.map(toi => (
            <Marker
              key={toi._id}
              position={{
                lat: Number(toi.Latitude),
                lng: Number(toi.Longitude)
              }}
              onClick={() => {
                setSelectedToilet(toi);
              }}
              icon={{
                url: `toilet.png`,
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            /> 
            ))}     
        {carpark.map(car => (
        <Marker
          key={car.bay_id}
          position={{
            lat: Number(car.lat),
            lng: Number(car.lon)
          }}
          onClick={() => {
            setSelectedCarpark(car);
          }}
          icon={{
            url: `carpark.png`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        /> ))}


      {selectedToilet && (
        <InfoWindow
          onCloseClick={() => {
            // setSelectedToilet(null);
          }}
          position={{
            lat: Number(selectedToilet.Latitude),
            lng: Number(selectedToilet.Longitude)
          }}
        >
          <div className='loop'>
            <p><img src='./wc.png' width='30' height='30' align="left"/><span className='Pointname'>{selectedToilet.Name}<br/></span>
            <span className='Pointaddress'>{selectedToilet.Town},{selectedToilet.Address1}</span></p>
            <div className='iconrow'>
              <img src='./Male.png' width='30' height='30'/><img src='./Female.png' width='30' height='30'/><img src='./Both.png' width='30' height='30'/>
              {/* <p>{ selectedToilet.Accessible === 'True' ? 'Accessible' : 'Unaccessible'}  </p>
              <p>FacilityType : {selectedToilet.FacilityType}</p>
              <p>{selectedToilet.ParkingNote}</p>
              <p>OpeningHours : {selectedToilet.OpeningHours}</p> */}
            </div>
          </div>
        </InfoWindow>
        
      )}
        
          {selectedCarpark && (
          <InfoWindow
            onCloseClick={() => {
            }}
            position={{
              lat: Number(selectedCarpark.lat),
              lng: Number(selectedCarpark.lon)
            }}
          >
            <div>
              <p><b>{selectedCarpark.Latest_Description}</b></p>
            </div>
          </InfoWindow>
          )}
            </GoogleMap> 
            
            
    </div>
  )
}



export default Maps;