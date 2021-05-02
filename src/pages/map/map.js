import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  StreetViewPanorama,
} from "@react-google-maps/api";
import "./map.css";
import Search from "./mapsearch";
import Locate from "./locate";
import axios from "axios";
import ca from "../subpages/assets/carpark_guide.json";
import Button from "../../component/button/button";
import tourismGuide from "../subpages/assets/attractionlist2.json";
import { set } from "date-fns";

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
  const [tourismFlag, setTourismFlag] = useState(false);
  const [carpark, setCarpark] = useState([]);
  const [carparkFlag, setCarparkFlag] = useState(false);
  const [streetViewFlag, setStreetViewFlag] = useState(false);
  const [zoom, setZoom] = useState(10);
  const [markers, setMarkers] = useState([]);
  const mapContainerStyle = {
    height: "84vh",
    width: "100vw",
  };
  const [center, setCenter] = useState({
    lat: -37.906612,
    lng: 145.136693,
  });

  {
    /* Access map object*/
  }
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  {
    /* Import Toilet Data*/
  }
  useEffect(() => {
    async function temp() {
      const result = await axios(
        "https://data.gov.au/data/api/3/action/datastore_search?resource_id=34076296-6692-4e30-b627-67b7c4eb1027&q=VIC"
      );
      toiletFlag ? setToilet(result.data.result.records) : setToilet([]);
    }
    temp();
  }, [toiletFlag]);

  {
    /* Import Carpark Data*/
  }
  useEffect(() => {
    async function temp() {
      const carparkResult = await axios(
        "https://reactapi20210330172750.azurewebsites.net/api/Carpark"
      );
      carparkFlag ? setCarpark(ca.data) : setCarpark([]);
    }
    temp();
  }, [carparkFlag]);

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
      featureType: "administrative.country",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.province",
      stylers: [
        {
          weight: 3,
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.business",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels",
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
      featureType: "road.arterial",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
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
    {
      featureType: "water",
      elementType: "labels.text",
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
            Attration
          </Button>
        </div>

        {toilet.map((toi, index) => (
          <Marker
            key={index}
            position={{
              lat: parseFloat(toi.Latitude),
              lng: parseFloat(toi.Longitude),
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
              lat: parseFloat(car[2].location.lat),
              lng: parseFloat(car[2].location.lng),
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
              url: `attraction.png`,
              scaledSize: new window.google.maps.Size(80, 80),
            }}
          />
        ))}

        {selectedToilet && (
          <InfoWindow
            onCloseClick={() => {
              setSelectedToilet(null);
            }}
            position={{
              lat: parseFloat(selectedToilet.Latitude),
              lng: parseFloat(selectedToilet.Longitude),
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
                  title="accessible toilet"
                />
                <span className="Pointname">
                  {selectedToilet.Name}
                  <br />
                </span>
                <span className="Pointaddress">
                  {selectedToilet.Town},{selectedToilet.Address1}
                </span>
              </p>
              <div className="iconrow">
                <img
                  src="./Male.png"
                  width="30"
                  height="30"
                  alt="man"
                  title="male "
                  style={{
                    background:
                      selectedToilet.Male === "True" ? "#1e90ff" : "grey",
                  }}
                />
                <img
                  src="./Female.png"
                  width="30"
                  height="30"
                  alt="women"
                  title="female"
                  style={{
                    background:
                      selectedToilet.Female === "True" ? "#1e90ff" : "grey",
                  }}
                />
                <img
                  src="./Both.png"
                  width="30"
                  height="30"
                  alt="unisex"
                  title="unisex"
                  style={{
                    background:
                      selectedToilet.Unisex === "True" ? "#1e90ff" : "grey",
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
              lat: parseFloat(selectedCarpark[2].location.lat),
              lng: parseFloat(selectedCarpark[2].location.lng),
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
                  title="accessible carpark"
                />
              </p>
              <p>
                {selectedCarpark[3]} | {selectedCarpark[1]}
              </p>
              <span className="Pointname">
                Opening Time: {selectedCarpark[4]} | {selectedCarpark[5]}
                <br />{" "}
              </span>
              <p>
                <button
                  onClick={() => {
                    setStreetViewFlag(true);
                  }}
                >
                  click to view street{" "}
                </button>
              </p>
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
              <h2>
                <span role="img" aria-label="bear">
                  🐻
                </span>
              </h2>
              <p> {selectedTourism.name}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Maps;
