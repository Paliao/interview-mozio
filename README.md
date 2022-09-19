Hi, thanks for taking a time to look at this repo!
This simple app is a showcase of all my set of skills, my favorite stack(Missing only Next.js) and a little simulation of what kind of work/code you could expect from hiring me.
I'm doing this incrementally during my free time, in shorts bursts of 1-3 hours

### Focus Points

- My React code itself
  - Componentization
  - Folder structure
- Usage Chakra UI
  - Trying to show my knowledge of the properties and components
- Typescript
  - My components are always typed in some way, helping the codebase to grow consistently
- Auxiliary libraries
- Api service simulation
- Tests (Soon)

# The Task

A travel planner app! It should calculate the travel time between a set of cities, that must be defined by the end user.

## Requirements

### Must Have

- Two pages:

  - Home:
    - Must contain travel form;
    - Allow deep-linking: initial values for all fields of the form can be provided in the URL
  - Search:
    - Should also contain deep-linking;
    - Must contain travel details;
    - All the fields filled on the home page should be displayed;
    - The distance of the route (in kilometers) should be calculated and displayed:
      - Between subsequent cities of the route
      - Total distance.
    - The distance calculation should be performed asynchronously with loading indication and error handling.

- Travel form:
  - Should have validation;
  - If some error is found, it should be shown around the problematic input and the submit button should be disabled;
  - Fields:
    - City of origin
      - Required;
      - Searchable dropdown (combobox) with a list of cities;
      - The list of cities should be requested and searched asynchronously with the loading indication;
    - Intermediate cities
      - Opitional;
      - Same input as city of origin
    - City of destination
      - Required;
      - Same input as city of origin
    - Date of the trip:
      - Required;
      - Should be a date in the future;
    - Number of passengers:
      - Required;
      - Should be a number greater than 0;

### Technical Requirements

- A SPA using React;
- Deploy your app to the place of your choice, share a link that we can open to play with the app;
- Publish your source code to GitHub, with a public repository, so we are able to access it;

### Use Cases

- To implement a cities database hardcode the list of cities and simulate the delay of requesting the cities;
- To implement the distance calculation use Haversine distance formula and simulate the delay of the calculation
- When “Dijon” city is involved the distance calculation should fail to demonstrate the error handling abilities of the UI.
- When a user attempts to find cities using the phrase “fail” (case-insensitive) the mocked API should fail to return results to demonstrate the error handling abilities of the UI.

### Good to have

- Typescript/Flow types;
- Usage of a design system;
- Testing(no full coverage required):
- Unit tests;
- e2e is a big plus

You may use external libraries.

Good luck!
