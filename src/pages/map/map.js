import React, { useState, useEffect ,useRef,useMemo} from "react";
import ReactMapGL, { Marker, Popup, FlyToInterpolator,GeolocateControl } from "react-map-gl";
import axios from 'axios';
import "./map.css";
import mapboxgl from 'mapbox-gl';
import useSupercluster from "use-supercluster";
import 'mapbox-gl/dist/mapbox-gl.css'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'


mapboxgl.accessToken = 'pk.eyJ1IjoibWluZzEwMjMwMDI0ODAiLCJhIjoiY2tuMDY3ODM3MGttYjJvbW4zdGZob3NnZyJ9.PN78lH51pVoRLAnHRfBiRA';

const Maps = () => {
  const [toilet, setToilet] = useState([]);
  const [toiletFlag,setToiletFlag] = useState(false);
  const [carpark,setCarpark] = useState([]);
  const [carparkFlag,setCarparkFlag] = useState(false);
  const [viewport, setViewport] = useState({
    latitude:-37.9263,
    longitude:145.1622,
    width: "100vw",
    height: "80vh",
    zoom:10
  });
  const [selectedtoilet, setSelectedtoilet] = useState(null);
  const [selectedCarpark, setSelectedCarpark] = useState(null);

  const mapRef = useRef();
  // const geolocateStyle = {
  //   top: 0,
  //   left: 0,
  //   margin: 10
  // };

  
  // const positionOptions = {enableHighAccuracy: true};
  useEffect(() => {   
    async function temp(){
    const result = await  axios(
      'https://data.gov.au/data/api/3/action/datastore_search?resource_id=34076296-6692-4e30-b627-67b7c4eb1027&q=VIC',
    );
    toiletFlag ? setToilet(result.data.result.records): setToilet([]);
    
  }temp();}, [toiletFlag]);
  useEffect(() => {   
    async function temp(){
    const carparkResult = await axios(
      'https://reactapi20210330172750.azurewebsites.net/api/Carpark',
    );
    carparkFlag ? setCarpark(carparkResult.data) : setCarpark([]);
    
  }temp();}, [carparkFlag]);
  useEffect(() => {
      var map = mapRef.current.getMap();
      // console.log(map)
      var directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
      });
      map.addControl(directions,"top-left");
  }, [])
  const points = carpark.map(car => ({
    type: "Feature",
    properties: { cluster: false, bay_id: car.bay_id, Latest_Description: car.Latest_Description,lon:car.lon,lat:car.lat },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(car.lon),
        parseFloat(car.lat)
      ]
    }
  }));
  const bounds = mapRef.current
    ? mapRef.current
        .getMap()
        .getBounds()
        .toArray()
        .flat()
    : null;
  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom: viewport.zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  const toiletMarker = useMemo(() => toilet.map(
    toi => (
      <Marker
      key={toi._id}
      latitude={toi.Latitude}
      longitude={toi.Longitude}
    >
      <button
        className="carpark-marker"
        onClick={e => {
          e.preventDefault();
          setSelectedtoilet(toi);
        }}
      >
        <img src="/toilet.png" alt="toilet icon"  />
      </button>
    </Marker>
    )
  ), [toilet]);

  return (
    <div className='MapWrapper'>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        maxZoom={20}
        mapboxApiAccessToken={mapboxgl.accessToken}
        mapStyle="mapbox://styles/ming1023002480/ckmyal80j1lqq17lufcezogq8"
        onViewportChange={(newViewport) => {
          setViewport({...newViewport});
        }}
      >
      <div className='flagIcon'>    
        <button onClick={()=>{setToiletFlag(!toiletFlag)}}><img src='/toilet.png' alt='Toilet Control Icon' ></img></button><br/>
        <button onClick={()=>{setCarparkFlag(!carparkFlag);console.log(carparkFlag)}}><img src='/carpark.png' alt='Carpark Control Icon' ></img></button>
      </div>  
      
        {clusters.map(cluster => {
          const [longitude, latitude] = cluster.geometry.coordinates;
          const {
            cluster: isCluster,
            point_count: pointCount
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  className="cluster-marker"
                  style={{
                    width: `${30 + (pointCount / points.length) * 20}px`,
                    height: `${30 + (pointCount / points.length) * 20}px`,
                    // display:'none'
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    );

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2
                      }),
                      transitionDuration: "auto"
                    });
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <Marker
              key={`car-${cluster.properties.bay_id}`}
              latitude={latitude}
              longitude={longitude}
            >
              <button
                className="carpark-marker"
                onClick={e => {
                  e.preventDefault();
                  setSelectedCarpark(cluster.properties);
                }}
              ><img src="./carpark.png" alt="Carpark" /></button>
            </Marker>
          );
        })}{selectedCarpark ? (
          <Popup
            latitude={selectedCarpark.lat}
            longitude={selectedCarpark.lon}
            onClose={() => {
              setSelectedCarpark(null);
            }}
          >
          <div className='loop'>
            <p><img src='./P.png' width='30' height='30' align="left" alt='car' title='accessible carpark' />
              <span className='Pointname'>Opening Time: {selectedCarpark.Latest_Description}<br/></span>
            </p>
            <p>Parking time for Disability: {selectedCarpark.Latest_Description} minutes</p>
          </div>
          </Popup>
        ) : null}
      {toiletMarker}
      {selectedtoilet ? (
          <Popup
            latitude={selectedtoilet.Latitude}
            longitude={selectedtoilet.Longitude}
            onClose={() => {
              setSelectedtoilet(null);
            }}
          >
            <div className='loop'>
            <p><img src='./wc.png' width='30' height='30' align="left" alt='wc' title='accessible toilet' /><span className='Pointname'>{selectedtoilet.Name}<br/></span>
            <span className='Pointaddress'>{selectedtoilet.Town},{selectedtoilet.Address1}</span></p>
            <div className='iconrow'>
              <img src='./Male.png' width='30' height='30' alt='man' title='male ' style={{background : selectedtoilet.Male === 'True' ? '#1e90ff':'grey'}}/>
              <img src='./Female.png' width='30' height='30' alt='women' title='female' style={{background : selectedtoilet.Female === 'True' ? '#1e90ff':'grey'}}/>
              <img src='./Both.png' width='30' height='30' alt='unisex' title='unisex' style={{background : selectedtoilet.Unisex === 'True' ? '#1e90ff':'grey'}}/>
            </div>
          </div>
          </Popup>
        ) : null}
  
      </ReactMapGL>
    </div>
  );
}

export default Maps;
