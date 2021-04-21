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
import ca from '../subpages/assets/carpark_total.json'
import to from '../subpages/assets/carpark_total.json'
import Button from '../../component/button/button'

// import {Accordion,Card} from 'react-bootstrap';

const Maps = ()=>{
  const [toilet, setToilet] = useState([]);
  const [isLoading,setIsLoading] = useState(false); 
  const [toiletFlag,setToiletFlag] = useState(false);
  const [carpark,setCarpark] = useState([]);
  const [carparkFlag,setCarparkFlag] = useState(false);
  const [zoom, setZoom] = useState(10);
  const [bounds,setBounds] = useState(null)
  const libraries = ["places"]
   const mapContainerStyle={
    height: '84vh', width: '100vw'
  }
  const [center,setCenter] = useState({
    lat: -37.906612,
    lng: 145.136693})

  const mapRef =useRef();
  const onMapLoad = useCallback((map) => {
      mapRef.current = map;
    }, []);

  function handleZoomChanged() {
      if (!mapRef.current) return;
      const newZoom = mapRef.current.getZoom();
      setZoom(newZoom);
    }  


  {/* Import Toilet Data*/}
  useEffect(() => {   
    async function temp(){
    const result = await axios(
      'https://data.gov.au/data/api/3/action/datastore_search?resource_id=34076296-6692-4e30-b627-67b7c4eb1027&q=VIC',
    );
    toiletFlag ? setToilet(result.data.result.records): setToilet([]);
  }temp();}, [toiletFlag]);


  {/* Import Carpark Data*/}
  useEffect(() => {   
    async function temp(){
    // const carparkResult = await  axios(
    //   'https://reactapi20210330172750.azurewebsites.net/api/Carpark',
    // );
    carparkFlag ? setCarpark(ca.data) : setCarpark([]);
 console.log(ca.data)
  }temp();}, [carparkFlag]);

  const [selectedToilet, setSelectedToilet] = useState(null);
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const {isLoaded,loadError} = useLoadScript({
    googleMapsApiKey:"AIzaSyDHYvDznXH0Ep5elG3OHU-TfrMt80HItuI",
    libraries,
  });
//   onChange={({ zoom, bounds }) => {
//     setZoom(mapRef.current.getZoom());
//     setBounds(new window.google.maps.LatLngBounds());
// }}
// const points = carpark.map(car => ({
//   type: "Feature",
//   properties: {  cluster: false ,key:car[0],desc:car[1],period:car[4],time:car[5],lat:car[2].location.lat,lon:car[2].location.lng,rating:car[7] },
//   geometry: {
//     type: "Point",
//     coordinates: [
//       parseFloat(car[2].location.lng),
//       parseFloat(car[2].location.lat)
//     ]
//   }
// }));
// onZoomChanged={handleZoomChanged} onBoundsChanged={e => { setBounds([mapRef.current.getBounds().La.g,mapRef.current.getBounds().Ua.g,mapRef.current.getBounds().La.i,mapRef.current.getBounds().Ua.g]) }
// const { clusters, supercluster } = useSupercluster({
//   points,
//   bounds,
//   zoom,
//   options: { radius: 75, maxZoom: 20 }
// });

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  if(loadError) return 'Error loading maps';
  if(!isLoaded) return 'loading maps';
  
  return(
    <div className='mapWraper' style={{display:'flex'}}>

        <GoogleMap mapContainerStyle={mapContainerStyle}  zoom={zoom} center={center} yesIWantToUseGoogleMapApiInternals onLoad={onMapLoad}>
        <Locate panTo={panTo} />
        <Search panTo={panTo}/>
        <div className='flagIcon'>
          <Button onClick={()=>{setToiletFlag(!toiletFlag)}} buttonColor={toiletFlag?'btn--red':'btn--green'} buttonSize='btn--medium'>Toilet</Button> 
          <Button  onClick={()=>{setCarparkFlag(!carparkFlag)}} buttonColor={carparkFlag?'btn--red':'btn--green'} buttonSize='btn--medium'>Carpark</Button>
        </div>

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
                scaledSize: new window.google.maps.Size(60, 60)
              }}
            /> 
            ))}     
        {carpark.map(car => (
        <Marker
          key={car[0]}
          position={{
            lat: Number(car[2].location.lat),
            lng: Number(car[2].location.lng)
          }}
          onClick={() => {
            setSelectedCarpark(car);
          }}
          icon={{
            url: `carpark.png`,
            scaledSize: new window.google.maps.Size(55, 55)
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
              lat: Number(selectedCarpark[2].location.lat),
              lng: Number(selectedCarpark[2].location.log)
            }}
          >
            <div className='loop'>
            <p><img src='./P.png' width='30' height='30' align="left" alt='car' title='accessible carpark' />
            <p>{selectedCarpark[3]} | {selectedCarpark[1]}</p>
          <span className='Pointname'>Opening Time: {selectedCarpark[4]} | {selectedCarpark[5]}<br/> </span>
            </p>
          <p>Rating:  {selectedCarpark[7]}</p>
          </div>
          </InfoWindow>
          )}
          </GoogleMap> 
    </div>
  )
}



export default Maps;


