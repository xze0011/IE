/**
 * Name:  Locate
 * Function: Locate user's position
 *
 */
function Locate({ panTo }) {
  return (
    <button
      title="Click to locate your current position"
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
      <div class="demo">
        <img
          className="an"
          src="/compass.png"
          height="30px"
          width="30px"
          alt="compass"
        />
      </div>
    </button>
  );
}

export default Locate;
