export const getCoordinates = (success, error = null) => {
    if (!navigator.geolocation) {
        console.log('Geolocation not supported');
      } else {
        navigator.geolocation.getCurrentPosition(
            (position)=> {
              success({latitude: position.coords.latitude, longitude: position.coords.longitude })
            }
            , error
            );
      }
}