import { citiesJson } from "./data";

type City = [string, number, number];
const cities = citiesJson as City[];

// interface IForm {
//   originCity: string;
//   destinationCity: string;
//   // intermediateCities: [],
//   dateOfDeparture: string;
//   numberOfPassengers: number;
// }

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const getCityName = (city: City) => city[0];

interface ListReturn<T> {
  total: number;
  items: T[];
}
export class Api {
  static listReturn<T>(items: T[]): ListReturn<T> {
    return {
      total: items.length,
      items,
    };
  }

  async searchCities(value: string): Promise<ListReturn<string>> {
    await sleep(1500);

    if (!value) {
      const citiesNames = cities.map(getCityName);
      return Api.listReturn<string>(citiesNames);
    }

    const filteredCities = cities
      .filter(([city]) => {
        const cityLower = city.toLowerCase();

        return cityLower.match(value.toLowerCase());
      })
      .map(getCityName);

    return Api.listReturn<string>(filteredCities);
  }
}
