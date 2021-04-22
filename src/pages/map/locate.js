
  /**
 * Name:  Locate
 * Function: Locate user's position
 * 
 */
function Locate({ panTo }) {
  
    return (
      <button title='Click to locate your current position'
        className="locate"
        onClick={() => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            () => null
          );
        }}
      >
        <img src="/compass.png" alt="compass" />
      </button>
    );
  }


  export default Locate;