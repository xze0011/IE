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
import ca from "../subpages/assets/carpark_guide.json";
import to from "../subpages/assets/toilet_guide.json";
import Button from "../../component/button/button";
import ButtonWithoutRoute from "../../component/button/buttonWithoutRoute";
import tourismGuide from "../subpages/assets/attractionlist2.json";
import Help from "../../component/help/help";
import { Row } from "react-bootstrap";
/**
 * Name: Map
 * Function: display google map, search bar, and display markers
 *
 */
const libraries = ["places"];
const Maps = () => {
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
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
    toiletFlag ? setToilet(to.data) : setToilet([]);
  }, [toiletFlag]);

  // Import Carpark Data
  useEffect(() => {
    carparkFlag ? setCarpark(ca.data) : setCarpark([]);
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
  const onMapClick = useCallback((e) => {
    setMarkers([]);
    setSelected(null);
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

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
        onClick={onMapClick}
      >
        <Locate panTo={panTo} />
        <Search panTo={panTo} />
        <div className="flagIcon">
          <Row>
            <ButtonWithoutRoute
              onClick={() => {
                setToiletFlag(!toiletFlag);
              }}
              buttonColor={toiletFlag ? "btn--red" : "btn--green"}
              buttonSize="btn--medium"
            >
              Toilet
            </ButtonWithoutRoute>
            <ButtonWithoutRoute
              onClick={() => {
                setCarparkFlag(!carparkFlag);
              }}
              buttonColor={carparkFlag ? "btn--red" : "btn--green"}
              buttonSize="btn--medium"
            >
              Carpark
            </ButtonWithoutRoute>
            <ButtonWithoutRoute
              onClick={() => {
                setTourismFlag(!tourismFlag);
              }}
              buttonColor={tourismFlag ? "btn--red" : "btn--green"}
              buttonSize="btn--medium"
            >
              Attraction
            </ButtonWithoutRoute>
          </Row>
          <Help />
        </div>
        {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onMouseOver={() => {
              setSelected(marker);
            }}
            icon={{
              url: `/point.png`,
              origin: new window.google.maps.Point(2, 2),
              anchor: new window.google.maps.Point(26, 20),
              scaledSize: new window.google.maps.Size(60, 60),
            }}
          />
        ))}
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
              origin: new window.google.maps.Point(12, 12),
              anchor: new window.google.maps.Point(15, 15),
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
              origin: new window.google.maps.Point(12, 12),
              anchor: new window.google.maps.Point(15, 15),
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

        {selected ? (
          <InfoWindow position={{ lat: selected.lat, lng: selected.lng }}>
            <div>
              <h4>This is your starting point of direction</h4>
            </div>
          </InfoWindow>
        ) : null}

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
              <br />
              <div>
                {" "}
                {selected == null ? (
                  "Clicking your ideal starting point first to go here"
                ) : (
                  <a
                    href={`https://www.google.com/maps/dir/${selected.lat},${selected.lng}/${selectedToilet[3]},${selectedToilet[4]}/`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setSelectedCarpark(null);
                    }}
                  >
                    Go Here
                  </a>
                )}
              </div>
              <br />
              <div className="iconrow">
                <img
                  src="./Male.png"
                  width="30"
                  height="30"
                  alt="man"
                  title="Male "
                  style={{
                    background: selectedToilet[5] === true ? "#1e90ff" : "grey",
                  }}
                />
                <img
                  src="./Female.png"
                  width="30"
                  height="30"
                  alt="women"
                  title="Female"
                  style={{
                    background: selectedToilet[6] === true ? "#1e90ff" : "grey",
                  }}
                />
                <img
                  src="./Both.png"
                  width="30"
                  height="30"
                  alt="unisex"
                  title="Unisex"
                  style={{
                    background: selectedToilet[7] === true ? "#1e90ff" : "grey",
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
              <div>
                {selected == null ? (
                  "Clicking your ideal starting point first to go here"
                ) : (
                  <a
                    href={`https://www.google.com/maps/dir/${selected.lat},${selected.lng}/${selectedCarpark[6]},${selectedCarpark[7]}/`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => {
                      setSelectedCarpark(null);
                    }}
                  >
                    Go Here
                  </a>
                )}
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
              <div>
                <br />
                <div>
                  {selected == null ? (
                    "Clicking your ideal starting point first to go here"
                  ) : (
                    <a
                      href={`https://www.google.com/maps/dir/${selected.lat},${selected.lng}/${selectedTourism.content[0].lat},${selectedTourism.content[0].lng}/`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => {
                        setSelectedCarpark(null);
                      }}
                    >
                      Go Here
                    </a>
                  )}
                </div>
              </div>
              <div className="tourismButton">
                <Button
                  destination={`./individualAttraction/${selectedTourism.name}`}
                  buttonColor={"btn--red"}
                  buttonSize="btn--small"
                >
                  Details
                </Button>
                <br />
              </div>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Maps;
