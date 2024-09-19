function isValidCoordinate(value) {
  // Check if the value is a valid number
  return typeof Number(value) === "number" && !isNaN(value);
}

function roundCoordinate(value) {
  // Round to 2 decimal places
  const NumberValue = Number(value);
  return Math.round(NumberValue * 100) / 100;
}

function processCoordinate(lat, lon) {
  // Validate latitude and longitude
  if (isValidCoordinate(lat) && isValidCoordinate(lon)) {
    const roundedLat = roundCoordinate(lat);
    const roundedLon = roundCoordinate(lon);

    return {
      latitude: roundedLat,
      longitude: roundedLon,
    };
  } else {
    throw new Error("Invalid latitude or longitude.");
  }
}

module.exports = processCoordinate;
