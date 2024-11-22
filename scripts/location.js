import displayError from "./errors.js";

class Location {}

class LatLon extends Location {
  constructor(latitude, longitude) {
    super();
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    this.latitude = latitude;
    this.longitude = longitude;
  }
}

class ZipCode extends Location {
  constructor(zipCode) {
    super();
    this.zipCode = zipCode;
  }
}

export default async function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Using latitude: ${latitude}, longitude: ${longitude}`);
          resolve(new LatLon(latitude, longitude));
        },
        (error) => {
          console.error("Error getting location:", error);
          displayError("Unable to retrieve location. Defaulting to New York.");
          resolve(new LatLon(40.7128, -74.006)); // Default to New York
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      displayError("Geolocation is not supported. Defaulting to New York.");
      resolve(new LatLon(40.7128, -74.006)); // Default to New York
    }
  });
}
