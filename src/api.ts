async function call({
  baseUrl = "http://worldtimeapi.org/api",
  endpoint,
  options,
}: {
  baseUrl?: string;
  endpoint?: string;
  options?: RequestInit;
}) {
  let response: Response | undefined = undefined;

  try {
    const fullUrl = `${baseUrl}${endpoint}`;
    response = await fetch(fullUrl, options);

    if (response.ok) {
      return [await response.json(), true];
    }

    return [response?.status, false];
  } catch (err) {
    console.error(
      `Error: fetching endpoint ${endpoint} failed with error: ${err}`,
    );

    return [response?.status, false];
  }
}

/**
 * Function which will call `http://worldtimeapi.org/api` and returns requested data.
 *
 * @param [param0={}] params object
 * @param [param0.timezone] provide timezone value, as specififed here {@link https://worldtimeapi.org/pages/examples}
 * @returns [string[] | Record<string, string> | number, boolean ]
 *
 * @example
 * ```ts
 * import {getTimezone} from "worldtimeapi-lib";
 *
 * // 1. example - return array with all available zones
 *
 * const [data, status] = await getTimezone();
 *
 * if (status) {
 *    console.log(JSON.stringify(data));
 * }
 *
 * // 2. example - return area data as string array
 *
 * const [data, status] = await getTimezone({timezone: "Europe"});
 *
 * // 3. example - return data object of type Record<string, string> of specific area location
 *
 * const [data, status] = await getTimezone({timezone: "Europe/Prague"});
 * const [data, status] = await getTimezone({timezone: "America/Argentina/Salta"});
 *
 * Error handling:
 *
 * In case api call will return an error, then function always returns array `[response.status_number, false]`.
 * Response error 404 will be returned, if you provide wrong/nonexisting `timezone` value.
 * Therefore it is best to first return all available timezones, and pick the need one from the array.
 * ```
 *
 *
 */
export async function getTimezone({ timezone }: { timezone?: string } = {}) {
  const tz = typeof timezone !== "undefined" ? timezone : "";

  const endpoint = `/timezone/${tz}`;

  const [data, status] = await call({ endpoint });

  if (status) {
    return [data, true];
  }

  return [data, false];
}
