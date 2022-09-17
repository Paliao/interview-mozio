type Coordinates = [number, number];

function toRad(Value: number) {
  return (Value * Math.PI) / 180;
}

// https://stackoverflow.com/questions/14560999/using-the-haversine-formula-in-javascript
export const getHaversineDistance = (
  [lat1, lon1]: Coordinates,
  [lat2, lon2]: Coordinates
): number => {
  const KM_CONSTANT = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const lat1Rad = toRad(lat1);
  const lat2Rad = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = KM_CONSTANT * c;
  return d;
};
