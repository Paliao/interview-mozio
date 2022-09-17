import { cities, City } from "./data";

import { getHaversineDistance as calculateGeoDistance } from "./utils";

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

interface ListReturn<T> {
  total: number;
  items: T[];
}

export interface Travel {
  dateOfDeparture: string;
  numberOfPassengers: number;
  traveledDistance: number;
  travel: { from: string; to: string; travelDistance: number }[];
}

export class Api {
  static listReturn<T>(items: T[]): ListReturn<T> {
    return {
      total: items.length,
      items,
    };
  }

  static getCityName(city: City) {
    return city[0];
  }

  async searchCities(value: string): Promise<ListReturn<string>> {
    await sleep(1500);

    if (!value) {
      const citiesNames = cities.map(Api.getCityName);
      return Api.listReturn<string>(citiesNames);
    }

    const filteredCities = cities
      .filter(([city]) => {
        const cityLower = city.toLowerCase();

        return cityLower.match(value.toLowerCase());
      })
      .map(Api.getCityName);

    return Api.listReturn<string>(filteredCities);
  }

  async calculateTravel(values: {
    originCity: string;
    destinationCity: string;
    intermediateCities: string[];
    dateOfDeparture: string;
    numberOfPassengers: number;
  }): Promise<Travel> {
    const {
      dateOfDeparture,
      destinationCity,
      intermediateCities,
      numberOfPassengers,
      originCity,
    } = values;

    const citiesToVisit = [
      originCity,
      ...intermediateCities.filter((city) => city),
      destinationCity,
    ];

    // Simulating call from database
    await sleep(1500);
    const citiesData: Record<string, City> = citiesToVisit.reduce(
      (prev, city) => {
        const cityData = cities.find(([cityName]) => cityName === city);

        return {
          ...prev,
          [city]: cityData,
        };
      },
      {}
    );

    let total = 0;

    const travelStops = [];

    // starting from second city, and comparing with previous one
    for (let i = 1; i < citiesToVisit.length; i++) {
      const city1 = citiesToVisit[i - 1];
      const city2 = citiesToVisit[i];

      if (!city1 || !city2) {
        throw new Error("City not found");
      }

      const city1Data = citiesData[city1];
      const city2Data = citiesData[city2];

      if (!city1Data || !city2Data) {
        throw new Error("City not found");
      }

      const distance = Math.floor(
        calculateGeoDistance(
          [city1Data[1], city1Data[2]],
          [city2Data[1], city2Data[2]]
        )
      );

      total += distance;
      travelStops.push({
        from: city1,
        to: city2,
        travelDistance: distance,
      });
    }

    return {
      dateOfDeparture,
      numberOfPassengers,
      traveledDistance: total,
      travel: travelStops,
    };
  }
}
