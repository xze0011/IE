import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import "./map.css";
import Search from "./mapsearch";
import Locate from "./locate";
import axios from "axios";
import ca from "../subpages/assets/carpark_guide.json";
import to from "../subpages/assets/toilet_guide.json";
import Button from "../../component/button/button";
import tourismGuide from "../subpages/assets/attractionlist2.json";
import Help from "../../component/help/help";
/**
 * Name: Map
 * Function: display google map, search bar, and display markers
 *
 */
const libraries = ["places"];
const Maps = () => {
  const [toilet, setToilet] = useState([]);
  const [toiletFlag, setToiletFlag] = useState(false);
  const [tourism, setTourism] = useState([]);
  const [tourismFlag, setTourismFlag] = useState(true);
  const [carpark, setCarpark] = useState([]);
  const [carparkFlag, setCarparkFlag] = useState(false);
  const [zoom, setZoom] = useState(9);
  const mapContainerStyle = {
    height: "84vh",
    width: "100vw",
  };
  const [center, setCenter] = useState({
    lat: -37.906612,
    lng: 145.136693,
  });

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);
  // Import Toilet Data
  useEffect(() => {
    async function temp() {
      const result = await axios(
        "https://data.gov.au/data/api/3/action/datastore_search?resource_id=34076296-6692-4e30-b627-67b7c4eb1027&q=VIC"
      );
      toiletFlag ? setToilet(to.data) : setToilet([]);
    }
    temp();
  }, [toiletFlag]);

  // Import Carpark Data
  useEffect(() => {
    async function temp() {
      const carparkResult = await axios(
        "https://reactapi20210330172750.azurewebsites.net/api/Carpark"
      );
      carparkFlag ? setCarpark(ca.data) : setCarpark([]);
    }
    temp();
  }, [carparkFlag]);

  // Import Tourism Data
  useEffect(() => {
    async function temp() {
      tourismFlag ? setTourism(tourismGuide) : setTourism([]);
    }
    temp();
  }, [tourismFlag]);

  const [selectedToilet, setSelectedToilet] = useState(null);
  const [selectedCarpark, setSelectedCarpark] = useState(null);
  const [selectedTourism, setSelectedTourism] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDHYvDznXH0Ep5elG3OHU-TfrMt80HItuI",
    libraries,
  });
  const exampleMapStyles = [
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "loading maps";

  return (
    <div className="mapWraper">
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        options={{ styles: exampleMapStyles }}
        zoom={zoom}
        center={center}
        onLoad={onMapLoad}
      >
        <Locate panTo={panTo} />
        <Search panTo={panTo} />
        <div className="flagIcon">
          <Button
            onClick={() => {
              setToiletFlag(!toiletFlag);
            }}
            buttonColor={toiletFlag ? "btn--red" : "btn--green"}
            buttonSize="btn--medium"
          >
            Toilet
          </Button>
          <Button
            onClick={() => {
              setCarparkFlag(!carparkFlag);
            }}
            buttonColor={carparkFlag ? "btn--red" : "btn--green"}
            buttonSize="btn--medium"
          >
            Carpark
          </Button>
          <Button
            onClick={() => {
              setTourismFlag(!tourismFlag);
            }}
            buttonColor={tourismFlag ? "btn--red" : "btn--green"}
            buttonSize="btn--medium"
          >
            Attraction
          </Button>
          <Help />
        </div>
        {toilet.map((toi, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(toi[3]),
              lng: parseFloat(toi[4]),
            }}
            onClick={() => {
              setSelectedToilet(toi);
            }}
            icon={{
              url: `toilet.png`,
              scaledSize: new window.google.maps.Size(60, 60),
            }}
          />
        ))}
        {carpark.map((car, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(car[6]),
              lng: parseFloat(car[7]),
            }}
            onClick={() => {
              setSelectedCarpark(car);
            }}
            icon={{
              url: `carpark.png`,
              scaledSize: new window.google.maps.Size(55, 55),
            }}
          />
        ))}
        {tourism.map((tour, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(tour.content[0].lat),
              lng: parseFloat(tour.content[0].lng),
            }}
            onClick={() => {
              setSelectedTourism(tour);
            }}
            icon={{
              url: tour.icon,
              scaledSize: new window.google.maps.Size(60, 60),
            }}
          />
        ))}

        {selectedToilet && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedToilet(null);
            }}
            position={{
              lat: parseFloat(selectedToilet[3]),
              lng: parseFloat(selectedToilet[4]),
            }}
          >
            <div className="loop">
              <p>
                <img
                  src="./wc.png"
                  width="30"
                  height="30"
                  align="left"
                  alt="wc"
                  title="Accessible Toilet"
                />
                <span className="Pointname">
                  {selectedToilet[1]}
                  <br />
                </span>
                <span className="Pointaddress">{selectedToilet[2]}</span>
              </p>
              <div className="iconrow">
                <img
                  src="./Male.png"
                  width="30"
                  height="30"
                  alt="man"
                  title="Male "
                  style={{
                    background:
                      selectedToilet[5] === "True" ? "#1e90ff" : "grey",
                  }}
                />
                <img
                  src="./Female.png"
                  width="30"
                  height="30"
                  alt="women"
                  title="Female"
                  style={{
                    background:
                      selectedToilet[6] === "True" ? "#1e90ff" : "grey",
                  }}
                />
                <img
                  src="./Both.png"
                  width="30"
                  height="30"
                  alt="unisex"
                  title="Unisex"
                  style={{
                    background:
                      selectedToilet[7] === "True" ? "#1e90ff" : "grey",
                  }}
                />
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
              lat: parseFloat(selectedCarpark[6]),
              lng: parseFloat(selectedCarpark[7]),
            }}
          >
            <div className="loop">
              <p>
                <img
                  src="./P.png"
                  width="30"
                  height="30"
                  align="left"
                  alt="car"
                  title="Accessible Carpark"
                />
              </p>
              <p className="Pointname">{selectedCarpark[1]}</p>
              <div>
                Opening Time: {selectedCarpark[4]} | {selectedCarpark[3]}
              </div>
              <br />
            </div>
          </InfoWindow>
        )}

        {selectedTourism ? (
          <InfoWindow
            position={{
              lat: parseFloat(selectedTourism.content[0].lat),
              lng: parseFloat(selectedTourism.content[0].lng),
            }}
            onCloseClick={() => {
              setSelectedTourism(null);
            }}
          >
            <div className="loop">
              <div className="Pointname"> {selectedTourism.name}</div>
              <div className="tourismButton">
                <Button
                  destination={`./individualAttraction/${selectedTourism.name}`}
                  buttonColor={"btn--red"}
                  buttonSize="btn--small"
                >
                  Details
                </Button>
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Maps;
