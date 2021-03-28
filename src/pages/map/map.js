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
    setToilet(result.data.result.records);
    setIsLoading(true);
    // console.log(isLoading);
    
  },[isLoading]);
  const [selectedToilet, setSelectedToilet] = useState(null);
  const {isLoaded,loadError} = useLoadScript({
    googleMapsApiKey:"AIzaSyDHYvDznXH0Ep5elG3OHU-TfrMt80HItuI",
    libraries,
  });
  // const mapClick = (event) =>{
  //   setMarkers(current =>[...current,{
  //     lat:event.latLng.lat(),
  //     lng:event.latLng.lng(),
  //     time: new Date(),
  //   }])
  // }
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
            {/* {markers.map((marker)=>(
              <Marker 
                key={marker.time.toISOString()} 
                position={{lat:marker.lat,lng:marker.lng}} 
                onClick={()=>{setSelected(marker)}}
                />
              ))}
              {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>

            </div>
          </InfoWindow>
        ) : null} */}
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
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}

      {selectedToilet && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedToilet(null);
          }}
          position={{
            lat: Number(selectedToilet.Latitude),
            lng: Number(selectedToilet.Longitude)
          }}
        >
          <div>
            <p><b>{selectedToilet.Name}</b></p>
            <p>{ selectedToilet.Accessible === 'True' ? 'Accessible' : 'Unaccessible'}  </p>
            <p>FacilityType : {selectedToilet.FacilityType}</p>
            <p>{selectedToilet.ParkingNote}</p>
            <p>OpeningHours : {selectedToilet.OpeningHours}</p>
          </div>
        </InfoWindow>
      )}
            </GoogleMap> 
            
    </div>
  )
}



export default Maps;