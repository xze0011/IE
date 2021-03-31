import React,{useState,useRef, useCallback,useEffect} from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import './map.css'
import Search from './mapsearch';
import Locate from './locate';
import axios from 'axios';
import useSupercluster from "use-supercluster";

// import {Accordion,Card} from 'react-bootstrap';

const Maps = ()=>{
  const [toilet, setToilet] = useState([]);
  const [isLoading,setIsLoading] = useState(false); 
  const [carpark,setCarpark] = useState([]);
  const libraries = ["places"]
   const mapContainerStyle={
    height: '84vh', width: '100vw'
  }
  const [center,setCenter] = useState({
    lat: -37.906612,
    lng: 145.136693})
  useEffect(async () => {
    const result = await axios(
      'https://data.gov.au/data/api/3/action/datastore_search?resource_id=34076296-6692-4e30-b627-67b7c4eb1027&q=VIC',
    );
    const carparkResult = await axios(
      'https://reactapi20210330172750.azurewebsites.net/api/Carpark',
    );
    setToilet(result.data.result.records);
    setCarpark(carparkResult.data)
    setIsLoading(true);
    
  },[isLoading]);
  const [selectedToilet, setSelectedToilet] = useState(null);
  const [selectedCarpark, setSelectedCarpark] = useState(null);
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
    <div className='mapWraper' style={{display:'flex'}}>
        <GoogleMap mapContainerStyle={mapContainerStyle}  zoom={10} center={center} yesIWantToUseGoogleMapApiInternals onLoad={onMapLoad} >

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
                scaledSize: new window.google.maps.Size(30, 30)
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
            scaledSize: new window.google.maps.Size(20, 20)
          }}
        /> ))}

      
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
          <div className='loop'>
            <p><img src='./wc.png' width='30' height='30' align="left" alt='wc' title='accessible toilet' /><span className='Pointname'>{selectedToilet.Name}<br/></span>
            <span className='Pointaddress'>{selectedToilet.Town},{selectedToilet.Address1}</span></p>
            <div className='iconrow'>
              <img src='./Male.png' width='30' height='30' alt='man' title='male ' style={{background : selectedToilet.Male === 'True' ? '#1e90ff':'grey'}}/>
              <img src='./Female.png' width='30' height='30' alt='women' title='female' style={{background : selectedToilet.Female === 'True' ? '#1e90ff':'grey'}}/>
              <img src='./Both.png' width='30' height='30' alt='unisex' title='unisex' style={{background : selectedToilet.Unisex === 'True' ? '#1e90ff':'grey'}}/>
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
              setSelectedCarpark(null);
            }}
            position={{
              lat: Number(selectedCarpark.lat),
              lng: Number(selectedCarpark.lon)
            }}
          >
            <div className='loop'>
            <p><img src='./P.png' width='30' height='30' align="left" alt='car' title='accessible carpark' />
              <span className='Pointname'>Opening Time: {selectedCarpark.Latest_Description}<br/></span>
            </p>
          <p>Parking time for Disability: {selectedCarpark.Latest_DisabilityExt} minutes</p>
          </div>
          </InfoWindow>
          )}
            </GoogleMap> 
            {/* <div className='sidebarmap' style={{height: '85vh' ,width: '29vw'}}>
        <Accordion defaultActiveKey="0">
        {toilet.map(toi => (
            <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              {selectedToilet.Address1}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{selectedToilet.Town}</Card.Body>
            </Accordion.Collapse>
            </Card>
        ))}     
      </Accordion>
      </div>  */}


    </div>
  )
}



export default Maps;