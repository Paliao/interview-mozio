import { Api } from "./api";

describe("simple testing of api", () => {
  const api = new Api();

  it("should return a list of cities that match the search", async () => {
    const expectedResult = ["Dijon", "Lyon", "Montpellier", "Toulon"];

    const result = await api.searchCities("On");

    expect(result.items).toHaveLength(expectedResult.length);
    result.items.forEach((i) => {
      expect(expectedResult).toContain(i);
    });
  });

  it("should return the correct travel details, like distance", async () => {
    const result = await api.calculateTravel({
      originCity: "Paris",
      destinationCity: "Nice",
      intermediateCities: ["Lyon", "Toulon"],
      dateOfDeparture: "2020-01-01",
      numberOfPassengers: 1,
    });

    const expectedResult = {
      travel: [
        { from: "Paris", to: "Lyon", travelDistance: 391 },
        { from: "Lyon", to: "Toulon", travelDistance: 306 },
        { from: "Toulon", to: "Nice", travelDistance: 125 },
      ],
      traveledDistance: 822,
    };

    expect(result).toMatchObject(expectedResult);
  });
});
