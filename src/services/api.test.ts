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
});
