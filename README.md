# world time API lib

This simple library exposes one function `getTimezone`, which will take care
of everything the underlying [API](https://worldtimeapi.org/) allows.

## Preconditions

- have [Node.js LTS](https://nodejs.org) with `npm` installed. Library enforces using
  Node.js version 21.x or higher, due to internal usage of `fetch` function.

## Usage

### Get all timezones' areas

```ts
import { getTimezone } from "worldtimeapi-lib";

const [data, status] = await getTimezone();

if (status) {
  console.log(JSON.stringify(data));
}
```

### Get specific area with its locations

```ts
const [data, status] = await getTimezone({ timezone: "Europe" });
```

### Get specific location data of the area timezone

```ts
const [data, status] = await getTimezone({ timezone: "Europe/Prague" });
```
